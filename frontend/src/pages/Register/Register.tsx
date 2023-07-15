import RegisterForm from '@/components/Register/RegisterForm'
import { Box, Paper } from '@mui/material'

const Register = () => {
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