import { createUser } from '@/redux/features/user/userSlice';
import { useAppDispatch } from '@/redux/hook';
import { Button, Stack, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm();

    const dispatch = useAppDispatch()

    const onHandleSubmit = (data: any) => {

        dispatch(createUser({
            email: data.email,
            password: data.password
        })
        )

    }

    return (
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
    )
}

export default RegisterForm