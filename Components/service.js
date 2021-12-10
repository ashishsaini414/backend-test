const bodyParser = require("body-parser")
const bookModel = require("./Model")

module.exports.getBook = async () =>{
    const books = await bookModel.find()
    return books;
}

module.exports.addBook =async (data) => {
    const { title, price, author} = data
    const book = await bookModel.create({ title: title, price: price, author: author})
    return book;
}

module.exports.updateBook = async (bookid, bookdata) =>{
    const { title, price, author} = bookdata;
    const book = await bookModel.updateOne({ _id: bookid.id},{title: title, price: price, author: author})
    return book;
}

module.exports.deleteBook = async (bookid) => {
const book = await bookModel.findByIdAndDelete(bookid.id)
return book;
}