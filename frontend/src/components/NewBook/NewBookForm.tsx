import { IBook } from "@/shared/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Grid, MenuItem, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { NewBookSchema, bookGenres, fieldNames, formFields, newBook } from "./helper";
const NewBookForm = () => {
    const {
        handleSubmit,
        formState: { errors },
        control
    } = useForm<IBook>({
        resolver: zodResolver(NewBookSchema),
        mode: "all",
        defaultValues: newBook,
    });
    console.log(errors)

    return (
        <Box my={4} >
            <form onSubmit={handleSubmit((data) => {
                data.publicationDate = new Date(data.publicationDate);
                console.log(data)
            })}>
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
                                                    label={fieldItem.label}
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
                                                    {
                                                    ...fieldItem.type === "date" && {
                                                        format: "dd/MM/yyyy"
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
                    Submit
                </Button>
            </form>
        </Box>

    )
}

export default NewBookForm