import express from "express";
import mongoose from "mongoose";
import Joi from "joi";

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  month: {
    type: Number,
    min: [1, "month should more 1"],
    max: [12, "month should less 12"],
  },
  year: {
    type: Number,
    min: [1374, "year should more 1374"],
    max: [1402, "year should less 1402"],
  },
  category: { type: String, required: true },
  score: {
    type: Number,
    min: [1, "score should more 1"],
    max: [10, "score should less 10"],
  },
});

const Books = mongoose.model("Books", bookSchema);

async function createBook() {
  const book = new Books({
    name: "عادت های اتمی",
    month: 5,
    year: 1401,
    category: "توسعه فردی",
    score: 7,
  });
  try {
    const result = await book.save();
    console.log(result);
  } catch (ex) {
    console.log(ex.message);
  }
}
// createBook()

const booksRouter = express.Router();

booksRouter.get("/", async (req, res) => {
  const books = await Books.find().sort({ name: 1 });
  res.send(books);
});

const BooksValidator = (book) => {
  const Schema = Joi.object({
    name: Joi.string().min(3).required(),
    month: Joi.number().integer().min(1).max(12),
    year: Joi.number().integer().min(1374).max(1402),
    category: Joi.string().min(3).required(),
    score: Joi.number().integer().min(1).max(10),
  });
};

export default booksRouter;
