import { ReactNode } from "react";

export interface IconButtonProps {
    id?: string;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onBlur?: () => void;
    icon: ReactNode;
    title?: string;
    type?: "submit" | "reset" | "button" | undefined;
    disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = props => {
    const { id, className, onClick, onBlur, icon, title, type, disabled } = props;

    return (
        <button
            id={id}
            disabled={disabled}
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