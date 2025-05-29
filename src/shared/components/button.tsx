import { useEffect, useState } from "react";

export interface ButtonProps {
    className?: string;
    onClick?: () => void;
    onBlur?: () => void;
    label?: string;
}

const Button: React.FC<ButtonProps> = props => {
    const { className, onClick, onBlur, label } = props;

    return (
        <div>
            <button
                onClick={onClick}
                onBlur={onBlur}
                className={`Button ${className}`}
            >
                {label}
            </button>
        </div>
    )
}

export default Button;