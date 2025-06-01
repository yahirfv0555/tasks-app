import { ReactNode } from "react";

export interface IconButtonProps {
    className?: string;
    onClick?: () => void;
    onBlur?: () => void;
    icon: ReactNode;
    type?: "submit" | "reset" | "button" | undefined;
}

const IconButton: React.FC<IconButtonProps> = props => {
    const { className, onClick, onBlur, icon, type } = props;

    return (
        <button
            onClick={onClick}
            onBlur={onBlur}
            className={`Icon-Button ${className}`}
            type={type}
        >
            {icon}
        </button>
)
}

export default IconButton;