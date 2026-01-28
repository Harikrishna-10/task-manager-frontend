import { Routes, Route, Outlet } from "react-router-dom";
import { useContext } from "react";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Logout from "./pages/Auth/Logout";
import UserProvider from "./context/userContext";
import PrivateRoute from "./routes/PrivateRoute";
import CreateTask from "./pages/Admin/CreateTask";
import ManageUsers from "./pages/Admin/ManageUsers";
import UserDashboard from "./pages/Users/UserDashboard";
import MyTasks from "./pages/Users/MyTasks";
import Dashboard from "./pages/Admin/Dashboard";
import ManageTasks from "./pages/Admin/ManageTasks";
import ViewTaskDetails from "./pages/Users/ViewTaskDetails";
import { UserContext } from "./context/userContext";
import Toaster from "react-hot-toast";

const App = () => {
  return (
    <UserProvider>
      <div>
        <Routes>
          <Route path="/" element={<div>Hello !</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/logout" element={<Logout />} />

          <Route>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/tasks" element={<ManageTasks />} />
            <Route path="/admin/create-task" element={<CreateTask />} />
            <Route path="/admin/users" element={<ManageUsers />} />
          </Route>
          <Route>
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/tasks" element={<MyTasks />} />
            <Route
              path="/user/task-details/:id"
              element={<ViewTaskDetails />}
            />
          </Route>
        </Routes>
      </div>
      <Toaster toastOptions={{ className: "", style: { fontSize: "13px" } }} />
    </UserProvider>
  );
};

export default App;

const Root = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <Outlet />;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  return user.role === "admin" ? (
    <Navigate to="/admin/dashboard" />
  ) : (
    <Navigate to="/user/dashboard" />
  );
};
