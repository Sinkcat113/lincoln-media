import { db } from "./firebase.js";
import { get, ref, push } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js"
function sendPost() {
    if (document.querySelector("#txtTitle").value !== "" && document.querySelector("#txtDescription").value !== "" && document.querySelector("#txtBy").value !== "" && document.querySelector("#txtPost").value !== "") {
        push(ref(db, "Posts"), {
            Title: document.querySelector("#txtTitle").value,
            Description: document.querySelector("#txtDescription").value,
            By: document.querySelector("#txtBy").value,
            Post: document.querySelector("#txtPost").value.replace("\n", "<br>")
        }).then(() => {
            window.location = "index.html"
        })
    } else {
        alert("Please fill out the fields")
    }
}

document.querySelector("#btnPost").addEventListener("click", () => {
    sendPost()
})