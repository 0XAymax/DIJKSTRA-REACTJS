import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated } = useAuth()

    if (isAuthenticated === false) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>
}

export default AuthGuard
