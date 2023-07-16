import React from 'react';
import { Card, CardContent, Typography, Box, Button, Paper } from '@mui/material';
import { IBook } from '@/shared/interface';
import { Link } from 'react-router-dom';
import { useDeleteBookMutation } from '@/redux/features/books/bookApi';
import WithIdToken from '@/HOC/withIdToken';

interface BookDetailsProps {
    book: IBook
    idToken: string
}

const BookDetails: React.FC<BookDetailsProps> = ({ book, idToken }) => {



    const [deleteBook] = useDeleteBookMutation()
    const handleDelete = async () => {
        await deleteBook({ id: book._id, token: idToken })
    }
    if (!book) {
        return <Typography variant="h5">Book not found</Typography>;
    }
    const { title, author, genre, publicationDate } = book;
    const bookPublicationDate = new Date(publicationDate)
    return (
        <Paper elevation={3} sx={{ padding: 2, margin: 'auto' }}>
            <Typography variant="h5" component="div">
                {title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
                Author: {author.name} {/* Assuming the author object contains the name property */}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Genre: {genre}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Publication Date: {bookPublicationDate.toDateString()}
            </Typography>

            <Box mt={2}>
                <Typography variant="h6">Reviews:</Typography>
                {/* {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <Box key={index} mt={1}>
              <Typography variant="subtitle2" color="text.secondary">
                User: {review.username}
              </Typography>
              <Typography variant="body2">{review.comment}</Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body2">No reviews yet.</Typography>
        )} */}
            </Box>

            <Box mt={2}>
                <Button variant="contained" color="primary"
                    component={Link} to={`/books/${book._id}/edit`}
                >
                    Edit
                </Button>
                <Button variant="contained" color="error"
                    onClick={handleDelete}
                >
                    Delete
                </Button>
                <Button variant="contained" component={Link} to="/books">
                    Back to List
                </Button>
            </Box>
        </Paper>
    );
};

export default WithIdToken(BookDetails);
