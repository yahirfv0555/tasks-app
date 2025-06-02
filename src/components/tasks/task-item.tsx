import { TaskDto } from "@/models/task";
import IconButton from "@/shared/components/icon-button";
import dayjs from "dayjs";
import { useState } from "react";
import { IoArchive, IoCopy, IoPencil, IoRemove, IoTrash } from "react-icons/io5";
import SlideDown from "react-slidedown";
import 'react-slidedown/lib/slidedown.css';

export interface TaskItemProps extends TaskDto {
    index: number;
}

const TaskItem: React.FC<TaskItemProps> = props => {
    const { index, title, description, date } = props;

    const [showingMore, setShowingMore] = useState<boolean>(false);

    const toggleShowingMore = () => setShowingMore(prevValue => !prevValue);

    const openEditDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); 
    }

    const openDuplicateDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); 
    }
    
    const openArchiveDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); 
    }
    
    const openDeleteDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); 
    }

    return (
        <div 
            className={`flex flex-col bg-blue-100 mb-2 px-2 rounded-md cursor-pointer`} 
            onClick={toggleShowingMore}
        >
            <div className="flex flex-row justify-between">
                <div 
                    className="font-bold w-[80%] py-2"
                >
                    {title}
                </div>
                <div 
                    className="w-[20%] border-l-2 border-white text-center flex flex-col justify-center items-center"
                >
                    {dayjs(date).format('DD/MM/YYYY')}
                </div>
            </div>
            
            <SlideDown>
                 {showingMore === true &&
                    <div className={`
                        flex flex-row justify-between 
                    `}>
                        <div className="w-[80%] text-sm">{description}</div>
                        <div className="w-[20%] border-l-2 border-white flex flex-row justify-between px-2 py-1">
                            <IconButton
                                className="bg-blue-400"
                                icon={<IoPencil size={15} color="black"/>}
                                title="Editar"
                                onClick={openEditDialog}
                            />
                            <IconButton
                                className="bg-green-400"
                                icon={<IoCopy size={15} color="black"/>}
                                title="Duplicar"
                                onClick={openDuplicateDialog}
                            />
                            <IconButton
                                className="bg-yellow-200"
                                icon={<IoArchive size={15} color="black"/>}
                                title="Archivar"
                                onClick={openArchiveDialog}
                            />
                            <IconButton
                                className="bg-red-400"
                                icon={<IoTrash size={15} color="black"/>}
                                title="Eliminar"
                                onClick={openDeleteDialog}
                            />
                        </div>
                    </div>
                }
            </SlideDown>
           
        </div>
    );
}

export default TaskItem;