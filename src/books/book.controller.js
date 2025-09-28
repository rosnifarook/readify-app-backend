const Book = require("./book.model");

//post a book
const postABook = async(req,res)=>{
    try {
        const newBook = await Book({...req.body});
        await newBook.save();
        res.status(200).send({message: "Book posted successfully", Book: newBook})
    } catch (error) {
        console.error("Error creating book", error);
        res.status(500).send({message: "Failed to create a book"})
    }
}

//get all books
const getAllBooks = async(req, res) =>{
    try {
        const books = await Book.find().sort({createdAt: -1});
        res.status(200).send(books)
    } catch (error) {
        console.error("Error fetching books", error);
        res.status(500).send({message: "Failed to fetch books"}) 
    }
}

//get a single book
const getSingleBook = async(req, res) =>{
    try {
        const {id} = req.params;
        const book = await Book .findById(id)
        if(!book){
            res.status(404).send({message: "Book not found!"})
        }
        res.status(200).send(book)
    } catch (error) {
        console.error("Error fetching book", error);
        res.status(500).send({message: "Failed to fetch book"}) 
    }
}

//update book data
const updateBook = async(req, res) =>{
    try {
        const {id} = req.params;
        const updatedBooks = await Book.findByIdAndUpdate(id, req.body, {new: true});
        if(!updateBook){
            res.status(404).send({message: "Book is not found!"})
        }
        res.status(200).send({
            message: "Book updated successfully",
            book: updateBook
        })
    } catch (error) {
        console.error("Error updating book", error);
        res.status(500).send({message: "Failed to update book"}) 
    }
}

//delete a book
const deleteABook =async(req, res) =>{
    try {
        const {id} = req.params;
        const deleteBook = await Book.findByIdAndDelete(id);
        if(!deleteBook){
            res.status(404).send({message: "Book is not found!"})
        }
        res.status(200).send({
            message: "Book deleted successfully",
            book: deleteBook
        })
    } catch (error) {
        console.error("Error deleting book", error);
        res.status(500).send({message: "Failed to delete book"}) 
    }
}

module.exports ={
 postABook,
 getAllBooks,
 getSingleBook,
 updateBook,
 deleteABook   
}