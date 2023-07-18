import { IBook } from '@/shared/interface'
import { Box, Grid } from '@mui/material'
import BookCard from '../common/BookCard'


const ShowAllBooks = ({ books }: {
    books: IBook[]
}) => {
    if (!books) return <div>No books found</div>
    return (
        <Box my={4}>
            Show All Books
            <Grid container spacing={2}>
                {
                    books?.map((book: IBook) => {
                        return (
                            <Grid item xs={12} md={6} key={book._id}>
                                <BookCard book={book} />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Box>
    )
}

export default ShowAllBooks