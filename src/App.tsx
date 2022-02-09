import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Gdpr from "./pages/Gdpr";
import Terms from "./pages/Terms";
import Users from "./pages/DashboardPage/Users";
import MainMenu from "./components/MainMenu";
import DashHeader from "./components/DashHeader";
import UserContext from "./store/UserContext";
import NotVerified from "./pages/NotVerified";
import { Box } from "@mui/material";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";

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
    <Box sx={{ display: "grid", gridTemplateColumns: "150px 1fr" }}>
      <MainMenu></MainMenu>
      <Box>
        <DashHeader></DashHeader>
        <Box
          sx={{
            flex: "1",
            boxSizing: "border-box",
            height: "calc(100vh - 60px)",
          }}
        >
          <Routes>
            <Route path="/" element={<NotVerified />}></Route>
            <Route path="/users" element={<Users />}></Route>
            <Route path="/terms" element={<Terms />}></Route>
            <Route path="/gdpr" element={<Gdpr />}></Route>
            <Route path="/profile" element={<UserProfilePage />}></Route>
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
