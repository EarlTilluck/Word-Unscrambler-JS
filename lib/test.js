var arr = ["one", "two", "three", "four"]

console.log(`${ arr.sort( (a,b) => {return b.length-a.length} ) }`);