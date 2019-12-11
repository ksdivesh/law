exports.index = (req, res) => {
  let data = {};
  data.title = "Lawyer";

  res.render("lawyer/index", data);
};
