const { application } = require('express');
const express = require('express');
const router = express.Router();

const DUMMY_PLACES = [{
    id : "1",
    title : 'ampire state building',
    description : "",
    location : {
        lat : 40.7484405,
        lng : -73.9878531
    },
    address : "20 W 34th St, New York, NY 10001, United States",
    creator : 'u1'
}]
router.get('/:pid', (req, res, next) => {
    

    const placeId = req.params.pid;
    console.log('placeId: ', placeId);
    
    const place =  DUMMY_PLACES.find(p => {return p.id === placeId});
    if(!place) {
        // return res.status(404).json({"message" : "there is a place with this id"})
        // return next(error);
        const error = new Error("could not find place with this id");
        error.code = 404;
        throw error;
    }
    res.json({ place});
 })


module.exports = router;