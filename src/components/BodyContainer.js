import React from "react";

const BodyContainer = ({ children, className }) => {
    const customClassName = `px-[4vw] md:px-[15vw] ${className}`;

    return <div className={customClassName}>{children}</div>;
};

export default BodyContainer;
