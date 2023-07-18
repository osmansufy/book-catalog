import EditForm from '@/components/common/BookForm'
import ToastBar from '@/components/common/ToastBar';
import { useGetBookByIdQuery, useUpdateBookMutation } from '@/redux/features/books/bookApi';
import { useAppSelector } from '@/redux/hook';
import { EBOOK_GENRE } from '@/shared/enum';
import { IBook } from '@/shared/interface';
import { Box, Button, Paper, Typography } from '@mui/material'
import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

const EditBook = () => {

    const { user } = useAppSelector(state => state.user)
    const { id } = useParams<{ id: string }>()

    const { data: book, isLoading } = useGetBookByIdQuery(id, {
        skip: !id
    })
    const [update, {
        isLoading: isUpdating,
        isSuccess: isUpdated,
        isError: isUpdateError,
    }] = useUpdateBookMutation()

    const updateNewBook = async (data: IBook, idToken: string) => {
        update({
            id,
            book: data,
            token: idToken
        })

    }
    const bookDefaultValues: IBook = useMemo(() => {
        if (!book) return {
            title: "",
            author: {
                name: "",
                email: user?.email || "",
            },
            genre: EBOOK_GENRE.FANTASY,
            publicationDate: new Date(),
        }
        const { title, author, genre, publicationDate } = book.data;

        return {
            title,
            author: {
                name: author?.name || "",
                email: author?.email || "",
            },
            genre,
            publicationDate,
        }

    }, [book, user?.email])

    return (
        <Paper elevation={3}
            sx={{
                padding: 2,
                width: "70%",
                margin: "auto",
                marginTop: 2
            }}
        >
            {
                isLoading && <Typography variant="h4">Loading...</Typography>

            }
            {
                isUpdating && <Typography variant="h4">Updating...</Typography>
            }
            {
                isUpdated && <ToastBar status="success" message={"Updated successfully"}
                    isOpen={isUpdated} />
            }
            {
                isUpdateError && <ToastBar status="error" message={"Something is wrong"}
                    isOpen={isUpdateError}


                />
            }

            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h4">
                    Edit Book
                </Typography>

                <Button variant="contained" color="primary"
                    component={Link} to="/books"
                    sx={{ marginLeft: 2 }}
                >
                    Back to Books
                </Button>
            </Box>


            <EditForm
                defaultBookValues={bookDefaultValues}
                onSubmit={updateNewBook}
                isEdit={true}

            />
        </Paper>
    )
}

export default EditBook