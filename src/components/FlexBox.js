import React from "react";

const FlexBox = ({ align, justify, children, className }) => {
    const customClassName = `${className}`;
    const containerStyle = {
        display: "flex",
        alignItems: `${align}`,
        justifyContent: `${justify}`,
    };

    return (
        <div className={customClassName} style={containerStyle}>
            {children}
        </div>
    );
};

FlexBox.defaultProps = {
    align: "center",
    justify: "start",
};
FlexBox.displayName = "FlexBox";

export default FlexBox;
