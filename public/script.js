
// track current page (soft page)
var page = 1;

/**
 * @desc showpage function paginates the
 * results and views them 15 at a time.
 * 
 */
function showpage() {
    // set all results to hidden
    var results = $('#results > div');
    results.addClass("hidden");
    // show results for current page range,
    // e.g. pg1 = 0..14, pg2 = 15..29
    var len = results.length;
    var start = ((page-1)*15);
    var end = start + 14; 
    for (i=start; i<=end; i++) {
        if(i>=0 && i<len) {
            results.eq(i).removeClass("hidden");
        }
    }
    // show current page
    var totalpages = Math.ceil(((len-1)/15));
    if(totalpages>0) {
        $("#pg").html(
            "page " + page + " of " + totalpages
        );
    }
    console.log((start) + " ... " + (end));
    // disable relevant button if on first or last page.
    var prevbtn = $("#prev");
    var nextbtn = $("#next");
    prevbtn.addClass("invis");
    nextbtn.addClass("invis");
    if (start>0) {
        prevbtn.removeClass("invis");
    }
    if (end<len-1) {
        nextbtn.removeClass("invis");
    }
}

/**
 * @desc next and prev functions set the page
 * and calls the showpage function
 * 
 */
function next() {
    page++;
    showpage();
}

function prev() {
    page--;
    showpage();
}

/**
 * @desc    shows an error on page,
 * hides it after a while.
 */
var errTimer;
function showError(error) {
    clearTimeout(errTimer);
    var err = $("#err");
    err.html(error);
    err.animate({ opacity: 1 })
    errTimer = setTimeout(function() {
        err.animate({ opacity: 0 });
    }, 3000);
}


/**
 * @desc appends a result to the result div (list)
 * @param string res    a matched word result
 * @param number len    length of the matched word 
 */
function appendResult(res, len) {
    var elem = document.createElement("div");
    var p = document.createElement("p");
    if(len > 0) {
        res = res + " (" + len +")";
    }
    p.innerHTML = res;
    elem.appendChild(p);
    $(elem).addClass("hidden");
    $("#results").append(elem);
}


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
        appendResult(results[i], results[i].length);
    }
    // show stats (time taken)    
    var end = new Date();
    var total = results.length-1;
    $("#stats").html(
        total + " results in: " + results[results.length-1] + "ms on server, " + (end-start) + "ms total."
    );
    // display first page
    page = 1;
    showpage();
}

/**
 * perform ajax call to retrieve search results
 * 
 * @param string inpt   search string
 */
function search(inpt) {
    //clear error if still visible
    showError("");
    // don't search if letters are less than 3
    if(inpt.length > 2) {
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
    } else {
        showError("3 letters or more required.");
    }
}
/**
 * @desc    perform a search after 2 seconds.
 * When the user is typing text, we want to 
 * perform a search, only when the user is done.
 * Prevents firing the event multiple times for
 * each keyup trigger.
 */
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
    
    $('#next').click(function() {
        next();
    });
    $('#prev').click(function() {
        prev();
    });

});