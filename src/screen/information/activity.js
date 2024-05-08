import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { recommendCommentGet } from "../../util/api";

const Activity = () => {
    const [pageCurrent, setPageCurrent] = useState(1);
    const pageMax = 10;

    const [recommendData, setRecommendData] = useState(null);
    useEffect(() => {
        recommendCommentGet()
            .then((res) => {
                setRecommendData(res.data);
            })
            .catch((error) => {
                console.error("recommendCommentGet error:", error);
            });
    }, []);

    console.log("^^recommendData", recommendData);

    return (
        <div>
            <div className="flex flex-col sm:flex-row pb-[12px] md:pb-[24px] gap-[12px] md:gap-14 border-b">
                <div className="font-20 font-semi-bold">{"활동내역 목록"} </div>
            </div>
            <Table
                type="comment"
                tableData={recommendData}
                pageMax={pageMax}
                setPageCurrent={setPageCurrent}
                pageCurrent={pageCurrent}
            ></Table>
        </div>
    );
};

export default Activity;
