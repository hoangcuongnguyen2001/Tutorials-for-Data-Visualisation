"use strict";

const button2011 = document.getElementById("firstbutton");
const button2017 = document.getElementById("secondbutton");
const chart2011 = document.getElementById("firstchart");
const chart2017 = document.getElementById("secondchart");

// Function for clicking buttons on the webpage(swapping the class).
function onclickfor2011(){
  chart2011.classList.remove("notActive");
  chart2017.classList.add("notActive");
}

function onclickfor2017(){
  chart2017.classList.remove("notActive");
  chart2011.classList.add("notActive");
}


function init(){
 button2011.onclick = onclickfor2011;
 button2017.onclick = onclickfor2017;
}

window.onload = init;
