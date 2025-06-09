"use client";

import Draws from "@/components/draws";
import PrivatePage from "@/routing/private-page";

const TasksPage: React.FC = () => {
    return (
        <PrivatePage>
            <Draws/>
        </PrivatePage>
    )
}

export default TasksPage;