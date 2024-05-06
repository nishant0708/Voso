import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate, Outlet } from 'react-router-dom';
import './App.css';
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
import UserEdit from './components/UserLists/UserEdit';
import UserPlan from './components/UserLists/UserPlan';
import UserSocial from './components/UserLists/UserSocial';
import Products from './pages/Products/Products';
import Product_table from './components/product_table/Product_table';
import UserView from './components/UserLists/UserView';
import UserPageEdit from './components/UserLists/UserPageEdit';
import UserEnquiries from './components/UserLists/UserEnquiries';
import UserSEO from './components/UserLists/UserSEO';
import UserBusiness from './components/UserLists/UserBusiness';
import Gallery_table from './components/Gallery_table/Gallery_table';
import ChangePassword from './pages/ChangePassword';
import Blogs from './pages/Blogs';
import BlogView from './components/BlogsAndServices/BlogView';
import ServiceView from './components/BlogsAndServices/ServiceView';
import BlogEdit from './components/BlogsAndServices/BlogEdit';
import ServiceEdit from './components/BlogsAndServices/ServiceEdit';
import Gallery_edit from './components/Gallery_table/Gallery_edit';
import Product_Edit from './components/product_table/Product_Edit';
import News_page from './pages/news_page/News_page';
import News_page_table from './pages/news_page/News_page_table';

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
        {/* <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              {hasToken ? <FormLayout /> : <Navigate to="/auth/signin" />}
            </>
          }
        /> */}
        <Route
          path="/users"
          element={
            <>
              <PageTitle title="Users | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              {hasToken ? <Tables /> : <Navigate to="/auth/signin" />}
            </>
          }
        />
        <Route
          path="/users/user/edit/:userId"
          element={hasToken ? <UserEdit /> : <Navigate to="/auth/signin" />}
        />
        <Route
          path="/users/user/plan-subscribe/:userId"
          element={hasToken ? <UserPlan /> : <Navigate to="/auth/signin" />}
        />
        <Route
          path="/users/user/seo/:userId"
          element={hasToken ? <UserSEO /> : <Navigate to="/auth/signin" />}
        />
        <Route
          path="/users/user/business-edit/:userId"
          element={hasToken ? <UserBusiness /> : <Navigate to="/auth/signin" />}
        />
        <Route
          path="/users/user/social-edit/:userId"
          element={hasToken ? <UserSocial /> : <Navigate to="/auth/signin" />}
        />
        <Route
          path="/users/user/pages-edit/:userId"
          element={hasToken ? <UserPageEdit /> : <Navigate to="/auth/signin" />}
        />
        <Route
          path="/users/user/view/:userId"
          element={hasToken ? <UserView /> : <Navigate to="/auth/signin" />}
        />
        <Route
          path="/users/user/contact-us/:userId"
          element={
            hasToken ? <UserEnquiries /> : <Navigate to="/auth/signin" />
          }
        />
        <Route
          path="/products"
          element={
            <>
              <PageTitle title="Products| TailAdmin - Tailwind CSS Admin Dashboard Template" />
              {hasToken ? <Products /> : <Navigate to="/auth/signin" />}
            </>
          }
        />
        <Route
          path="/products/product_list/:userId"
          element={
            <>
              <PageTitle title="Products| TailAdmin - Tailwind CSS Admin Dashboard Template" />
              {hasToken ? <Product_table /> : <Navigate to="/auth/signin" />}
            </>
          }
        />
        <Route
          path="/products/product_edit/:productId"
          element={
            <>
              <PageTitle title="Products| TailAdmin - Tailwind CSS Admin Dashboard Template" />
              {hasToken ? <Product_Edit /> : <Navigate to="/auth/signin" />}
            </>
          }
        />

        <Route
          path="/products/Gallery/:userId"
          element={
            <>
              <PageTitle title="Gallery| TailAdmin - Tailwind CSS Admin Dashboard Template" />
              {hasToken ? <Gallery_table /> : <Navigate to="/auth/signin" />}
            </>
          }
        />
        <Route
          path="/blogs"
          element={
            <>
              <PageTitle title="Blogs | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              {hasToken ? <Blogs /> : <Navigate to="/auth/signin" />}
            </>
          }
        />
        <Route
          path="/blogs/blogView/:userId"
          element={hasToken ? <BlogView /> : <Navigate to="/auth/signin" />}
        />
        <Route
          path="/blogs/serviceView/:userId"
          element={hasToken ? <ServiceView /> : <Navigate to="/auth/signin" />}
        />

        <Route
          path="/blogs/blogEdit/:blogId"
          element={hasToken ? <BlogEdit /> : <Navigate to="/auth/signin" />}
        />

        <Route
          path="/blogs/serviceEdit/:serviceId"
          element={hasToken ? <ServiceEdit /> : <Navigate to="/auth/signin" />}
        />

        <Route
          path="/profile/change-password"
          element={
            <>
              <PageTitle title="Change-Password | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              {hasToken ? <ChangePassword /> : <Navigate to="/auth/signin" />}
            </>
          }
        />
        <Route
          path="/products/Galleryedit/:productId"
          element={
            <>
              <PageTitle title="Gallery| TailAdmin - Tailwind CSS Admin Dashboard Template" />
              {hasToken ? <Gallery_edit /> : <Navigate to="/auth/signin" />}
            </>
          }
        />

        <Route
          path="/user/settings"
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
          path="/page"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              {hasToken ? <News_page /> : <Navigate to="/auth/signin" />}
            </>
          }
        />
            <Route
          path="/page_table"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              {hasToken ? <News_page_table /> : <Navigate to="/auth/signin" />}
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            hasToken ? (
              <Navigate to="/" />
            ) : (
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
            hasToken ? (
              <Navigate to="/" />
            ) : (
              <>
                <Forgot />
              </>
            )
          }
        />
        <Route
          path="/auth/sign_in_with_mobile"
          element={
            hasToken ? (
              <Navigate to="/" />
            ) : (
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
        {!hasToken && (
          <Route path="*" element={<Navigate to="/auth/signin" />} />
        )}
      </Routes>
    </>
  );
}

export default App;
