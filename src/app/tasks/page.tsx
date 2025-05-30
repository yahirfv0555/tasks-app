"use client";

import Tasks from "@/components/tasks";
import PrivatePage from "@/routing/private-page";

const TasksPage: React.FC = () => {
    return (
        <PrivatePage>
            <Tasks/>
        </PrivatePage>
    )
}

export default TasksPage;