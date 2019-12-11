exports.index = (req, res) => {
  let data = {};
  data.title = "Our Services";

  res.render("service/index", data);
};
