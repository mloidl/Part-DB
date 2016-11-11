/*jslint browser: true*/
/*global $, jQuery, alert*/

function openLink(page) {
    'use strict';
    $("#main").load(page + " #content");
    //window.history.pushState(null, "", page);
}

function loadLink(object) {
    'use strict';
    //var link = object.getAttribute("href");
    //$("#main").load(link + " #content");
    //window.history.pushState(null, "", link);
    
}

function registerLinks() {
    'use strict';
    $("a").click(function (event) {
        event.preventDefault();
        var a = $(this),
            href = a.attr("href");
        $("#main").load(href + " #content");
        return false;
    });
}

//Called when Form submit was submited
function showFormResponse(responseText, statusText, xhr, $form) {
    'use strict';
    $("#main").html($(responseText).find("#content")).fadeIn('slow');
}

function registerForm() {
    'use strict';
    
    var data = {
        success:  showFormResponse
    };
    
    $('form').ajaxForm(data);
}

function tree_fill() {
    'use strict';
    $.getJSON('./api_json.php/api_json.php?mode="tree_category"', function (tree) {
        $('#tree-categories').treeview({data: tree, enableLinks: true, showBorder: true});
        $('#tree-categories').treeview('collapseAll', { silent: true });
    });
    
    $.getJSON('./api_json.php/api_json.php?mode="tree_devices"', function (tree) {
        $('#tree-devices').treeview({data: tree, enableLinks: true, showBorder: true});
        $('#tree-devices').treeview('collapseAll', { silent: true });
    });
}

$(document).ready(function () {
    'use strict';
    var page = window.location.pathname;
    
    //Only load start page when on index.php (and no content is loaded already)!
    if (page.indexOf(".php") === -1 || page.indexOf("index.php") !== -1) {
        openLink("startup.php");
    }
    tree_fill();
    registerForm();
    registerLinks();
    
    
    
    
});

function makeSortTable() {
    'use strict';
    
    if (!$.fn.DataTable.isDataTable('#parts-table')) {
        $('#parts-table').DataTable({
            "paging":   false,
            "ordering": true,
            "info":     false,
            "searching":   false,
            "order": [],
            "columnDefs": [ {
                "targets"  : 'no-sort',
                "orderable": false
            }]
        });
        
    }
}

//Make back in the browser go back in history
window.onpopstate = function (event) {
    'use strict';
    var page = location.href;
    //Go back only when the the target isnt the empty index.
    if (page.indexOf(".php") !== -1 && page.indexOf("index.php") === -1) {
        $("#main").load(location.href + " #content");
    }
};


$(document).ajaxComplete(function (event, xhr, settings) {
    'use strict';
    //makeSortTable();
    registerLinks();
    registerForm();
    
    //Push only if it was a "GET" request and requested data was an HTML
    if (settings.type.toLowerCase() !== "post" && settings.dataType === "html") {
        window.history.pushState(null, "", settings.url);
    }
});


//Called when an error occurs on loading ajax
$(document).ajaxError(function (event, request, settings) {
    'use strict';
    
});
