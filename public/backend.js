import { db } from "./firebase.js";
import { get, ref } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js"

document.querySelector("#btnCompose").addEventListener("click", () => {
    window.location = "writer.html"
})

document.querySelector("#btnSearch").addEventListener("click", () => {
    if (document.querySelector("#txtSearch").value !== "") {
        localStorage.searchKey = document.querySelector("#txtSearch").value
        window.location = "search.html"
    }
})

var limit = -4

function getRecent() {
    var index = 0
    document.querySelector("#topicText").innerHTML = "Recent Topics"
    document.querySelector(".topics").innerHTML = ""
    get(ref(db, "Posts")).then((snapshot) => {
        snapshot.forEach((child) => {
            index -= 1
            if (index >= limit) {
                const topicWrapper = document.createElement("div")
                topicWrapper.className = "topicWrapper"

                topicWrapper.addEventListener("click", () => {
                    localStorage.postKey = child.key
                    window.location = "viewer.html"
                })
        
                const topicTitle = document.createElement("h4")
                topicTitle.innerHTML = child.val().Title
        
                const topicDescription = document.createElement("p")
                topicDescription.innerHTML = child.val().Description
        
                const topicBy = document.createElement("h5")
                topicBy.innerHTML = child.val().By
        
                const elementContainer = document.createElement("div")
                elementContainer.className = "elementContainer"
        
                const btnOpen = document.createElement("h6")
                btnOpen.innerHTML = "Open"

                btnOpen.addEventListener("click", () => {
                    localStorage.postKey = child.key
                    window.location = "viewer.html"
                })
        
                topicWrapper.appendChild(topicTitle)
                topicWrapper.appendChild(topicDescription)
                topicWrapper.appendChild(topicBy)
        
                elementContainer.appendChild(btnOpen)
        
                topicWrapper.appendChild(elementContainer)
        
                document.querySelector(".topics").prepend(topicWrapper)
            }
        })
    })
}

getRecent()