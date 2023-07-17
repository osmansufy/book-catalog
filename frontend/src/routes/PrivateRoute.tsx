import { useAppSelector } from "@/redux/hook"
import { Navigate, useLocation } from "react-router-dom"

const PrivateRoute = ({
    children
}:{
    children:React.ReactNode
}) => {
    const { user,isLoading } = useAppSelector(state => state.user)

    const {pathname} = useLocation()

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    if (!user.email) {
        return (
            <Navigate to="/login" state={{ from: pathname }} />
        )
    }


  return children
}

export default PrivateRoute