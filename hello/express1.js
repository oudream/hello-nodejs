let express = require('express');
let app = express();

app.get('/abc.cgi', function(req, res) {
    res.send('Hello World!');
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
