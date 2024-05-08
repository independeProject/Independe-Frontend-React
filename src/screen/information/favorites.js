import React, { useLayoutEffect, useState } from "react";
import Table from "../../components/Table";
import { favoritePostGet } from "../../util/api";

const Favorites = () => {
    const [favoriteData, setFavoriteData] = useState([]);
    const [pageCurrent, setPageCurrent] = useState(1);

    const pageMax = 10;

    useLayoutEffect(() => {
        favoritePostGet()
            .then((res) => {
                console.log("^^sss", res.data);
                setFavoriteData(res.data);
            })
            .catch((error) => {
                console.error("favoritePostGet error:", error);
            });
    }, []);

    return (
        <div>
            <div className="flex flex-col sm:flex-row pb-[12px] md:pb-[24px] gap-[12px] md:gap-14 border-b">
                <div className="font-20 font-semi-bold">{"즐겨찾기 목록"} </div>
            </div>
            {/* {searchData?.data?.length > 0 && ( */}
            <Table
                type="myPage"
                tableData={favoriteData}
                pageMax={pageMax}
                setPageCurrent={setPageCurrent}
                pageCurrent={pageCurrent}
            ></Table>
            {/* )} */}
        </div>
    );
};

export default Favorites;
