import { useEffect, useState } from "react";

export interface InputProps {
    type?: string;
    className?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setValue?: (value: any) => void;
    value?: any;
    label?: string;
    placeholder?: string;
}

const Input: React.FC<InputProps> = props => {
    const { type, className, onChange, value, setValue, label, placeholder } = props;

    return (
        <div className="flex flex-col ">
            {label !== undefined &&
                <label>
                    {label}
                </label>
            }
            <input
                type={type}                
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const value = event.target.value;
                    if (onChange !== undefined) onChange(event);
                    if (setValue !== undefined) setValue(value);
                }}
                value={value}
                className={`Input ${className}`}
                placeholder={placeholder}
            />
        </div>
    )
}

export default Input;