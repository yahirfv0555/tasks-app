import { useEffect, useState } from "react";

export interface TextAreaProps {
    className?: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    setValue?: (value: any) => void;
    label?: string;
    placeholder?: string;
}

const TextArea: React.FC<TextAreaProps> = props => {
    const { className, onChange, setValue, label, placeholder } = props;

    const [_value, _setValue] = useState<string>('');

    const _onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;

        _setValue(value);

        if (onChange !== undefined) onChange(event);
        if (setValue !== undefined) setValue(value);
    }

    return (
        <div className={`flex flex-col ${className}`}>
            {label !== undefined &&
                <label>
                    {label}
                </label>
            }
            <textarea
                onChange={_onChange}
                value={_value}
                className={`Input`}
                placeholder={placeholder}
            />
            
        </div>
    )
}

export default TextArea;