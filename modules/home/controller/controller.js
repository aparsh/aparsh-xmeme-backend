exports.get = async (req, res, next) => {
    try {
        let response = {
            status : "success",
            data : "hello"
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
