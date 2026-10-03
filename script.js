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
rate.set("ordinary", 2.20);
rate.set("airconditioned", 2.45);
rate.set("deluxe", 2.60);
rate.set("superdeluxe", 2.70);
rate.set("luxury", 3.35);


rate.set("regular", 1.00);
rate.set("sp", 0.80);


const numCodes = new Map();

// setting the number codes for each location
numCodes.set("Iligan City", 85);
numCodes.set("Buru-Un", 97)
numCodes.set("Magoong", 100);
numCodes.set("Samburon", 101);
numCodes.set("Larapan", 102);
numCodes.set("Napo", 103);
numCodes.set("Libertad", 104);
numCodes.set("Tacub", 105);
numCodes.set("Bagumbayan", 106);
numCodes.set("Tugar", 108);
numCodes.set("Kawit Oriental", 109);
numCodes.set("Kawit Occidental", 110);
numCodes.set("Rupagan", 111);
numCodes.set("Minaulon", 113);
numCodes.set("Demologan", 114);
numCodes.set("Binuni", 115);
numCodes.set("Bacolod", 116);
numCodes.set("Esperanza", 117);
numCodes.set("Liangan East", 121);
numCodes.set("Liangan West", 122);
numCodes.set("Claro M. Recto", 123);
numCodes.set("Maigo", 124);
numCodes.set("Balagatasa", 125);
//126
numCodes.set("Segapod", 127);
//128
numCodes.set("Kulasihan", 129);
numCodes.set("Muntay", 130);
numCodes.set("Rebucon", 131);
numCodes.set("Austin Heights", 132);

numCodes.set("Kolambugan", 133);
numCodes.set("Libertad, Kolambugan", 134);
numCodes.set("Titunod", 135);
numCodes.set("Caromatan", 137);
numCodes.set("Mukas", 139);
numCodes.set("Tabigue", 140);
numCodes.set("Manga", 141);

numCodes.set("Mukas", 140);
numCodes.set("Simbuco", 143);
numCodes.set("Tangueguiron", 145);
numCodes.set("Pigcarangan", 147);
numCodes.set("Bulog", 148);

numCodes.set("Tubod", 151);
numCodes.set("Baroy", 153);
numCodes.set("Raw-an", 156);
numCodes.set("Magpatao", 158 );
numCodes.set("Lanipao", 160);
numCodes.set("Tenazas", 162);
numCodes.set("Abaga", 163);

numCodes.set("Maranding", 165);
numCodes.set("Kapatagan", 167);

const messages = [
            "Is it really that expensive?",
            "That's quite a fare!",
            "Are you sure about that price?",
            "Well... that's gonna cost you.",
            "Time to check your wallet.",
            "That's a long ride!",
            "Hope you brought enough money.",
            "Ouch, that fare hurts.",
            "Looks like quite the journey."
        ];



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
    // UPDATED: Proper Name formatting — lowercase everything, then capitalize
    // the first letter of the string and the first letter after any space or
    // hyphen. This correctly handles multi-word names ("Liangan east" ->
    // "Liangan East"), initials followed by a period ("claro m. recto" ->
    // "Claro M. Recto"), and hyphenated names ("buru-un" -> "Buru-Un"),
    // and always matches the numCodes keys, which are stored the same way.
    formattedName = formattedName
        .toLowerCase()
        .replace(/(^|[\s-])([a-z])/g, (match, sep, letter) => sep + letter.toUpperCase());

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
    return fare; // FIX: exact multiples of 5 used to return undefined
}

function CalculateFare(){
    stopFareAnimation();   // NEW: cancel any running fare animation

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

 
    //messages random text
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];

        display.textContent = "";   // NEW: stay blank until the fare animation finishes

    animateFare(fare, randomMessage);     // NEW: show on the stub ("Calculated Fare")
}




/* =====================================================================
   NEW: TICKET STUB SYNC
   ===================================================================== */
const inputStart = document.getElementById("startLocation");
const inputEnd   = document.getElementById("endLocation");
const fareLabel  = document.getElementById("fareLabel");
const fareAmount = document.getElementById("fareAmount");

const BUS_LABELS  = { ordinary: "Ordinary", airconditioned: "Air-Conditioned", deluxe: "Deluxe", superdeluxe: "Super Deluxe", luxury: "Luxury" };
const FARE_LABELS = { regular: "Regular", sp: "SP" };

// Returns the database name for typed text, or null if it isn't a real location.
function resolveLocation(value){
    const name = Capitalize(value || "");
    return numCodes.has(name) ? name : null;
}

function syncStub(){
    document.getElementById("outBus").textContent  = BUS_LABELS[document.querySelector('input[name="busType"]:checked').value];
    document.getElementById("outFare").textContent = FARE_LABELS[document.querySelector('input[name="fareType"]:checked').value];
    document.getElementById("outFrom").textContent = resolveLocation(inputStart.value) || "—";
    document.getElementById("outTo").textContent   = resolveLocation(inputEnd.value)   || "—";
}

// Any change to the builder makes an old result stale, so return to "Estimated".
function resetFareDisplay(){
    stopFareAnimation();
    fareLabel.textContent = "CALCULATED FARE";
    fareAmount.textContent = "—";
    display.textContent = "";
}

function onBuilderChange(){
    syncStub();
    resetFareDisplay();
}

document.querySelectorAll('input[name="busType"], input[name="fareType"]').forEach(r => {
    r.addEventListener("change", onBuilderChange);
});


/* =====================================================================
   NEW: CALCULATED FARE ANIMATION (visual only)
   ===================================================================== */
let fareTimer = null;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function stopFareAnimation(){
    clearInterval(fareTimer);
    fareTimer = null;
    fareAmount.classList.remove("rolling");
}

function animateFare(finalFare, reactionMessage){
    stopFareAnimation();
    fareLabel.textContent = "CALCULATED FARE";
    const fmt = n => n.toFixed(2);

    // NEW: the reaction message only appears once the number has settled
    if (reduceMotion.matches){
        fareAmount.textContent = fmt(finalFare);
        display.textContent = reactionMessage;
        return;
    }

    const frames = 12, ceiling = Math.max(finalFare * 1.5, minFare * 3);
    let i = 0;
    fareAmount.classList.add("rolling");
    fareTimer = setInterval(() => {
        i++;
        if (i >= frames){
            stopFareAnimation();
            fareAmount.textContent = fmt(finalFare);   // always the real result
            display.textContent = reactionMessage;     // NEW: shown only after the numbers stop
            return;
        }
        fareAmount.textContent = fmt(minFare + Math.random() * (ceiling - minFare)); // decoy
    }, 70);
}


/* =====================================================================
   NEW: AUTOCOMPLETE (replaces the old SUGGESTIONS section)
   One independent dropdown per input; matches location NAMES that start
   with the typed text, case-insensitive, max 4.
   ===================================================================== */
const MAX_SUGGESTIONS = 3;

function setupAutocomplete(input, list){
    let items = [], active = -1;

    function close(){
        list.hidden = true;
        list.innerHTML = "";
        items = []; active = -1;
        input.setAttribute("aria-expanded", "false");
    }
    function open(){
        list.hidden = false;
        input.setAttribute("aria-expanded", "true");
    }
    function choose(name){
        input.value = name;
        close();
        input.classList.remove("invalid");
        onBuilderChange();
    }
    function setActive(i){
        items.forEach((el, n) => el.classList.toggle("active", n === i));
        active = i;
    }

    function render(){
        const text = input.value.trim().toLowerCase();
        list.innerHTML = ""; items = []; active = -1;
        input.classList.remove("invalid");
        const allNames = [...numCodes.keys()];
        let matches;
        if (!text){
            // NEW: nothing typed yet -> show random available locations
            matches = allNames.sort(() => Math.random() - 0.5).slice(0, MAX_SUGGESTIONS);
        } else {
            matches = allNames
                .filter(name => name.toLowerCase().startsWith(text))
                .slice(0, MAX_SUGGESTIONS);
        }

        if (matches.length === 0){
            const li = document.createElement("li");
            li.className = "suggest-empty";
            li.textContent = "Location does not exist.";
            list.appendChild(li);
            input.classList.add("invalid");
            open();
            return;
        }
        // already an exact, complete pick: nothing left to suggest
        if (matches.length === 1 && matches[0].toLowerCase() === text){ close(); return; }

        matches.forEach(name => {
            const li = document.createElement("li");
            li.setAttribute("role", "option");
            li.textContent = name;
            li.addEventListener("pointerdown", e => { e.preventDefault(); choose(name); });
            list.appendChild(li);
            items.push(li);
        });
        open();
    }

    input.addEventListener("input", () => { render(); onBuilderChange(); });
    input.addEventListener("focus", render);
    input.addEventListener("click", render);   // reopen when already focused
    input.addEventListener("blur", close);
    input.addEventListener("keydown", e => {
        if (list.hidden || !items.length) return;
        if (e.key === "ArrowDown"){ e.preventDefault(); setActive((active + 1) % items.length); }
        else if (e.key === "ArrowUp"){ e.preventDefault(); setActive((active - 1 + items.length) % items.length); }
        else if (e.key === "Enter" && active >= 0){ e.preventDefault(); choose(items[active].textContent); }
        else if (e.key === "Escape"){ close(); }
    });

    return { close, render };
}

const startAC = setupAutocomplete(inputStart, document.getElementById("startSuggest"));
const endAC   = setupAutocomplete(inputEnd,   document.getElementById("endSuggest"));


/* =====================================================================
   NEW: SWAP  (swaps the real input values, which CalculateFare reads)
   ===================================================================== */
document.getElementById("swapBtn").addEventListener("click", () => {
    const from = inputStart.value;
    inputStart.value = inputEnd.value;
    inputEnd.value = from;
    startAC.close(); endAC.close();
    // refresh the red "invalid" state without opening the dropdowns
    [[inputStart, startAC], [inputEnd, endAC]].forEach(([inp, ac]) => {
        const t = inp.value.trim().toLowerCase();
        const any = [...numCodes.keys()].some(n => n.toLowerCase().startsWith(t));
        inp.classList.toggle("invalid", t !== "" && !any);
    });
    onBuilderChange();
});


/* =====================================================================
   NEW: FORM SUBMIT -> existing CalculateFare()
   ===================================================================== */
document.getElementById("fareForm").addEventListener("submit", e => {
    e.preventDefault();
    startAC.close(); endAC.close();
    CalculateFare();
});

/* =====================================================================
   NEW: ROUTES SIDE PANEL
   Lists every location name from the existing numCodes database (names
   only, no codes). The tab slides the panel open/closed; interacting
   with the ticket builder always closes it again.
   ===================================================================== */
const ticketWrap  = document.getElementById("ticketWrap");
const routesTab   = document.getElementById("routesTab");
const routesList  = document.getElementById("routesList");

[...numCodes.entries()].sort((a, b) => a[1] - b[1]).forEach(([name]) => {
    const li = document.createElement("li");
    li.textContent = name; // name only, never the numeric code
    routesList.appendChild(li);
});

function setRoutesOpen(open){
    ticketWrap.classList.toggle("is-open", open);
    routesTab.setAttribute("aria-expanded", String(open));
}

routesTab.addEventListener("click", () => {
    setRoutesOpen(!ticketWrap.classList.contains("is-open"));
});

// Any interaction with the ticket builder closes the panel again.
document.getElementById("fareForm").addEventListener("click", () => setRoutesOpen(false));


// initial state
DisplayRate();
syncStub();
