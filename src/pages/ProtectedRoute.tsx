import {PropsWithChildren, useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Navigate, useNavigate} from 'react-router';
import UserStore from "../store/UserStore.ts";
import LoadingPage from "./LoadingPage.tsx";

const ProtectedRoute = observer(function ({children}: PropsWithChildren) {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    void UserStore.loadUserData()
    UserStore.renew()
      .catch(() => navigate('/login'))
      .finally(() => setLoading(false));
  }, []);

  const isAuth = UserStore.isAuth;

  if (loading) {
    return <LoadingPage/>;
  }

  if (!isAuth) {
    return <Navigate to={'/login'}/>;
  }

  return <>{children}</>;
})

export default ProtectedRoute;
