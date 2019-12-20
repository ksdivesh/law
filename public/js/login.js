document.getElementById("btnLogin").addEventListener("click", async function(event){



      removeMessage("msg"); 

      event.preventDefault(); 
      let username = document.getElementById("username").value; 
      let password = document.getElementById("password").value; 

      let msg = ""; 
      let error = false; 

      if(username === ""){
            error = true; 
            msg += "Username is required<br>";
      }

      if(password === ""){
            error = true; 
            msg+= "Password is required<br>"; 
      }

      if(error === true){
            createMessage("msg","error", msg);
            return false;  
      }

      let loginData = {
            username:username,
            password:password
      }


      let response = await fetch("/login/process", {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(loginData)
          });
      
          let result = await response.json(); //
      
          if(result.status === 0){
            createMessage("msg","error",result.message); 
            return false; 
          }

          if(result.status === 1){
            window.location = "/account"; 
          }
          
          

}); 