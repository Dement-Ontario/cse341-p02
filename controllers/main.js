const main = (req,res) => {
    // #swagger.summary = 'Get Message to remove "Cannot GET /" error'
    res.send("This is just to remove the 'Cannot GET /' error for now, this'll likely be replaced with an actual thing later");
};

module.exports = {
    main
};