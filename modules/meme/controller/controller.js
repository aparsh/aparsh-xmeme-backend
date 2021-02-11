const Meme = require("../../../models/meme");
const User = require("../../../models/user");
const respStatus = require('../../../global/responseStatus');
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


exports.postMemeValidation = (req, res, next) => {
    if(req.body.name == "" || req.body.name == undefined){
        res.status(respStatus.status.StatusBadRequest).json({status: "faliure", message: "name missing"});
        return;
    }
    if(req.body.url == "" || req.body.url == undefined){
        res.status(respStatus.status.StatusBadRequest).json({status: "faliure", message: "url missing"});
        return;
    }
    next();
}

exports.postMeme = async (req, res, next) => {
    try {
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

exports.editMeme = async (req, res, next) => {
    try {
        let reqBody = req.body;
        let meme = await Meme.findById(req.params.uuid);
        if(reqBody.caption){
            meme.caption = reqBody.caption;
        }
        if(reqBody.url){
            meme.url = reqBody.url;
        }
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
        console.log(e)
        let response = {
            status : "faliure",
            message : "something went wrong"
        }
        res.status(respStatus.status.StatusInternalServerError).json(response);
    }
}