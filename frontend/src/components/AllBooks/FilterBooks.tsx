import useDebounce from '@/hooks/useDebounce'
import { useFilterBooksQuery, useSearchBooksQuery } from '@/redux/features/books/bookApi'
import { EBOOK_GENRE } from '@/shared/enum'
import { IBook, IBookFilter } from '@/shared/interface'
import { Paper, Box, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Button } from '@mui/material'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import dayjs, { Dayjs } from 'dayjs'
import React, { useEffect, useMemo, useState } from 'react'

const genreArr = Object.values(EBOOK_GENRE)
const FilterBooks = ({
    setDisplayedBooks,
    handleLoading,
    fetchAllBooks
}: {
    setDisplayedBooks: React.Dispatch<React.SetStateAction<IBook[]>>
    handleLoading: (loading: boolean) => void
    fetchAllBooks: () => void
}) => {
    const [genre, setGenre] = useState('');
    const [search, setSearch] = useState('')
    const handleChange = (event: SelectChangeEvent) => {
        setGenre(event.target.value as string);
    };
    const [year, setYear] = useState<Dayjs | null>(null);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        setSearch(event.target.value)
    }

    const searchValue = useDebounce(search, 2000)

    const handleYearChange = (newValue: Dayjs | null, context: any) => {
        if (!context.validationError) {

            setYear(newValue);
        }
    };


    const queryObj = useMemo(() => {
        const returnObj: IBookFilter = {}
        if (genre) {
            returnObj['genre'] = genre
        }
        if (year) {
            returnObj['year'] = year.year()
        }
        return returnObj
    }, [genre, year])
    const { data: filterBooks, isLoading, isFetching } = useFilterBooksQuery(queryObj, {
        skip: !year && !genre
    })

    const { data: searchBooks, isLoading: searchBooksLoading } = useSearchBooksQuery(searchValue, {
        skip: !searchValue
    })
    console.log({ searchBooks })
    useEffect(() => {
        handleLoading(isFetching || isLoading || searchBooksLoading)
    }, [handleLoading, isFetching, isLoading, searchBooksLoading])

    useEffect(() => {
        if (filterBooks) {
            setDisplayedBooks(filterBooks.data)
        }
    }, [filterBooks, setDisplayedBooks])

    useEffect(() => {
        if (searchBooks) {
            setDisplayedBooks(searchBooks.data)
        }
    }, [searchBooks, setDisplayedBooks])
    const handleClear = () => {
        setGenre('')
        setYear(null)
        setSearch('')
        fetchAllBooks()
    }
    return (
        <Paper elevation={3}>
            <Box p={2} display="flex"
                justifyContent="space-between"
                alignItems={'center'}
            >

                <Box sx={{ minWidth: 120 }} >
                    <TextField label="Search"
                        value={search}
                        onChange={handleSearch}

                        variant="outlined" />
                    {/* category filter */}
                </Box>
                <Box
                    display={{ xs: 'none', md: 'flex' }}
                    gap={2}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                >
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Genre</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={genre}
                            label="Genre"
                            onChange={handleChange}
                        >
                            {
                                genreArr.map((genre: string) => {
                                    return (
                                        <MenuItem key={genre} value={genre}>{genre}</MenuItem>
                                    )
                                }
                                )
                            }
                        </Select>
                    </FormControl>

                    <Box sx={{
                        flex: 1,
                        "& .MuiStack-root": {
                            padding: 0
                        }

                    }} >
                        <LocalizationProvider dateAdapter={AdapterDayjs}

                        >
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker label={"Year"}
                                    views={['year']}
                                    value={year}
                                    maxDate={dayjs().add(1, 'year')}
                                    onChange={handleYearChange}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Box>

                    <Button variant="contained"
                        color='secondary'
                        sx={{
                            padding: {
                                xs: 1,
                                md: 1.5
                            }
                        }}
                        onClick={handleClear}>Clear</Button>
                </Box>
            </Box>
        </Paper>
    )
}

export default FilterBooks