import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Register PWA service worker (production only, not in single-file standalone build)
if (
  typeof window !== "undefined" &&
  "serviceWorker" in navigator &&
  import.meta.env.PROD &&
  !__NUMOO_STANDALONE__ &&
  window.location.protocol !== "file:"
) {
  window.addEventListener("load", () => {
    const swUrl = `${import.meta.env.BASE_URL}sw.js`;
    navigator.serviceWorker.register(swUrl, { scope: import.meta.env.BASE_URL }).catch(
      (err) => {
        // eslint-disable-next-line no-console
        console.warn("SW registration failed:", err);
      },
    );
  });
}
