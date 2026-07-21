import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@fontsource-variable/bricolage-grotesque/index.css";
import "@fontsource/geist-sans/400.css";
import "@fontsource/geist-sans/500.css";
import "@fontsource/geist-sans/600.css";
import "@fontsource/jetbrains-mono/500.css";

import "./styles/globals.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
