import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { authSelector } from "../redux/slices/auth"
import { routes } from "./routes"

const PublicRoute = () => {
  const auth = useSelector( authSelector )
  if( auth === null ) {
    return null
  }
  return auth ? <Navigate to={ routes.DASHBOARD } /> : <Outlet />
}
export default PublicRoute
