const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/http-error');


let DUMMY_PLACES = [{
    id : "1",
    title : 'ampire state building',
    description : "",
    location : {
        lat : 40.7484405,
        lng : -73.9878531
    },
    address : "20 W 34th St, New York, NY 10001, United States",
    creator : "u1"
}];

const getPlaceById =  (req, res, next) => {
    

    const placeId = req.params.pid;
    console.log('placeId: ', placeId);
    
    const place =  DUMMY_PLACES.find(p => {return p.id === placeId});
    if(!place) {

        throw new HttpError("could not find place with this id", 404);
    }
    res.json({ place});
};

const createPlace = (req, res, next) => {
    const {title, description, coordinates, address, creator} = req.body;
    
console.log(': ', req.body);
    const createdPlace = {
        id:uuidv4(),
        title ,
        description,
        location : coordinates,
        address,
        creator
    }
    res.status(201).json({place : createdPlace})

}

const updatePlace = (req, res, next) => {
    const placeId = req.params.pid;
    const { title, description} = req.body;
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
    let updatedPlace = DUMMY_PLACES.find(p => p.id === placeId);
    updatedPlace = {
       ...updatedPlace,
       title,
       description
    };
    DUMMY_PLACES[placeIndex] = updatedPlace;
    res.status(200).json({place : updatedPlace})

}

const deletePlace = (req, res, next) => {
    const placeId = req.params.pid;
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
    res.status(200).json({"message" : " deleted successfly"})
};
exports.getPlaceById = getPlaceById;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;