// get elements
var preObject = document.getElementById("object")
var ulList      = document.getElementById("list")

// create references
var dbRefObject = firebase.database().ref().child("object")
var dbRefList   = dbRefObject.child("hobbies")

// sync object changes
dbRefObject.on("value", snap => {
  preObject.innerText = JSON.stringify(snap.val(), null, 1)
})

// sync list changes
dbRefList.on("child_added", snap => {
  const li     = document.createElement("li")
  li.innerText = snap.val()
  li.id        = snap.key
  ulList.appendChild(li)
})

dbRefList.on("child_changed", snap => {
  const liChanged     = document.getElementById(snap.key)
  liChanged.innerText = snap.val()
})

dbRefList.on("child_removed", snap => {
  const liToRemove     = document.getElementById(snap.key)
  liToRemove.remove()
})

// get elements
const txtEmail    = document.getElementById("txtEmail")
const txtPassword = document.getElementById("txtPassword")
const btnLogIn    = document.getElementById("btnLogIn")
const btnSignUp   = document.getElementById("btnSignUp")
const btnLogOut   = document.getElementById("btnLogOut")

// add login event
btnLogIn.addEventListener("click", e => {
  const email = txtEmail.value
  const pass  = txtPassword.value
  const auth  = firebase.auth()

  const promise  = auth.signInWithEmailAndPassword(email, pass)
  promise.catch(e => console.log(e.message))
})

// add signup event
btnSignUp.addEventListener("click", e => {
  // check for real email
  const email    = txtEmail.value
  const pass     = txtPassword.value
  const auth     = firebase.auth()

  const promise  = auth.createUserWithEmailAndPassword(email, pass)
  promise.catch(e => console.log(e.message))
})

// add logout event
btnLogOut.addEventListener("click", e => {
  firebase.auth().signOut()
})

// add a realtime authentication listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    console.log(firebaseUser)
    btnLogOut.classList.remove("hide")
    btnLogIn.classList.add("hide")
    btnSignUp.classList.add("hide")
  } else {
    console.log("not logged in")
    btnLogOut.classList.add("hide")
    btnLogIn.classList.remove("hide")
    btnSignUp.classList.remove("hide")
  }
})
