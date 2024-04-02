import React, { useState } from "react";
import { PiNotePencil } from "react-icons/pi";
import { useNavigate, useLocation } from "react-router-dom";
import { regionBoardPost, postFixedPut } from "../util/api";
import BodyContainer from "./BodyContainer";
import Button from "./Button";
import FlexBox from "./FlexBox";
import Icon from "./Icon";

const BoardPost = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [title, setTitle] = useState(location.state.title || "");
    const [content, setContent] = useState(location.state.content || "");
    const editMode = location.state.title ? true : false;

    const postClick = (type) => {
        if (title === "" || content === "") {
            return;
        }

        if (type === "new") {
            const data = {
                title: title,
                content: content,
                regionType: location.state.mainRoute.toUpperCase(),
                regionPostType: location.state.subRoute.toUpperCase(),
                files: [],
            };

            regionBoardPost(data)
                .then((res) => {
                    if (res !== undefined) {
                        const main = location.state.mainRoute;
                        const sub = location.state.subRoute;
                        navigate(`/board/${main}/${sub}`);
                    }
                })
                .catch((error) => {
                    console.error("regionBoardPost error:", error);
                });
        }

        if (type === "fixed") {
            const data = {
                postId: location.state.postId,
                title: title,
                content: content,
                files: [],
            };

            postFixedPut(location.state.postId, data)
                .then((res) => {
                    if (res !== undefined) {
                        navigate(-1);
                    }
                })
                .catch((error) => {
                    console.error("postFixedPut error:", error);
                });
        }
    };

    return (
        <BodyContainer>
            <div className="flex flex-col py-[24px] gap-[12px] lg:px-[10vw]">
                <FlexBox>
                    <Icon icon={PiNotePencil} size={24} marginRight={6} />
                    <div className="font-24 font-medium">자유게시판</div>
                </FlexBox>
                <FlexBox className="post-box font-16">
                    <input
                        placeholder="제목을 입력해주세요."
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        style={{ width: "100%" }}
                    />
                </FlexBox>
                <FlexBox className="post-box font-16">
                    <textarea
                        placeholder={`- 게시판 카테고리에 맞지 않는 글은 숨김 처리 될수도 있음을 알려드립니다.
- 다른 유저로 부터 일정 수 이상의 신고를 받으면 글은 숨김 처리 될수도 있음을 알려드립니다.
- 욕설이나 시비, 분쟁과 관련된 글과 불쾌감을 주는 글은 규칙 위반입니다.
- 범죄, 불법 행위의 글과 음란물과 관련한 글은 규칙 위반입니다.
- 매너있는 게시판 이용 부탁드립니다.`}
                        value={content}
                        rows={4}
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                        style={{ width: "100%", minHeight: "350px" }}
                    />
                </FlexBox>
                <FlexBox justify="end" className="py-[20px] font-16 gap-4">
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
                            editMode ? postClick("fixed") : postClick("new");
                        }}
                        text={editMode ? "글 수정" : "글 등록"}
                    ></Button>
                </FlexBox>
            </div>
        </BodyContainer>
    );
};

export default BoardPost;
