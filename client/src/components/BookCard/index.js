import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Collapse,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

const BookCard = ({ book, onToggleDescription, onSaveBook, isBookSaved }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    if (!expanded) {
      onToggleDescription();
    }
  };

  return (
    <Card>
      <CardHeader title={book.title} subheader={`Authors: ${book.authors}`} />
      <CardMedia
        component="img"
        alt={`The cover for ${book.title}`}
        height="250"
        image={book.image}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {expanded ? book.description : `${book.description.slice(0, 200)}...`}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onSaveBook(book.bookId)}
          disabled={isBookSaved}
        >
          {isBookSaved ? 'Book is Saved' : 'Save Book'}
        </Button>
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Description:</Typography>
          <Typography paragraph>{book.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default BookCard;
