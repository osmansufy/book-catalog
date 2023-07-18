import { login } from '@/redux/features/user/userSlice';
import { useAppDispatch } from '@/redux/hook';
import { Alert, Box, Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const LoginForm = () => {
    const [error, setError] = useState('' as string)
    const [success, setSuccess] = useState('' as string)


    const {
        handleSubmit,
        control,
        reset
    } = useForm();
    const dispatch = useAppDispatch()

    const onHandleSubmit = async (data: any) => {
        try {
            await dispatch(login({
                email: data.email,
                password: data.password
            }))
            setSuccess('Login successfully')
            setError('')
            reset()
        } catch (err: any) {
            setError(err?.message || 'Something went wrong')
            setSuccess('')

        }


    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {
                error && <Alert severity="error">{error}</Alert>
            }
            {
                success && <Alert severity="success">{success}</Alert>
            }
            <form onSubmit={handleSubmit(onHandleSubmit)}>
                <Stack spacing={2}
                    direction={'column'}
                    p={2}
                >

                    <Controller

                        render={
                            (
                                { field: { onChange, onBlur, value, ref } }
                            ) => (
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    inputRef={ref}
                                    type='email'
                                    placeholder='Email'
                                />

                            )
                        }
                        name="email"
                        control={control}

                    />

                    <Controller

                        render={
                            (
                                { field: { onChange, onBlur, value, ref } }
                            ) => (
                                <TextField
                                    label="Password"
                                    variant="outlined"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    inputRef={ref}
                                    type='password'
                                    placeholder='Password'
                                />

                            )
                        }

                        name="password"
                        control={control}
                    />

                    <Button type='submit'
                        variant='contained'
                    >Submit</Button>

                </Stack>
            </form>
        </Box>
    )
}

export default LoginForm