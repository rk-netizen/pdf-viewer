import { createRoot } from "react-dom/client";
import { worker } from "./mocks/browser";
import { StrictMode } from "react";
import App from "./App";
import "./index.css";

if (import.meta.env.MODE === "development") {
    worker.start();
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
