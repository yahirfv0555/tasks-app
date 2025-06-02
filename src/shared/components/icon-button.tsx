import { ReactNode } from "react";

export interface IconButtonProps {
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onBlur?: () => void;
    icon: ReactNode;
    title?: string;
    type?: "submit" | "reset" | "button" | undefined;
}

const IconButton: React.FC<IconButtonProps> = props => {
    const { className, onClick, onBlur, icon, title, type } = props;

    return (
        <button
            onClick={onClick}
            onBlur={onBlur}
            className={`Icon-Button ${className}`}
            title={title}
            type={type}
        >
            {icon}
        </button>
)
}

export default IconButton;