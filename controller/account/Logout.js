var Cookies = require("cookies"); 

exports.index = (req, res) => {
      let data = {};
      data.title = "Dashboard";

      var keys = ['lawyer_auth']; 
      var cookies = new Cookies(req, res, {keys:keys});
      
      cookies.set("sessionId",{maxAge:Date.now()}); 

      res.redirect("/login");  
      
    };

    
    
    
    