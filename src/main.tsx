import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AuthBaseContainer from "./pages/AuthBaseContainer.tsx";
import LoginPage from "./pages/auth/LoginPage.tsx";
import {Navigate} from "react-router";
import ProtectedRoute from "./pages/ProtectedRoute.tsx";
import AccountBaseContainer from "./pages/AccountBaseContainer.tsx";
import RegisterPage from "./pages/auth/RegisterPage.tsx";
import EmailConfirm from "./pages/auth/EmailConfirm.tsx";
import ProfilePage from "./pages/account/ProfilePage.tsx";
import SettingsPage from "./pages/account/SettingsPage.tsx";
import {observer} from "mobx-react";
import {useEffect} from "react";
import ConfigStore from "./store/configStore.ts";
import {ConfigProvider, theme} from "antd";
import MainPage from "./pages/account/MainPage.tsx";

export const router = createBrowserRouter([
    {
      path: '/login',
      element: <AuthBaseContainer/>,
      children: [
        {
          path: '',
          element: <LoginPage/>,
        },
      ]
    },
    {
      path: '/registration',
      element: <AuthBaseContainer/>,
      children: [
        {
          path: '',
          element: <RegisterPage/>,
        },
        {
          path: 'email-confirm',
          element: <EmailConfirm/>,
        },
      ]
    },
    {
      path: '/account',
      element: (
        <ProtectedRoute>
          <AccountBaseContainer/>
        </ProtectedRoute>
      ),
      children: [
        {
          path: 'profile',
          element: <ProfilePage/>,
        },
        {
          path: 'settings',
          element: <SettingsPage/>,
        },
        {
          path: 'main',
          element: <MainPage/>,
        },
        {
          path: '*',
          element: <Navigate to={'/account/main'}/>,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to={'/account/main'}/>,
    },
  ]
);

const App = observer(() => {
    useEffect(() => {
      ConfigStore.loadTheme();
    }, []);

    return (
      <ConfigProvider
        theme={{algorithm: ConfigStore.theme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm}}>
        <RouterProvider router={router}/>
      </ConfigProvider>
    );
  },
);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <App/>
);
