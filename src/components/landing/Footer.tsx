import { useToast } from "@/components/ui/use-toast";

const Footer = () => {
  const { toast } = useToast();

  const handleFooterLink = (label: string) => {
    toast({
      title: `${label}`,
      description: `${label} page coming soon.`,
    });
  };

  return (
    <footer className="py-12 border-t border-border bg-muted/50">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display text-base font-bold">G</span>
            </div>
            <span className="font-display text-lg text-foreground">GenPharma</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <button onClick={() => handleFooterLink("Privacy Policy")} className="hover:text-foreground transition-colors cursor-pointer">Privacy</button>
            <button onClick={() => handleFooterLink("Terms of Service")} className="hover:text-foreground transition-colors cursor-pointer">Terms</button>
            <button onClick={() => handleFooterLink("Support")} className="hover:text-foreground transition-colors cursor-pointer">Support</button>
          </div>

          <p className="text-sm text-muted-foreground">
            © 2026 GenPharma. People first, always.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
