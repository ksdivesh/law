exports.index = (req, res) => {
  let data = {};
  data.title = "Home Page";

  res.render("home/index", data);
};
