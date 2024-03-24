import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BodyContainer from "../components/BodyContainer";
import { constant } from "../constants/constant";
import { joinPost } from "../util/api";
import FlexBox from "./FlexBox";

const SubText = styled.div`
    color: #808080;
    font-size: 2.2rem;
`;
const ScrollableBox = styled.textarea.attrs({ readOnly: true })`
    height: 160px;
    width: 100%;
    overflow-y: auto;
    border: 1px solid #ccc;
    padding: 10px 16px;
    margin: 12px 0;
    border-radius: 5px;
    font-size: 1.6rem;
    resize: none;

    &:focus {
        outline: none;
        border-color: #5e913b;
    }
`;
const StyledCheckbox = styled.input`
    appearance: none;
    width: 1.6rem;
    height: 1.6rem;
    border: 1px solid #808080;
    border-radius: 4px;
    position: relative;

    &:checked::after {
        color: #5e913b;
        content: "✔";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1rem;
    }
`;

const Join = () => {
    const navigate = useNavigate();

    const [termsUseState, setTermsUseState] = useState(false);
    const [userData, setUserData] = useState({
        isTermOfUseCheck: false,
        isPrivacyCheck: false,
        username: "",
        password: "",
        nickname: "",
        email: "",
        number: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!privacyCheck(userData.password)) {
            return;
        }

        joinPost(userData)
            .then((response) => {
                console.log("joinPost response:", response);
            })
            .catch((error) => {
                console.error("joinPost error:", error);
            });
    };

    const privacyCheck = (value) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        console.log("^^regex.test(value)", regex.test(value));
        return regex.test(value);
    };

    const termsUseView = () => {
        return (
            <div className="flex flex-col h-[100vh]">
                <div className="color-green-5e py-[20px] border-b font-semi-bold font-28">
                    인디팬더 회원가입
                </div>
                <div className="py-[20px]">
                    <SubText className="font-medium">이용약관</SubText>
                    <ScrollableBox>{constant.terms_use_text[0].contents}</ScrollableBox>
                    <FlexBox className="font-14 pointer">
                        <StyledCheckbox
                            id="terms_use_text_0"
                            type="checkbox"
                            className="mr-2 pointer"
                        />
                        <label htmlFor="terms_use_text_0" className="text-[#808080] pointer">
                            [필수] 이용약관에 동의합니다.
                        </label>
                    </FlexBox>
                </div>
                <div className="py-[20px]">
                    <SubText className="font-medium">개인정보 수집 및 이용 동의서</SubText>
                    <ScrollableBox>{constant.terms_use_text[1].contents}</ScrollableBox>
                    <FlexBox className="font-14 pointer">
                        <StyledCheckbox
                            id="terms_use_text_1"
                            type="checkbox"
                            className="mr-2 pointer"
                        />
                        <label htmlFor="terms_use_text_1" className="text-[#808080] pointer">
                            [필수] 개인정보 수집 및 이용에 동의합니다.
                        </label>
                    </FlexBox>
                </div>
                <FlexBox justify="center" className="py-[20px] font-16">
                    <button
                        className="mr-4"
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        취소
                    </button>
                    <button>다음</button>
                </FlexBox>
            </div>
        );
    };

    return (
        <BodyContainer>
            {!termsUseState ? (
                termsUseView()
            ) : (
                <form onSubmit={handleSubmit}>
                    {Object.keys(userData).map((key, index) => {
                        if (key === "isTermOfUseCheck" || key === "isPrivacyCheck") {
                            return null;
                        }
                        return (
                            <input
                                key={index}
                                type={key === "password" ? "password" : "text"}
                                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                                value={userData[key]}
                                onChange={(e) =>
                                    setUserData((prev) => ({
                                        ...prev,
                                        [key]: e.target.value,
                                    }))
                                }
                            />
                        );
                    })}
                    <button type="submit">Register</button>
                </form>
            )}
        </BodyContainer>
    );
};

export default Join;
