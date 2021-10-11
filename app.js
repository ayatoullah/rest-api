const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const placesRoutes = require('./routes/places-routes');
const HttpError = require('./models/http-error');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/api/places',placesRoutes);
app.use((req, res, next) => {
    const error = new HttpError("could not find this route" , 404);
    throw error;
});
app.use((error, req, res, next) => {
    if(res.headerSent) {
        next(error)
    }
    res.status(error.code || 500);
    res.json({"message" : error.message || "could find provided id"});
});
app.listen(5000);