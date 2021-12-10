const server = require("../server")
const chai = require("chai")
const chaihttp = require("chai-http")
// const server = require("mocha")
// const should = require("should")
const should = chai.should()
const expect =  chai.expect()
const Book = require("../Components/Model")
const { resolve6 } = require("dns")

chai.use(chaihttp)


//Empty the database before each test case

describe('String', function(){
	beforeEach(function(done){
       Book.remove({},(err)=>{
           if(err) return console.log(err)
           done()
       })
	});


//Positive Test Case

describe("Books",function(){
    it("/GET Should get all books",(done)=>{
        chai.request(server)
        .get("/getBook")
        .end((err, res)=>{
            res.should.have.status(200)
            res.body.should.be.a("array");
            done()
        })
    })
})

//Negative test cases

describe("/POST Negative test cases",function(){
    it("/POST when request.body don't have the author key then it should not be add in DB",function(done){
        let book = ["ashish"]
        chai.request(server)
        .post("/addBook")
        .send(book)
        .end((err, res)=>{
            // console.log(res.body.errors.author)
            res.body.should.have.property("errors")
            res.body.errors.should.have.property("author")
            res.body.errors.author.should.have.property("kind").eql("required")
            done()
        }).timeout(10000)
    })

    it("/POST when request.body should not be anyting other than object",(done)=>{
        let book = [ "author"]
        chai.request(server)
        .post("/addBook")
        .send(book)
        .end((err, res)=>{
            res.body.should.be.a("object")
            res.body.should.have.property("errors")
            done()
        })
    })

})

describe("/PUT Negative Test cases",function () {
    it("/PUT book should be updated th given id and should not have name key in res body",done=>{
        let mybook = new Book({title: "train to pakistan", price: 10, author: "kulwant ji"})
        mybook.save((err, newbook)=>{
            // console.log(newbook)
            chai.request(server)
            .put("/updateBook/" + newbook.id)
            .send({ title: "train to australia", price: 90, author: "kulwant ji"})
            .end((err, res)=>{
                // console.log(res.body)
                res.body.should.be.a("object")
                res.body.should.have.property("message").eql("Book updated successfully")
                res.body.should.not.have.property("name").eql("CastError")
                done()
            })
        } )
        
    })
})


describe("/DELETE Positive Test cases",function () {
    it("/DELTE book should be updated th given id",done=>{
        let mybook = new Book({title: "train to pakistan", price: 10, author: "kulwant ji"})
        mybook.save((err, newbook)=>{
            // console.log(newbook)
            chai.request(server)
            .delete("/deleteBook/" + newbook.id)
            .end((err, res)=>{
                // console.log(res.body)
                res.body.should.be.a("object")
                res.body.should.have.property("message").eql("Book Deleted Successfully")
                done()
            })
        } )
        
    })
})

})

    
