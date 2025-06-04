import { useEffect, useState } from "react";
import ErrorMessage, { ErrorMessageProps } from "./error-message";

export interface TextAreaProps {
    className?: string;
    containerClassName?: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
    setValue?: (value: any) => void;
    label?: string;
    placeholder?: string;
    initialValue?: string;
    validateData?: (value: any) => ErrorMessageProps;
    startValidation?: boolean;
}

const TextArea: React.FC<TextAreaProps> = props => {
    const { className, containerClassName, onChange, onBlur, setValue, label, placeholder, initialValue, validateData, startValidation } = props;

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

    const _onChange = (event?: React.ChangeEvent<HTMLTextAreaElement>, directValue?: string) => {
        if (event === undefined && directValue === undefined) return;

        const value = (event !== undefined ? event.target.value : directValue) ?? '';

        _setValue(value);

        if (onChange !== undefined && event !== undefined) onChange(event);
        if (setValue !== undefined) setValue(value);
    }

    const _onBlur = (event?: React.FocusEvent<HTMLTextAreaElement>, directValue?: string) => {
        if (event === undefined && directValue === undefined) return;

        const value = (event !== undefined ? event.target.value : directValue) ?? '';

        if (onBlur !== undefined && event !== undefined) onBlur(event);
        if (validateData !== undefined) setErrorMessage({ ...validateData(value) });
    }

    return (
        <div className={`flex flex-col ${containerClassName}`}>
            {label !== undefined &&
                <label className="text-sm">
                    {label}
                </label>
            }

            <textarea
                className={`
                    pt-[0.3rem] px-[0.6rem] border-b-1 border-black bg-[var(--secondary)] rounded-t-md 
                    ${className}
                    ${errorMessage.showing === true ? 'bg-red-100' : ''}
                `}
                onChange={_onChange}
                onBlur={_onBlur}
                value={_value}
                placeholder={placeholder}
            />
            
            <ErrorMessage {...errorMessage} />

        </div>
    )
}

export default TextArea;