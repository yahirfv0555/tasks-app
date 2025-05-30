import { useEffect, useState } from "react";

export interface TextAreaProps {
    className?: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    setValue?: (value: any) => void;
    value?: any;
    label?: string;
    placeholder?: string;
}

const TextArea: React.FC<TextAreaProps> = props => {
    const { className, onChange, value, setValue, label, placeholder } = props;

    return (
        <div className={`flex flex-col ${className}`}>
            {label !== undefined &&
                <label>
                    {label}
                </label>
            }
            <textarea
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                    const value = event.target.value;
                    if (onChange !== undefined) onChange(event);
                    if (setValue !== undefined) setValue(value);
                }}
                value={value}
                className={`Input`}
                placeholder={placeholder}
            />
            
        </div>
    )
}

export default TextArea;