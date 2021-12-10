const { Schema, model} = require("mongoose");

const bookSchema = new Schema(
    {
    title: {
        type: String, required: true
    },
    price: {
        type: Number, required: true
    },
    author: {
        type: String, required: true
    },
},{
    versionKey: false,
    timestamps: true
})

const bookModel = model("MyBooks",bookSchema)

module.exports = bookModel;