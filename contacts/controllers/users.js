const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection("users").find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', "application/json");
        res.status(200).json(users);
    });
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId });
    result.toArray().then((users) => {
        res.setHeader('Content-Type', "application/json");
        res.status(200).json(users[0]);
    });

    // const { id } = req.params.id;

    // console.log(req.params);

    // // Check if the ID is a valid 24-character hex string
    // if (!ObjectId.isValid(id)) {
    //     return res.status(400).json({ error: 'Invalid ID format' });
    // }

    // try {
    //     const userId = new ObjectId(id);  // Now we can safely create the ObjectId
    //     const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId }).toArray();

    //     if (result.length === 0) {
    //         return res.status(404).json({ error: 'User not found' });
    //     }

    //     res.setHeader('Content-Type', 'application/json');
    //     res.status(200).json(result[0]);
    // } catch (error) {
    //     res.status(500).json({ error: 'An error occurred while fetching the user' });
    // }
};

module.exports = {
    getAll,
    getSingle
}