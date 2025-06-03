import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";
import Loader from "./components/common/Loader";
import { routes } from "./routing/routes";
const MainLayout = lazy(() => import("./components/layout/MainLayout"));

const PublicRoute = lazy(() => import("./routing/PublicRoute"));
const SignInPage = lazy(() => import("./components/pages/SignInPage"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={routes.DASHBOARD}
          element={
            <Suspense fallback={<Loader />}>
              <MainLayout />
            </Suspense>
          }
        ></Route>
        <Route
          element={
            <Suspense fallback={<Loader />}>
              <PublicRoute />
            </Suspense>
          }
        >
          <Route
            path={routes.LANDING}
            element={
              <Suspense fallback={<Loader />}>
                <SignInPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
