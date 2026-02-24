-- GenPharma Supabase Migration (idempotent)

-- 1. TABLES FIRST
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'patient' CHECK (role IN ('patient', 'pharmacist', 'admin')),
  approved BOOLEAN NOT NULL DEFAULT true,
  phone TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email TEXT,
  action TEXT NOT NULL,
  details TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. HELPER FUNCTION (after table exists)
CREATE OR REPLACE FUNCTION public.get_user_role(uid UUID)
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = uid;
$$ LANGUAGE sql SECURITY DEFINER;

-- 3. RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
  DROP POLICY IF EXISTS "Admin can view all profiles" ON public.profiles;
  DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
  DROP POLICY IF EXISTS "Users can insert audit logs" ON public.audit_logs;
  DROP POLICY IF EXISTS "Admin can view audit logs" ON public.audit_logs;
END $$;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (id = auth.uid());
CREATE POLICY "Admin can view all profiles" ON public.profiles FOR SELECT USING (public.get_user_role(auth.uid()) = 'admin');
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (id = auth.uid()) WITH CHECK (id = auth.uid());
CREATE POLICY "Users can insert audit logs" ON public.audit_logs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin can view audit logs" ON public.audit_logs FOR SELECT USING (public.get_user_role(auth.uid()) = 'admin');

-- 4. AUTO-CREATE PROFILE ON SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_count INT;
  user_role TEXT;
  user_approved BOOLEAN;
BEGIN
  SELECT COUNT(*) INTO user_count FROM public.profiles;
  user_role := COALESCE(NEW.raw_user_meta_data->>'role', 'patient');

  -- Security: Force admin signups to patient role unless bootstrap conditions met
  IF user_role = 'admin' AND NOT (user_count = 0 OR NEW.email = 'admin@genpharma.com') THEN
    user_role := 'patient';
  END IF;

  IF user_count = 0 OR NEW.email = 'admin@genpharma.com' THEN
    user_role := 'admin'; user_approved := true;
  ELSIF user_role = 'patient' THEN
    user_approved := true;
  ELSE
    user_approved := false;
  END IF;
  INSERT INTO public.profiles (id, full_name, email, role, approved)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''), COALESCE(NEW.email, ''), user_role, user_approved);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. ADMIN RPCs
CREATE OR REPLACE FUNCTION public.admin_approve_user(target_user_id UUID)
RETURNS VOID AS $$ BEGIN IF public.get_user_role(auth.uid()) != 'admin' THEN RAISE EXCEPTION 'Unauthorized'; END IF; UPDATE public.profiles SET approved = true, updated_at = NOW() WHERE id = target_user_id; END; $$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.admin_reject_user(target_user_id UUID)
RETURNS VOID AS $$ BEGIN IF public.get_user_role(auth.uid()) != 'admin' THEN RAISE EXCEPTION 'Unauthorized'; END IF; UPDATE public.profiles SET approved = false, updated_at = NOW() WHERE id = target_user_id; END; $$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.admin_change_role(target_user_id UUID, new_role TEXT)
RETURNS VOID AS $$ BEGIN IF public.get_user_role(auth.uid()) != 'admin' THEN RAISE EXCEPTION 'Unauthorized'; END IF; IF new_role NOT IN ('patient','pharmacist','admin') THEN RAISE EXCEPTION 'Invalid role'; END IF; UPDATE public.profiles SET role = new_role, updated_at = NOW() WHERE id = target_user_id; END; $$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.admin_get_all_users()
RETURNS SETOF public.profiles AS $$ BEGIN IF public.get_user_role(auth.uid()) != 'admin' THEN RAISE EXCEPTION 'Unauthorized'; END IF; RETURN QUERY SELECT * FROM public.profiles ORDER BY created_at DESC; END; $$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.admin_get_stats()
RETURNS JSON AS $$ DECLARE result JSON; BEGIN IF public.get_user_role(auth.uid()) != 'admin' THEN RAISE EXCEPTION 'Unauthorized'; END IF; SELECT json_build_object('total_users',(SELECT COUNT(*) FROM public.profiles),'patients',(SELECT COUNT(*) FROM public.profiles WHERE role='patient'),'pharmacists',(SELECT COUNT(*) FROM public.profiles WHERE role='pharmacist'),'admins',(SELECT COUNT(*) FROM public.profiles WHERE role='admin'),'pending_approvals',(SELECT COUNT(*) FROM public.profiles WHERE approved=false),'recent_signups',(SELECT COUNT(*) FROM public.profiles WHERE created_at > NOW() - INTERVAL '7 days')) INTO result; RETURN result; END; $$ LANGUAGE plpgsql SECURITY DEFINER;
