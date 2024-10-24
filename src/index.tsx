//index.tsx
import "antd/dist/antd.css";
import {createRoot} from "react-dom/client";
import "./index.less";
import {ListModify} from "./views/ListModify";
createRoot(document.querySelector("#app_root") as Element).render(<ListModify />);
