import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { myPostGet, recommendCommentGet } from "../../util/api";

const Activity = () => {
    const [pageCurrent, setPageCurrent] = useState(1);
    const [subTabCurrent, setSubTabCurrent] = useState(0);
    const [showData, setShowData] = useState("");

    const pageMax = 10;

    const [recommendData, setRecommendData] = useState(null);
    const [myPostData, setMyPostData] = useState(null);
    useEffect(() => {
        myPostGet()
            .then((res) => {
                console.log("^^res", res);
                setMyPostData(res.data);
                //작성한글 초기값
                setShowData(res.data);
            })
            .catch((error) => {
                console.error("myPostGet error:", error);
            });

        recommendCommentGet()
            .then((res) => {
                setRecommendData(res.data);
            })
            .catch((error) => {
                console.error("recommendCommentGet error:", error);
            });
    }, []);

    const subTabData = [
        { title: "작성한 글", link: "ss1" },
        { title: "작성한 댓글", link: "ss2" },
        { title: "추천한 글", link: "ss3" },
        { title: "추천한 댓글", link: "ss4" },
    ];

    useEffect(() => {
        if (subTabCurrent === 0) {
            setShowData(myPostData);
        } else if (subTabCurrent === 2) {
            setShowData(recommendData);
        } else setShowData("");
    }, [subTabCurrent]);
    console.log("^^myPostData", myPostData);
    return (
        <div>
            <div className="flex flex-col sm:flex-row gap-[12px] md:gap-14">
                <div className="font-20 font-semi-bold">{"활동내역 목록"} </div>
            </div>

            <div className="flex py-[16px] font-14 gap-[6px] md:gap-[16px] border-b">
                {subTabData.map((item, index) => (
                    <div key={index}>
                        <button
                            className={`custom-sub-tab px-4 py-2 md:px-6 font-medium ${
                                index === subTabCurrent
                                    ? "bg-[#5e913b] text-white border border-[#5e913b]"
                                    : "custom-tab-hover border border-[#c7c9cd]"
                            }`}
                            style={{ transition: "0.2s" }}
                            onClick={() => {
                                if (subTabCurrent !== index) {
                                    setSubTabCurrent(index, item.link);
                                }
                            }}
                        >
                            {item.title}
                        </button>
                    </div>
                ))}
            </div>
            <div className="font-16 border-b py-4 px-[10px]">
                {subTabData[subTabCurrent].title} 내역
            </div>
            <Table
                type="comment"
                tableData={showData}
                pageMax={pageMax}
                setPageCurrent={setPageCurrent}
                pageCurrent={pageCurrent}
            ></Table>
        </div>
    );
};

export default Activity;
