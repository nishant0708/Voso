import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Forgot from './pages/Authentication/Forgot';
import Sign_in_mobile from './pages/Authentication/Sign_in_mobile';

function App() {
  const [loading, setLoading] = useState(true);
  const [hasToken, setHasToken] = useState(false); // Assuming initial state is no token
  const { pathname } = useLocation();

  // Mock function to check if the user has an access token
  const checkAccessToken = () => {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken !== undefined && accessToken !== null;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const hasAccessToken = checkAccessToken();
    setHasToken(hasAccessToken);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              {hasToken ? <ECommerce /> : <Navigate to="/auth/signin" />}
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              {hasToken ? <Calendar /> : <Navigate to="/auth/signin" />}
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              {hasToken ? <Profile /> : <Navigate to="/auth/signin" />}
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              {hasToken ? <FormElements /> : <Navigate to="/auth/signin" />}
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              {hasToken ? <FormLayout /> : <Navigate to="/auth/signin" />}
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              {hasToken ? <Tables /> : <Navigate to="/auth/signin" />}
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              {hasToken ? <Settings /> : <Navigate to="/auth/signin" />}
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              {hasToken ? <Chart /> : <Navigate to="/auth/signin" />}
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              {hasToken ? <Alerts /> : <Navigate to="/auth/signin" />}
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              {hasToken ? <Buttons /> : <Navigate to="/auth/signin" />}
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            hasToken ? <Navigate to="/" /> : (
              
              <>
                <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <SignIn />
              </>
            )
          }
        />
        <Route
          path="/auth/forgot"
          element={
            hasToken ? <Navigate to="/" /> : (
            <>
             <Forgot />
            </>)
          }
        />
        <Route
          path="/auth/sign_in_with_mobile"
          element={
            hasToken ? <Navigate to="/" /> : (
            <>
              <Sign_in_mobile />
            </>
            )
          }
        />
        {/* <Route
          path="/auth/signup"
          element={
            <>
              <SignUp />
            </>
          }
        /> */}
        {!hasToken && <Route path="*" element={<Navigate to="/auth/signin" />} />}
      </Routes>
    </>
  );
}

export default App;
