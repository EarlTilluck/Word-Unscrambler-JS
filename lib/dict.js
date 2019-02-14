/**
 * Dict.js
 *  
 * Reads Alphabetical list of Scrabble words
 * Allows for matching random letters to existing words
 * Basically a scrabble / word game solver that can let you cheat.
 * 
 * @Author: Earl Tilluck
 */


const fs = require("fs");


/**
 *  Linked list Node.
 */
var Node = function() {
    this.words = [];
};


/**
 *  Dict
 *  Reads file, inserts word into linked tree (10 branches)
 */
var Dict = function() {

    // Array of Arrays, to store over 170000 words
    this.wordlist = [];

    // read the file with list of words insert into the above array
    fs.readFile("./myLib/TWL06.txt", "UTF-8", (err, data) => {

        if (err) {
            console.log("Error reading file: " + err.code);
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
            console.log(this.wordlist.length + " words read from file.");
            console.log(`Server Ready, Time Taken: ${ end - start } milliseconds`);

            /*
            console.log("start dump");
            var zlen = this.wordlist.length;
            var ylen = 0;
            var arrstring = `document.words = [`;
            while(zlen--) {
                var arr = this.wordlist[zlen];
                arrstring += "[ ";
                for(y=0; y<arr.length; y++) {
                    arrstring += `"${arr[y]}"`;
                    if(y<(arr.length-1)) {
                        arrstring+= ",";
                    }
                }
                arrstring+= " ]";
                if (zlen != 0) {
                    arrstring += ",";
                }
            }
            arrstring = arrstring + " ]";

            
            fs.writeFile("dict_array2.js", arrstring, (err) => {
                if(err) {
                    console.error(err);
                } else {
                    console.log("file written");
                }
            });
            */

        }
    });

    this.compareWords = () => {
        return("AAA" == "BBB");
    };

    this.sort = (unsorted_word) => {
        var arr = Array.from(unsorted_word);
        arr.sort();
        return arr;
    };

    this.test = () => {
        setTimeout(() => { 
        

            var delx = "sandwich";
            delx = delx.toUpperCase();
            delx = Array.from(delx);
            var num = 0;
            var match = false;

            var xlen = this.wordlist.length;
            var date1 = new Date();
            while (xlen--) {
                match = this.compareWords(this.wordlist[xlen], delx);
                //console.log( delx );
                if (match) {
                    num++;
                    console.log(this.wordlist[xlen]);
                } else {
                    //console.log(match + " no match... " + i);
                }
            }
            var date2 = new Date();
            console.log(num + " found, 1385 expected...");
            console.log(`Time taken: ${date2 - date1}` );
            

        }, 1000)
    };


    this.compareWords = (entry, inputted) => {
        var input = inputted.slice();
        var valid = true;

        // slim using ds method..


        for (en=0; en<entry.length; en++) {
            var found = false;
            for(ip=0; ip<input.length; ip++) {
                if(entry[en] == input[ip]) {
                    input[ip] = "*";
                    found = true;
                    break;
                } 
            }
            if (!found) {
                valid = false;
                break;
            }
        }
        //console.log(inputted);
        //console.log(valid);
        return valid;
    };

    

};


module.exports = Dict;