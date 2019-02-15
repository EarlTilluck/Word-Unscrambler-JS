/**
 * Dict.js
 *  
 * Reads Alphabetical list of Scrabble words
 * Allows for matching random letters to existing words
 * E.g. given "batc", you will get "cat", "bat", "tab" etc.. 
 *       
 * @author  Earl Tilluck
 */

const fs = require("fs");

var Dict = function() {

    // Array of Arrays, to store the dictionary of worlds (over 170000)
    this.wordlist = [];
    // ready flag (not used)
    this.ready = false;

    /**
     * @desc when this object is constructed, it will read the
     * file with the list of words insert into the above array
     */
    fs.readFile("./lib/TWL06.txt", "UTF-8", (err, data) => {

        if (err) {
            console.log(`error reading file: ${err.code} `);
            console.error(err);
        } else {

            var start = new Date();

            // split data into array or strings
            this.wordlist = data.split("\n");

            // trim the entries and convert into arrays
            var len = this.wordlist.length;
            while (len--) {
                this.wordlist[len] = Array.from(this.wordlist[len].trim());
            }

            var end = new Date();

            // alert in console, this part done.
            this.ready = true;
            console.log(`Dictionary Ready, ${this.wordlist.length} words in ${ end - start } milliseconds.`);
        }
    });

    /**
     * @desc compare a dictionary word (array of letters) with
     * a scrambled selection of letters (also array) to find
     * if there is a match. The dictionary word can be smaller 
     * than the total number of scrambled letters. 
     * 
     * @param entry     known dictionary word. e.g. sandwich
     * @param inpt      scramble input. e.g. andwichsabc
     */
    this.compare = (entry, inpt) => {
        var valid = true;
        var prev_selected = [];
        var enlen = entry.length;
        var inlen; 
        var found;
        while (enlen--) { // proceed through each letter of known word and...
            found = false;
            inlen = inpt.length;
            while(inlen--) { // for each inputted scramble letter...
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
    };

    this.test = () => {
        return {hello: "test is working"}
    }

    /**
     * Returns array of matched words.
     * 
     * @param inpt      scramble input, retrieved from get request
     */
    this.search = (inpt) => {
    
        var search_start = new Date();
        inpt = Array.from(inpt.trim().toUpperCase());
        
        the_results = [];
        var numFound = 0;    
        var start = new Date();
        var words = this.wordlist;
        var wlen = words.length;

        // loop through our dictionary array and push matches to results array
        while(wlen--) {
            var isfound = this.compare(words[wlen], inpt);
            if (isfound) {
                numFound++;
                the_results.push(words[wlen].join(''));
            }
        }
        // sort the results in descending order, by lenght. > this can be done on the client instead
        the_results.sort( (a,b) => {return b.length-a.length});

        // add the milliseconds it took to the end of the array
        the_results.push( (new Date()) - search_start) ; 
        
        return the_results;
    }
    

}; // end function Dict


module.exports = Dict;