import React from "react";

const Button = ({ type, onClick, text, className }) => {
    const buttonClassName = `border-2 px-[6px] py-[3px] sm:px-[12px] sm:py-[6px] rounded-lg transition-opacity hover:opacity-80 ${className}`;
    const normalButtonClassName = "text-[#808080]";
    const greenButtonClassName = "bg-[#5e913b] border-[#5e913b] text-white";
    const boardButton = "text-[#808080] border-[1px] font-14";

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
