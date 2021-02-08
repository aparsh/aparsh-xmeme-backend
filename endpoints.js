const memeRouter = require("./modules/meme/router");

exports.initialise = async (app)=>{
    app.use("/meme",memeRouter)
}