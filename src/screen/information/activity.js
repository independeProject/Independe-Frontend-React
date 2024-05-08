import React, { useState } from "react";
import Table from "../../components/Table";

const Activity = () => {
    const [pageCurrent, setPageCurrent] = useState(1);

    const pageMax = 10;

    return (
        <div>
            <div className="flex flex-col sm:flex-row pb-[12px] md:pb-[24px] gap-[12px] md:gap-14 border-b">
                <div className="font-20 font-semi-bold">{"활동내역 목록"} </div>
            </div>
            <Table
                type="myPage"
                // tableData={favoriteData}
                pageMax={pageMax}
                setPageCurrent={setPageCurrent}
                pageCurrent={pageCurrent}
            ></Table>
        </div>
    );
};

export default Activity;
