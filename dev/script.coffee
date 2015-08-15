$ ->

	$tumblr = "http://api.tumblr.com/v2/blog/erichutchinson.tumblr.com/posts/text?api_key=fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4&callback=?"

	$.ajax $tumblr,
		type: 'GET'
		dataType: 'jsonp'
		success: (results) ->
			$.each results.response.posts, ->
				for tag in this.tags
					if tag = 'site'
						$('div.box.two').append('<div><h2>' + this.title + '</h2>' + this.body + '</div>')

	$.ajax
		url: 'http://api.bandsintown.com/artists/Eric%20Hutchinson/events.json?artist_id=fbid_14824581139&api_version=2.0&app_id=eh'
		type: 'GET'
		dataType: 'jsonp'
		success: (results) ->
			$.each results, ->
				date = this.datetime.split "T"
				show = date[0].split "-"
				region = this.venue.region
				if this.ticket_type is "Sold Out"
					tickets = '<span style="font-size: 1.2em; text-transform: uppercase; color: #333;">Sold Out</span>'
				else
					tickets = '<a class="btn" href="' + this.ticket_url + '" target="_blank" class="tickets"> '+this.ticket_type+' <i class="fa fa-ticket"></i></a>'

				switch this.venue.city
					when "Ridgefield" then vip_tix = '<a class="btn" target="_blank" href="https://letsgo.applauze.com/events/2944651">VIP <i class="fa fa-star"></i></a>'
					when "Pawling" then vip_tix = '<a class="btn" target="_blank" href="https://letsgo.applauze.com/events/2944653">VIP <i class="fa fa-star"></i></a>'
					when "Columbus" then vip_tix = '<a class="btn" target="_blank" href="https://letsgo.applauze.com/events/2944654">VIP <i class="fa fa-star"></i></a>'
					when "Grand Rapids" then vip_tix = '<a class="btn" target="_blank" href="https://letsgo.applauze.com/events/2944657">VIP <i class="fa fa-star"></i></a>'
					when "Des Moines" then vip_tix = '<a class="btn" target="_blank" href="https://letsgo.applauze.com/events/2944659">VIP <i class="fa fa-star"></i></a>'
					when "Fort Collins" then vip_tix = '<a class="btn" target="_blank" href="https://letsgo.applauze.com/events/2944660">VIP <i class="fa fa-star"></i></a>'
					when "Reno" then vip_tix = '<a class="btn" target="_blank" href="https://letsgo.applauze.com/events/2944661">VIP <i class="fa fa-star"></i></a>'
					when "Rialto" then vip_tix = '<a class="btn" target="_blank" href="https://letsgo.applauze.com/events/2944664">VIP <i class="fa fa-star"></i></a>'
					when "Louisville" then vip_tix = '<a class="btn" target="_blank" href="https://letsgo.applauze.com/events/2944667">VIP <i class="fa fa-star"></i></a>'
					when "Charlotte" then vip_tix = '<a class="btn" target="_blank" href="https://letsgo.applauze.com/events/2944669">VIP <i class="fa fa-star"></i></a>'
					when "Orlando" then vip_tix = '<a class="btn" target="_blank" href="https://letsgo.applauze.com/events/2944670">VIP <i class="fa fa-star"></i></a>'
					when "Charleston" then vip_tix = '<a class="btn" target="_blank" href="https://letsgo.applauze.com/events/2944671">VIP <i class="fa fa-star"></i></a>'
					when "Tucson" then vip_tix = '<a class="btn" target="_blank" href="https://letsgo.applauze.com/events/2944664">VIP <i class="fa fa-star"></i></a>'
					when "Napa" then vip_tix = '<a class="btn" target="_blank" href="https://letsgo.applauze.com/events/2944663">VIP <i class="fa fa-star"></i></a>'
					when "Glasgow" then region = 'UK'
					when "Manchester" then region = 'UK' 
					when "London" then region = 'UK'

				
				playing_with = [] 
				if this.artists.length == 1
					playing_with = 'Headline Show'
				else
					$.each this.artists, ->
						if this.name != 'Eric Hutchinson'
							playing_with.push(' '+this.name)


				$('<li><h2>' + show[1] + '-' + show[2] + '-' + show[0] + '</h2>
					<h3><span class="city">' + this.venue.city + ', ' + region + '</span> - ' + this.venue.name + '</h3>
					<p class="with">'+playing_with+'</p>	
					<p>' + tickets + '</p>
					<p>' + if vip_tix? then vip_tix + '</p></li>')
					.appendTo('div.shows ul')


	$form = $('#signup form')

	$form.submit (e)->
		e.preventDefault()
		$this = $(@)
		$.ajax
			type: "GET"
			url: 'http://erichutchinson.us7.list-manage.com/subscribe/post-json?u=c8c95e39b427209a753338e7a&amp;id=3e4a2c0d22&c=?'
			data: $this.serialize()
			dataType: 'json'
			contentType: "application/json; charset=utf-8"
			error: (err) ->
				alert 'no'
			success: (data) ->
				if ($('input[name=EMAIL]').val().indexOf('@') != -1 and $('input[name=EMAIL]').val().indexOf('.') != -1)
					$('.success').fadeIn(300).html('Thanks for signing up!<br>Check your inbox to confirm.').delay(5000).fadeOut(400)
				else
					alert 'not valid email'



	$('div.box.two').fitVids()


	track_url = "https://soundcloud.com/erichutchinson/good-rhythm"

	SC.initialize client_id: '76c33d87ae24fe5d535360c64f1d8920'

	SC.get "/tracks/205317089", (sound) ->
		$('h1.title').html(sound.title)
		$('#player p.share').append('<a class="retweet" href="javascript:void(0);"  onclick="openWindow(\'https://twitter.com/intent/tweet?button_hashtag=PureFiction&text='+track_url+'\', \'follow\',530,395);"><i class="fa fa-twitter"></i></a> <a class="retweet" href="javascript:void(0);"  onclick="openWindow(\'http://www.facebook.com/sharer/sharer.php?s=100&p[summary]=Stream%20Eric%20Hutchinson%27s%20New%20Single%20%22TELL%20THE%20WORLD%22&p[url]='+track_url+'\', \'follow\',530,395);"><i class="fa fa-facebook"></i></a>')
		SC.stream "/tracks/#{sound.id}", (player) ->
			$('ul.controls').on 'click','li', (e) ->
				if $(@).hasClass 'play'
					player.play()
					$(@).removeClass 'play'
					$(@).addClass 'pause'
					$(@).html('<i class="fa fa-pause"></i>')
				else
					player.pause()
					$(@).removeClass 'pause'
					$(@).addClass 'play'
					$(@).html('<i class="fa fa-play"></i>')


	$insta_url = 'https://api.instagram.com/v1/users/3076212/media/recent/?client_id=0feb2463fef845c99773226e55f31f6f&count=3&callback=?'

	displayInsta = (id) ->
		$('div#instagram ul#photos').append id

	callback = (list) -> displayInsta "<li><a href=\"#{$insta_url.link}\" target=\"_blank\"><img src=\"#{$insta_url.images.low_resolution.url}\"></a></li>" for $insta_url in list.data
	$.get $insta_url, {}, callback, 'json'



