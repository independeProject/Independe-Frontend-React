import BoardPost from "./components/BoardPost";
import Join from "./components/Join";
import Login from "./components/Login";
import PostDetail from "./components/PostDetail";
import MainBoard from "./screen/board/board_main";
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
        path: "/board/:local/:category",
        element: <MainBoard />,
    },
    {
        path: "/write",
        element: <BoardPost />,
    },
    {
        path: "/board/posts/:id",
        element: <PostDetail />,
    },
];

export default routes;
