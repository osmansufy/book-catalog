import { IBook } from '@/shared/interface'
import { Box, CircularProgress, Grid } from '@mui/material'
import { useState } from 'react'
import BookCard from '../common/BookCard'
import FilterBooks from './FilterBooks'

const ShowAllBooks = ({ books,

}: {
    books: IBook[]

}) => {

    const [displayedBooks, setDisplayedBooks] = useState<IBook[]>(books)
    const [booksLoading, setBooksLoading] = useState<boolean>()
    if (!displayedBooks) return <div>No books found</div>

    const handleLoading = (loading: boolean) => {
        setBooksLoading(loading)
    }


    const fetchAllBooks = () => {
        setDisplayedBooks(books)
    }


    return (
        <Box my={4}>
            <FilterBooks
                setDisplayedBooks={setDisplayedBooks}
                handleLoading={handleLoading}
                fetchAllBooks={fetchAllBooks}
            />
            <Grid container my={4} spacing={2}>

                {booksLoading ? <CircularProgress /> :
                    displayedBooks?.map((book: IBook) => {
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