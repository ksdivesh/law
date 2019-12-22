const auth_helper = require("../../helper/auth_helper");
const ClientInfo = require("../../model/ClientInfo");
const City = require("../../model/City");
const State = require("../../model/State");

exports.index = async (req, res) => {
  let data = {};
  data.title = "Profile";

  let state = new State();
  let currentClientId = 0;

  const currentClientPromise = auth_helper.getCurrentClientId(req, res);
  const statePromise = state.get();

  let strWhere = "";

  Promise.all([currentClientPromise, statePromise])
    .then(function(values) {
      currentClientId = values[0];
      data.states = values[1];

      let clientInfo = new ClientInfo();
      let strWhere = ` AND clientid = ${currentClientId}`;

      clientInfo
        .get(strWhere)
        .then(async (result, field) => {
          data.clientInfo = result[0];

          let city = new City();
          let strWhere = ` AND state_id = ${data.clientInfo.state} `;

          let cities = await city.get(strWhere);

          data.cities = cities;

          return res.render("account/profile/index", data);
        })
        .catch(err => {
          return res.send(err);
        });
    })
    .catch(err => {
      return res.send(err);
    });
};

exports.process = (req, res) => {
  auth_helper
    .getCurrentClientId(req, res)
    .then(clientId => {
      let strWhere = ` AND clientid = ${clientId} `;

      let clientInfo = new ClientInfo();

      clientInfo
        .get(strWhere)
        .then((result, fields) => {
          clientInfo
            .update(req.body, result[0], strWhere)
            .then(result => {
              return res.json({
                status: 1,
                result: result
              });
            })
            .catch(err => {
              return res.json({
                status: 0,
                message: err
              });
            });
        })
        .catch(err => {
          return res.send(err);
        });
    })
    .catch(err => {
      res.send(err);
    });

  //   res.json(req.body);
};
