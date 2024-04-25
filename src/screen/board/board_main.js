import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BodyContainer from "../../components/BodyContainer";
import Table from "../../components/Table";
import { regionBoardGet } from "../../util/api";

const MainBoard = () => {
    const { local, category } = useParams();

    const boardLocalData = [
        { title: "자유 게시판", link: "all", subTab: false },
        { title: "서울 이야기", link: "seoul", subTab: true },
        { title: "부산 이야기", link: "pusan", subTab: true },
        { title: "울산 이야기", link: "ulsan", subTab: true },
        { title: "경남 이야기", link: "kyeongnam", subTab: true },
    ];
    const subTabData = [
        { title: "잡담", link: "talk" },
        { title: "식당", link: "restaurant" },
        { title: "오락", link: "play" },
        { title: "만남", link: "meet" },
        { title: "장터", link: "market" },
    ];
    const pageMax = 10;

    const [tabCurrent, setTabCurrent] = useState(0);
    const [subTabCurrent, setSubTabCurrent] = useState(0);
    const [tableData, setTableData] = useState([]);
    console.log("^^tableData", tableData);
    const [pageCurrent, setPageCurrent] = useState(1);
    const [mainRoute, setMainRoute] = useState("all");
    const [subRoute, setSubRoute] = useState("free");
    const [searchText, setSearchText] = useState("");
    const [searchButton, setSearchButton] = useState(false);

    const navigate = useNavigate();

    const tabClick = (index, route) => {
        setTabCurrent(index);
        setPageCurrent(1);
        setSubTabCurrent(0);
        setMainRoute(route);
        setSearchText("");
        if (index === 0) {
            setSubRoute("free");
            navigate(`/board/${route}/free`);
        } else {
            setSubRoute("talk");
            navigate(`/board/${route}/talk`);
        }
    };

    const subTabClick = (index, route) => {
        setSubTabCurrent(index);
        setPageCurrent(1);
        setSearchText("");
        const mainLink = boardLocalData[tabCurrent].link;
        setMainRoute(mainLink);
        const subLink = boardLocalData[tabCurrent].subTab ? route : "";
        setSubRoute(subLink);
        navigate(`/board/${mainLink}/${subLink}`);
    };

    useEffect(() => {
        const params = {
            regionType: local?.toUpperCase(),
            regionPostType: category?.toUpperCase(),
            condition: searchText !== null ? "title" : "no",
            keyword: searchText,
            pageable: { page: pageCurrent - 1, size: pageMax },
        };

        regionBoardGet(params)
            .then((res) => {
                setTableData(res);
            })
            .catch((error) => {
                setTableData({ data: null });
                console.error("regionBoardGet error:", error);
            })
            .finally(() => {
                setSearchButton(false);
            });
    }, [pageCurrent, local, category, searchButton]);

    useEffect(() => {
        const categoryIndex = boardLocalData.findIndex((item) => item.link === local);

        if (categoryIndex !== -1 && boardLocalData[categoryIndex].subTab) {
            setTabCurrent(categoryIndex);

            const subTabIndex = subTabData.findIndex((item) => item.link === category);
            if (subTabIndex !== -1) {
                setSubTabCurrent(subTabIndex);
            }
        } else {
            setTabCurrent(categoryIndex);
        }
    }, [local, category]);

    return (
        <BodyContainer>
            <div className="flex flex-col sm:flex-row py-[24px] gap-[12px] md:gap-14 border-b">
                <div className="font-28 font-semi-bold">{boardLocalData[tabCurrent].title} </div>
                <div className="flex justify-between sm:justify-start md:gap-[20px]">
                    {boardLocalData.map((item, index) => (
                        <div key={index}>
                            <button
                                className={`custom-tab font-16 font-medium ${
                                    index === tabCurrent
                                        ? "color-green-5e"
                                        : "custom-tab-hover text-[#c7c9cd]"
                                }`}
                                style={{ transition: "0.3s" }}
                                onClick={() => {
                                    if (tabCurrent !== index) {
                                        tabClick(index, item.link);
                                    }
                                }}
                            >
                                {item.title.substring(0, 2)}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            {boardLocalData[tabCurrent].subTab && (
                <div className="flex py-[16px] font-14 gap-[6px] md:gap-[16px] border-b">
                    {subTabData.map((item, index) => (
                        <div key={index}>
                            <button
                                className={`custom-sub-tab px-4 py-2 md:px-6 font-medium ${
                                    index === subTabCurrent
                                        ? "bg-[#5e913b] text-white border border-[#5e913b]"
                                        : "custom-tab-hover border border-[#c7c9cd]"
                                }`}
                                style={{ transition: "0.2s" }}
                                onClick={() => {
                                    if (subTabCurrent !== index) {
                                        subTabClick(index, item.link);
                                    }
                                }}
                            >
                                {item.title.substring(0, 2)}
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <Table
                tableData={tableData}
                pageMax={pageMax}
                setPageCurrent={setPageCurrent}
                pageCurrent={pageCurrent}
                setSearchText={setSearchText}
                searchText={searchText}
                setSearchButton={setSearchButton}
                mainRoute={mainRoute}
                subRoute={subRoute}
                title={boardLocalData[tabCurrent].title}
            ></Table>
        </BodyContainer>
    );
};

export default MainBoard;
