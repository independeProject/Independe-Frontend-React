import Join from "./components/Join";
import Login from "./components/Login";
import MainBoard from "./screen/board/main";
import MainPage from "./screen/main";

const routes = [
    {
        path: "/",
        element: <MainPage />,
    },
    {
        path: "/join",
        element: <Join />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/board/*",
        element: <MainBoard />,
    },
];

export default routes;
