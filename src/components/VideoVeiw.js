import React from "react";
import { AiOutlineMore } from "react-icons/ai";
import FlexBox from "./FlexBox";
import Icon from "./Icon";

const VideoVeiw = ({ mainVideoArr, title, subText, onClick }) => {
    return (
        <>
            <FlexBox justify="space-between" align="center" className="pb-[12px]">
                <div className="font-24 color-green-5e font-medium">{title}</div>
                <button className="font-13 hidden sm:contents" onClick={onClick}>
                    {subText}
                </button>
                <button className="contents sm:hidden">
                    <Icon icon={AiOutlineMore} size={20} />
                </button>
            </FlexBox>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-[30px] pb-[40px]">
                {mainVideoArr?.map((item, index) => (
                    <div key={index}>
                        <div className="iframeContainer iframe16To9" key={index}>
                            <iframe title={`main_video_${index}`} src={item.videoUrl}></iframe>
                        </div>
                        <div
                            className="text-center px-[10px] font-13"
                            style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                maxWidth: "calc(100vw - 8vw)",
                            }}
                        >
                            {item.title}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default VideoVeiw;
