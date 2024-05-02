import React, { useLayoutEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

    return (
        <div className="relative">
            {headerView && (
                <>
                    <div className="fixed top-0 left-0 right-0" style={{ zIndex: "10" }}>
                        <Header />
                    </div>
                </>
            )}
            <div className="flex flex-col justify-between h-[100vh]">
                <div>
                    {headerView && <div className="pt-[60px] md:pt-[90px] w-full" />}
                    <ToastContainer />
                    <Routes>
                        {routes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                element={<div>{route.element}</div>}
                            />
                        ))}
                    </Routes>
                </div>
                {headerView && <Footer />}
            </div>
        </div>
    );
}

export default App;
