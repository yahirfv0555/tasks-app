import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoArrowDown } from "react-icons/io5";


export interface SelectProps {
    className?: string;
    containerClassName?: string;
    options: any[];
    labelField: string;
    valueField: string;
    isMultiple?: boolean;
    label?: string;
    setValue: (value: any) => void;
}

const Select: React.FC<SelectProps> = props => {
    const { options, labelField, valueField, isMultiple, setValue, className, label, containerClassName } = props;

    const [_value, _setValue] = useState<string>();

    const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value: string = event.target.value;

        _setValue(value)

        if (setValue !== undefined) setValue(value);
    };

    return (
        <div className={` 
            relative flex flex-col
            ${containerClassName}
        `}>
            {label !== undefined &&
                <label className={`text-sm`}>
                    {label}
                </label>
            }
            <select 
                className={`
                    Select
                    w-full py-[0.4rem] px-[0.6rem] border-b-1 border-black bg-[var(--secondary)] rounded-t-md
                    ${className}
                    appearance-none leading-tight
                `}
                onChange={onChange} 
                value={_value}
            >
                <option value={undefined}>Selecciona</option>
                {options.map((option: any, index: number) => (
                    <option key={index} value={option[valueField]}>
                        {option[labelField]}
                    </option>
                ))}
            </select>

            <IoIosArrowDown
                size={12}
                className="absolute right-2 top-[60%]"
            />

        </div>
    );
}

export default Select;