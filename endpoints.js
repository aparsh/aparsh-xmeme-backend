const memeRouter = require("./modules/meme/router");
const homeRouter = require('./modules/home/router');
exports.initialise = async (app)=>{
    app.use("/",homeRouter)
    app.use("/meme",memeRouter)
}