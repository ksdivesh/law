const City = require("../model/City");
const State = require("../model/State");

exports.index = async (req, res) => {
  res.json({
    message: "Welcome to state"
  });
};

exports.cities = async (req, res) => {
  let stateId = +req.params.id;
  let city = new City();

  city
    .listByStateId(stateId, " ORDER BY name ")
    .then((results, fields) => {
      res.json(results);
    })
    .catch(error => {
      res.json(error);
    });
};
