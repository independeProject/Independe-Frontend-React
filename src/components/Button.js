import React from "react";

const Button = ({ type, onClick, text }) => {
    return type === "normal" ? (
        <button className="border-2 px-[12px] py-[8px] rounded-lg text-[#808080]" onClick={onClick}>
            {text}
        </button>
    ) : (
        <button
            className="bg-[#5e913b] border-2 border-[#5e913b] px-[12px] py-[8px] rounded-lg text-white"
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default Button;
