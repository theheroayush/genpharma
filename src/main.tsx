import { createRoot } from "react-dom/client";
import { initSeedData } from "@/data/seedData";
import App from "./App.tsx";
import "./index.css";

initSeedData();

createRoot(document.getElementById("root")!).render(<App />);
