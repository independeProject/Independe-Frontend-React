import React, { useEffect, useState } from "react";
import { ImFire, ImHome } from "react-icons/im";
import { IoMdPerson, IoMdPersonAdd } from "react-icons/io";
import BodyContainer from "../components/BodyContainer";
import MainBoard from "../components/MainBoard";
import VideoVeiw from "../components/VideoVeiw";
import { mainDataGet } from "../util/api.js";

const MainPage = () => {
    const [mainData, setMainData] = useState([]);

    useEffect(() => {
        mainDataGet()
            .then((res) => {
                setMainData(res.data);
            })
            .catch((error) => {
                console.error("MainDataGet error:", error);
            });
    }, []);

    return (
        <BodyContainer>
            <div>
                <div className="flex flex-col md:flex-row items-center py-[20px]">
                    <span className="font-medium font-16 md:font-22 color-green-5e mr-[10px]">
                        Daily TIP.
                    </span>
                    <span className="font-medium md:font-16">{mainData?.todayMent} </span>
                </div>
                <div className="flex gap-[36px]">
                    <MainBoard title={"HOT 게시판"} subText={"더보기"} iconName={ImFire} />
                    <div className="hidden md:block">인기상승 검색어만들자리</div>
                </div>
                <MainBoard title={"인기 자취 정보"} subText={"더보기"} iconName={ImHome} />
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-[36px]">
                    <MainBoard
                        title={"인기 전체 게시판"}
                        subText={"더보기"}
                        iconName={IoMdPersonAdd}
                    />
                    <MainBoard
                        title={"인기 지역 게시판"}
                        subText={"더보기"}
                        iconName={IoMdPerson}
                    />
                </div>
            </div>
            <VideoVeiw
                mainVideoArr={mainData?.videoMainDtos}
                title="자취 정보 영상"
                subText="더 많은 영상 보기"
            />
        </BodyContainer>
    );
};

export default MainPage;
