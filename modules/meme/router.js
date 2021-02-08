const express = require('express');
const bodyparser = require('body-parser')
const authenticate = require('../../global/authenticate');
const controller = require('./controller/controller');
const router = express.Router();
router.use(bodyparser.json());


router.get("/",controller.getAllMemes)
router.get("/:uuid",controller.getAllMemes)
router.post("/",controller.postMemeValidation, controller.postMeme)
router.put("/edit",controller.editMemeValidation,controller.editMeme)


module.exports = router;