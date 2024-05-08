import React from "react";
import { TfiClose } from "react-icons/tfi";
import Button from "./Button";
import Icon from "./Icon";

const Modal = ({
    title,
    value,
    onChange,
    onClose,
    inputFix,
    type,
    description,
    nickNameUniqueChecker,
    noChange,
}) => {
    return (
        <div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-10"
            style={{ zIndex: 100 }}
        >
            <div className="bg-white rounded-lg shadow-sm w-[80%] sm:w-[300px] max-w-[300px]">
                <div className="pt-8 pb-10 px-8">
                    <div className="flex justify-end">
                        <Icon icon={TfiClose} size={18} onClick={onClose} />
                    </div>
                    <h2 className="font-16 font-semibold mb-4">{title}</h2>
                    <div className="flex justify-between">
                        <input
                            type={
                                type === "password"
                                    ? "password"
                                    : type === "email"
                                    ? "email"
                                    : "text"
                            }
                            className="border-[1px] rounded-lg px-[4px] py-[4px] w-full font-14 flex-1"
                            value={value}
                            onChange={onChange}
                        />
                        {type === "nickname" && (
                            <Button
                                onClick={() => {
                                    nickNameUniqueChecker();
                                }}
                                text={"중복 확인"}
                                info={true}
                                className="ml-2"
                            />
                        )}
                    </div>
                    {description !== "" && <div className="pt-2">* {description}</div>}
                </div>

                <div className="flex justify-between font-14">
                    <button
                        onClick={onClose}
                        className="flex-1 bg-[#F4F5F8] text-[#7B8994]  py-[4px] rounded-bl-lg"
                    >
                        취소
                    </button>
                    <button
                        onClick={inputFix}
                        className="flex-1 py-[8px] text-white bg-[#5e913b] rounded-br-lg"
                        disabled={noChange}
                    >
                        수정
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
