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

    console.log(result);
  });
