import ReactDOM from "react-dom/client";
import App from "./App";
import './App.css';
import { HashRouter } from "react-router-dom";
import { invoke } from "@tauri-apps/api/core";

document.getElementById("boot")?.remove();

const closeSplash = () => invoke("close_splashscreen").catch(console.error);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <HashRouter>
      <App onReady={closeSplash} />
    </HashRouter>
);

// Safety net: fire the IPC even if <App>'s onReady never runs (route error, etc.)
window.addEventListener("load", () => {
  setTimeout(closeSplash, 300);
});