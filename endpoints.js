const memeRouter = require("./modules/meme/router");
const homeRouter = require('./modules/home/router');
exports.initialise = async (app)=>{
    app.get("/",function(req,res){res.send(200)})
    app.use("/meme",memeRouter)
}