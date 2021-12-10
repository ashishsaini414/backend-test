const router = require("express").Router()
const items = require("./controller")

router.get("/getBook", items.getBook);
router.post("/addBook", items.addBook);
router.put("/updateBook/:id", items.updateBook);
router.delete("/deleteBook/:id",items.deleteBook);

module.exports = router