import { useCallback, useEffect, useState } from 'react';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import './App.css';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';

import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Forgot from './pages/Authentication/Forgot';

import UserEdit from './components/UserLists/UserEdit';
import UserPlan from './components/UserLists/UserPlan';
import UserSocial from './components/UserLists/UserSocial';
import Products from './pages/Products/Products';
import ProductTable from './components/product_table/ProductTable';
import UserView from './components/UserLists/UserView';
import UserPageEdit from './components/UserLists/UserPageEdit';
import UserEnquiries from './components/UserLists/UserEnquiries';
import UserSEO from './components/UserLists/UserSEO';
import UserBusiness from './components/UserLists/UserBusiness';
import GalleryTable from './components/Gallery_table/GalleryTable';
import GalleryEdit from './components/Gallery_table/GalleryEdit';
import ChangePassword from './pages/ChangePassword';
import Blogs from './pages/Blogs';
import BlogView from './components/BlogsAndServices/BlogView';
import ServiceView from './components/BlogsAndServices/ServiceView';
import BlogEdit from './components/BlogsAndServices/BlogEdit';
import ServiceEdit from './components/BlogsAndServices/ServiceEdit';
import ProductEdit from './components/product_table/ProductEdit';
import NewsPage from './pages/news_page/NewsPage';
import NewsPageTable from './pages/news_page/NewsPageTable';
import Error from './common/Loader/Error';
import isTokenExpired from './utils/isTokenExpired';
import SignInMobile from './pages/Authentication/SignInMobile';


function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const accessToken = localStorage.getItem('accessToken');

  // Mock function to check if the user has an access token
  const checkAccessToken = useCallback(() => {
    if (!accessToken || accessToken === undefined || accessToken === null || isTokenExpired(accessToken)) {
  
      localStorage.clear();
      navigate('/auth/signin');
      return;
    }

    const accessibleRoutes = [
      '/auth/signin',
      '/auth/forgot',
      '/auth/sign_in_with_mobile',
    ];

    // If the route is in the accessible routes list, return early
    if (accessibleRoutes.includes(pathname)) {
      return;
    }
  }, [accessToken, navigate, pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
    checkAccessToken();
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : accessToken ? (
        <Routes>
           
          <Route
            index
            element={
              <>
                <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <ECommerce />
              </>
            }
          />


          <Route
            path="/profile"
            element={
              <>
                <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Profile />
              </>
            }
          />
          <Route
            path="/forms/form-elements"
            element={
              <>
                <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <FormElements />
              </>
            }
          />
 
          <Route
            path="/users"
            element={
              <>
                <PageTitle title="Users | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Tables />
              </>
            }
          />
          <Route path="/users/user/edit/:userId" element={<UserEdit />} />
          <Route
            path="/users/user/plan-subscribe/:userId"
            element={<UserPlan />}
          />
          <Route path="/users/user/seo/:userId" element={<UserSEO />} />
          <Route
            path="/users/user/business-edit/:userId"
            element={<UserBusiness />}
          />
          <Route
            path="/users/user/social-edit/:userId"
            element={<UserSocial />}
          />
          <Route
            path="/users/user/pages-edit/:userId"
            element={<UserPageEdit />}
          />
          <Route path="/users/user/view/:userId" element={<UserView />} />
          <Route
            path="/users/user/contact-us/:userId"
            element={<UserEnquiries />}
          />
          <Route
            path="/products"
            element={
              <>
                <PageTitle title="Products| TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Products />
              </>
            }
          />
          <Route
            path="/products/product_list/:userId"
            element={
              <>
                <PageTitle title="Products| TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <ProductTable />
              </>
            }
          />
          <Route
            path="/products/product_edit/:productId"
            element={
              <>
                <PageTitle title="Products| TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <ProductEdit />
              </>
            }
          />
          <Route
            path="/products/Gallery/:userId"
            element={
              <>
                <PageTitle title="Gallery| TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <GalleryTable />
              </>
            }
          />
          <Route
            path="/blogs"
            element={
              <>
                <PageTitle title="Blogs | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Blogs />
              </>
            }
          />
          <Route path="/blogs/blogView/:userId" element={<BlogView />} />
          <Route path="/blogs/serviceView/:userId" element={<ServiceView />} />

          <Route path="/blogs/blogEdit/:blogId" element={<BlogEdit />} />

          <Route
            path="/blogs/serviceEdit/:serviceId"
            element={<ServiceEdit />}
          />

          <Route
            path="/profile/change-password"
            element={
              <>
                <PageTitle title="Change-Password | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <ChangePassword />
              </>
            }
          />
          <Route
          path="/products/Galleryedit/:productId"
          element={
            <>
              <PageTitle title="Gallery| TailAdmin - Tailwind CSS Admin Dashboard Template" />
               <GalleryEdit />
            </>
          }
        />

          <Route
            path="/user/settings"
            element={
              <>
                <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Settings />
              </>
            }
          />

          <Route
            path="/chart"
            element={
              <>
                <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Chart />
              </>
            }
          />
          <Route
            path="/ui/alerts"
            element={
              <>
                <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Alerts />
              </>
            }
          />
          <Route
            path="/ui/buttons"
            element={
              <>
                <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Buttons />
              </>
            }
          />
          <Route
            path="/page"
            element={
              <>
                <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <NewsPage />
              </>
            }
          />
          <Route
            path="/page_table"
            element={
              <>
                <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <NewsPageTable />
              </>
            }
          />
           <Route path="*" element={<Error/>} />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/auth/signin"
            element={
              <>
                <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <SignIn />
              </>
            }
          />
          <Route
            path="/auth/forgot"
            element={
              <>
                <Forgot />
              </>
            }
          />
          <Route
            path="/auth/sign_in_with_mobile"
            element={
              <>
               <SignInMobile/>
              </>
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
          {/* <Route path="*" element={<Navigate to="/auth/signin" />} /> */}
          <Route path="*" element={<Error/>} />
        </Routes>
      )}
    </div>
  );
}
export default App;
