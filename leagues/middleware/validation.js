const validator = require('../helpers/validator');

const saveGame = (req, res, next) => {
  const validationRule = {
    home_team: 'required|string',
    away_team: 'required|string',
    home_score: 'required|integer',
    away_score: 'required|integer',
    home_penalty_count: 'integer',
    away_penalty_count: 'integer',
    date: 'required|string'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveTeam = (req,res,next) => {
  const validationRule = {
    name: 'required|string',
    city: 'required|string',
    wins: 'required|integer',
    losses: 'required|integer'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
}

module.exports = {
  saveGame,
  saveTeam
};