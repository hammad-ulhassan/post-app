import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";
import Loader from "./components/common/Loader";
import { routes } from "./routing/routes";

const PublicRoute = lazy(() => import("./routing/PublicRoute"));
const LandingPage = lazy(() => import("./components/pages/LandingPage"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
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
                <LandingPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
