import WithIdToken from '@/HOC/withIdToken';
import { useDeleteBookMutation } from '@/redux/features/books/bookApi';
import { IBook } from '@/shared/interface';
import { Box, Button, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CommonModal from '../common/CommonModal';

interface BookDetailsProps {
    book: IBook
    idToken: string
}

const BookDetails: React.FC<BookDetailsProps> = ({ book, idToken }) => {


const [modalOpen, setModalOpen] = useState(false)
    const handleModalOpen = () => {
        setModalOpen(true)
    }
    const handleModalClose = () => {
        setModalOpen(false)
    }


    const [deleteBook,{
        isLoading: isDeleting,
        isSuccess: isDeleted,
        isError: isDeleteError,
        error: deleteError
    }] = useDeleteBookMutation()
    const handleDelete = async () => {
        await deleteBook({ id: book._id, token: idToken })
        setModalOpen(false)
    }
    if (!book) {
        return <Typography variant="h5">Book not found</Typography>;
    }
    const { title, author, genre, publicationDate } = book;
    const bookPublicationDate = new Date(publicationDate)
    return (
        <>
        <Paper elevation={3} sx={{ padding: 2, margin: 'auto' }}>
            {
                isDeleting && <Typography variant="h4">Deleting...</Typography>

            }{
                isDeleted && <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h4">Deleted successfully</Typography>
                    <Button variant="contained" component={Link} to="/books">
                        Back to List
                    </Button>
                </Box>
            }
            {
                isDeleteError && <Typography variant="h4">Something is wrong</Typography>
            }

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
                    sx={{
                        marginRight: '10px'
                    }}
                >
                    Edit
                </Button>
                <Button variant="contained" color="error"
                    onClick={handleModalOpen}
                    sx={{
                        marginRight: '10px'
                    }}
                >
                    Delete
                </Button>
                <Button variant="contained" component={Link} to="/books">
                    Back to List
                </Button>
            </Box>

        </Paper>
<CommonModal open={modalOpen} handleClose={handleModalClose} title="Delete Book" modalMsg="Are you sure you want to delete this book?" handleConfirm={handleDelete} />
        </>
    );
};

export default WithIdToken(BookDetails);
