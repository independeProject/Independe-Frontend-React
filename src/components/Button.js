import React from "react";

const Button = ({ type, onClick, text, className }) => {
    const buttonClassName = `border-2 px-[12px] py-[8px] rounded-lg ${className}`;
    const normalButtonClassName = "text-[#808080]";
    const greenButtonClassName = "bg-[#5e913b] border-[#5e913b] text-white";

    return (
        <button
            className={`${buttonClassName} ${
                type === "normal" ? normalButtonClassName : greenButtonClassName
            }`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default Button;
