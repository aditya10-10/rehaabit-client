import "./App.css";
import { ComingSoon } from "./pages/ComingSoon";
import { Thankyou } from "./pages/Thankyou";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ComingSoon />} />
        <Route path="/thank-you" element={<Thankyou />} />
      </Routes>
    </div>
  );
}
