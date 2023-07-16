import WithIdToken from '@/HOC/withIdToken'
import ShowAllBooks from '@/components/AllBooks/ShowAllBooks'
import { useGetBooksQuery } from '@/redux/features/books/bookApi'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'

const AllBooks = (props: any) => {
    const [isSkip, setIsSkip] = useState(true)
    const { data: books, isLoading } = useGetBooksQuery(props.idToken, {
        skip: isSkip
    })

    console.log({ books })

    useEffect(() => {
        console.log({ props })
        if (props.idToken) setIsSkip(false)
    }, [props.idToken])
    if (isLoading) return <div>Loading...</div>
    if (!books && !isLoading) return <div>No books</div>
    return (
        <Box my={4}>
            <ShowAllBooks
                books={books.data}
            />
        </Box>
    )
}

export default WithIdToken(AllBooks)