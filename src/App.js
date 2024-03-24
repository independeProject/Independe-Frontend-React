import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer.js";
import Header from "./components/Header.js";
import routes from "./routes";

function App() {
    const location = useLocation();

    return (
        <div className="relative">
            {location.pathname !== "/join" && (
                <div className="fixed top-0 left-0 right-0" style={{ zIndex: "10" }}>
                    <Header />
                </div>
            )}

            <div className="overflow-y-auto min-h-screen">
                <Routes>
                    {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <div
                                    className={
                                        route.path !== "/join" ? "mt-[60px] md:mt-[100px]" : ""
                                    }
                                >
                                    {route.element}
                                </div>
                            }
                        />
                    ))}
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;
