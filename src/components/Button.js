import React from "react";

const Button = ({ type, onClick, text, className, info }) => {
    const buttonClassName = `border-2 px-[6px] py-[3px] sm:px-[12px] sm:py-[6px] rounded-lg transition-opacity hover:opacity-80 ${className}`;
    const normalButtonClassName = "text-[#808080]";
    const greenButtonClassName = "bg-[#5e913b] border-[#5e913b] text-white";
    const boardButton = "text-[#808080] border-[1px] font-14";
    const infoButtonClassName = `border px-[9px] py-[2px] rounded-lg transition-opacity hover:opacity-80 ${className} font-13 bg-[#F4F5F8] text-[#7B8994]`;

    if (info === true) {
        return (
            <button className={`${infoButtonClassName} ${""}`} onClick={onClick}>
                {text}
            </button>
        );
    }

    return (
        <button
            className={`${buttonClassName} ${
                type === "normal"
                    ? normalButtonClassName
                    : type === "green"
                    ? greenButtonClassName
                    : boardButton
            }`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default Button;
