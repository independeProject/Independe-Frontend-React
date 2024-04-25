import React, { useLayoutEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { FaRegUser } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import LogoImg from "../resource/images/header_logo.png";
import BodyContainer from "./BodyContainer";
import DropdownMenu from "./DropdownMenu";
import FlexBox from "./FlexBox";
import Icon from "./Icon";

const Header = () => {
    const accessToken = localStorage.getItem("accessToken");
    const userNick = localStorage.getItem("user");
    const navigate = useNavigate();
    const location = useLocation();

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
            link: "/life/clean",
        },
    ];

    const [tabCurrent, setTabCurrent] = useState(
        location.pathname === headerMenu[0].link
            ? 0
            : location.pathname === headerMenu[1].link
            ? 1
            : 2
    );
    const [searchText, setSearchText] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const goMain = () => {
        navMenuClick(0, headerMenu[0].link);
    };

    const goLogout = () => {
        const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
        if (confirmLogout) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            localStorage.removeItem("local");
            localStorage.removeItem("localSwitchState");

            window.location.reload();
        }
    };

    const goSearch = () => {
        if (searchText !== "") {
            navigate("/search", {
                state: {
                    keyWord: searchText,
                },
            });
            setSearchText("");
        }
    };

    const navMenuClick = (index, link) => {
        if (tabCurrent !== index || link !== location.pathname) {
            setTabCurrent(index);
            navigate(link);
        }
    };

    useLayoutEffect(() => {
        if (location.pathname === "/" || location.pathname === "/search") {
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
                        className="h-[40px] md:h-[65px] md:mr-8 cursor-pointer"
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
                                                padding: "0 18px",
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
                    <div className="hidden xl:contents">
                        <FlexBox className="table-search mr-[12px] md:font-14 mr-[20px]">
                            <input
                                placeholder="검색어를 입력하세요."
                                className="xl:w-[200px]"
                                value={searchText}
                                onChange={(e) => {
                                    setSearchText(e.target.value);
                                }}
                                onKeyUp={(e) => {
                                    if (e.key === "Enter") {
                                        goSearch();
                                    }
                                }}
                            />
                            <Icon
                                icon={IoIosSearch}
                                size={14}
                                color={"#727272"}
                                onClick={() => {
                                    goSearch();
                                }}
                            />
                        </FlexBox>
                    </div>
                    {accessToken ? (
                        <>
                            <DropdownMenu
                                options={["내정보", "채팅", "위치인증"]}
                                userNick={userNick}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                            />
                            <button
                                className="user-button select-none flex items-center px-[7px] py-[6px] z-index-1"
                                onClick={() => {
                                    if (!isOpen) {
                                        goLogout();
                                    }
                                }}
                            >
                                <div className="md:font-14 w-[35px] md:w-[49px]">
                                    {isOpen ? "닫기" : "로그아웃"}
                                </div>
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="user-button select-none flex items-center px-[7px] py-[6px] mr-[8px]"
                                onClick={() => {
                                    navigate("/login");
                                }}
                            >
                                <Icon icon={FaRegUser} size={12} />
                                <div className="ml-2 md:font-14">로그인</div>
                            </button>
                            <button
                                className="user-button select-none flex items-center px-[7px] py-[6px]"
                                onClick={() => {
                                    navigate("/join");
                                }}
                            >
                                <div className="md:font-14">회원가입</div>
                            </button>
                        </>
                    )}
                </FlexBox>
            </FlexBox>
        </BodyContainer>
    );
};

export default Header;
