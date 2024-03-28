import React, { useLayoutEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer.js";
import Header from "./components/Header.js";
import routes from "./routes";

function App() {
    const location = useLocation();
    const [headerView, setHeaderView] = useState(true);

    useLayoutEffect(() => {
        if (location.pathname === "/join" || location.pathname === "/login") {
            setHeaderView(false);
        } else {
            setHeaderView(true);
        }
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useLayoutEffect(() => {}, []);

    return (
        <div className="relative">
            {headerView && (
                <>
                    <div className="fixed top-0 left-0 right-0" style={{ zIndex: "10" }}>
                        <Header />
                    </div>
                    <div className="pt-[60px] md:pt-[90px] w-full" />
                </>
            )}
            <div className="relative h-[100vh]">
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
