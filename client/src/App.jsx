import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import SignInPage from "./pages/auth/SignInPage.jsx";
import SignUpPage from "./pages/auth/SignUpPage.jsx";
import { ForgotPasswordPage } from "./pages/auth/ForgotPasswordPage.jsx";
import { DashboardPage } from "./pages/dashboard/DashboardPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Route>
  )
);

const App = () => {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<LandingPage />}></Route>
    //     <Route path="/signin" element={<SignInPage />}></Route>
    //     <Route path="/signup" element={<SignupPage />}></Route>
    //     <Route path="/forgot-password" element={<ForgotPasswordPage />}></Route>
    //     <Route
    //       path="/reset-password/:token"
    //       element={<PasswordResetPage />}
    //     ></Route>
    //     <Route path="/dashboard" element={<DashboardPage />}></Route>
    //     <Route path="/text-to-image" element={<TextToImagePage />}></Route>
    //     <Route path="/image-to-image" element={<ImageToImagePage />}></Route>
    //   </Routes>
    // </BrowserRouter>
    <>
      <RouterProvider router={router} />
    </>
  );
};
export default App;
