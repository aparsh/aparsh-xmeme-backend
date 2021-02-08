const Meme = require("../../../models/meme");
const User = require("../../../models/user");
const respStatus = require('../../../global/responseStatus');
const { body,check, validationResult } = require('express-validator');
const shortid = require('shortid');



exports.getAllMemes = async (req, res, next) => {
    try {
        const memes = await Meme.find({});

        let response = {
            status : "success",
            data : memes
        }
        res.statusCode = respStatus.status.StatusOk;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    }
    catch (e) {
        console.log(e);
        let response = {
            status : "faliure",
            message : "something went wrong"
        }
        res.statusCode = respStatus.status.StatusInternalServerError;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    }
}


exports.getMeme = async (req, res, next) => {
    try {
        const memeId = req.params.uuid;
        const memes = Meme.find({uuid:memeId}).lean();
        let response = {
            status : "success",
            data : memes
        }
        res.statusCode = respStatus.status.StatusOk;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    }
    catch (e) {
        console.log(e);
        let response = {
            status : "faliure",
            message : "something went wrong"
        }
        res.statusCode = respStatus.status.StatusInternalServerError;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    }
}


exports.postMemeValidation = () => {
    return [
        body('name', 'userName not exists').exists(),
        body('url', 'meme link not exists').exists(),
        body('caption').optional()
       ];
}

exports.postMeme = async (req, res, next) => {
    try {
        console.log("post meme!")
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            res.status(respStatus.status.StatusBadRequest).json({status: "faliure", message: "Wrong request body"});
            return;
        }
        let reqBody = req.body;
        reqBody.caption = reqBody.caption ? reqBody.caption : "";
        
        let newMeme = await new Meme({
            name: reqBody.name,
            url: reqBody.url,
            caption: reqBody.caption});

        let savedMeme = await newMeme.save();
        if (!savedMeme) {
            let response = {
                status : "faliure",
                message : "unable to post your meme at the moment."
            }
            res.status(respStatus.status.StatusInternalServerError).json(response);
        }
        else {
            let response = {
                status : "success",
                message : "meme posted successfully.",
                id : savedMeme._id
            }
            res.status(respStatus.status.StatusOk).json(response);
        }
    }
    catch (e) {
        console.log(e);
        let response = {
            status : "faliure",
            message : "something went wrong"
        }
        res.status(respStatus.status.StatusInternalServerError).json(response);
    }
}

exports.editMemeValidation = () => {
    return [
        body('url', 'meme link not exists').exists(),
        body('caption', 'caption not passed').exists(),
        body('id').optional(),
       ];
}

exports.editMeme = async (req, res, next) => {
    try {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(respStatus.status.StatusBadRequest).json({status: "faliure", message: "Wrong request body"});
            return;
        }

        let reqBody = req.body;
        let meme = await Meme.findById(reqBody.id);
        meme.caption = reqBody.caption;
        meme.meme = reqBody.meme;
        let savedMeme = await meme.save();
        if (!savedMeme) {
            let response = {
                status : "faliure",
                message : "unable to edit your meme at the moment."
            }
            res.status(respStatus.status.StatusInternalServerError).json(response);
        }
        else {
            let response = {
                status : "success",
                message : "meme edited successfully."
            }
            res.status(respStatus.status.StatusOk).json(response);
        }
    }
    catch (e) {
        let response = {
            status : "faliure",
            message : "something went wrong"
        }
        res.status(respStatus.status.StatusInternalServerError).json(response);
    }
}