const express = require("express");
const router = express.Router();
const {prodectCreateController,prodectGetController,prodectUpdateController, prodectDeleteController} = require("../controllers/prodect.controller");
const upload = require("../db/multer")



router.post("/create", upload.array("images", 5), prodectCreateController);
router.get("/view", prodectGetController);
router.put("/update/:id", upload.array("images", 5), prodectUpdateController);
router.delete("/delete/:id",prodectDeleteController)


module.exports = router;