$(document).ready(function() {

  $("button").click(function() {
    $("button").removeClass("selected");
    $(this).addClass("selected");

    var flickrApi = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
    var searchTerm = $(this).text().toLowerCase();

    if (searchTerm == "city") {
      $.get("http://ipinfo.io", function(IpInfoRsp) { $(".selected").text(IpInfoRsp.city); }, "jsonp");
    }
    else if (searchTerm == "region") {
       $.get("http://ipinfo.io", function(IpInfoRsp) { $(".selected").text(IpInfoRsp.region); }, "jsonp");
    };

    var flickrOptions = {
      tags: $(".selected").text(),
      format: "json"
    };

    function callback(flickrRsp) {
        var list = "<ul>";
        $.each(flickrRsp.items, function(idx, photo) {
            list += "<li>";
            list += "<a href='" + photo.link + "'>";
            list += "<img src='" + photo.media.m + "'></a></li>";
        });
        list += "</ul>";
        $("<div class='img-container'></div>").appendTo("#photos");
        $(".img-container").html(list);
      }

    $.getJSON(flickrApi, flickrOptions, callback);
  });

});
