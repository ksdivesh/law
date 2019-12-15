if(sessionStorage.getItem("rmsg")){
  
  createMessage("smsg","success",sessionStorage.getItem("rmsg")); 
  sessionStorage.removeItem("rmsg"); 

}


document
  .getElementById("state")
  .addEventListener("change", async function(event) {
    let response = await fetch("/state/cities/" + event.target.value);

    if (response.ok) {
      let json = await response.json();

      let district = document.getElementById("district");
      let child = district.lastElementChild;

      while (child) {
        district.removeChild(child);
        child = district.lastElementChild;
      } 

      let option = document.createElement("option");
      option.setAttribute("value", "");
      option.textContent = "Select District";

      district.appendChild(option);

      json.forEach(city => {
        let cityOption = document.createElement("option");
        cityOption.setAttribute("value", city.id);
        cityOption.textContent = city.name;
        district.appendChild(cityOption);
      });
    }
  });

document
  .getElementById("registerBTN")
  .addEventListener("click", async function(event) {

    removeMessage("msg"); 

    let first_name = document.getElementById("first_name").value;
    let last_name = document.getElementById("last_name").value;
    let middle_name = document.getElementById("middle_name").value;
    let mobile = document.getElementById("mobile").value;
    let state = document.getElementById("state").value;
    let district = document.getElementById("district").value;
    let pin = document.getElementById("pin").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let password2 = document.getElementById("password2").value;

    let msg = ""; 
    let error = false; 

    if(first_name === ""){
        error = true; 
        msg += "First Name is required<br>";
    }

    if(last_name === ""){
      error = true; 
      msg+= "Last Name is required<br>"; 
    }

    if(middle_name === ""){
      error = true; 
      msg+= "Middle Name is required<br>"; 
    }

    if(mobile === ""){
      error = true; 
      msg+= "Mobile is required <BR>"; 
    }

    if(state === ""){
      error = true; 
      msg+= "State is required <BR>"; 
    }

    if(district === ""){
      error = true; 
      msg+= "District is required<BR>"; 
    }

    if(pin === ""){
      error = true; 
      msg+= "Pin is required<BR>"; 
    }

    if(email === ""){
      error = true; 
      msg+= "Email is required<BR>"; 
    }

    if(password === ""){
      error = true; 
      msg+= "Password is required<BR>"; 
    }

    if(password2 === ""){
      error = true; 
      msg+= "Confirm Password is required<BR>"; 
    }



    if(password !== password2){
      error = true; 
      msg+= "Password & Confirm Password are not equal<BR>"; 
    }

    if(error === true){
      createMessage("msg","error", msg);
      return false;  
    }


    let clientData = {
      first_name: first_name,
      middle_name: middle_name,
      last_name: last_name,
      mobile: mobile,
      state: state,
      district: district,
      pin: pin,
      email: email,
      password: password
    };

    let response = await fetch("/register/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(clientData)
    });

    let result = await response.json(); //

    if(result.status === 0){
      createMessage("msg","error",result.message); 
      return false; 
    }

    window.location = "/register";
    sessionStorage.setItem("rmsg",`You have registered to successfully! Please <a href="/login">Login</a>`);  
    

  });



