function createMessage(appendToId, type = "error", markup) {
  let msgDiv = document.createElement("div");
  msgDiv.classList.add("alert");

  if (type === "error") {
    msgDiv.classList.add("alert-danger");
  }

  if (type === "success") {
    msgDiv.classList.add("alert-success");
  }

  if (type === "info") {
    msgDiv.classList.add("alert-info");
  }

  msgDiv.classList.add("alert-dismissible");
  msgDiv.classList.add("fade");
  msgDiv.classList.add("in");

  let closeButton = document.createElement("a");
  closeButton.classList.add("close");
  closeButton.setAttribute("data-dismiss", "alert");
  closeButton.setAttribute("href", "#");
  closeButton.setAttribute("aria-label", "close");
  closeButton.textContent = "&times";

  msgDiv.appendChild(closeButton); 

  msgDiv.innerHTML = markup; 

  document.getElementById(appendToId).appendChild(msgDiv); 

}


function removeMessage(appendToId){

      if(document.getElementById(appendToId).hasChildNodes())
      {
      let msgDiv = document.getElementById(appendToId).lastElementChild; 
      document.getElementById(appendToId).removeChild(msgDiv); 
      }

}
