import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import SignInPage from "./pages/auth/SignInPage.jsx";
import SignUpPage from "./pages/auth/SignUpPage.jsx";
import PasswordResetPage from "./pages/auth/PasswordResetPage.jsx";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage.jsx";
import DashboardPage from "./pages/dashboard/DashboardPage.jsx";
import TextToImagePage from "./pages/dashboard/TextToImagePage.jsx";
import ImageToImagePage from "./pages/dashboard/ImageToImagePage.jsx";
import AuthenticatedRoutes from "./components/AuthenticatedRoutes.jsx";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/reset-password/:token"
          element={<PasswordResetPage />}
        ></Route>
        <Route element={<AuthenticatedRoutes />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/text-to-image" element={<TextToImagePage />}></Route>
          <Route path="/image-to-image" element={<ImageToImagePage />}></Route>
        </Route>
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
