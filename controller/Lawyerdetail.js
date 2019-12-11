exports.index = (req, res) => {
  let data = {};
  data.title = "Lawyer Detail";

  res.render("lawyer-detail/index", data);
};
