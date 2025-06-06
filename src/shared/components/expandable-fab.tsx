import React, { useEffect, useState } from "react";
import IconButton from "./icon-button";
import { IoIosArrowDown } from "react-icons/io";
import { usePathname } from "next/navigation";
import routes from "@/core/config/routes";
import path from "path";

export interface ExpandableFabProps {
    iconButtons: React.ReactElement[];
    iconColor?: string;
}

const ExpandableFab: React.FC<ExpandableFabProps> = props => {
    const { iconButtons, iconColor } = props;

    const pathname = usePathname();

    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [showingIconButtons, setShowingIconButtons] = useState<boolean>(false);
    const [expandibleIconButtonColor, setExpandibleIconButtonColor] = useState<string>('bg-[var(--secondary)]');

    useEffect(() => {
        console.log(pathname)
        if (pathname.includes('notes')) {
            console.log('hola')
            setExpandibleIconButtonColor(`bg-green-400`);
        } else if (pathname.includes('tasks')) {
            setExpandibleIconButtonColor(`bg-blue-400`);
        } else if (pathname.includes('draws')) {
            setExpandibleIconButtonColor(`bg-purple-400`);
        }
        
    }, []);
    
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
                className={`${expandibleIconButtonColor} shadow`}
                onClick={toggleAreIconButtonsVisible}
            />
        </div>
    );
}

export default ExpandableFab;