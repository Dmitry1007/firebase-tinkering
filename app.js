var preObject = document.getElementById("object")
var dbRef  = firebase.database().ref().child("object")
dbRef.on("value", snap => {
  preObject.innerText = JSON.stringify(snap.val(), null, 1);
})
