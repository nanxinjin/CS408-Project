module.exports = function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Auth');
    // res.header('Access-Control-Allow-Origin: *');
    // res.header("Access-Control-Allow-Methods: POST, GET");
    res.header('Custom-Header: Auth');
    res.header('Access-Control-Expose-Headers: Auth');
    next();
};
