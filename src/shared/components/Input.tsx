import { useEffect, useState } from "react";

export interface InputProps {
    type?: string;
    className?: string;
    containerClassName?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setValue?: (value: any) => void;
    label?: string;
    placeholder?: string;
}

const Input: React.FC<InputProps> = props => {
    const { type, className, containerClassName, onChange, setValue, label, placeholder } = props;

    const [_value, _setValue] = useState<string>('');

   const _onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        _setValue(value);

        if (onChange !== undefined) onChange(event);
        if (setValue === undefined) return;

        if (type === 'date') {
            const [year, month, day] = value.split("-").map(Number);
            const date = new Date(year, month - 1, day);
            setValue(date);
        } else {
            setValue(value);
        }
   }

    return (
        <div className={`flex flex-col ${containerClassName}`}>
            {label !== undefined &&
                <label>
                    {label}
                </label>
            }
          
            <input
                type={type}                
                onChange={_onChange}
                value={_value}
                className={`py-[0.3rem] px-[0.6rem] border-b-2 border-black bg-[var(--secondary)] rounded-t-md ${className}`}
                placeholder={placeholder}
            />
            
        </div>
    )
}

export default Input;