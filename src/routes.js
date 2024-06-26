import BoardPost from "./components/BoardPost";
import Join from "./components/Join";
import Login from "./components/Login";
import PostDetail from "./components/PostDetail";
import MainBoardPage from "./screen/board/board_main";
import Chatting from "./screen/information/chatting";
import MainLifePage from "./screen/life/life_main";
import MainPage from "./screen/main";
import MyPage from "./screen/my_page";
import SearchPage from "./screen/search";

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
        element: <MainBoardPage />,
    },
    {
        path: "/write",
        element: <BoardPost />,
    },
    {
        path: "/posts/:id",
        element: <PostDetail />,
    },
    {
        path: "/life/:category",
        element: <MainLifePage />,
    },
    {
        path: "/search",
        element: <SearchPage />,
    },
    {
        path: "/myInfo/:tabName",
        element: <MyPage />,
    },
    {
        path: "/chatting",
        element: <Chatting />,
    },
];

export default routes;
