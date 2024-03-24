import Join from "./components/Join";
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
];

export default routes;
