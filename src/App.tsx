import { Routes, Route } from "react-router-dom";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Gdpr from "./pages/Gdpr";
import Terms from "./pages/Terms";
import MainMenu from "./components/MainMenu";
import DashHeader from "./components/DashHeader";
import NotVerified from "./pages/NotVerified";
import { Box } from "@mui/material";
import Users from "./pages/DashboardPage/Users";
import CurrentUserProfilePage from "./pages/UserProfilePage/CurrentUserProfilePage";
import Subjects from "./pages/DashboardPage/Subjects";
import AssignedSubjects from "./pages/DashboardPage/AssignedSubjects";
import ReviewPdf from "./pages/DashboardPage/ReviewPdf";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import { DocumentsFromScrapper } from "./pages/DashboardPage/DocumentsFromScrapper";
import { AssignedSubjectDocuments } from "./pages/DashboardPage/AssignedSubjectDocuments";

const App: React.FC = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box sx={{ display: "grid", gridTemplateColumns: "150px 1fr" }}>
        <MainMenu />
        <Box>
          <DashHeader />
          <Box
            sx={{
              flex: "1",
              boxSizing: "border-box",
              height: "calc(100vh - 65px)",
            }}
          >
            <Routes>
              <Route path="/" element={<NotVerified />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<UserProfilePage />} />
              <Route path="/subjects" element={<Subjects />} />
              <Route path="/assigned-subjects" element={<AssignedSubjects />} />
              <Route path="/review-pdf/:id" element={<ReviewPdf />} />
              <Route
                path="/documents/:subjectId"
                element={<AssignedSubjectDocuments />}
              />
              <Route
                path="/scrapped-docs/:subjectId"
                element={<DocumentsFromScrapper />}
              />
              <Route path="/terms" element={<Terms />} />
              <Route path="/gdpr" element={<Gdpr />} />
              <Route path="/profile" element={<CurrentUserProfilePage />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default App;
