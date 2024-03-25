import React, { useLayoutEffect, useState } from "react";
import BodyContainer from "../components/BodyContainer";
import FlexBox from "../components/FlexBox";
import { videosGet } from "../util/api.js";

const MainPage = () => {
    const [videosData, setVideosData] = useState([]);
    const [mainVideoArr, setMainVideoArr] = useState([]);

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [videosData]);

    useLayoutEffect(() => {
        videosGet()
            .then((res) => {
                setVideosData(res.data);
            })
            .catch((error) => {
                console.error("videosGet error:", error);
            });
    }, []);

    useLayoutEffect(() => {
        const sliceVideosData = videosData;
        const sliceResult = sliceVideosData.slice(0, 3);
        setMainVideoArr(sliceResult);
    }, [videosData]);

    return (
        <BodyContainer>
            <div>
                <div className="flex flex-col md:flex-row items-center">
                    <span className="font-medium font-16 md:font-22 color-green-5e mr-[10px]">
                        Daily TIP.
                    </span>
                    <span className="font-medium md:font-16">
                        다가오는 장마철 천연 정화석을 구비하여 습기를 제거해보세요
                    </span>
                </div>
                <div className="h-[500px] pt-[20px]">TODO게시판들 자리</div>
                <FlexBox justify="space-between" align="center" className="pb-[12px]">
                    <div className="md:font-22 color-green-5e font-medium">자취 정보 영상</div>
                    <button className="font-medium">더 많은 영상보기</button>
                </FlexBox>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-[30px] pb-[40px]">
                {mainVideoArr.map((item, index) => (
                    <div key={index}>
                        <div className="iframeContainer iframe16To9" key={index}>
                            <iframe title={`main_video_${index}`} src={item.videoUrl}></iframe>
                        </div>
                        <div
                            className="text-center px-[10px]"
                            style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                maxWidth: "calc(100vw - 8vw)",
                            }}
                        >
                            {item.videoTitle}
                        </div>
                    </div>
                ))}
            </div>
        </BodyContainer>
    );
};

export default MainPage;
