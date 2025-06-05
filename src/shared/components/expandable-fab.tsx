import React, { useEffect, useState } from "react";
import IconButton, { IconButtonProps } from "./icon-button";
import { IoAdd, IoArrowForward } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";


export interface ExpandableFabProps {
    iconButtons:  React.ReactElement[];
    iconColor?: string;
}

const ExpandableFab: React.FC<ExpandableFabProps> = props => {
    const { iconButtons, iconColor } = props;

    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [showingIconButtons, setShowingIconButtons] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            setShowingIconButtons(isExpanded);
        }, isExpanded === true ? 0 : 500);
    }, [isExpanded]);

    const toggleAreIconButtonsVisible = () => setIsExpanded(prevValue => !prevValue);
    
    return (
        <div className="flex flex-col justify-between h-[max-content] space-y-2 ">
            <div className={`
                flex flex-col justify-between space-y-2 
                transform transition-all duration-500 ease-in-out
                ${isExpanded === true? 'translate-y-0 opacity-100' : 'translate-y-[50%] opacity-0'}
            `}>
                {showingIconButtons == true && 
                    iconButtons.map(
                        (iconButton: React.ReactElement, index: number) => (
                            <div key={index}>
                                {iconButton}
                            </div>
                        )
                    )
                }
            </div>
            <IconButton
                icon={
                    <IoIosArrowDown
                        size={30}
                        color={iconColor ?? 'white'}
                        className={`transform transition-transform duration-300 ${
                            isExpanded === true ? "rotate-0" : "rotate-180"
                        }`}
                    />
                }
                className="bg-blue-400 shadow"
                onClick={toggleAreIconButtonsVisible}
            />
        </div>
    );
}

export default ExpandableFab;