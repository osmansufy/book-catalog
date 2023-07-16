import NewBookForm from '@/components/NewBook/NewBookForm'
import { Paper, Typography } from '@mui/material'

const NewBook = () => {
    return (
        <Paper elevation={3}
            sx={{
                padding: 2,
                width: "70%",
                margin: "auto",
            }}
        >
            <Typography variant="h4">New Book</Typography>

            <NewBookForm />
        </Paper>
    )
}

export default NewBook