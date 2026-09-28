console.log("Hello World");

const display = document.getElementById("displayFare");
let startLocation = "";
let endLocation = "";
let busType = "";
let fareType = "";
let startCode = 0;
let endCode = 1;
const minFare = 15;
let fare = minFare;
const rate = new Map();
//setting the number codes for each location
rate.set("ordinary", 2.25);
rate.set("airconditioned", 2.45);
rate.set("deluxe", 2.60);


rate.set("regular", 1.00);
rate.set("sp", 0.80);


const numCodes = new Map();
//setting the number codes for each location
numCodes.set("Rupagan", 111);
numCodes.set("Minaulon",112);
numCodes.set("Binuni",  116);
numCodes.set("Bacolod", 118);
numCodes.set("Maigo",   124);
numCodes.set("Iligan",  85);





function DisplayRate(){
    let rateDisplayer = document.getElementById("rateDisplay");
    let chosenRate = document.querySelector('input[name="busType"]:checked').value;
    rateDisplayer.textContent = "RATE : P" + rate.get(chosenRate) + " per km";
}

//displays the rate evertyime the option changes
const busTypes = document.querySelectorAll('input[name="busType"]');

busTypes.forEach(busType => {
    busType.addEventListener("change", DisplayRate);
});



function Capitalize(name){
    if (name == null){
        return name;
    }else{
    let formattedName = name.trim();
    formattedName = name.substring(0,1).toUpperCase() + name.substring(1).toLowerCase().trim();
    
    return formattedName;
    }
}

function FareFix(fare){ //round offs and stuff
    //minumum fare
    if(fare < minFare){
        return minFare;
    }
    //multiples of 5
    if (fare%5 != 0){
        let rmdr = fare%5;
       return ((fare-rmdr)/5)*5 +5;
    }
}

function CalculateFare(){
    startLocation = document.getElementById("startLocation").value;
    endLocation = document.getElementById("endLocation").value;
    busType = document.querySelector('input[name="busType"]:checked').value;
    fareType = document.querySelector('input[name="fareType"]:checked').value;

    

    startLocation = Capitalize(startLocation);
    endLocation = Capitalize(endLocation);

    //printing
        if (startLocation == ""){display.textContent  = "Please enter a starting location."; return;}
        if (endLocation == ""){display.textContent  = "Please enter a destination location."; return;}
        if (numCodes.has(startLocation)){
            startCode = numCodes.get(startLocation);
        }
        else {
            display.textContent = "Starting Location ("+ startLocation+ ") does not exist."; 
            return;
        }
        if (numCodes.has(endLocation)){
            endCode = numCodes.get(endLocation);
        }
        else {
            display.textContent = "Destination ("+ endLocation+ ") does not exist.";
            return;
        }

    //fare calculation
        fare = Math.abs(startCode - endCode) * rate.get(busType) * rate.get(fareType);
        fare = FareFix(fare);

 
    display.textContent = startLocation + " to " + endLocation + ": P" + fare ;
    
}




/// SUGGESTIONS
const inputStart = document.getElementById("startLocation");
const inputEnd = document.getElementById("endLocation");
const suggestions = document.getElementById("suggestions");
const suggestionField = document.getElementById("suggestionField");
function showSuggestions(input) {
    const text = input.value.toLowerCase();
    suggestions.innerHTML = "";

    for (const [name, value] of numCodes) {

        if (name.toLowerCase().startsWith(text)) {

            const option = document.createElement("div");
            option.textContent = name;

            option.onclick = () => {
                input.value = name;
                suggestions.innerHTML = "";
            };

            suggestions.appendChild(option);
        }
    }   
    //hiding suggestion field if not searching
    // Show if there are suggestions
        if (suggestions.children.length === 0 && text.length > 0) {
            suggestions.textContent = "Place not Found.";
            suggestions.style.display = "block";
        }
        else if (suggestions.children.length > 0) {
            suggestions.style.display = "block";
        }
        else {
            suggestions.style.display = "none";
        }
}

inputStart.addEventListener("input", () => {
    showSuggestions(inputStart);
});

inputStart.addEventListener("focus", () => {
    showSuggestions(inputStart);
});

inputEnd.addEventListener("input", () => {
    showSuggestions(inputEnd);
});

inputEnd.addEventListener("focus", () => {
    showSuggestions(inputEnd);
});