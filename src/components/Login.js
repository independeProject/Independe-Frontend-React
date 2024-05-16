import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoImg from "../resource/images/header_logo.png";
import { loginPost } from "../util/api";
import BodyContainer from "./BodyContainer";
import Button from "./Button";
import FlexBox from "./FlexBox";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const goMain = () => {
        navigate("/");
    };

    const loginClick = () => {
        const loginData = {
            username: username,
            password: password,
        };

        loginPost(loginData)
            .then((res) => {
                console.log("^^res", res);
                const decodedToken = jwtDecode(res.headers.authorization);
                localStorage.setItem("accessToken", res.headers.authorization);
                localStorage.setItem("user", decodedToken.nickname);
                goMain();
            })
            .catch((error) => {
                alert(error.response.data.message);
                console.error("loginPost error:", error);
            })
            .finally(() => {});
    };

    return (
        <BodyContainer className="px-[4vw] lg:px-[35vw]">
            <div className="flex flex-col md:justify-center h-[100vh]">
                <div className="color-green-5e py-[20px] border-b font-semi-bold font-28">
                    <img src={LogoImg} alt="" className="h-[40px] md:h-[70px] md:mr-8" />
                </div>
                <div className="py-[60px] font-16">
                    <div className="flex flex-col gap-[20px]">
                        <label>아이디</label>
                        <input
                            className="border-[1px] rounded p-[10px]"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label>비밀번호</label>
                        <input
                            className="border-[1px] rounded p-[10px]"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <FlexBox justify="center" className="font-16 gap-4">
                    <Button
                        className="w-full"
                        type="green"
                        onClick={() => {
                            loginClick();
                        }}
                        text={"로그인"}
                    ></Button>
                </FlexBox>
            </div>
        </BodyContainer>
    );
};

export default Login;
