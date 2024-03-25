import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer.js";
import Header from "./components/Header.js";
import routes from "./routes";

function App() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div className="relative">
            {location.pathname !== "/join" && (
                <>
                    <div className="fixed top-0 left-0 right-0" style={{ zIndex: "10" }}>
                        <Header />
                    </div>
                    <div className="pt-[60px] md:pt-[90px] w-full" />
                </>
            )}
            <div className="h-[100vh] flex flex-col justify-between">
                <Routes>
                    {routes.map((route, index) => (
                        <Route key={index} path={route.path} element={<div>{route.element}</div>} />
                    ))}
                </Routes>
                <Footer />
            </div>
        </div>
    );
}

export default App;
