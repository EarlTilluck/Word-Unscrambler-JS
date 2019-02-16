# Word Unscrambler JS
A web application that allows you to unscramble words from a random selection of letters.  
Useful for cheating scrabble, bookworm adventures and other word games. 

### If you have suggestions on how to improve this project, I am very interested to know.

### todo:
* add code for errors (/search/nothing or /search/1234)
* display 20 items per page (js or bootstrap carousel)
* Update web page (css)
* improve algorithm?
* read and check on how to avoid blocking.
* how to stress test application?

### Instructions
This is a node server application that uses express

run ```npm install``` then ```node app```

visit http://localhost:5000/ in dev environment.

also available live @ [~~This website (not live yet~~)](https://www.google.com)

### Why?
It is an interesting problem that may require a data structure and some clever thinking.  
I also wanted to cheat my favourite word game.

### How?
Instead of using a database, I keep a two dimensional array of [words][letters] in memory for searching.  

### What I learned...
* reading files with fs
* promises

### More
Original TWL06 text file downloaded from [Here](https://opusthepenguin.wordpress.com/2011/05/19/sowpods-vs-twl/)
