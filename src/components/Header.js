import React, { useLayoutEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { FaRegUser } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import LogoImg from "../resource/images/header_logo.png";
import BodyContainer from "./BodyContainer";
import FlexBox from "./FlexBox";
import Icon from "./Icon";

const Header = () => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("user");

    const navigate = useNavigate();
    const location = useLocation();

    const goMain = () => {
        navMenuClick(0, headerMenu[0].link);
    };

    const goJoin = () => {
        navigate("/join");
    };
    const goLogin = () => {
        navigate("/login");
    };
    const goLogout = () => {
        const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
        if (confirmLogout) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            window.location.reload();
        }
    };

    const navMenuClick = (index, link) => {
        if (tabCurrent !== index) {
            setTabCurrent(index);
            navigate(link);
        }
    };

    const headerMenu = [
        {
            index: 0,
            title: "메인",
            link: "/",
        },
        {
            index: 1,
            title: "게시판",
            link: "/board/all/free",
        },
        {
            index: 2,
            title: "자취생활",
            link: "/life",
        },
    ];

    const [tabCurrent, setTabCurrent] = useState(
        location.pathname === headerMenu[0].link
            ? 0
            : location.pathname === headerMenu[1].link
            ? 1
            : 2
    );

    useLayoutEffect(() => {
        if (location.pathname === "/") {
            setTabCurrent(0);
        } else if (location.pathname.includes("/board/")) {
            setTabCurrent(1);
        } else if (location.pathname.includes("/life")) setTabCurrent(2);
    }, [location.pathname]);

    return (
        <BodyContainer className="border-b-[1px] bg-white">
            <FlexBox justify="space-between" className="h-[60px] md:h-[90px]">
                <FlexBox className="h-full">
                    <img
                        onClick={() => {
                            goMain();
                        }}
                        src={LogoImg}
                        alt=""
                        className="h-[40px] md:h-[70px] md:mr-8 cursor-pointer"
                    />
                    <div className="hidden lg:inline-flex h-full">
                        <Nav className="flex">
                            {headerMenu.map((item, index) => (
                                <Nav.Item key={index} className="h-full">
                                    <FlexBox className="h-full font-medium h-full flex items-center font-18">
                                        <Nav.Link
                                            onClick={() => {
                                                navMenuClick(index, item.link);
                                            }}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                padding: "0 20px",
                                                height: "100%",
                                                color: tabCurrent === index ? "#5e913b" : "black",
                                                borderBottom:
                                                    tabCurrent === index
                                                        ? "2px solid #5e913b"
                                                        : "2px solid  white",
                                                transition: "color 0.3s, border-bottom 0.3s",
                                            }}
                                        >
                                            {item.title}
                                        </Nav.Link>
                                    </FlexBox>
                                </Nav.Item>
                            ))}
                        </Nav>
                    </div>
                </FlexBox>
                <FlexBox>
                    {accessToken ? (
                        <>
                            <button className="user-button select-none flex items-center px-[7px] py-[4px] mr-[8px] md:p-[10px]">
                                <Icon icon={FaRegUser} size={12} />
                                <div className="ml-2 md:font-16">{userId}</div>
                            </button>
                            <button
                                className="user-button select-none flex items-center px-[7px] py-[4px] md:p-[10px]"
                                onClick={() => {
                                    goLogout();
                                }}
                            >
                                <div className="md:font-16">로그아웃</div>
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="user-button select-none flex items-center px-[7px] py-[4px] mr-[8px] md:p-[10px]"
                                onClick={() => {
                                    goLogin();
                                }}
                            >
                                <Icon icon={FaRegUser} size={12} />
                                <div className="ml-2 md:font-16">로그인</div>
                            </button>
                            <button
                                className="user-button select-none flex items-center px-[7px] py-[4px] md:p-[10px]"
                                onClick={() => {
                                    goJoin();
                                }}
                            >
                                <div className="md:font-16">회원가입</div>
                            </button>
                        </>
                    )}
                </FlexBox>
            </FlexBox>
        </BodyContainer>
    );
};

export default Header;
