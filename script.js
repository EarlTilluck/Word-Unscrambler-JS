// variables to be used.
var words;
var timer;
var the_results;


// compare two words and see if the gword is found in inpt
// returns true or false
function compareWords (entry, inpt) {
    var valid = true;
    var prev_selected = [];
    var enlen = entry.length;
    var inlen; 
    var found;
    while (enlen--) { // proceed through each letter of known word and...
        found = false;
        inlen = inpt.length;
        while(inlen--) { // for each inputted letter...
            // check if it was matched before...
            if (prev_selected[inlen] !== true) {  
                // if not, check if this is a match...
                if(entry[enlen] == inpt[inlen]) { 
                    prev_selected[inlen] = true;  //mark it,
                    found = true;
                    break; // then proceed to next letter in known word
                }
            }
        }
        // break as soon as there is a letter in the known word 
        // that isn't in the input, since there is no need to continue
        // as this word cannot be formed with input letters.
        if(!found) { 
            valid = false;
            break;
        }
    }

    return valid;
}




function getwords() {
    console.log('checking...');

    // get input from textbox 
    var temp = Array.from(document.getElementById("textinput").value.toUpperCase());
    // and div to put results
    var resultDiv =  document.getElementById("results");
    // create element to insert into resutls div
    var resultsInner = document.createElement("div");
    
    the_results = [];
    var numFound = 0;    
    var start = new Date();
    var wlen = words.length;;
    while(wlen--) {
        var isfound = compareWords(words[wlen], temp);
        if (isfound) {
            numFound++;
            the_results.push(words[wlen]);
            /*
            var newMatch = document.createElement("p");
            newMatch.innerHTML = `${words[wlen].join("")} (${words[wlen].length}).`;
            resultsInner.appendChild(newMatch); 
            */
        }
    }
    for(x=15; x>=2; x--) {
        for(y=0; y<the_results.length; y++) {
            if(the_results[y].length == x) {
                var newMatch = document.createElement("p");
                newMatch.innerHTML = `${the_results[y].join("")} (${the_results[y].length}).`;
                resultsInner.appendChild(newMatch); 
            }
        }
    }
    
    resultDiv.innerHTML = "";
    resultDiv.appendChild(resultsInner);
    var end = new Date();
    document.getElementById("stats").innerHTML = 
        `${numFound} words found, time approx: ${end - start} milliseconds`;
}


// when the user enters text, after a second perform a search automaticially
function getwordsdelayed() {
    if (document.getElementById("textinput").value != "" ) {
        clearTimeout(timer);
        timer = setTimeout(getwords, 1000);
    }
}


window.onload = function() {
    // dictionary array is attached to the document object via another script
    words = document.words;
    // attach events to elements
    document.getElementById("btn").onclick = getwords;
    document.getElementById("textinput").onkeyup = getwordsdelayed;
    document.getElementById("textinput").onclick = function() {
        this.value = "";
    };
   
};