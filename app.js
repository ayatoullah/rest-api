const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const placesRoutes = require('./routes/places-routes');


app.use('/api/places',placesRoutes);
app.use((error, req, res, next) => {
    if(res.headerSent) {
        next(error)
    }
    res.status(error.code || 500);
    res.json({"message" : error.message || "could find provided id"});
});
app.listen(5000);