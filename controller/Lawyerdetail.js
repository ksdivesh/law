const ClientInfo = require("../model/ClientInfo");

exports.index = (req, res) => {
  let data = {};
  data.title = "Lawyer Detail";

  let id = req.params.id;

  let clientInfo = new ClientInfo();
  let strWhere = ` AND ci.clientid = ${id} `;

  clientInfo
    .getLawyers(0, 0, strWhere, "")
    .then((result, fields) => {
      console.log(result);
      data.clientInfo = Array.from(result);
      res.render("lawyer-detail/index", data);
    })
    .catch(err => {
      console.log("Error : " + err);
      res.send(err);
    });
};
