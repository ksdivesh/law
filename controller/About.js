exports.index = (req, res) => {
  let data = {};
  data.title = "About Us";

  res.render("about/index", data);
};
