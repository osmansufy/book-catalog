import BookDetails from '@/components/SIngleBook/BookDetails';
import { useGetBookByIdQuery } from '@/redux/features/books/bookApi';
import { Box, CircularProgress, Container } from '@mui/material';
import { useParams } from 'react-router-dom';

const SingleBook = () => {
    const { id } = useParams<{ id: string }>()

    const { data: book, isLoading } = useGetBookByIdQuery(id, {
        skip: !id
    })

    if (isLoading) return (
        <Container>
            <Box my={4}>
                <CircularProgress />
            </Box>
        </Container>
    )
    console.log({ book })
    return (
        <Box my={4}>

            <BookDetails book={book.data} />

        </Box>
    )
}

export default SingleBook