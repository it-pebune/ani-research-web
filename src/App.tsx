import "./App.css";
import { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Gdpr from "./pages/Gdpr";
import Terms from "./pages/Terms";
import Users from "./pages/DashboardPage/Users";
import MainMenu from "./components/MainMenu";
import DashHeader from "./components/DashHeader";
import UserContext from "./store/UserContext";
import NotVerified from "./pages/NotVerified";
import RoleSelector from "./components/RoleSelector";

import { ThemeProvider } from 'styled-components'

interface AppTheme {
  // id
  id: string

  //color appearance
  colorPrimary: string,
  colorSecondary: string,
  colorBackground: string,
  
  //text appearance
  colorTextWithNoBg: string,
  colorTextWithBg: string,
  fontFamily: string,
}

const themeLight: AppTheme = {
  id: 'light',
  colorPrimary: 'blue',
  colorSecondary: 'orange',
  colorBackground: 'white',
  colorTextWithNoBg: 'black',
  colorTextWithBg: 'white',
  fontFamily: 'Poppins'
}

const themeDark: AppTheme = {
  id: 'dark',
  colorPrimary: 'black',
  colorSecondary: 'orange',
  colorBackground: 'black',
  colorTextWithNoBg: 'white',
  colorTextWithBg: 'white',
  fontFamily: 'Poppins'
}

interface Props {}

const App: React.FC<Props> = (props) => {

  const navigate = useNavigate();

  const userCtx = useContext(UserContext);
  const [selectedRole, setSelectedRole] = useState("");

  const [theme, setTheme] = useState<AppTheme>(themeLight);

  const handleThemeToggled = () => {
    if ( theme.id == 'light'){
      setTheme(themeDark);
    }else{
      setTheme(themeLight);
    }
  }

  const handleRoleSelected = (role: string) => {
    console.log(role);
    setSelectedRole(role);
  }

  useEffect(() => {
    if (userCtx.roles.length === 0) {
      navigate("/");
    } else {
      navigate("/users");
    }
  }, [userCtx]);

  return (
    <ThemeProvider theme={theme}>
      <div className="app-wrapper">
        <div className="menu-wrapper">
          <MainMenu></MainMenu>
        </div>
        <div className="content-wrapper">
          <div className="main-header">
            <DashHeader></DashHeader>
            {userCtx.roles.length > 0 ? (
            <div className="role-selector">
              <RoleSelector
                rolesIds={userCtx.roles}
                onRoleSelected={handleRoleSelected}
              ></RoleSelector>
            </div>
          ) : (
            <></>
          )}
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
    </ThemeProvider>
  );
};

export default App;
