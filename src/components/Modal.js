import React from "react";

const Modal = ({ title, value, onChange, onClose, inputFix }) => {
    return (
        <div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-10"
            style={{ zIndex: 100 }}
        >
            <div className="bg-white py-4 px-4 rounded-lg shadow-sm w-80">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{title}</h2>
                </div>
                <input
                    className="border-[1px] rounded px-[4px] py-[2px] w-full"
                    value={value}
                    onChange={onChange}
                />
                <div className="pt-[12px] flex justify-end">
                    <button onClick={onClose} className="mr-4">
                        취소
                    </button>
                    <button onClick={inputFix}>수정하기</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
