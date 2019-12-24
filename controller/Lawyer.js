const ClientInfo = require("../model/ClientInfo");
const State = require("../model/State");

exports.index = (req, res) => {
  let data = {};
  data.title = "Lawyer";

  const clientInfo = new ClientInfo();
  const state = new State();

  clientInfo
    .getLawyers(0, 0, "", ` ORDER BY ci.id DESC `)
    .then((result, fields) => {
      console.log(result);
      data.clients = Array.from(result);
      res.render("lawyer/index", data);
    })
    .catch(err => {
      console.log("Error : " + err);
      return res.json(err);
    });

  // res.render("lawyer/index", data);
};
