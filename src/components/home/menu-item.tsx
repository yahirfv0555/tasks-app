import { AppRoute } from "@/models";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface MenuItemProps extends AppRoute { }

const MenuItem: React.FC<MenuItemProps> = props => {
    const { name, route, imagePath, description, color } = props;

    const [showingDescription, setShowingDescription] = useState<boolean>(false);
    const [makeImageContSmall, setMakeImageContSmall] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            setMakeImageContSmall(showingDescription)
        }, 100)
    }, [showingDescription])

    const showDescription = () => setShowingDescription(true);

    const hideDescription = () => setShowingDescription(false);

    return (
        <Link 
            href={route} 
            className={
                `text-white h-[10rem] rounded-md border-2 
                border-${color} bg-${color}
                overflow-hidden transition-all duration-300 ease-in-out
            `}
            onMouseEnter={showDescription}
            onMouseLeave={hideDescription}
        >
            <div className={
                `${makeImageContSmall === true ? 'h-[50%]' : 'h-[80%]'}  
                rounded-md bg-white flex flex-row justify-center items-center
                transition-all duration-300 ease-in-out
            `}>
                <Image
                    src={imagePath}
                    alt={name}
                    width={makeImageContSmall === true ? 50 : 100}
                    height={100}
                    className="transition-all duration-300 ease-in-out"
                />
            </div>
            <div
                className={`
                    text-black flex flex-col justify-center px-2 pt-1
                    transition-all duration-300 ease-in-out
                    overflow-hidden
                `}
            >
                <span className="text-base font-bold">{name}</span>
                <span
                    className={`
                        text-sm transition-all duration-300 ease-in-out
                        ${showingDescription ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
                    `}
                >
                    {description}
                </span>
            </div>

        </Link>
    );
}

export default MenuItem;