(function() {
  $(function() {
    var $form, $insta_url, $tumblr, callback, displayInsta, track_url;
    $tumblr = "http://api.tumblr.com/v2/blog/erichutchinson.tumblr.com/posts/text?api_key=fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4&callback=?";
    $.ajax($tumblr, {
      type: 'GET',
      dataType: 'jsonp',
      success: function(results) {
        return $.each(results.response.posts, function() {
          var tag, _i, _len, _ref, _results;
          _ref = this.tags;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            tag = _ref[_i];
            if (tag = 'site') {
              _results.push($('div.box.two').append('<div><h2>' + this.title + '</h2>' + this.body + '</div>'));
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        });
      }
    });
    $.ajax({
      url: 'http://api.bandsintown.com/artists/Eric%20Hutchinson/events.json?artist_id=fbid_14824581139&api_version=2.0&app_id=eh',
      type: 'GET',
      dataType: 'jsonp',
      success: function(results) {
        return $.each(results, function() {
          var date, playing_with, region, show, tickets, vip_tix;
          date = this.datetime.split("T");
          show = date[0].split("-");
          region = this.venue.region;
          if (this.ticket_type === "Sold Out") {
            tickets = '<span style="font-size: 1.2em; text-transform: uppercase; color: #333;">Sold Out</span>';
          } else {
            tickets = '<a class="btn" href="' + this.ticket_url + '" target="_blank" class="tickets"> ' + this.ticket_type + ' <i class="fa fa-ticket"></i></a>';
          }
          switch (this.venue.city) {
            case "Ridgefield":
              vip_tix = '<a class="btn" target="_blank" href="https://letsgo.applauze.com/events/2944651">VIP <i class="fa fa-star"></i></a>';
              break;
            case "Pawling":
              vip_tix = '<a class="btn" target="_blank" href="https://letsgo.applauze.com/events/2944653">VIP <i class="fa fa-star"></i></a>';
              break;
            case "Columbus":
              vip_tix = '<a class="btn" target="_blank" href="https://letsgo.applauze.com/events/2944654">VIP <i class="fa fa-star"></i></a>';
              break;
            case "Grand Rapids":
              vip_tix = '<a class="btn" target="_blank" href="https://letsgo.applauze.com/events/2944657">VIP <i class="fa fa-star"></i></a>';
              break;
            case "Des Moines":
              vip_tix = '<a class="btn" target="_blank" href="https://letsgo.applauze.com/events/2944659">VIP <i class="fa fa-star"></i></a>';
              break;
            case "Fort Collins":
              vip_tix = '<a class="btn" target="_blank" href="https://letsgo.applauze.com/events/2944660">VIP <i class="fa fa-star"></i></a>';
              break;
            case "Reno":
              vip_tix = '<a class="btn" target="_blank" href="https://letsgo.applauze.com/events/2944661">VIP <i class="fa fa-star"></i></a>';
              break;
            case "Rialto":
              vip_tix = '<a class="btn" target="_blank" href="https://letsgo.applauze.com/events/2944664">VIP <i class="fa fa-star"></i></a>';
              break;
            case "Louisville":
              vip_tix = '<a class="btn" target="_blank" href="https://letsgo.applauze.com/events/2944667">VIP <i class="fa fa-star"></i></a>';
              break;
            case "Charlotte":
              vip_tix = '<a class="btn" target="_blank" href="https://letsgo.applauze.com/events/2944669">VIP <i class="fa fa-star"></i></a>';
              break;
            case "Orlando":
              vip_tix = '<a class="btn" target="_blank" href="https://letsgo.applauze.com/events/2944670">VIP <i class="fa fa-star"></i></a>';
              break;
            case "Charleston":
              vip_tix = '<a class="btn" target="_blank" href="https://letsgo.applauze.com/events/2944671">VIP <i class="fa fa-star"></i></a>';
              break;
            case "Tucson":
              vip_tix = '<a class="btn" target="_blank" href="https://letsgo.applauze.com/events/2944664">VIP <i class="fa fa-star"></i></a>';
              break;
            case "Napa":
              vip_tix = '<a class="btn" target="_blank" href="https://letsgo.applauze.com/events/2944663">VIP <i class="fa fa-star"></i></a>';
              break;
            case "Glasgow":
              region = 'UK';
              break;
            case "Manchester":
              region = 'UK';
              break;
            case "London":
              region = 'UK';
          }
          playing_with = [];
          if (this.artists.length === 1) {
            playing_with = 'Headline Show';
          } else {
            $.each(this.artists, function() {
              if (this.name !== 'Eric Hutchinson') {
                return playing_with.push(' ' + this.name);
              }
            });
          }
          return $('<li><h2>' + show[1] + '-' + show[2] + '-' + show[0] + '</h2> <h3><span class="city">' + this.venue.city + ', ' + region + '</span> - ' + this.venue.name + '</h3> <p class="with">' + playing_with + '</p> <p>' + tickets + '</p> <p>' + (vip_tix != null ? vip_tix + '</p></li>' : void 0)).appendTo('div.shows ul');
        });
      }
    });
    $form = $('#signup form');
    $form.submit(function(e) {
      var $this;
      e.preventDefault();
      $this = $(this);
      return $.ajax({
        type: "GET",
        url: 'http://erichutchinson.us7.list-manage.com/subscribe/post-json?u=c8c95e39b427209a753338e7a&amp;id=3e4a2c0d22&c=?',
        data: $this.serialize(),
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        error: function(err) {
          return alert('no');
        },
        success: function(data) {
          if ($('input[name=EMAIL]').val().indexOf('@') !== -1 && $('input[name=EMAIL]').val().indexOf('.') !== -1) {
            return $('.success').fadeIn(300).html('Thanks for signing up!<br>Check your inbox to confirm.').delay(5000).fadeOut(400);
          } else {
            return alert('not valid email');
          }
        }
      });
    });
    $('div.box.two').fitVids();
    track_url = "https://soundcloud.com/erichutchinson/good-rhythm";
    SC.initialize({
      client_id: '76c33d87ae24fe5d535360c64f1d8920'
    });
    SC.get("/tracks/205317089", function(sound) {
      $('h1.title').html(sound.title);
      $('#player p.share').append('<a class="retweet" href="javascript:void(0);"  onclick="openWindow(\'https://twitter.com/intent/tweet?button_hashtag=PureFiction&text=' + track_url + '\', \'follow\',530,395);"><i class="fa fa-twitter"></i></a> <a class="retweet" href="javascript:void(0);"  onclick="openWindow(\'http://www.facebook.com/sharer/sharer.php?s=100&p[summary]=Stream%20Eric%20Hutchinson%27s%20New%20Single%20%22TELL%20THE%20WORLD%22&p[url]=' + track_url + '\', \'follow\',530,395);"><i class="fa fa-facebook"></i></a>');
      return SC.stream("/tracks/" + sound.id, function(player) {
        return $('ul.controls').on('click', 'li', function(e) {
          if ($(this).hasClass('play')) {
            player.play();
            $(this).removeClass('play');
            $(this).addClass('pause');
            return $(this).html('<i class="fa fa-pause"></i>');
          } else {
            player.pause();
            $(this).removeClass('pause');
            $(this).addClass('play');
            return $(this).html('<i class="fa fa-play"></i>');
          }
        });
      });
    });
    $insta_url = 'https://api.instagram.com/v1/users/3076212/media/recent/?client_id=0feb2463fef845c99773226e55f31f6f&count=3&callback=?';
    displayInsta = function(id) {
      return $('div#instagram ul#photos').append(id);
    };
    callback = function(list) {
      var _i, _len, _ref, _results;
      _ref = list.data;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        $insta_url = _ref[_i];
        _results.push(displayInsta("<li><a href=\"" + $insta_url.link + "\" target=\"_blank\"><img src=\"" + $insta_url.images.low_resolution.url + "\"></a></li>"));
      }
      return _results;
    };
    return $.get($insta_url, {}, callback, 'json');
  });

}).call(this);
