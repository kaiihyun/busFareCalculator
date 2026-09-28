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
rate.set("regular", 1.00);
rate.set("sp", 0.80);




const numCodes = new Map();
//setting the number codes for each location
numCodes.set("Rupagan", 111);
numCodes.set("Minaulon",112);
numCodes.set("Demolugan",114);
numCodes.set("Binuni",  116);
numCodes.set("Bacolod", 118);
numCodes.set("Maigo",   124);
numCodes.set("Iligan",  85);

function Capitalize(name){
    if (name == null){
        return name;
    }else{
    let formattedName = name.trim();
    formattedName = name.substring(0,1).toUpperCase() + name.substring(1).toLowerCase().trim();
    
    return formattedName;
    }
}


function FareFix(fare){
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


    fare = Math.abs(startCode - endCode) * rate.get(busType) * rate.get(fareType);
    fare = FareFix(fare);

 
    display.textContent = startLocation + " to " + endLocation + ": P" + fare ;
    
}


