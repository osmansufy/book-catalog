import LoginForm from '@/components/Login/LoginForm'
import { Box, Paper } from '@mui/material'

const Login = () => {
    return (
        <Box
            my={4}
        >
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