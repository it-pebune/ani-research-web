import "./App.css";
import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Gdpr from "./pages/Gdpr";
import Terms from "./pages/Terms";
import Users from "./pages/DashboardPage/Users";
import MainMenu from "./components/MainMenu";
import DashHeader from "./components/DashHeader";
import UserContext from "./store/UserContext";
import NotVerified from "./pages/NotVerified";

interface Props {}

const App: React.FC<Props> = (props) => {
  const navigate = useNavigate();

  const userCtx = useContext(UserContext);


  useEffect(() => {
    if (userCtx.roles.length === 0) {
      navigate("/");
    } else {
      navigate("/users");
    }
  }, [userCtx]);

  return (
    <div className="app-wrapper">
      <div className="menu-wrapper">
        <MainMenu></MainMenu>
      </div>
      <div className="content-wrapper">
        <div className="main-header">
          <DashHeader></DashHeader>
        </div>
        
        <div className="content-container">
          <Routes>
            <Route path="/" element={<NotVerified />}></Route>
            <Route path="/users" element={<Users />}></Route>
            <Route path="/terms" element={<Terms />}></Route>
            <Route path="/gdpr" element={<Gdpr />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
