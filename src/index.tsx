//index.tsx
import { createRoot } from "react-dom/client";
import "./index.less";
import { Test } from "./views/Test";
createRoot(document.querySelector("#app_root") as Element).render(<Test />);
