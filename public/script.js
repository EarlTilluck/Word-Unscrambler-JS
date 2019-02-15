
/**
 * display results on page, as well as time it took
 * 
 * @param date start 
 * @param array results 
 */
function showResults(start, results) {
    // clear div
    $("#results").html('');
    // loop and append results as div, adding the length of each word.
    var len = results.length - 1;
    for(i=0; i<len; i++) {
        var elem = document.createElement("div");
        var p = document.createElement("p");
        p.innerHTML = results[i] + " (" + results[i].length +")";
        elem.appendChild(p);
        $("#results").append(elem);
    }
    // show stats (time taken)    
    var end = new Date();
    $("#stats").html(
        "time:<br/>" + results[results.length-1] + 
        "ms on server.<br/>" + (end-start) + "ms total"
    );
}

/**
 * perform ajax call to retrieve search results
 * 
 * @param string inpt   search string
 */
function search(inpt) {
    // time tracking
    var start = new Date();
    
    // request results from -domain-/search/inpt
    var jqxhr = $.ajax({ 
        url: "/search/" + inpt, 
        dataType: 'json'
    })
    .done(function(data) {
        showResults(start, JSON.parse(data));
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.log("search error: " + errorThrown);
    });

}

var timer;
function getResultsDelayed() {
    clearTimeout(timer);
    timer = setTimeout(function() {
        search($('#textinput').val());
    },2000);
}


/**
 * click events etc.
 */
$(document).ready(function() {
    $('#btn').click(function() {
        clearTimeout(timer);
        search($('#textinput').val());
    });
    $('#textinput').keyup(function() {
        getResultsDelayed();
    });    
});