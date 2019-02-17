# Word Unscrambler JS
A web application that allows you to unscramble words from a random selection of letters.  
Useful for cheating scrabble, bookworm adventures and other word games. 

#### If you have suggestions on how to improve this project, I am very interested to know.

### Instructions
This is a node server application that uses express

run ```npm install``` then ```node app```

visit http://localhost:5000/ in dev environment.

also available live @ [~~This website (not live yet~~)](https://www.google.com)

### Why?
* It is an interesting problem that may require a data structure and some clever thinking.  
* I also wanted to cheat my favourite word game.

### How?
I consider various data structures, but ultimatley decide to use a two dimensional array of [words][letters] in memory for searching. I try to keep the application light.  

### What I learned...
* NodeJS, SASS

### Future Improvements
> I may get back to this in the future, but for now I am done.
* A better algorithm or data structure to ease stress on server. (would a database help?)
* Will this app block users on high traffic?

### More
>TWL06 is a dictionary of approved scrabble words that can be used in USA scrabble tournaments.

The TWL06 text file was retrieved from [Here](https://opusthepenguin.wordpress.com/2011/05/19/sowpods-vs-twl/)
