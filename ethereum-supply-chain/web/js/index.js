// jQuery.ajaxSetup({ async: true, cache: false });

$(document).ready(function () {
    $('.tabs').tabs()
    $('.tabs').tabs('updateTabIndicator')
    // $('#pageContent').load('../parts.html')
    function reload_js (src) {
        console.log("going for script")
        $('script[src="' + src + '"]').remove();
        $('<script>').attr({ src: src, type: 'module', async: false }).appendTo('#scripts');
    }
    $.ajax({
        url: "/parts.html",
        cache: false,
        async: false,
        dataType: "html",
        success: function (data) {
            $("#pageContent").html(data);
            reload_js('js/parts.js?cachebuster=' + new Date().getTime());
        }
    });

    // $.ajax({
    //     url: "js/parts.js",
    //     cache: false,
    //     async: false,
    //     dataType: "module",
    // });

    $("ul.tabs").on('click', '#parts_view', function () {
        console.log('clicked parts')
        $("#pageContent").empty();
        // $('#pageContent').load('../parts.html')

        $.ajax({
            url: "/parts.html",
            async: false,
            cache: false,
            dataType: "html",
            success: function (data) {
                console.log('loaded parts')
                // $("#pageContent div").empty();
                $("#pageContent").html(data);
                reload_js('js/parts.js?cachebuster=' + new Date().getTime());
            }
        });
    })

    $("ul.tabs").on('click', '#products_view', function () {
        console.log('clicked products')
        $("#pageContent").empty();
        // $('#pageContent').load('../computer.html')
        $.ajax({
            url: "/computer.html",
            async: false,
            cache: false,
            dataType: "html",
            success: function (data) {
                $("#pageContent").html(data);
                reload_js('js/computer.js?cachebuster=' + new Date().getTime());
            }
        });
        // $.ajax({
        //     url: "js/computer.js",
        //     cache: false,
        //     async: false,
        //     dataType: "module",
        // });
        // $('#pageContent').load('../computer.html')
    })

    $("ul.tabs").on('click', '#dealer_view', function () {
        console.log('clicked dealer')
        $("#pageContent").empty();
        // $('#pageContent').load('../dealer.html')
        $.ajax({
            url: "/dealer.html",
            async: false,
            cache: false,
            dataType: "html",
            success: function (data) {
                $("#pageContent").html(data);
                reload_js('js/dealer.js?cachebuster=' + new Date().getTime());
            }
        });
        // $.ajax({
        //     url: "js/dealer.js",
        //     cache: false,
        //     async: false,
        //     dataType: "module",
        // });
    })
})
