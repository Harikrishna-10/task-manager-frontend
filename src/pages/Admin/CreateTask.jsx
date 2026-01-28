// import React, { useState, useEffect } from "react";
// import DashboardLayout from "../../components/layouts/DashboardlLayout";
// import { useLocation, useNavigate } from "react-router-dom";
// import { PRIORITY_DATA } from "../../utils/data";
// import SelectDropdown from "../../components/Input/SelectDropdown";
// import SelectUsers from "../../components/Input/SelectUsers";
// import TodoListInput from "../../components/Input/TodoListInput";
// import AddAttachmentsInput from "../../components/Input/AddAttachmentsInput";
// import axiosInstance from "../../utils/axiosInstance";
// import { API_PATHS } from "../../utils/apiPaths";
// import toast from "react-hot-toast";
// import { LuTrash2 } from "react-icons/lu";
// import moment from "moment";
// import DeleteAlert from "../../components/DeleteAlert";
// import Model from "../../components/Model";

// const CreateTask = () => {
//   const location = useLocation();
//   const { taskId } = location.state || {};

//   const navigate = useNavigate();

//   const [taskData, setTaskData] = useState({
//     title: "",
//     description: "",
//     priority: "low",
//     dueDate: null,
//     assignedTo: [],
//     todoChecklist: [],
//     attachments: [],
//   });

//   const [currentTask, setCurrentTask] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
//   const handelValueChanges = (key, value) => {
//     setTaskData((prevData) => ({ ...prevData, [key]: value }));
//   };
//   const clearData = () => {
//     setTaskData({
//       title: "",
//       description: "",
//       priority: "low",
//       dueDate: null,
//       assignedTo: [],
//       todoChecklist: [],
//       attachments: [],
//     });
//   };

//   const createTask = async () => {
//     setLoading(true);
//     try {
//       // FIX 1: Don't map manually! TodoListInput already gives us the correct object structure:
//       // [{ title: "Task 1", completed: false }]
//       const response = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
//         ...taskData,
//         dueDate: new Date(taskData.dueDate).toISOString(),
//         // Send the list directly since it matches Schema
//         todoChecklist: taskData.todoChecklist,
//       });
//       toast.success("Task created successfully");
//       clearData();
//       navigate("/admin/tasks"); // Optional: redirect after create
//     } catch (error) {
//       console.error("Error creating task:", error);
//       toast.error(error?.response?.data?.message || "Error creating task");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateTask = async () => {
//     setLoading(true);
//     try {
//       const todoList = taskData.todoChecklist?.map((item) => {
//         const prevTodoCheckList = currentTask?.todoChecklist || [];
//         const matchedTask = prevTodoCheckList.find((task) => task.text == item);
//         return {
//           text: item,
//           completed: matchedTask ? matchedTask.completed : false,
//         };
//       });
//       const response = await axiosInstance.put(
//         API_PATHS.TASKS.UPDATE_TASK(taskId),
//         {
//           ...taskData,
//           dueDate: new Date(taskData.dueDate).toISOString(),
//           todoChecklist: todoList,
//         },
//       );
//       toast.success("Task updated Successfully");
//     } catch (error) {
//       console.error("Error creating task", error);
//       setLoading(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async () => {
//     setError(null);
//     if (!taskData.title.trim()) {
//       setError("Title is required");
//       return;
//     }
//     if (!taskData.description.trim()) {
//       setError("Description is required");
//       return;
//     }
//     if (!taskData.dueDate) {
//       setError("Due date is required.");
//       return;
//     }
//     if (taskData.assignedTo?.length === 0) {
//       setError("Task not assigned to any member");
//       return;
//     }
//     if (taskData.todoChecklist?.length === 0) {
//       setError("Add atleast one todo task");
//       return;
//     }
//     if (taskId) {
//       updateTask();
//       return;
//     }
//     createTask();
//   };

//   const getTaskDetailsById = async () => {
//     try {
//       const response = await axiosInstance.get(
//         API_PATHS.TASKS.GET_TASK_BY_ID(taskId),
//       );
//       if (response.data) {
//         const taskInfo = response.data;
//         setCurrentTask(taskInfo);
//         setTaskData((prevState) => ({
//           title: taskInfo.title,
//           description: taskInfo.description,
//           priority: taskInfo.priority,
//           dueDate: taskInfo.dueDate
//             ? moment(taskInfo.dueDate).format("YYYY-MM-DD")
//             : null,
//           assignedTo: taskInfo.assignedTo?.map((item) => item?._id) || [],
//           todoChecklist:
//             taskInfo?.todoChecklist?.map((item) => item?.text) || [],
//           attachments: taskInfo?.attachments || [],
//         }));
//       }
//     } catch (error) {
//       console.error("Error fetching users", error);
//     }
//   };

//   const deleteTask = async () => {
//     try {
//       await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId));
//       setOpenDeleteAlert(false);
//       toast.success("Expense details deleted successfully");
//       navigate("/admin/tasks");
//     } catch (error) {
//       console.error(
//         "Error deleting expense:",
//         error.respose?.data?.message || error.message,
//       );
//     }
//   };

//   useEffect(() => {
//     if (taskId) {
//       getTaskDetailsById(taskId);
//     }
//     return () => {};
//   }, [taskId]);

//   return (
//     <DashboardLayout activeMenu={"Create Task"}>
//       <div className="mt-5">
//         <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
//           <div className="form-card col-span-3">
//             <div className="flex items-center justify-between">
//               <h2 className="text-xl md:text-xl font-medium">
//                 {taskId ? "Update Task" : "Create Task"}
//               </h2>
//               {taskId && (
//                 <button
//                   className="flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer"
//                   onClick={() => setOpenDeleteAlert(true)}
//                 >
//                   <LuTrash2 className="text-base" />
//                   Delete
//                 </button>
//               )}
//             </div>
//             <div className="mt-4">
//               <label className="text-xs font-medium text-slate-600">
//                 Task Title
//               </label>
//               <input
//                 placeholder="Create App UI"
//                 className="form-input"
//                 value={taskData.title}
//                 onChange={({ target }) =>
//                   handelValueChanges("title", target.value)
//                 }
//               />
//             </div>
//             <div className="mt-3">
//               <label className="text-xs font-medium text-slate-600">
//                 Description
//               </label>
//               <textarea
//                 placeholder="Description task"
//                 className="form-input"
//                 rows={4}
//                 value={taskData.description}
//                 onChange={({ target }) =>
//                   handelValueChanges("description", target.value)
//                 }
//               />
//             </div>
//             <div className="grid grid-cols-12 gap-4 mt-2">
//               <div className="col-span-6 md:col-span-4">
//                 <label className="text-xs font-medium text-slate-600">
//                   Priority
//                 </label>
//                 <SelectDropdown
//                   options={PRIORITY_DATA}
//                   value={taskData.priority}
//                   onChange={(value) => handelValueChanges("priority", value)}
//                   placeholder="Select Priority"
//                 />
//               </div>
//               <div className="col-span-6 md:col-span-4">
//                 <label className="text-xs font-medium text-slate-600">
//                   Due Date
//                 </label>
//                 <input
//                   type="date"
//                   placeholder="Create App UI"
//                   className="form-input"
//                   value={taskData.dueDate}
//                   onChange={({ target }) =>
//                     handelValueChanges("dueDate", target.value)
//                   }
//                 />
//               </div>
//               <div className="col-span-12 md:col-span-3">
//                 <label className="text-xs font-medium text-slate-600">
//                   Assign To
//                 </label>
//                 <SelectUsers
//                   selectedUsers={taskData.assignedTo}
//                   setSelectedUsers={(value) => {
//                     handelValueChanges("assignedTo", value);
//                   }}
//                 />
//               </div>
//             </div>
//             <div className="mt-3">
//               <label className="text-xs font-medium text-slate-600">
//                 TODO Checklist
//               </label>

//               <TodoListInput
//                 todoList={taskData?.todoChecklist || []}
//                 setTodoList={(value) =>
//                   handelValueChanges("todoChecklist", value)
//                 }
//               />
//             </div>
//             <div className="mt-3">
//               <label className="text-xs font-medium text-slate-600">
//                 Add Attachments
//               </label>
//               <AddAttachmentsInput
//                 attachments={taskData?.attachments}
//                 setAttachments={(value) =>
//                   handelValueChanges("attachments", value)
//                 }
//               />
//             </div>
//             {error && (
//               <p className="text-xs font-medium text-red-500 mt-5">{error}</p>
//             )}
//             <div className="flex justify-end mt-7">
//               <button
//                 className="add-btn"
//                 onClick={handleSubmit}
//                 disabled={loading}
//               >
//                 {taskId ? "UPDATE TASK" : "CREATE TASK"}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Model
//         isOpen={openDeleteAlert}
//         onClose={() => setOpenDeleteAlert(false)}
//         title="Delete Task"
//       >
//         <DeleteAlert
//           content="Are you sure you want to delete this task?"
//           onDelete={() => deleteTask()}
//         />
//       </Model>
//     </DashboardLayout>
//   );
// };

// export default CreateTask;
import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardlLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { PRIORITY_DATA } from "../../utils/data";
import SelectDropdown from "../../components/Input/SelectDropdown";
import SelectUsers from "../../components/Input/SelectUsers";
import TodoListInput from "../../components/Input/TodoListInput";
import AddAttachmentsInput from "../../components/Input/AddAttachmentsInput";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import { LuTrash2 } from "react-icons/lu";
import moment from "moment";
import DeleteAlert from "../../components/DeleteAlert";
import Model from "../../components/Model";

const CreateTask = () => {
  const location = useLocation();
  const { taskId } = location.state || {};

  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "low",
    dueDate: null,
    assignedTo: [],
    todoChecklist: [], // ✅ Correct (Lowercase 'l')
    attachments: [],
  });

  const [currentTask, setCurrentTask] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handelValueChanges = (key, value) => {
    setTaskData((prevData) => ({ ...prevData, [key]: value }));
  };

  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "low",
      dueDate: null,
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    });
  };

  const createTask = async () => {
    setLoading(true);
    try {
      // FIX 1: Don't map manually! TodoListInput already gives us the correct object structure:
      // [{ title: "Task 1", completed: false }]
      const response = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        // Send the list directly since it matches Schema
        todoChecklist: taskData.todoChecklist, 
      });
      toast.success("Task created successfully");
      clearData();
      navigate("/admin/tasks"); // Optional: redirect after create
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error(error?.response?.data?.message || "Error creating task");
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async () => {
    setLoading(true);
    try {
      // FIX 2: Simplified Update Logic
      // TodoListInput manages the list state. We can simply send the updated list.
      // If you need to preserve 'completed' status from the database for existing items,
      // you would need complex logic, but for now, sending the current state is safest.
      const response = await axiosInstance.put(
        API_PATHS.TASKS.UPDATE_TASK(taskId),
        {
          ...taskData,
          dueDate: new Date(taskData.dueDate).toISOString(),
          todoChecklist: taskData.todoChecklist, // Send directly
        }
      );
      toast.success("Task updated Successfully");
      navigate("/admin/tasks"); // Redirect after update
    } catch (error) {
      console.error("Error updating task", error);
      toast.error(error?.response?.data?.message || "Error updating task");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setError(null);
    if (!taskData.title.trim()) {
      setError("Title is required");
      return;
    }
    if (!taskData.description.trim()) {
      setError("Description is required");
      return;
    }
    if (!taskData.dueDate) {
      setError("Due date is required.");
      return;
    }
    if (taskData.assignedTo?.length === 0) {
      setError("Task not assigned to any member");
      return;
    }
    // Optional: Only enforce this if you really require a checklist item
    if (taskData.todoChecklist?.length === 0) {
      setError("Add at least one todo task");
      return;
    }

    if (taskId) {
      updateTask();
      return;
    }
    createTask();
  };

  const getTaskDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(taskId)
      );
      if (response.data) {
        const taskInfo = response.data;
        setCurrentTask(taskInfo);
        setTaskData((prevState) => ({
          ...prevState, // Keep other default states if needed
          title: taskInfo.title,
          description: taskInfo.description,
          priority: taskInfo.priority,
          dueDate: taskInfo.dueDate
            ? moment(taskInfo.dueDate).format("YYYY-MM-DD")
            : null,
          assignedTo: taskInfo.assignedTo?.map((item) => item?._id) || [],
          
          // FIX 3: Load Objects directly, don't map to text!
          // We need the objects so TodoListInput can read 'title'
          todoChecklist: taskInfo?.todoChecklist || [],
          
          attachments: taskInfo?.attachments || [],
        }));
      }
    } catch (error) {
      console.error("Error fetching task details", error);
      toast.error("Failed to load task data");
    }
  };

  const deleteTask = async () => {
    try {
      await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId));
      setOpenDeleteAlert(false);
      toast.success("Task deleted successfully");
      navigate("/admin/tasks");
    } catch (error) {
      console.error(
        "Error deleting task:",
        error.response?.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    if (taskId) {
      getTaskDetailsById();
    }
    return () => {};
  }, [taskId]);

  return (
    <DashboardLayout activeMenu={"Create Task"}>
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-xl font-medium">
                {taskId ? "Update Task" : "Create Task"}
              </h2>
              {taskId && (
                <button
                  className="flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer"
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  <LuTrash2 className="text-base" />
                  Delete
                </button>
              )}
            </div>
            <div className="mt-4">
              <label className="text-xs font-medium text-slate-600">
                Task Title
              </label>
              <input
                placeholder="Create App UI"
                className="form-input"
                value={taskData.title}
                onChange={({ target }) =>
                  handelValueChanges("title", target.value)
                }
              />
            </div>
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Description
              </label>
              <textarea
                placeholder="Description task"
                className="form-input"
                rows={4}
                value={taskData.description}
                onChange={({ target }) =>
                  handelValueChanges("description", target.value)
                }
              />
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Priority
                </label>
                <SelectDropdown
                  options={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(value) => handelValueChanges("priority", value)}
                  placeholder="Select Priority"
                />
              </div>
              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Due Date
                </label>
                <input
                  type="date"
                  placeholder="Create App UI"
                  className="form-input"
                  value={taskData.dueDate || ""}
                  onChange={({ target }) =>
                    handelValueChanges("dueDate", target.value)
                  }
                />
              </div>
              <div className="col-span-12 md:col-span-3">
                <label className="text-xs font-medium text-slate-600">
                  Assign To
                </label>
                <SelectUsers
                  selectedUsers={taskData.assignedTo}
                  setSelectedUsers={(value) => {
                    handelValueChanges("assignedTo", value);
                  }}
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                TODO Checklist
              </label>

              <TodoListInput
                todoList={taskData.todoChecklist} // ✅ Correct Prop
                setTodoList={(value) =>
                  handelValueChanges("todoChecklist", value) // ✅ Correct Key
                }
              />
            </div>
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Add Attachments
              </label>
              <AddAttachmentsInput
                attachments={taskData.attachments}
                setAttachments={(value) =>
                  handelValueChanges("attachments", value)
                }
              />
            </div>
            {error && (
              <p className="text-xs font-medium text-red-500 mt-5">{error}</p>
            )}
            <div className="flex justify-end mt-7">
              <button
                className="add-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {taskId ? "UPDATE TASK" : "CREATE TASK"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Model
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        title="Delete Task"
      >
        <DeleteAlert
          content="Are you sure you want to delete this task?"
          onDelete={() => deleteTask()}
        />
      </Model>
    </DashboardLayout>
  );
};

export default CreateTask;