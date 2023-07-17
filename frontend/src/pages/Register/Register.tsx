import RegisterForm from '@/components/Register/RegisterForm'
import { useAppSelector } from '@/redux/hook'
import { Box, Paper } from '@mui/material'
import { useLocation, Navigate } from 'react-router-dom'

const Register = () => {

    const { user, isLoading } = useAppSelector(state => state.user)

    const { pathname } = useLocation()
    if (user.email) {
        return (
            <Navigate to="/books" state={{ from: pathname }} />
        )
    }

    return (
        <Box my={4}>
            <Paper
                elevation={3}
                sx={{
                    width: '60%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    mx: 'auto',
                    p: '1rem',
                }}

            >

                <h1>Register</h1>

                <RegisterForm />

            </Paper>
        </Box>
    )
}

export default Register