exports.index = (req, res) => {
      let data = {};
      data.title = "Profile";
      res.render("account/profile/index",data); 
};

    

    
    