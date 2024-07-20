import "./App.css";
import { Dashboard, MainPage, MyProfile } from "./pages";
import { Route, Routes } from "react-router-dom";
import { SubCategory } from "./components/Dashboard/SubCategory";
import { Category } from "./components/Dashboard/Category";
import { Service } from "./components/Dashboard/Service";

export default function App() {
  return (
    <div className="w-screen min-h-screen">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route path="category" element={<Category />} />
          <Route path="sub-category" element={<SubCategory />} />
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="service/create-service/*" element={<Service />} />
        </Route>
      </Routes>
    </div>
  );
}
