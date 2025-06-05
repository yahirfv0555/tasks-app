import { useState } from "react";

export interface ChecboxProps {
    className?: string;
    containerClassName?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setValue?: (value: boolean) => void;
}

const Checkbox: React.FC<ChecboxProps> = props => {
    const { className, containerClassName, onChange, setValue } = props;

    const [_value, _setValue] = useState<boolean>(false);

    const _onChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const value: boolean = event.target.checked;

        if (onChange !== undefined) onChange(event);
        if (setValue !== undefined) setValue(value);

        _setValue(value);

    }

    return (
        <div className={`w-min h-min flex flex-col jutify-center bg-white ${containerClassName}`}>
            <input
                className={`accent-[var(--secondary)] hover:accent-blue-400 ${className}`}
                checked={_value}
                onChange={_onChange}
                type="checkbox"
            />
        </div>
    );
}

export default Checkbox;