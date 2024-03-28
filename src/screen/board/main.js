import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BodyContainer from "../../components/BodyContainer";

const MainBoard = () => {
    const boardCategory = [
        { title: "자유 게시판", link: "all" },
        { title: "서울 이야기", link: "seoul" },
        { title: "부산 이야기", link: "busan" },
        { title: "울산 이야기", link: "ulsan" },
        { title: "경남 이야기", link: "gyeongnam" },
    ];

    const [tabCurrent, setTabCurrent] = useState(0);
    const navigate = useNavigate();

    const tabClick = (index, route) => {
        setTabCurrent(index);
        if (index === 0) {
            navigate(`/board`);
        } else navigate(`/board/${route}`);
    };
    return (
        <BodyContainer>
            <div className="flex flex-col sm:flex-row py-[24px] gap-5">
                <div className="font-28 font-semi-bold">{boardCategory[tabCurrent].title} </div>
                <div className="flex justify-between sm:justify-start md:gap-[20px]">
                    {boardCategory.map((item, index) => (
                        <div key={index}>
                            <button
                                className={`custom-tab font-16 font-medium ${
                                    index === tabCurrent
                                        ? "color-green-5e"
                                        : "custom-tab-hover text-[#c7c9cd]"
                                }`}
                                onClick={() => {
                                    tabClick(index, item.link);
                                }}
                            >
                                {item.title.substring(0, 2)}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </BodyContainer>
    );
};

export default MainBoard;
