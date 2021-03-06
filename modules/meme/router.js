/**
 * xMEME-Backend
 * created By - aparsh
 * February 2021
 */
const express = require('express');
const bodyparser = require('body-parser')
const controller = require('./controller/controller');
const router = express.Router();
router.use(bodyparser.json());


router.get("/",controller.getAllMemes)
router.get("/:uuid",controller.getMeme)
router.post("/",controller.postMemeValidation, controller.postMeme)
router.patch("/:uuid",controller.editMeme)


module.exports = router;