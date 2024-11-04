import { useState } from "react";
import { Header } from "./Header";
import { Tasks } from "./Tasks";
import { AddTask } from "./AddTask";
import { IoCloseSharp, IoInformationCircleOutline } from "react-icons/io5";
import { useTask, useToggleTasks } from "@Store";
import { TaskInfoModal } from "@App/components/TaskTracker/InfoModal";

export const TaskTracker = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const { setIsTasksToggled } = useToggleTasks();
  const { tasks } = useTask();
  const [isTaskInfoModalOpen, setIsTaskInfoModalOpen] = useState(false);

  return (
    <div className="mb-2 w-72">
     
    
    </div>
  );
};
