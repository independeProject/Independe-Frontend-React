import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { VscSend } from "react-icons/vsc";
import BodyContainer from "../../components/BodyContainer";
import Icon from "../../components/Icon";

const Chatting = () => {
    return (
        <BodyContainer>
            <div className="flex pl-[12px] gap-4 border rounded-lg mt-[24px]">
                <div className="flex-none w-[25%] border-r pr-4  py-[12px]">
                    <div className="font-16 font-medium">채팅목록</div>
                    <button className="flex gap-4 py-[12px] items-center w-[100%]">
                        <div className="hidden md:contents">
                            <div style={{ border: "1px solid black", borderRadius: "50%" }}>
                                <Icon icon={AiOutlineUser} size={20} />
                            </div>
                        </div>
                        <div className="flex flex-col items-start font-12">
                            <div>닉네임</div>
                            <div>마지막대화</div>
                        </div>
                    </button>
                </div>
                <div className="w-full  py-[12px]">
                    <div
                        className="flex-1 min-h-[400px] md:h-[600px] pr-[13px] font-12"
                        style={{ overflowY: "auto" }}
                    >
                        <div className="flex justify-start mb-[4px] mr-[16px] items-end">
                            <span className="chat-box bg-[#ECF6ED]">상대방메세지</span>
                            <div className="font-8 ml-[4px]">오후 6:15</div>
                        </div>

                        <div className="flex justify-end mb-[4px] ml-[16px] items-end">
                            <div className="font-8 mr-[4px]">오후 6:16</div>
                            <span className="chat-box bg-[#ECF6ED]">내가보낸메세지</span>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="flex-1 p-[4px] border rounded-lg font-12">
                            <input
                                className="w-full"
                                value={"메시지 입력창"}
                                // onKeyUp={(e) => {
                                //     if (e.key === "Enter") {
                                //     }
                                // }}
                                // onChange={(e) => {
                                // }}
                            />
                        </div>
                        <Icon icon={VscSend} size={15} onClick={() => {}} marginRight={12} />
                    </div>
                </div>
            </div>
        </BodyContainer>
    );
};

export default Chatting;
