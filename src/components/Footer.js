import React from "react";
import BodyContainer from "./BodyContainer";
import FlexBox from "./FlexBox";

const Footer = () => {
    const footerMenu = [
        {
            title: "서비스 소개",
        },
        {
            title: "개인정보 처리방침",
        },
        {
            title: "이용약관",
        },
    ];

    return (
        <BodyContainer className="footer border-t-[1px]">
            <div className="flex flex-col py-[30px] color-gray-c7 items-start md:items-center font-14">
                <FlexBox className={"pb-2 flex-wrap"}>
                    {footerMenu.map((item, index) => (
                        <FlexBox key={index}>
                            <button>{item.title}</button>
                            {footerMenu.length - 1 !== index && (
                                <div className="mx-[12px] h-[14px] w-[1px] bg-[#c7c9cd]" />
                            )}
                        </FlexBox>
                    ))}
                </FlexBox>
                <div> Copyright 2024 Team independe All rights reserved.</div>
            </div>
        </BodyContainer>
    );
};

export default Footer;
