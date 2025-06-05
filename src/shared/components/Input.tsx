import dayjs from "dayjs";
import { useEffect, useState } from "react";
import ErrorMessage, { ErrorMessageProps } from "./error-message";

export interface InputProps {
    id?: string;
    type?: string;
    className?: string;
    containerClassName?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    setValue?: (value: any) => void;
    initialValue?: any;
    label?: string;
    placeholder?: string;
    validateData?: (value: any) => ErrorMessageProps;
    startValidation?: boolean;
    minDate?: Date;
    maxDate?: Date;
    iconButton?: React.ReactElement;
    isErrorMessageNeeded?: boolean;
    disabled?: boolean;
}

const Input: React.FC<InputProps> = props => {
    const { id, type, className, containerClassName, onChange, onBlur, setValue, label, placeholder, initialValue, validateData, startValidation, minDate, maxDate, iconButton, isErrorMessageNeeded, disabled } = props;

    const [_value, _setValue] = useState<string>('');
    const [firstValidation, setFirstValidation] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<ErrorMessageProps>({ showing: false });
    
    useEffect(() => {
        _onChange(undefined, initialValue);
    }, []);

    useEffect(() => {
        if (firstValidation === false) {
            _onBlur(undefined, _value);
        } else {
            setFirstValidation(false);
        }
    }, [startValidation]);

    const _onChange = (event?: React.ChangeEvent<HTMLInputElement>, directValue?: string) => {
        if (event === undefined && directValue === undefined) return;

        const value: string = (event !== undefined ? event.target.value : directValue) ?? '';
        let typedValue: string | Date = value;

        if (onChange !== undefined && event !== undefined) onChange(event);
        if (setValue === undefined) return;

        if (type === 'date' && value !== '') {
            
            if (directValue !== undefined) {
                _setValue(dayjs(value).format('YYYY-MM-DD'));
            } else {
                _setValue(value);
            }

            const splittedValue = value.toString().split('T');

            if (value.length === 0) {
                typedValue = new Date(value);
            } else {
                const [year, month, day] = splittedValue[0].split("-").map(Number);
                typedValue = new Date(year, month - 1, day);
            }

        } else {
            _setValue(value);
        }

        setValue(typedValue);
    }

    const _onBlur = (event?: React.FocusEvent<HTMLInputElement>, directValue?: string) => {
        if (event === undefined && directValue === undefined) return;

        const value: string = (event !== undefined ? event.target.value : directValue) ?? '';
        let typedValue: string | Date | undefined = value;

        if (type === 'date') {
            if (value === '') {
                typedValue = undefined
            } else {
                const [year, month, day] = value.split('T')[0].split("-").map(Number);
                typedValue = new Date(year, month - 1, day);
            }
        }

        if (onBlur !== undefined && event !== undefined) onBlur(event);
        if (validateData !== undefined) setErrorMessage({ ...validateData(typedValue) });
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (id !== undefined && event.key === 'Enter') {
            event.preventDefault();
            document.getElementById(id)!.click();
        }
    }

    return (
        <div className={`relative flex flex-col ${containerClassName}`}>
            {label !== undefined &&
                <label className={`text-sm`}>
                    {label}
                </label>
            }
          
            <input
                type={type}                
                className={`
                    py-[0.3rem] px-[0.6rem] border-b-1 border-black bg-[var(--secondary)] rounded-t-md
                    ${className}
                    ${errorMessage.showing === true ? 'bg-red-100' : ''}
                `}
                onKeyDown={handleKeyDown}
                onChange={_onChange}
                onBlur={_onBlur}
                value={_value}
                placeholder={placeholder}
                disabled={disabled}
                min={type === 'date' ? minDate !== undefined ? dayjs(minDate).format('YYYY-MM-DD') : undefined : undefined}
                max={type === 'date' ? maxDate !== undefined ? dayjs(maxDate).format('YYYY-MM-DD') : undefined : undefined}
            />

            {iconButton !== undefined &&
                <div className="absolute w-min h-min pt-[10%] right-2 -translate-y-1/2">
                    {iconButton}
                </div>
            }

            { isErrorMessageNeeded === true && <ErrorMessage {...errorMessage} /> }
            
        </div>
    )
}

export default Input;