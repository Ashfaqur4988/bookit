import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Properties from "./pages/Properties";
import { useEffect } from "react";
import { useUserStore } from "./store/useUserStore";
import SinglePost from "./pages/SinglePost";
import Contact from "./pages/Contact";
import About from "./pages/About";
import AddProperty from "./pages/AddProperty";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/Settings";
import { Toaster } from "react-hot-toast";
import UpdatePost from "./pages/UpdatePost";

function App() {
  const { checkAuth, user } = useUserStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route
            path="/single-post/:id"
            element={!user ? <Login /> : <SinglePost />}
          />
          <Route
            path="/add-property"
            element={!user ? <Login /> : <AddProperty />}
          />
          <Route
            path="/profile"
            element={!user ? <Login /> : <ProfilePage />}
          />
          <Route
            path="/update-post"
            element={!user ? <Login /> : <UpdatePost />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/settings"
            element={!user ? <Login /> : <SettingsPage />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
