import LoginForm from '@/components/Login/LoginForm'
import { useAppSelector } from '@/redux/hook'
import { Box, Paper } from '@mui/material'
import { Navigate, useLocation } from 'react-router-dom'

const Login = () => {

    const { user, isLoading } = useAppSelector(state => state.user)

    const { pathname } = useLocation()
    console.log(user.email)
    if (user.email) {
        return (
            <Navigate to="/books" state={pathname} />
        )
    }

    return (
        <Box
            my={4}
        >
            {
                isLoading && <div>Loading...</div>
            }
            <Paper elevation={3}
                sx={{
                    width: '80%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    mx: 'auto',
                }}
            >
                <LoginForm />
            </Paper>
        </Box>
    )
}

export default Login