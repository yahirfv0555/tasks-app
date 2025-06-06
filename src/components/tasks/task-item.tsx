import { TaskDto } from "@/models/task";
import IconButton from "@/shared/components/icon-button";
import dayjs from "dayjs";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowDropleft, IoIosArrowDropleftCircle } from "react-icons/io";
import { IoArchive, IoCopy, IoDuplicate, IoPencil, IoRemove, IoTrash } from "react-icons/io5";
import SlideDown from "react-slidedown";
import 'react-slidedown/lib/slidedown.css';

export interface TaskItemProps extends TaskDto {
    openUpdateDialog: (task: TaskDto) => void;
    openDuplicateDialog: (task: TaskDto) => void;
    openArchiveDialog: (task: TaskDto) => void;
    openDeleteDialog: (task: TaskDto) => void;
    disabled?: boolean;
    className?: string;
}

const TaskItem: React.FC<TaskItemProps> = props => {
    const { openUpdateDialog, openDuplicateDialog, openArchiveDialog, openDeleteDialog, disabled, title, description, date, className} = props;

    const [showingMore, setShowingMore] = useState<boolean>(false);
    const [showingToolBar, setShowingToolBar] = useState<boolean>(false);

    const toggleShowingMore = () => setShowingMore(prevValue => !prevValue);

    const closeToolBar = () => setShowingToolBar(false);
    const openToolBar = () => setShowingToolBar(true);

    const _openUpdateDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); 
        openUpdateDialog(props);
    }

    const _openDuplicateDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); 
        openDuplicateDialog(props);
    }
    
    const _openArchiveDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); 
        openArchiveDialog(props);
    }
    
    const _openDeleteDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); 
        openDeleteDialog(props);
    }

    return (
        <div 
            className={`
                w-full flex flex-col mb-4 rounded-md cursor-pointer text-white px-6
                ${showingMore === false ? 'bg-blue-400 hover:bg-[var(--secondary)]' : 'bg-blue-300 hover:bg-blue-200'} 
                transition-all duration-300 ease-in-out transition-colors ${className}
                shadow-sm hover:shadow-md
            `} 
            onClick={disabled === true ? undefined : toggleShowingMore}
        >
            <div className="relative flex flex-row justify-between items-center transition-all duration-300 ease-in-out overflow-x-hidden">
                <div className="w-[60%] py-2">
                    <p>
                        {title}
                    </p>
                    <SlideDown>
                        {showingMore === true &&
                            <div className={`
                                flex flex-row justify-between 
                            `}>
                                <div className="w-[80%] text-sm">{description}</div>
                            </div>
                        }
                    </SlideDown>
                </div>
                <div className={`
                        w-[40%] h-[1.9rem] flex flex-row justify-between shadows font-bold
                        transform transition-all duration-500 ease-in-out
                        ${showingMore === true || showingToolBar == true ? 'translate-x-0' : 'translate-x-[50%]'}
                    `}
                    onMouseEnter={disabled === true ? undefined : openToolBar}
                    onMouseLeave={disabled === true ? undefined : closeToolBar}
                >
                    <div 
                        className={`
                            w-[50%] h-[100%] text-center flex flex-row justify-between items-center 
                            ${showingMore === true || showingToolBar == true ? 'bg-orange-300 rounded-l-md ' : 'bg-orange-300 rounded-md '}
                        `}
                    >
                        <div className="flex flex-row justify-end w-[65%]">
                            {dayjs(date).format('DD/MM/YYYY')}
                        </div>
                        {showingToolBar === false && showingMore === false &&
                            <div className="h-[100%] ml-[15%] w-[20%] border-l-1 border-white bg-orange-300 flex flex-row justify-center items-center rounded-r-md">
                                <IoIosArrowBack size={15} color="white"/>
                            </div>
                        }
                    </div>
                    <div className={`
                            w-[50%] text-center flex flex-row space-x-2 justify-center items-center bg-orange-300 rounded-r-md
                            transition-all duration-300 ease-in-out border-l-1 border-white
                            ${showingMore === true || showingToolBar === true ? 'opacity-100' : 'opacity-0'}
                        `}
                    >
                        <IconButton
                            className="bg-blue-400"
                            icon={<IoPencil size={15} color="white"/>}
                            title="Editar"
                            onClick={_openUpdateDialog}
                        />
                        <IconButton
                            className="bg-green-400"
                            icon={<IoDuplicate size={15} color="white"/>}
                            title="Duplicar"
                            onClick={_openDuplicateDialog}
                        />
                        <IconButton
                            className="bg-yellow-200"
                            icon={<IoArchive size={15} color="white"/>}
                            title="Archivar"
                            onClick={_openArchiveDialog}
                        />
                        <IconButton
                            className="bg-red-400"
                            icon={<IoTrash size={15} color="white"/>}
                            title="Eliminar"
                            onClick={_openDeleteDialog}
                        />
                    </div>
                </div>
            </div>
           
        </div>
    );
}

export default TaskItem;