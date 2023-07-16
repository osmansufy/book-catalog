import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IBook } from '@/shared/interface';
import { CardHeader, IconButton } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import { DeleteOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';


const BookCard = ({ book }: {
    book: IBook
}) => {

    const bookPublicationDate = new Date(book.publicationDate)
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <Box
                    display="flex"
                    justifyContent="space-between"
                >
                    {/* edit & delete */}

                    <Link to={`/books/${book._id}/edit`}>
                        <IconButton aria-label="settings"
                            color="primary"
                        >
                            <EditIcon />
                        </IconButton>
                    </Link>
                    <IconButton aria-label="settings" color="error">
                        <DeleteOutline />
                    </IconButton>
                </Box>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {
                            book.author.name
                        }
                    </Typography>
                    <Typography variant="h5" component="div">
                        {
                            book.title
                        }
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {
                            bookPublicationDate.toDateString()
                        }
                    </Typography>
                    <Typography variant="body2">
                        {
                            book.genre
                        }
                    </Typography>
                </CardContent>
                <CardActions>
                    <Link to={`/books/${book._id}`}>
                        <Button size="small">Learn More</Button>
                    </Link>
                </CardActions>
            </Card>
        </Box>
    );
}

export default BookCard;