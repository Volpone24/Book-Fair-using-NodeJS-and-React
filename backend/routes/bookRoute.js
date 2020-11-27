import express from "express";
import Book from '../models/bookModel';
import { getToken } from "../utils";

const router = express.Router();

// Getting list of book

router.get("/", async (req, res)=>{
    // getting access to book
    const items = await Book.find({});
    res.send(items);
});


// Create a Book book
router.post("/", async(req, res) => {
    const book = new Book({
        name: req.body.name,
        author: req.body.author,
        image: req.body.image,
        category: req.body.category,
        count: req.body.count,
        numReview: req.body.numReview,
        cost: req.body.cost,
        description: req.body.description,
        rating: req.body.rating,
    });
    // If we get all the values
    const newBook = await book.save();
    if(newBook){
        // Code of creating an id - 201
        return res.status(201).send({message: 'New book Created', data: newBook});
    }
    return res.status(500).send({message: 'Could not Create'});
});

// Getting details of a single book
router.get('/:id', async (req, res) => {
    const book = await Book.findOne({ _id: req.params.id });
    if (book) {
      res.send(book);
    } else {
      res.status(404).send({ message: 'book Not Found.' });
    }
  });

// This will delete the book
  router.delete('/:id',  async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) {
      await book.remove();
      res.send({ message: 'Book Deleted' });
    } else {
      res.send('Error');
    }
  });

  // updatethe book

  router.put('/:id', async (req, res) => {
    
    const book = await Book.findById(req.params.id);
    if (book) {
      book.name = req.body.name;
      book.price = req.body.price;
      book.image = req.body.image;
      book.brand = req.body.brand;
      book.category = req.body.category;
      book.countInStock = req.body.countInStock;
      book.description = req.body.description;
      const updatedbook = await Book.save();
      if (updatedbook) {
        return res
          .status(200)
          .send({ message: 'book Updated', data: updatedbook });
      }
    }
    return res.status(500).send({ message: ' Error in Updating book.' });
  });

export default router;  