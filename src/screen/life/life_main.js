import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BodyContainer from "../../components/BodyContainer";
import Table from "../../components/Table";
import VideoVeiw from "../../components/VideoVeiw";
import { lifeBoardGet } from "../../util/api";

const MainLife = () => {
    const { category } = useParams();

    const boardLocalData = [
        { title: "청소 정보", link: "clean" },
        { title: "세탁 정보", link: "wash" },
        { title: "요리 정보", link: "cook" },
        { title: "건강 정보", link: "health" },
        { title: "기타 정보", link: "etc" },
    ];
    const pageMax = 10;

    const [tabCurrent, setTabCurrent] = useState(0);
    const [tableData, setTableData] = useState([]);
    const [videoData, setVideoData] = useState([]);
    const [pageCurrent, setPageCurrent] = useState(1);
    const [mainRoute, setMainRoute] = useState("clean");
    const [searchText, setSearchText] = useState("");
    const [searchButton, setSearchButton] = useState(false);

    const navigate = useNavigate();

    const tabClick = (index, route) => {
        setTabCurrent(index);
        setPageCurrent(1);
        setMainRoute(route);
        setSearchText("");
        navigate(`/life/${route}`);
    };

    useEffect(() => {
        const params = {
            independentPostType: category.toUpperCase(),
            condition: "no",
            keyword: searchText,
            pageable: { page: pageCurrent - 1, size: pageMax },
        };

        lifeBoardGet(params)
            .then((res) => {
                setTableData(res.data);
                setVideoData(res.data.independentPostVideoDtos);
            })
            .catch((error) => {
                setTableData({ data: null });
                console.error("regionBoardGet error:", error);
            })
            .finally(() => {
                setSearchButton(false);
                // window.location.reload();
            });
    }, [pageCurrent, searchButton, tabCurrent]);

    useEffect(() => {
        const categoryIndex = boardLocalData.findIndex((item) => item.link === category);
        setTabCurrent(categoryIndex);
        setVideoData([]);
    }, [category]);

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
            <Table
                tableData={tableData?.postsResponses}
                pageMax={pageMax}
                setPageCurrent={setPageCurrent}
                pageCurrent={pageCurrent}
                setSearchText={setSearchText}
                searchText={searchText}
                setSearchButton={setSearchButton}
                mainRoute={mainRoute}
            ></Table>
            {videoData && (
                <VideoVeiw
                    mainVideoArr={videoData}
                    title={`${boardLocalData[tabCurrent].title} 영상`}
                    subText="더 많은 영상 보기"
                />
            )}
        </BodyContainer>
    );
};

export default MainLife;
