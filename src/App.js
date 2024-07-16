import "./App.css";
import { Dashboard, MainPage, MyProfile } from "./pages";
import { Route, Routes } from "react-router-dom";
import { AddCategory } from "./components/Dashboard";

export default function App() {
  return (
    <div className="w-screen min-h-screen">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route path="add-category" element={<AddCategory />} />
        </Route>
        <Route path="/dashboard/my-profile" element={<MyProfile />} />
      </Routes>
    </div>
  );
}
