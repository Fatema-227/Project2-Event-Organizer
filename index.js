let eventStatus="draft"
const newEvent=()=>{
  if(document.querySelector("#isPublic").checked){
    let guestLimitLabel=document.createElement("label")
    guestLimitLabel.innerText="Guests limit"
    document.querySelector("form").appendChild(guestLimitLabel)
    console.log("added")
  }
}
newEvent()
