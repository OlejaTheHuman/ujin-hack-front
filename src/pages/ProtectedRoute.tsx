import { PropsWithChildren, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router';
import UserStore from "../store/UserStore.ts";

const ProtectedRoute = observer(function ({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    UserStore.renew().finally(() => setLoading(false));
  }, []);

  // const isAuth = UserStore.isAuth;
  const isAuth = true;

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!isAuth) {
    return <Navigate to={'/login'} />;
  }

  return <>{children}</>;
})

export default ProtectedRoute;
