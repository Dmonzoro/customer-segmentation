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



/* ---------------- CHARTS ---------------- */

window.onload = function(){

/* Age Distribution */

new Chart(document.getElementById("ageChart"),{
type:"bar",
data:{
labels:["18–25","26–30","31–35","36–40","41–45","46–50","51–55","56–60"],
datasets:[{
label:"Customers",
data:[48,105,182,230,267,321,298,254],
backgroundColor:"#60a5fa"
}]
}
})


/* Income Distribution */

new Chart(document.getElementById("incomeChart"),{
type:"bar",
data:{
labels:["20k","30k","40k","50k","60k","70k","80k"],
datasets:[{
label:"Customers",
data:[62,143,289,374,381,318,264],
backgroundColor:"#6ee7b7"
}]
}
})


/* Spending Distribution */

new Chart(document.getElementById("spendingChart"),{
type:"bar",
data:{
labels:["0-100","100-250","250-500","500-750","750-1k","1k+"],
datasets:[{
label:"Customers",
data:[212,318,427,386,295,214],
backgroundColor:"#c084fc"
}]
}
})


/* Education Chart */

new Chart(document.getElementById("educationChart"),{
type:"bar",
data:{
labels:["Basic","2n Cycle","Graduation","Master","PhD"],
datasets:[{
label:"Avg Spending",
data:[403,487,582,714,847],
backgroundColor:"#fb923c"
}]
}
})


/* Marital Campaign Chart */

new Chart(document.getElementById("maritalChart"),{
type:"bar",
data:{
labels:["Single","Married","Together","Divorced","Widow"],
datasets:[
{
label:"Accepted",
data:[19,34,29,26,22],
backgroundColor:"#6ee7b7"
},
{
label:"Declined",
data:[81,66,71,74,78],
backgroundColor:"#f87171"
}
]
}
})


/* Cluster Pie Chart */

new Chart(document.getElementById("clusterPieChart"),{
type:"doughnut",
data:{
labels:[
"Cluster 0",
"Cluster 1",
"Cluster 2",
"Cluster 3",
"Cluster 4",
"Cluster 5"
],
datasets:[{
data:[418,312,497,385,264,364],
backgroundColor:[
"#6ee7b7",
"#fbbf24",
"#f87171",
"#60a5fa",
"#c084fc",
"#fb923c"
]
}]
}
})


/* Scatter Chart */

new Chart(document.getElementById("scatterChart"),{
type:"scatter",
data:{
datasets:[{
label:"Customers",
data:[
{x:30000,y:200},
{x:45000,y:500},
{x:70000,y:1200},
{x:90000,y:1600},
{x:52000,y:600},
{x:60000,y:700}
],
backgroundColor:"#6ee7b7"
}]
},
options:{
scales:{
x:{title:{display:true,text:"Income"}},
y:{title:{display:true,text:"Spending"}}
}
}
})


/* PCA Chart */

new Chart(document.getElementById("pcaChart"),{
type:"scatter",
data:{
datasets:[
{
label:"Cluster 0",
data:[{x:-2,y:1},{x:-2.2,y:1.3},{x:-1.8,y:0.9}],
backgroundColor:"#6ee7b7"
},
{
label:"Cluster 1",
data:[{x:2,y:2},{x:2.4,y:2.1},{x:2.2,y:1.9}],
backgroundColor:"#fbbf24"
}
]
}
})

}



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