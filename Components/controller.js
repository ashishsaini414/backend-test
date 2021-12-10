const book = require("./service");

module.exports.getBook = async (req, res) => {
  const response = await book.getBook();
  res.send(response);
};
module.exports.addBook = async (req, res, next) => {
  try {
    const response = await book.addBook(req.body);
    res.send(response);
  } catch (err) {
    next(err);
  }
};
module.exports.updateBook = async (req, res) => {
  try {
    const response = await book.updateBook(req.params, req.body);
    res.send({...response, message: "Book updated successfully"});
  } catch (err) {
    res.send(err);
  }
};
module.exports.deleteBook = async (req, res) => {
    try{
        const response = await book.deleteBook(req.params);
        res.send({...response, message: "Book Deleted Successfully"});
    }
    catch(err){
        res.send(err)
    }
 
};
