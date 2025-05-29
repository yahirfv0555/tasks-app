import { TaskDto } from "@/models/task";

export interface NowTaskItemProps extends TaskDto {}

const NowTaskItem: React.FC<NowTaskItemProps> = props => {
    const { title, date } = props;
    
    return (
        <div>
            <p>{title}</p>
            <p>{date.toISOString()}</p>
        </div>
    );
}

export default NowTaskItem;