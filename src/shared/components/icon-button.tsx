import { ReactNode, useEffect, useState } from "react";
import { IconType } from "react-icons";

export interface IconButtonProps {
    className?: string;
    onClick?: () => void;
    onBlur?: () => void;
    icon: ReactNode;
}

const IconButton: React.FC<IconButtonProps> = props => {
    const { className, onClick, onBlur, icon } = props;

    return (
        <div>
            <button
                onClick={onClick}
                onBlur={onBlur}
                className={`Icon-Button ${className}`}
            >
                {icon}
            </button>
        </div>
    )
}

export default IconButton;