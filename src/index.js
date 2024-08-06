import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import * as encoding from "text-encoding";

const root = createRoot(document.getElementById("root"));
root.render(
    <RecoilRoot>
        <Router>
            <App />
        </Router>
    </RecoilRoot>
);

reportWebVitals();
