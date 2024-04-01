import React from "react";

const Icon = ({ icon, color, size, marginTop, marginRight, onClick }) => {
    if (icon === undefined) {
        return;
    }

    const iconStyle = {
        color: color || "",
        fontSize: size || "1em",
        marginTop: marginTop || "",
        marginRight: marginRight || "",
    };

    const pointerClass = onClick ? "pointer" : "";

    return React.createElement(icon, {
        style: iconStyle,
        onClick: onClick,
        className: pointerClass,
    });
};

export default Icon;
