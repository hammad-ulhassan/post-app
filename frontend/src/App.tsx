import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";
import Loader from "./components/common/Loader";
import { routes } from "./routing/routes";
const MainLayout = lazy(() => import("./components/layout/MainLayout"));
const DashboardPage = lazy(() => import("./components/pages/DashboardPage"));
const PublicRoute = lazy(() => import("./routing/PublicRoute"));
const SignInPage = lazy(() => import("./components/pages/SignInPage"));
const PostPage = lazy(() => import("./components/pages/PostPage"));

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
        >
          <Route
            index
            element={
              <Suspense fallback={<Loader />}>
                <DashboardPage />
              </Suspense>
            }
          />
          <Route
            path="post/:id"
            element={
              <Suspense fallback={<Loader />}>
                <PostPage edit={ false }/>
              </Suspense>
            }
          />
        </Route>
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
