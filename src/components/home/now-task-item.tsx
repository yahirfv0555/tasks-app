import { TaskDto } from "@/models/task";
import dayjs from "dayjs";
import { useState } from "react";

export interface NowTaskItemProps extends TaskDto {}

const NowTaskItem: React.FC<NowTaskItemProps> = props => {
    const { title, date, description } = props;
    
    const [borderColor, setBorderColor] = useState<string>('border-white')

    const onMouseEnter = () => {
        setBorderColor('border-blue-400');
    }

    const onMouseLeave = () => {
        setBorderColor('border-white');
    }

    return (
        <div 
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={`w-[15rem] h-[8rem] bg-[var(--secondary)] text-black border-white border-2 flex flex-col justify-between cursor-pointer rounded-md mx-2 py-2 hover:transform hover:scale-97 hover:border-blue-400`}
        >
            <div className="px-2">
                <p className="text-base font-bold">{title}</p>
                <p className="text-sm text-black">{(description.length > 10 ? description.slice(0, 10)+'...' : description)}</p>
            </div>
            <div className="w-full">
                <div className={`border-t-2 w-[100%] mx-auto ${borderColor}`}/>
                <span className="px-2 text-sm">{dayjs(date).format('DD/MM/YYYY')}</span>
            </div>
        </div>
    );
}

export default NowTaskItem;