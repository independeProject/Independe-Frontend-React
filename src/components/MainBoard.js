import React from "react";
import FlexBox from "./FlexBox";
import Icon from "./Icon";

const MainBoard = ({ title, subText, iconName }) => {
    return (
        <div className="w-full pb-[24px]">
            <FlexBox justify="space-between" align="center" className="pb-[12px] border-b ">
                <FlexBox className="color-green-5e gap-2">
                    <Icon icon={iconName} size={24} />
                    <div className="font-24 font-medium">{title}</div>
                </FlexBox>
                <button className="font-13">{subText}</button>
            </FlexBox>
            <div className="pt-[12px]">
                <div className="h-[200px]"></div>
            </div>
        </div>
    );
};

export default MainBoard;
