// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on freinds.
// ===============================================================================

var friendData = require("../app/data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        res.json(friendData);
    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the JavaScript array
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function (req, res) {
        // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
        // req.body is available since we're using the body parsing middleware
        var userInfo = req.body;
        var scores = userInfo.scores;
        if (scores) {
            var matchNum = 100;
            var match = '';
            for (var friend of friendData) {
                var currentSum = 0;
                friend.scores.forEach((cur, index) => {
                    value = cur - scores[index];
                    value = Math.abs(value);
                    currentSum += value;
                });
                if (currentSum < matchNum) {
                    matchNum = currentSum;
                    match = friend;
                }
            }
            res.json(match);
        }
    });
};
