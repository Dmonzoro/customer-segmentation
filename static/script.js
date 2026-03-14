/* ---------------- NAVIGATION ---------------- */

const navLinks = document.querySelectorAll(".nav-link")
const sections = document.querySelectorAll(".section")
const navToggle = document.getElementById("navToggle")
const navbar = document.querySelector(".navbar")

navLinks.forEach(link => {

link.addEventListener("click", e => {

e.preventDefault()

const target = link.dataset.section

navLinks.forEach(l => l.classList.remove("active"))
link.classList.add("active")

sections.forEach(section => {

section.classList.remove("active")

if(section.id === target){
section.classList.add("active")
}

})

window.scrollTo({top:0,behavior:"smooth"})
navbar.classList.remove("menu-open")

})

})

navToggle.addEventListener("click",()=>{
navbar.classList.toggle("menu-open")
})



/* ---------------- PREDICTION ---------------- */

const CLUSTER_INFO = [

{
name:"Low Spending Customers",
desc:"Budget-conscious shoppers with minimal spending.",
traits:["Low income","Infrequent buyers","Price sensitive"]
},

{
name:"High Value Customers",
desc:"High income customers with strong engagement.",
traits:["High income","Frequent buyers","Campaign responsive"]
},

{
name:"Inactive Customers",
desc:"Customers with low recent activity.",
traits:["Low engagement","Churn risk"]
},

{
name:"Mid Income Active Customers",
desc:"Moderate income but active shoppers.",
traits:["Moderate income","Online activity"]
},

{
name:"Premium Customers",
desc:"Top spenders and luxury buyers.",
traits:["Luxury buyers","High loyalty"]
},

{
name:"Older Moderate Spenders",
desc:"Older customers with stable spending.",
traits:["Age 55+","In-store buyers"]
}

]


document.getElementById("predictBtn").addEventListener("click",async()=>{

const age = document.getElementById("inp-age").value
const income = document.getElementById("inp-income").value
const spending = document.getElementById("inp-spending").value
const recency = document.getElementById("inp-recency").value
const web = document.getElementById("inp-web").value
const store = document.getElementById("inp-store").value
const visits = document.getElementById("inp-visits").value

if(!age || !income || !spending || !recency || !web || !store || !visits){
alert("Please fill all fields")
return
}

const response = await fetch("/predict",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
age:age,
income:income,
spending:spending,
recency:recency,
web:web,
store:store,
visits:visits
})
})

const data = await response.json()

const cluster = data.cluster
const info = CLUSTER_INFO[cluster]

document.getElementById("resultClusterNum").innerText = cluster
document.getElementById("resultSegmentName").innerText = info.name
document.getElementById("resultDesc").innerText = info.desc

let traitsHTML=""

info.traits.forEach(t=>{
traitsHTML+=`<span class="trait-tag">${t}</span>`
})

document.getElementById("resultTraits").innerHTML = traitsHTML

document.getElementById("resultPlaceholder").classList.add("hidden")
document.getElementById("resultCard").classList.remove("hidden")

})