const City = require("../model/City");
const State = require("../model/State");
const Client = require("../model/Client");
const ClientInfo = require("../model/ClientInfo");
const md5 = require("md5");

exports.index = async (req, res) => {
  let data = {};
  data.title = "Register";

  let state = new State();

  var states = await state.list(" ORDER BY name ");
  data.states = states;

  console.log(data.states.length);

  res.render("register/index", data);
};

exports.save = async (req, res) => {
  let email = req.body.email; //
  let password = md5(req.body.password);
  let client = new Client();

  try {
    let strWhere = ` AND username = '${email}' `;

    const rsClient = await client.get(strWhere);

    if (rsClient.length > 0) {
      return res.json({
        status: 0,
        message: "User with this email already registered!"
      });
    }

    client
      .add({ username: email, password: password, usertype: "CLIENT" })
      .then(result => {
        let clientId = result.insertId;

        let clientInfo = new ClientInfo();

        req.body.clientid = clientId;

        clientInfo
          .add(req.body)
          .then(result => {
            res.json({
              status: 1,
              message: "Client saved successfully!"
            });
          })
          .catch(err => {
            res.json({
              status: 0,
              ref: "clientinfo",
              message: err
            });
          });
      })
      .catch(err => {
        res.json({
          status: 0,
          ref: "client",
          message: err
        });
      });
  } catch (err) {
    res.json({
      status: 0,
      message: err
    });
  }
};
