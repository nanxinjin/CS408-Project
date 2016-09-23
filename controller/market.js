module.exports = {
    postMarket: function(req, res) {
        var body =  req.body;
        var newMarket = new Market(body);
        newMarket.save(funciton(err, item) {
            res.status(200).send();
        })
    }



}
