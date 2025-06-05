import { useEffect, useState } from "react";

export interface ButtonProps {
    id?: string;
    className?: string;
    onClick?: () => void;
    onBlur?: () => void;
    label?: string;
    type?: "submit" | "reset" | "button" | undefined;
}

const Button: React.FC<ButtonProps> = props => {
    const { id, className, onClick, onBlur, label, type } = props;

    return (
        <button
            id={id}
            onClick={onClick}
            onBlur={onBlur}
            className={`Button ${className}`}
            type={type}
        >
            {label}
        </button>
)
}

export default Button;