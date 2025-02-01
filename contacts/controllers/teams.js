const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllTeams = async (req, res) => {
    //swagger.tags=['Teams']
    const result = await mongodb.getDatabase().db().collection("teams").find();
    result.toArray().then((teams) => {
        res.setHeader('Content-Type', "application/json");
        res.status(200).json(teams);
    });
};

const getSingleTeam = async (req, res) => {
    //swagger.tags=['Teams']
    const teamId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('teams').find({ _id: teamId });
    result.toArray().then((teams) => {
        res.setHeader('Content-Type', "application/json");
        res.status(200).json(teams[0]);
    });
};

const createTeam = async (req, res) => {
    //swagger.tags=['Teams']
    const teamId = new ObjectId(req.params.id);
    const team = {
        name: req.body.name,
        city: req.body.city,
        wins: req.body.wins,
        losses: req.body.losses
    };
    const response = await mongodb.getDatabase().db().collection('teams').insertOne({ _id: teamId, ...team });

    if (response.acknowledged) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || "Some eror occured while creating the team.");
    }
};

const updateTeam = async (req, res) => {
    //swagger.tags=['Teams']
    const teamId = new ObjectId(req.params.id);
    const team = {
        name: req.body.name,
        city: req.body.city,
        wins: req.body.wins,
        losses: req.body.losses
    };
    const response = await mongodb.getDatabase().db().collection('teams').replaceOne({ _id: teamId }, { _id: teamId, ...team });
    
    if (response.modifiedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || "Some eror occured while updating the team.");
    }
};

const deleteTeam = async (req, res) => {
    //swagger.tags=['Teams']
    const teamId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('teams').deleteOne({ _id: teamId })
    if (response.deletedCount > 0) {
        res.status(200).send();
    } else {
        res.status(500).json(response.error || "Some eror occured while deleting the team.");
    }
};

module.exports = {
    getAllTeams,
    getSingleTeam,
    createTeam,
    updateTeam,
    deleteTeam
}