import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BodyContainer from "../components/BodyContainer";
import { constant } from "../constants/constant";
import { idUniquePost, joinPost, nickUniquePost } from "../util/api";
import { emailCheck, formatPhoneNumber } from "../util/loginUtil";
import Button from "./Button";
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
    const [nickUnique, setNickUnique] = useState("");
    const [idUnique, setIdUnique] = useState("");
    const [phoneCheck, setPhoneCheck] = useState(false);
    const [termsCheck, setTermsCheck] = useState({
        checked0: false,
        checked1: false,
    });
    const [userData, setUserData] = useState({
        isTermOfUseCheck: false,
        isPrivacyCheck: false,
        username: "",
        password: "",
        nickname: "",
        email: "",
        number: "",
    });

    const inputList = ["", "", "아이디", "비밀번호", "닉네임", "이메일", "전화번호"];

    const handleSubmit = () => {
        if (!privacyCheck(userData.password)) {
            return;
        }
        if (!idUnique || !nickUnique || !emailCheck(userData.email) || !phoneCheck) {
            return;
        }

        setUserData((prev) => ({
            ...prev,
            isPrivacyCheck: true,
            isTermOfUseCheck: true,
        }));

        joinPost(userData)
            .then((response) => {
                console.log("joinPost response:", response);
                navigate("/");
            })
            .catch((error) => {
                console.error("joinPost error:", error);
            });
    };

    const nextButton = (next) => {
        if (next) {
            setTermsUseState(true);
        } else {
            alert("필수 약관에 동의해야 합니다.");
        }
    };

    const privacyCheck = (value) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(value);
    };

    const uniqueCheck = (type) => {
        if (type === "username" && userData.username !== "") {
            idUniquePost({ username: userData?.username })
                .then((res) => {
                    setIdUnique(res.idDuplicatedNot);
                })
                .catch((error) => {
                    console.error("idUniquePost error:", error);
                });
        } else if (userData.username === "") {
            setIdUnique("");
        }

        if (type === "nickname" && userData.nickname !== "") {
            nickUniquePost({ nickname: userData?.nickname })
                .then((res) => {
                    setNickUnique(res.idDuplicatedNot);
                })
                .catch((error) => {
                    console.error("nickUniquePost error:", error);
                });
        } else if (userData.nickname === "") {
            setNickUnique("");
        }
    };

    const termsUseView = () => {
        return (
            <div className="flex flex-col">
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
                            checked={termsCheck.checked0}
                            onChange={(e) =>
                                setTermsCheck((prev) => ({
                                    ...prev,
                                    checked0: e.target.checked,
                                }))
                            }
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
                            checked={termsCheck.checked1}
                            onChange={(e) =>
                                setTermsCheck((prev) => ({
                                    ...prev,
                                    checked1: e.target.checked,
                                }))
                            }
                            className="mr-2 pointer"
                        />
                        <label htmlFor="terms_use_text_1" className="text-[#808080] pointer">
                            [필수] 개인정보 수집 및 이용에 동의합니다.
                        </label>
                    </FlexBox>
                </div>
                <FlexBox justify="center" className="py-[20px] font-16 gap-4">
                    <Button
                        type="normal"
                        onClick={() => {
                            navigate(-1);
                        }}
                        text={"취소"}
                    ></Button>
                    <Button
                        type="green"
                        onClick={() => {
                            nextButton(termsCheck.checked0 && termsCheck.checked1);
                        }}
                        text={"다음"}
                    ></Button>
                </FlexBox>
            </div>
        );
    };

    const phoneNumberChecker = (input) => {
        const match = formatPhoneNumber(input);

        if (match) {
            setPhoneCheck(true);
            return match[1] + "-" + match[2] + "-" + match[3];
        } else {
            setPhoneCheck(false);
            return input;
        }
    };

    const inputDescription = (key) => {
        let text = "";
        let keyWord = key === "username" ? "아이디" : "닉네임";

        if (key === "password") {
            text = "* 비밀번호는 8글자 이상, 영문 대 소문자, 숫자와 특수기호를 포함해야 합니다.";
            return (
                <>
                    {!privacyCheck(userData.password) && userData.password !== "" && (
                        <div className="text-[#FF0000]">
                            {"비밀번호의 형식이 올바르지 않습니다."}
                        </div>
                    )}
                    <div className="text-[#00008D]">{text}</div>
                </>
            );
        }
        if (key === "username") {
            return (
                <>
                    {idUnique && (
                        <div className="text-[#5e913b]">{`사용 가능한 ${keyWord} 입니다.`}</div>
                    )}
                    {idUnique === false && (
                        <div className="text-[#FF0000]">{`사용 불가능한 ${keyWord} 입니다.`}</div>
                    )}
                </>
            );
        }
        if (key === "nickname") {
            return (
                <>
                    {nickUnique && (
                        <div className="text-[#5e913b]">{`사용 가능한 ${keyWord} 입니다.`}</div>
                    )}
                    {nickUnique === false && (
                        <div className="text-[#FF0000]">{`사용 불가능한 ${keyWord} 입니다.`}</div>
                    )}
                </>
            );
        }
        if (key === "number" && !phoneCheck) {
            return (
                <>
                    {userData.number !== "" && (
                        <div className="text-[#FF0000]">{"전화번호는 숫자 11자리 입니다."}</div>
                    )}
                </>
            );
        }
        if (key === "email") {
            return (
                <>
                    {userData.email !== "" && !emailCheck(userData.email) && (
                        <div className="text-[#FF0000]">{"올바른 이메일 양식이 아닙니다."}</div>
                    )}
                </>
            );
        }
    };

    return (
        <BodyContainer>
            {!termsUseState ? (
                termsUseView()
            ) : (
                <>
                    <div className="flex flex-col">
                        <div className="color-green-5e py-[20px] border-b font-semi-bold font-28">
                            개인정보입력
                        </div>
                        <div className="pt-[60px]">
                            <form onSubmit={handleSubmit} className="flex justify-center">
                                <div>
                                    {Object.keys(userData).map((key, index) => {
                                        if (
                                            key === "isTermOfUseCheck" ||
                                            key === "isPrivacyCheck"
                                        ) {
                                            return null;
                                        }
                                        return (
                                            <div className="mb-[40px] md:mb-[60px]" key={index}>
                                                <div className="flex flex-col md:flex-row md:justify-between font-16 text-[#808080] md:w-[350px]">
                                                    <div className="mb-[4px]">
                                                        {inputList[index]}
                                                    </div>
                                                    <div>
                                                        <input
                                                            className="h-[30px] border-b-[1px] mr-[12px]"
                                                            type={
                                                                key === "password"
                                                                    ? "password"
                                                                    : key === "email"
                                                                    ? "email"
                                                                    : "text"
                                                            }
                                                            placeholder={
                                                                key.charAt(0).toUpperCase() +
                                                                key.slice(1)
                                                            }
                                                            value={userData[key]}
                                                            onChange={(e) => {
                                                                let targetValue = e.target.value;
                                                                if (key === "number") {
                                                                    targetValue = targetValue.slice(
                                                                        0,
                                                                        13
                                                                    );
                                                                    targetValue =
                                                                        phoneNumberChecker(
                                                                            targetValue
                                                                        );
                                                                }
                                                                setUserData((prev) => ({
                                                                    ...prev,
                                                                    [key]: targetValue,
                                                                }));
                                                            }}
                                                            onKeyUp={(e) => {
                                                                if (e.key === "Enter") {
                                                                    e.preventDefault();
                                                                    uniqueCheck(key);
                                                                }
                                                            }}
                                                        />
                                                        {key === "username" ||
                                                        key === "nickname" ? (
                                                            <button
                                                                type="button"
                                                                className="w-[60px]"
                                                                onClick={() => {
                                                                    uniqueCheck(key);
                                                                }}
                                                            >
                                                                중복 확인
                                                            </button>
                                                        ) : (
                                                            <div
                                                                className="w-[60px]"
                                                                style={{ display: "inline-block" }}
                                                            ></div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="my-[16px]">
                                                    {inputDescription(key)}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </form>
                        </div>
                        <FlexBox justify="center" className="py-[20px] font-16 gap-4">
                            <Button
                                type="normal"
                                onClick={() => {
                                    setTermsUseState(false);
                                }}
                                text={"취소"}
                            ></Button>
                            <Button
                                type="green"
                                onClick={() => {
                                    handleSubmit();
                                }}
                                text={"생성"}
                            ></Button>
                        </FlexBox>
                    </div>
                </>
            )}
        </BodyContainer>
    );
};

export default Join;
