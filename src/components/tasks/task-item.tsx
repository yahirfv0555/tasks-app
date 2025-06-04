import { TaskDto } from "@/models/task";
import IconButton from "@/shared/components/icon-button";
import dayjs from "dayjs";
import { useState } from "react";
import { IoArchive, IoCopy, IoPencil, IoRemove, IoTrash } from "react-icons/io5";
import SlideDown from "react-slidedown";
import 'react-slidedown/lib/slidedown.css';

export interface TaskItemProps extends TaskDto {
    openUpdateDialog: (task: TaskDto) => void;
    openDuplicateDialog: (task: TaskDto) => void;
}

const TaskItem: React.FC<TaskItemProps> = props => {
    const { openUpdateDialog, openDuplicateDialog, title, description, date } = props;

    const [showingMore, setShowingMore] = useState<boolean>(false);
    const [showingToolBar, setShowingToolBar] = useState<boolean>(false);

    const toggleShowingMore = () => setShowingMore(prevValue => !prevValue);
    const toggleShowingToolBar = () => setShowingToolBar(prevValue => !prevValue);

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
    }
    
    const _openDeleteDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); 
    }

    return (
        <div 
            className={`
                flex flex-col mb-4 px-6 rounded-md cursor-pointer text-white
                ${showingMore === false ? 'bg-blue-400 hover:bg-blue-200' : 'bg-blue-300 hover:bg-blue-100'} 
                transition-all duration-300 ease-in-out transition-colors
                shadow-sm hover:shadow-md
            `} 
            onClick={toggleShowingMore}
        >
            <div className="flex flex-row justify-between transition-all duration-300 ease-in-out overflow-x-hidden">
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
                        w-[40%] flex flex-row justify-between
                        transform transition-all duration-500 ease-in-out
                        ${showingMore === true || showingToolBar == true ? 'translate-x-0' : 'translate-x-[50%]'}
                        ${showingMore ? 'my-3' : 'my-1'}
                    `}
                    onMouseEnter={toggleShowingToolBar}
                    onMouseLeave={toggleShowingToolBar}
                >
                    <div 
                        className={`
                            w-[50%] text-center flex flex-col justify-center items-center 
                            ${showingMore === true || showingToolBar == true ? 'rounded-l-md bg-orange-300' : 'rounded-md bg-orange-300'}
                        `}
                    >
                        {dayjs(date).format('DD/MM/YYYY')}
                    </div>
                    <div className={`
                            w-[50%] text-center flex flex-row space-x-2 justify-center items-center bg-orange-300 rounded-r-md
                            transition-all duration-300 ease-in-out
                            ${showingMore === true || showingToolBar === true ? 'opacity-100' : 'opacity-0'}
                        `}
                    >
                        <IconButton
                            className="bg-blue-400"
                            icon={<IoPencil size={15} color="black"/>}
                            title="Editar"
                            onClick={_openUpdateDialog}
                        />
                        <IconButton
                            className="bg-green-400"
                            icon={<IoCopy size={15} color="black"/>}
                            title="Duplicar"
                            onClick={_openDuplicateDialog}
                        />
                        <IconButton
                            className="bg-yellow-200"
                            icon={<IoArchive size={15} color="black"/>}
                            title="Archivar"
                            onClick={_openArchiveDialog}
                        />
                        <IconButton
                            className="bg-red-400"
                            icon={<IoTrash size={15} color="black"/>}
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