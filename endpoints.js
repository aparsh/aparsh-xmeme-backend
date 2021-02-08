const memeRouter = require("./modules/meme/router");
exports.initialise = async (app)=>{
    app.get("/",)
    app.use("/meme",memeRouter)
}