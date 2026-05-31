
import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

export default function AdminPrivateRoute() {
    const { currentUser } = useSelector((state) => state.user)
    return currentUser && currentUser.isAdmin ? <Outlet></Outlet> : <Navigate to={'/sign-in'}></Navigate>
}
