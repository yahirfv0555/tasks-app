"use client";

import Notes from "@/components/notes";
import PrivatePage from "@/routing/private-page";

const TasksPage: React.FC = () => {
    return (
        <PrivatePage>
            <Notes/>
        </PrivatePage>
    )
}

export default TasksPage;