import React, { useLayoutEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useLocation } from "react-router-dom";
import BodyContainer from "../components/BodyContainer";
import Icon from "../components/Icon";
import Table from "../components/Table";
import { allSearchGet } from "../util/api";

const SearchPage = () => {
    const location = useLocation();
    const [searchData, setSearchData] = useState([]);
    const [pageCurrent, setPageCurrent] = useState(1);

    const pageMax = 10;

    useLayoutEffect(() => {
        const params = {
            keyword: location.state.keyWord,
            pageable: { page: pageCurrent - 1, size: pageMax },
        };

        allSearchGet(params)
            .then((res) => {
                setSearchData(res);
            })
            .catch((error) => {
                console.error("allSeachGet error:", error);
            });
    }, [location.state.keyWord, pageCurrent]);

    return (
        <BodyContainer>
            <div
                className={`flex items-center py-[24px] ${
                    searchData?.data?.length > 0 ? "border-b" : ""
                }`}
            >
                <Icon icon={IoIosSearch} size={24} color={"#5e913b"} marginRight={8} />

                <div className="font-18 md:font-20 color-green-5e font-medium">
                    {location.state.keyWord}의 검색결과
                    {searchData?.data?.length < 1 && "가 없습니다."}
                </div>
            </div>
            {searchData?.data?.length > 0 && (
                <Table
                    type="search"
                    tableData={searchData}
                    pageMax={pageMax}
                    setPageCurrent={setPageCurrent}
                    pageCurrent={pageCurrent}
                ></Table>
            )}
        </BodyContainer>
    );
};

export default SearchPage;
