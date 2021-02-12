/**
 * xMEME-Backend
 * created By - aparsh
 * February 2021
 */

// const Meme = require("../../../models/meme");
var db = require('node-localdb');
var Meme = db('../../../db/meme.json');
const respStatus = require('../../../global/responseStatus');
const shortid = require('shortid');


/**
 * Fetch latest 100 memes sorted based on post time.
 * GET /memes
 */
exports.getAllMemes = async (req, res, next) => {
    try {
        const memeNums = await Meme.count({});
        const memes = await Meme.find({},{skip:Math.max(memeNums-100,0)});

        let memeArr = []
        for(const meme of memes){
            const memeNow = {
                id:meme._id,
                caption:meme.caption,
                url:meme.url,
                name: meme.name
            }
            memeArr.push(memeNow);
        }
        memeArr = memeArr.reverse()
        res.statusCode = respStatus.status.StatusOk;
        res.setHeader('Content-Type', 'application/json');
        res.json(memeArr);
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

/**
 * Fetch a single meme using id
 * GET /memes/uuid
 */
exports.getMeme = async (req, res, next) => {
    try {
        const memeId = req.params.uuid;
        let meme = await Meme.findOne({_id:memeId});

        // console.log(meme);
        
        if(!meme){
            let response = {
                status : "faliure",
                message : "meme not found"
            }
            res.statusCode = respStatus.status.StatusNotFound;
            res.setHeader('Content-Type', 'application/json');
            res.json(response);
        }
        else{
            let memeRes = {
                id:meme._id,
                caption:meme.caption,
                url:meme.url,
                name: meme.name
            }
            res.statusCode = respStatus.status.StatusOk;
            res.setHeader('Content-Type', 'application/json');
            res.json(memeRes);
        }
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

/**
 * validate the schema of post request 
 */
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

/**
 * Post a meme
 * POST /memes
 */
exports.postMeme = async (req, res, next) => {
    try {
        let reqBody = req.body;
        reqBody.caption = reqBody.caption ? reqBody.caption : "";
        
        let newMeme = {
            name: reqBody.name,
            url: reqBody.url,
            caption: reqBody.caption};
        
        let savedMeme = await Meme.insert(newMeme); 

        if (savedMeme.isRejected) {
            let response = {
                status : "faliure",
                message : "unable to post your meme at the moment."
            }
            res.status(respStatus.status.StatusInternalServerError).json(response);
        }
        else {
            let response = {
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
/**
 * Edit the caption or url of an already posted meme
 * PATCH /memes/uuid
 */
exports.editMeme = async (req, res, next) => {
    try {
        let reqBody = req.body;
        let meme = await Meme.findOne({_id:req.params.uuid});
        
        if(!meme){
            let response = {
                status : "faliure",
                message : "meme not found"
            }
            res.statusCode = respStatus.status.StatusNotFound;
            res.setHeader('Content-Type', 'application/json');
            res.json(response);
            next();
        }

        if(reqBody.caption){
            meme.caption = reqBody.caption;
        }
        if(reqBody.url){
            meme.url = reqBody.url;
        }
        let savedMeme = await Meme.update({_id:meme._id},meme);
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