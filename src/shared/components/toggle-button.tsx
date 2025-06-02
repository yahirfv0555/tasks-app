import { motion } from "framer-motion";
import { CSSProperties, useEffect, useState } from "react";

export interface ToggleButtonOption {
    name: string;
    color: string;
}

export interface ToggleButtonProps {
    options: ToggleButtonOption[];
    setSelectedOption: (value: ToggleButtonOption) => void;
    className: string;
    onClick?: () => void;
    style?: CSSProperties;
}

const ToggleButton: React.FC<ToggleButtonProps> = props => {
    const { options, setSelectedOption, className, style, onClick } = props;

    const [_selectedOption, _setSelectedOption] = useState<ToggleButtonOption>(options[0]);

    useEffect(() => {
        setSelectedOption(_selectedOption);
    }, [_selectedOption]);

    return (
        <div 
            className={`relative flex overflow-hidden cursor-pointer select-none bg-[var(--secondary)] ${className}`}
            style={style}
        >
            <motion.div
                layout
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className={`absolute top-0 bottom-0 w-1/2 z-0
                    ${_selectedOption === options[0] ? 'left-0' : 'left-1/2'}
                `}
                style={{ backgroundColor: _selectedOption.color }}
            />

            {options.map(
                (option: ToggleButtonOption, index: number) => (
                    <div
                        key={index}
                        onClick={option.name === _selectedOption.name ? onClick : () => _setSelectedOption(option)}
                        className={`flex-1 z-10 flex items-center justify-center font-bold ${option.name === _selectedOption.name ? 'text-black' : `text-black`}`}
                    >
                        {option.name}
                    </div>
                )
            )}
       
        </div>
    )
}

export default ToggleButton;