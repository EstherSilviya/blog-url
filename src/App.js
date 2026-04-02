import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import ViewPost from "./components/ViewPost";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<CreatePost />} />
        <Route path="/student/:slug" element={<ViewPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;