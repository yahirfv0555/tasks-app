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
            className={`relative w-[15rem] bg-blue-100 h-[7.5rem] border-blue-100 border-2 flex flex-col justify-center cursor-pointer rounded-md mx-2 hover:transform hover:scale-97`}
        >
            <div className="px-2 bg-blue-100 rounded-t-md text-black h-[70%]">
                <p className="text-base font-bold">{title}</p>
                <p className="text-sm text-black">{(description.length > 10 ? description.slice(0, 10)+'...' : description)}</p>
            </div>
            <div className="w-full h-[30%] bg-black text-white rounded-b-md py-1">
                <span className="px-2 text-sm">{dayjs(date).format('DD/MM/YYYY')}</span>
            </div>
        </div>
    );
}

export default NowTaskItem;