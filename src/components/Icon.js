import React from "react";

const Icon = ({ icon, color, size, marginTop }) => {
    const iconStyle = {
        color: color || "",
        fontSize: size || "1em",
        marginTop: marginTop || "",
    };

    return React.createElement(icon, { style: iconStyle });
};

export default Icon;
