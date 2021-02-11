const memeRouter = require("./modules/meme/router");
exports.initialise = async (app)=>{
    app.get("/",function(req,res){res.send(200)})
    app.use("/memes",memeRouter)
}