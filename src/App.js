import "./App.css";
import { ComingSoon } from "./pages/ComingSoon";
import MainPage from "./pages/MainPage";
import MyProfile from "./pages/MyProfile";
import { Thankyou } from "./pages/Thankyou";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div className="w-screen min-h-screen">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/thank-you" element={<Thankyou />} />
        <Route path="/dashboard/my-profile" element={<MyProfile />} />
      </Routes>
    </div>
  );
}
