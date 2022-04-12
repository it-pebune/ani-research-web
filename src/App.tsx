import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Gdpr from "./pages/Gdpr";
import Terms from "./pages/Terms";
import MainMenu from "./components/MainMenu";
import DashHeader from "./components/DashHeader";
import UserContext from "./store/UserContext";
import NotVerified from "./pages/NotVerified";
import { Box } from "@mui/material";

import Users from "./pages/DashboardPage/Users";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import Subjects from "./pages/DashboardPage/Subjects";
import AssignedSubjects from "./pages/DashboardPage/AssignedSubjects";
import ReviewPdf from "./pages/DashboardPage/ReviewPdf";

interface Props {}

const App: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);

  console.log(userCtx);

  useEffect(() => {
    if (userCtx.roles.length === 0) {
      navigate("/");
    } else if (userCtx.roles.includes(250)) {
      navigate("/users");
    } else if (userCtx.roles.includes(150)) {
      navigate("/subjects");
    }
  }, [userCtx]);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box sx={{ display: "grid", gridTemplateColumns: "150px 1fr" }}>
        <MainMenu></MainMenu>
        <Box>
          <DashHeader></DashHeader>
          <Box
            sx={{
              flex: "1",
              boxSizing: "border-box",
              height: "calc(100vh - 65px)",
            }}
          >
            <Routes>
              <Route path="/" element={<NotVerified />}></Route>
              <Route path="/users" element={<Users />}></Route>
              <Route path="/subjects" element={<Subjects />}></Route>
              <Route
                path="/assigned-subjects"
                element={<AssignedSubjects />}
              ></Route>
              <Route path="/review-pdf/:id" element={<ReviewPdf />}></Route>
              <Route path="/terms" element={<Terms />}></Route>
              <Route path="/gdpr" element={<Gdpr />}></Route>
              <Route path="/profile" element={<UserProfilePage />}></Route>
            </Routes>
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default App;
