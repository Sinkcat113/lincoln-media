import { db } from "./firebase.js";
import { get, ref } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js"

var searchLimit = 100

function getSearch(key) {
    var index = 0
    document.querySelector("#txtSearch").value = key
    document.querySelector(".searchText").innerHTML = `Your results for "${key}"`
    document.querySelector(".topicsSearch").innerHTML = ""
    get(ref(db, "Posts")).then((snapshot) => {
        snapshot.forEach((child) => {
            index += 1
            if (index < searchLimit && child.val().Title.includes(key) || child.val().Description.includes(key)) {
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
        
                document.querySelector(".topicsSearch").appendChild(topicWrapper)
            } if (index === searchLimit) {
                const btnLoad = document.createElement("h1")
                btnLoad.innerHTML = "Load More"
                btnLoad.style.fontFamily = "sans-serif"
                btnLoad.style.fontSize = "15px"
                btnLoad.style.color = "white"
                btnLoad.style.borderRadius = "10px"
                btnLoad.style.padding = "18px"
                btnLoad.style.backgroundColor = "rgb(60, 60, 60)"
                btnLoad.style.cursor = "pointer"
                btnLoad.style.textAlign = "center"
    
                btnLoad.addEventListener("click", () => {
                    searchLimit += 100
                    getSearch(localStorage.searchKey)
                    btnLoad.style.display = "none"
                })
    
                document.body.appendChild(btnLoad)
            }
        })
    })
}

if (localStorage.searchKey !== undefined && localStorage.searchKey !== "") {
    getSearch(localStorage.searchKey)
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