import React, { useLayoutEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { PiLink, PiStar } from "react-icons/pi";
import { VscComment } from "react-icons/vsc";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Slide, toast } from "react-toastify";
import { boardPostGet, childCommentsPost, parentCommentsPost, postDelete } from "../util/api";
import BodyContainer from "./BodyContainer";
import Button from "./Button";
import FlexBox from "./FlexBox";
import Icon from "./Icon";
import { useLocation } from "react-router-dom";

const PostDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [postData, setPostData] = useState(null);
    const [comment, setComment] = useState("");
    const userName = localStorage.getItem("user");
    const [commentReply, setCommentReply] = useState("");
    const [replyInput, setReplyInput] = useState([]);

    useLayoutEffect(() => {
        boardPostGet(id)
            .then((res) => {
                setPostData({
                    ...res.data.data,
                    commentInput: false,
                });
                setReplyInput(Array(res.data.data.comments.length).fill(false));
            })
            .catch((error) => {
                console.error("boardPostGet error:", error);
            });
    }, [id]);

    const toggleCommentInput = (index) => {
        setReplyInput((prevState) => {
            const updatedInputs = [...prevState];
            updatedInputs[index] = !updatedInputs[index];
            return updatedInputs;
        });
    };

    const formatDate = (dateString, monthStart) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        if (monthStart !== null) {
            return `${month}-${day} ${hours}:${minutes}`;
        }

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    const commentAddClick = (type, parentId) => {
        if (type === "comment") {
            if (comment === "") {
                return;
            }

            const params = {
                postId: id,
                content: comment,
            };

            parentCommentsPost(params)
                .then((res) => {
                    window.location.reload();
                })
                .catch((error) => {
                    console.error("boardPostGet error:", error);
                });
        } else if (type === "reply") {
            if (commentReply === "") {
                return;
            }

            childCommentsPost({
                postId: id,
                parentId: parentId,
                content: commentReply,
            })
                .then((res) => {
                    window.location.reload();
                })
                .catch((error) => {
                    console.error("childCommentsPost error:", error);
                });
        }
    };

    const deleteClick = () => {
        const postId = parseInt(location.state.postId);
        postDelete(postId)
            .then((res) => {
                navigate(-1);
            })
            .catch((error) => {
                console.error("postDelete error:", error);
            });
    };

    return (
        <BodyContainer className="py-[24px]">
            <FlexBox justify="space-between">
                <FlexBox className="font-16 gap-4">
                    <div>지역전체 </div>
                    <Icon icon={BsChevronRight} size={14} />
                    <div>자유</div>
                </FlexBox>
                <FlexBox>
                    <Icon
                        icon={PiLink}
                        size={20}
                        marginRight={12}
                        onClick={() =>
                            toast.success(
                                <div className="font-14">링크 복사가 완료되었습니다.</div>,
                                {
                                    position: "top-right",
                                    autoClose: 1500,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                    transition: Slide,
                                }
                            )
                        }
                    />
                    <Icon icon={PiStar} size={20} onClick={() => {}} />
                </FlexBox>
            </FlexBox>
            {postData && (
                <>
                    <div className="py-[24px] border-b">
                        <FlexBox justify="space-between" className="pb-[12px]">
                            <div className="font-28 font-medium">{postData.title}</div>
                            <div className="font-14">{formatDate(postData.createdDate, null)}</div>
                        </FlexBox>
                        <FlexBox justify="space-between" className="font-13">
                            <div>작성자 : {postData.nickname}</div>
                            <div className="hidden md:contents">
                                <div className="flex items-center">
                                    <div>조회수 : {postData.views}</div>
                                    <div className="mx-[12px] h-[13px] w-[1px] bg-black"></div>
                                    <div>추천수 : {postData.recommendCount}</div>
                                </div>
                            </div>
                        </FlexBox>
                    </div>
                    <div className="py-[24px] font-14 border-b">
                        <div
                            className="pb-[40px]"
                            dangerouslySetInnerHTML={{
                                __html: postData.content.replace(/\n/g, "<br>"),
                            }}
                        />
                    </div>
                    {postData.nickname === userName && (
                        <>
                            <FlexBox justify="end" className="py-[16px] gap-4 border-b">
                                <Button
                                    type="board"
                                    onClick={() => {
                                        deleteClick();
                                    }}
                                    text={"삭제"}
                                ></Button>
                                <Button
                                    type="board"
                                    onClick={() => {
                                        navigate("/write", {
                                            state: {
                                                title: postData.title,
                                                content: postData.content,
                                                postId: location.state.postId,
                                            },
                                        });
                                    }}
                                    text={"수정"}
                                ></Button>
                            </FlexBox>
                        </>
                    )}
                    <div className="pt-[24px] pb-[10px] font-14">
                        댓글수 {postData.commentCount}
                    </div>
                    <FlexBox className="flex gap-4 pb-[24px]">
                        <textarea
                            className="post-box font-16"
                            placeholder={"댓글을 작성해보세요."}
                            value={comment}
                            rows={2}
                            onChange={(e) => {
                                setComment(e.target.value);
                            }}
                            style={{ width: "100%", minHeight: "70px" }}
                        />
                        <Button
                            className="w-[70px] h-[70px]"
                            type="board"
                            onClick={() => {
                                commentAddClick("comment");
                            }}
                            text={"등록"}
                        ></Button>
                    </FlexBox>
                    {postData.comments
                        .filter((parentComment) => parentComment.parentId === null)
                        .map((parentComment, index) => (
                            <div key={index}>
                                <div className="border-t py-[12px] font-13 px-[4px] ">
                                    <div className="pb-[6px] gap-4 flex justify-between">
                                        <div className="gap-4 flex">
                                            <div>{parentComment.nickname}</div>
                                            {formatDate(parentComment.createdDate, "comment")}
                                        </div>
                                        <Icon
                                            icon={VscComment}
                                            size={13}
                                            onClick={() => toggleCommentInput(index)}
                                        />
                                    </div>
                                    <div>{parentComment.content}</div>
                                </div>
                                {replyInput[index] && (
                                    <FlexBox className="flex gap-4 py-[24px]">
                                        <textarea
                                            className="post-box font-16"
                                            placeholder={"답글을 작성해보세요."}
                                            value={commentReply}
                                            rows={1}
                                            onChange={(e) => {
                                                setCommentReply(e.target.value);
                                            }}
                                            style={{ width: "100%", minHeight: "42px" }}
                                        />
                                        <Button
                                            className="w-[70px] h-[42px]"
                                            type="board"
                                            onClick={() => {
                                                commentAddClick("reply", parentComment.commentId);
                                            }}
                                            text={"등록"}
                                        ></Button>
                                    </FlexBox>
                                )}
                                {postData.comments
                                    .filter(
                                        (childComment) =>
                                            childComment.parentId === parentComment.commentId
                                    )
                                    .map((childComment) => (
                                        <div
                                            key={childComment.commentId}
                                            className="border-t py-[12px] font-13 px-[12px] bg-[#F7F7F7]"
                                        >
                                            <div className="pb-[6px] gap-4 flex">
                                                <div>{"ㄴ " + childComment.nickname}</div>
                                                <div>
                                                    {formatDate(
                                                        childComment.createdDate,
                                                        "comment"
                                                    )}
                                                </div>
                                            </div>
                                            <div>{childComment.content}</div>
                                        </div>
                                    ))}
                            </div>
                        ))}
                </>
            )}
        </BodyContainer>
    );
};

export default PostDetail;
