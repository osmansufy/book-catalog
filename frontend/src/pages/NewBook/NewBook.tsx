import NewBookForm from '@/components/common/BookForm';
import ToastBar from '@/components/common/ToastBar';
import { useAddBookMutation } from '@/redux/features/books/bookApi';
import { useAppSelector } from '@/redux/hook';
import { EBOOK_GENRE } from '@/shared/enum';
import { IBook } from '@/shared/interface';
import { Paper, Typography } from '@mui/material';

const NewBook = () => {

    const { user } = useAppSelector(state => state.user)
    const [addNewBook, {
        isLoading,
        isError,
        isSuccess,
    }] = useAddBookMutation()

    const createNewBook = async (data: IBook, idToken: string) => {
        addNewBook({
            book: data,
            token: idToken
        })

    }
    const bookDefaultValues: IBook = {
        title: "",
        author: {
            name: "",
            email: user?.email || "",
        },
        genre: EBOOK_GENRE.FANTASY,
        publicationDate: new Date(),
    };
    return (
        <Paper elevation={3}
            sx={{
                padding: 2,
                width: "70%",
                margin: "auto",
            }}
        >

            {
                isLoading && <Typography variant="h4">Loading...</Typography>

            }

            {
                isSuccess && <ToastBar status="success" message={"Updated successfully"}
                    isOpen={isSuccess} />
            }
            {
                isError && <ToastBar status="error" message={"Something is wrong"}
                    isOpen={isError}
                />
            }
            <Typography variant="h4">New Book</Typography>

            <NewBookForm
                defaultBookValues={bookDefaultValues}
                onSubmit={createNewBook}
                isEdit={false}
            />
        </Paper>
    )
}

export default NewBook