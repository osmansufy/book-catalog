import WithIdToken from "@/HOC/withIdToken";
import { useAddBookMutation } from "@/redux/features/books/bookApi";
import { IBook } from "@/shared/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, MenuItem, TextField } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { IBookFormProps, NewBookSchema, bookGenres, fieldNames, formFields } from "./helper";

const BookForm = ({ idToken, defaultBookValues, isEdit, onSubmit }: IBookFormProps) => {



    const {
        handleSubmit,
        formState: { errors },
        control,
        reset,
        setValue
    } = useForm<IBook>({
        resolver: zodResolver(NewBookSchema),
        mode: "all",
        defaultValues: defaultBookValues,
    });
    useEffect(() => {
        if (!defaultBookValues) return
        const { title, author, genre, publicationDate } = defaultBookValues;
        const bookPublicationDate = new Date(publicationDate).toISOString().substring(0, 10)
        setValue("title", title)
        setValue("author.name", author?.name || "")
        setValue("author.email", author?.email || "")
        setValue("genre", genre)
        setValue("publicationDate", bookPublicationDate as any)
    }, [defaultBookValues, setValue])



    const onHandleNewBook = async (data: IBook) => {

        try {
            if (idToken) {
                await onSubmit(data, idToken)
            }
            if (!isEdit) {
                reset()
            }
        } catch (error) {
            console.log(error)

        }
    }

    return (
        <Box my={4} >
            <form onSubmit={handleSubmit(onHandleNewBook)}>
                <Grid container spacing={2}>
                    {
                        formFields.map((fieldItem) => {
                            return (
                                <Grid item xs={12} md={6} key={fieldItem.name}>
                                    <Controller
                                        key={fieldItem.name}
                                        control={control}
                                        name={fieldItem["name"] as fieldNames}

                                        render={({ field }) => {
                                            return (
                                                <TextField
                                                    {...field}
                                                    inputProps={{
                                                        readOnly: fieldItem.readOnly
                                                    }}
                                                    placeholder={fieldItem.placeholder}
                                                    label={fieldItem.label}
                                                    required={fieldItem.required}
                                                    variant="outlined"
                                                    fullWidth
                                                    {
                                                    ...fieldItem.type === "select" && {
                                                        select: true,
                                                        children: bookGenres.map((genre) => {
                                                            return (
                                                                <MenuItem key={genre} value={genre}>
                                                                    {genre}
                                                                </MenuItem>
                                                            )
                                                        }
                                                        )
                                                    }
                                                    }

                                                    type={fieldItem.type}
                                                    error={!!errors[fieldItem.name as keyof IBook]}
                                                    helperText={errors[fieldItem.name as keyof IBook]?.message}
                                                />
                                            )
                                        }}
                                    />
                                </Grid>
                            )
                        }
                        )

                    }
                </Grid>






                <Button type="submit" sx={{
                    marginTop: 2
                }} variant="contained" color="primary">
                    {
                        isEdit ? "Update" : "Create"
                    }
                </Button>
            </form>
        </Box>

    )
}

export default WithIdToken(BookForm)