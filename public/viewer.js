import { db } from "./firebase.js";
import { get, ref } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js"

var limit = -7

function getRecent() {
    var index = 0
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

function getPost(key) {
    get(ref(db, "Posts/" + key)).then((snapshot) => {
        const topicTitle = document.createElement("h4")
        topicTitle.innerHTML = snapshot.val().Title
        document.querySelector("#title").innerHTML = snapshot.val().Title
        topicTitle.style.fontSize = "27px"

        const topicDescription = document.createElement("p")
        topicDescription.innerHTML = snapshot.val().Description
        topicDescription.style.color = "white"
        topicDescription.style.fontWeight = "800"

        const topicBy = document.createElement("h5")
        topicBy.innerHTML = snapshot.val().By

        const topicPost = document.createElement("h5")
        topicPost.innerHTML = snapshot.val().Post
        topicPost.style.color = "white"
        topicPost.style.fontWeight = "800"
        topicPost.style.fontSize = "30px"
        topicPost.style.marginTop = "40px"

        document.querySelector(".topicsText").appendChild(topicTitle)
        document.querySelector(".topicsText").appendChild(topicDescription)
        document.querySelector(".topicsText").appendChild(topicBy)
        document.querySelector(".topicsText").appendChild(topicPost)
    })
}

if (localStorage.postKey !== undefined && localStorage.postKey !== "") {
    getPost(localStorage.postKey)
}

document.querySelector("#btnSearch").addEventListener("click", () => {
    if (document.querySelector("#txtSearch").value !== "") {
        localStorage.searchKey = document.querySelector("#txtSearch").value
        window.location = "search.html"
    }
})

document.querySelector("#btnLogo").addEventListener("click", () => {
    window.location = "index.html"
})

getRecent()