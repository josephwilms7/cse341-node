const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllGames = async (req, res, next) => {
    //swagger.tags=['Games']

    try {
        const result = await mongodb.getDatabase().db().collection("games").find();
        result.toArray().then((games) => {
            res.setHeader('Content-Type', "application/json");
            res.status(200).json(games);
        });
    } catch(err) {
        next(err);
    }
};

const getSingleGame = async (req, res, next) => {
    //swagger.tags=['Games']

    try {
        const gameId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection("games").find({ _id: gameId });
        result.toArray().then((games) => {
            res.setHeader('Content-Type', "application/json");
            res.status(200).json(games[0]);
        });
    } catch(err) {
        next(err);
    }
};

const createGame = async (req, res, next) => {
    //swagger.tags=['Games']

    try {
        const gameId = new ObjectId(req.params.id);
        const game = {
            home_team: req.body.home_team,
            away_team: req.body.away_team,
            home_score: req.body.home_score,
            away_score: req.body.away_score,
            home_penalty_count: req.body.home_penalty_count,
            away_penatly_count: req.body.away_penatly_count,
            date: req.body.date
        };
        const response = await mongodb.getDatabase().db().collection("games").insertOne({ _id: gameId, ...game });

        if (response.acknowledged) {
            res.status(200).send();
        } else {
            res.status(500).json(response.error || "Some eror occured while creating the game.");
        }
    } catch(err) {
        next(err);
    }
};

const updateGame = async (req, res, next) => {
    //swagger.tags=['Games']

    try {
        const gameId = new ObjectId(req.params.id);
        const game = {
            home_team: req.body.home_team,
            away_team: req.body.away_team,
            home_score: req.body.home_score,
            away_score: req.body.away_score,
            home_penalty_count: req.body.home_penalty_count,
            away_penatly_count: req.body.away_penatly_count,
            date: req.body.date
        };
        const response = await mongodb.getDatabase().db().collection("games").replaceOne({ _id: gameId }, { _id: gameId, ...game });
        
        if (response.modifiedCount > 0) {
            res.status(200).send();
        } else {
            res.status(500).json(response.error || "Some eror occured while updating the game.");
        }
    } catch(err) {
        next(err);
    }
};

const deleteGame = async (req, res, next) => {
    //swagger.tags=['Teams']

    try {
        const gameId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('games').deleteOne({ _id: gameId })
        if (response.deletedCount > 0) {
            res.status(200).send();
        } else {
            res.status(500).json(response.error || "Some eror occured while deleting the game.");
        }
    } catch(err) {
        next(err);
    }
};

module.exports = {
    getAllGames,
    getSingleGame,
    createGame,
    updateGame,
    deleteGame
}