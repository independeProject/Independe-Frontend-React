import React from "react";
import { BiSolidCommentDetail, BiSolidLike } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import FlexBox from "../components/FlexBox";
import Icon from "../components/Icon";

const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const FlexRow = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
`;

const FlexItem = styled.div`
    flex: ${(props) => (props.flex ? props.flex : "1")};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const Table = ({
    tableData,
    pageMax,
    setPageCurrent,
    pageCurrent,
    setSearchText,
    searchText,
    setSearchButton,
    mainRoute,
    subRoute,
    type,
    title,
}) => {
    const login = localStorage.getItem("user");

    const dataArr = tableData?.data || tableData;

    const navigate = useNavigate();
    const pageMaxNum = Math.ceil(tableData?.count / pageMax) || 1;

    const formattedDate = (date) => {
        return new Date(date).toISOString().slice(0, 10);
    };

    const tableIcon = (iconName) => {
        return <Icon icon={iconName} size={14} color={"#727272"} marginTop={1} marginRight={4} />;
    };

    const pageButtons = () => {
        const buttons = [];
        for (let i = 1; i <= pageMaxNum; i++) {
            buttons.push(
                <button
                    key={i + 1}
                    className={`page-button font-13 ${
                        pageCurrent === i ? "text-[#5e913b]" : "text-[#C7C9CD]"
                    }`}
                    onClick={() => setPageCurrent(i)}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    };

    //마이페이지 활동내역 뷰
    if (type === "comment") {
        return (
            <>
                {/* className="hidden md:block" */}
                <div className="pb-[40px]">
                    <FlexContainer className="font-13">
                        {/*web용 테이블*/}
                        <div className="hidden md:contents">
                            <FlexRow className="border-b gap-[16px]">
                                <FlexItem flex={2}>시각</FlexItem>
                                <FlexItem flex={4}>제목</FlexItem>
                                <FlexItem>조회수</FlexItem>
                            </FlexRow>
                            {dataArr && (
                                <>
                                    {dataArr?.map((item, index) => (
                                        <button
                                            style={{ textAlign: "left" }}
                                            key={index}
                                            onClick={() => {
                                                navigate(`/posts/${item?.postId}`, {
                                                    state: {
                                                        postId: item?.postId,
                                                    },
                                                });
                                            }}
                                        >
                                            <FlexRow className="border-b gap-[16px]">
                                                <FlexItem flex={2}>
                                                    {formattedDate(item?.createdDate)}
                                                </FlexItem>
                                                <FlexItem flex={4}>
                                                    {item?.content || item?.title}
                                                </FlexItem>

                                                <FlexItem>
                                                    <FlexBox>
                                                        {tableIcon(FaEye)}
                                                        {item?.totalCount || 0}
                                                    </FlexBox>
                                                </FlexItem>
                                            </FlexRow>
                                        </button>
                                    ))}
                                </>
                            )}
                        </div>
                        {/*mobile용 테이블*/}
                        <div className="contents md:hidden">
                            <FlexRow className="border-b gap-4">
                                <FlexItem flex={2}>시각</FlexItem>
                                <FlexItem flex={1}>제목</FlexItem>
                            </FlexRow>
                            {dataArr && (
                                <>
                                    {dataArr?.map((item, index) => (
                                        <button style={{ textAlign: "left" }} key={index}>
                                            <FlexRow className="border-b gap-4">
                                                <FlexItem flex={2}>
                                                    {formattedDate(item?.createdDate)}
                                                </FlexItem>
                                                <FlexItem flex={1}>{item?.content}</FlexItem>
                                            </FlexRow>
                                        </button>
                                    ))}
                                </>
                            )}
                        </div>
                    </FlexContainer>
                </div>
                <FlexBox justify="center" className="pb-[40px]">
                    {pageButtons()}
                </FlexBox>
            </>
        );
    }

    //게시글쪽 뷰
    return (
        <>
            {/* className="hidden md:block" */}
            <div>
                <FlexContainer className="font-13">
                    {/*web용 테이블*/}
                    <div className="hidden md:contents">
                        <FlexRow className="border-b gap-[16px]">
                            <FlexItem flex={2}> {type === "search" ? "게시판" : "시각"}</FlexItem>
                            <FlexItem flex={4}>제목</FlexItem>
                            <FlexItem flex={2}>작성자</FlexItem>
                            {type !== "myPage" && (
                                <>
                                    <FlexItem>댓글</FlexItem>
                                    <FlexItem>추천수</FlexItem>
                                    <FlexItem>조회수</FlexItem>
                                </>
                            )}
                        </FlexRow>
                        {dataArr && (
                            <>
                                {dataArr?.map((item, index) => (
                                    <button
                                        style={{ textAlign: "left" }}
                                        key={index}
                                        onClick={() => {
                                            navigate(`/posts/${item?.postId}`, {
                                                state: {
                                                    postId: item?.postId,
                                                },
                                            });
                                        }}
                                    >
                                        <FlexRow className="border-b gap-[16px]">
                                            <FlexItem flex={2}>
                                                {type === "search"
                                                    ? (item?.regionType || "자취") +
                                                      " · " +
                                                      (item?.regionPostType ||
                                                          item?.independentPostType)
                                                    : formattedDate(item?.createdDate)}
                                            </FlexItem>
                                            <FlexItem flex={4}>{item?.title}</FlexItem>
                                            <FlexItem flex={2}>
                                                {item?.nickName || item?.nickname}
                                            </FlexItem>
                                            {type !== "myPage" && (
                                                <>
                                                    <FlexItem>
                                                        <FlexBox>
                                                            {tableIcon(BiSolidCommentDetail)}
                                                            {item?.commentCount}
                                                        </FlexBox>
                                                    </FlexItem>
                                                    <FlexItem>
                                                        <FlexBox>
                                                            {tableIcon(BiSolidLike)}
                                                            {item?.recommendCount}
                                                        </FlexBox>
                                                    </FlexItem>
                                                    <FlexItem>
                                                        <FlexBox>
                                                            {tableIcon(FaEye)}
                                                            {item?.views}
                                                        </FlexBox>
                                                    </FlexItem>
                                                </>
                                            )}
                                        </FlexRow>
                                    </button>
                                ))}
                            </>
                        )}
                    </div>
                    {/*mobile용 테이블*/}
                    <div className="contents md:hidden">
                        <FlexRow className="border-b gap-4">
                            <FlexItem flex={4}>제목</FlexItem>
                            <FlexItem flex={1}>작성자</FlexItem>
                        </FlexRow>
                        {dataArr && (
                            <>
                                {dataArr?.map((item, index) => (
                                    <button style={{ textAlign: "left" }} key={index}>
                                        <FlexRow className="border-b gap-4">
                                            <FlexItem flex={4}>{item?.title}</FlexItem>
                                            <FlexItem flex={1}>{item?.nickname}</FlexItem>
                                        </FlexRow>
                                    </button>
                                ))}
                            </>
                        )}
                    </div>
                </FlexContainer>
            </div>
            <FlexBox justify={"space-between"} className="font-14 py-[20px]">
                {type !== "search" && type !== "myPage" && (
                    <>
                        <FlexBox className="table-search">
                            <input
                                placeholder="검색어를 입력하세요."
                                value={searchText}
                                onKeyUp={(e) => {
                                    if (e.key === "Enter") {
                                        setSearchButton(true);
                                    }
                                }}
                                onChange={(e) => {
                                    setSearchText(e.target.value);
                                }}
                            />
                            <Icon
                                icon={IoIosSearch}
                                size={18}
                                color={"#727272"}
                                onClick={() => {
                                    setSearchButton(true);
                                }}
                            />
                        </FlexBox>
                        {login && (
                            <Button
                                type="green"
                                onClick={() => {
                                    navigate("/write", {
                                        state: {
                                            mainRoute: mainRoute,
                                            subRoute: subRoute,
                                            boardTitle: title,
                                        },
                                    });
                                }}
                                text={"글쓰기"}
                            ></Button>
                        )}
                    </>
                )}
            </FlexBox>
            <FlexBox justify="center" className="pb-[40px]">
                {pageButtons()}
            </FlexBox>
        </>
    );
};

export default Table;
