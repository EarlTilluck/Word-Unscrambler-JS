
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
        (results.length-1) +
        " results in: " + results[results.length-1] + 
        "ms on server, " + (end-start) + "ms total"
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
        search($('#search-input').val());
    },2000);
}


/**
 * click events etc.
 */
$(document).ready(function() {
    $('#btn-search').click(function() {
        clearTimeout(timer);
        search($('#search-input').val());
    });
    $('#search-input').keyup(function() {
        getResultsDelayed();
    }); 
    $('#fdate').html(new Date().getFullYear());   
});