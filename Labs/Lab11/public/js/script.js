
(function ($) {

	// Page load:
	var requestConfigLinkClicked = {
		method: 'GET',
		url: 'http://api.tvmaze.com/shows'
	};
	$.ajax(requestConfigLinkClicked).then(function(responseMessage) {
		$('#error').hide();
		$('#showList').hide();
		$('#show').hide();
		$('#homeLink').hide();

		for (let i = 0; i < responseMessage.length; i++) { 
			let li = `<li> <a class="clickedLink" href='${responseMessage[i]._links.self.href}'>${responseMessage[i].name}</a></li>`
			$('#showList').append(li); 
		}

		$('#showList').show();

		$('a.clickedLink').on('click', function (event) {
			event.preventDefault();
			$('#show').empty();
			$('#showList').hide();
			// Source: https://stackoverflow.com/questions/15661343/check-if-event-target-is-hyperlink
			onclicklink(event.target.href);
			$('#show').show();
			$('#homeLink').show();
		});

	});

	// 2. Search Form Submission
	$('#searchForm').submit(function (event) {
		event.preventDefault();
	
		if ($('#search_term').val() && $('#search_term').val().trim().length > 0) {

			$('#error').hide();
			$('#showList').empty();
			$('#show').hide();
			$('#homeLink').hide();
			
			var requestConfigFormSubmission = {
				method: 'GET',
				url: 'http://api.tvmaze.com/search/shows?q=' + $('#search_term').val()
			};

			$.ajax(requestConfigFormSubmission).then(function (responseMessage) {
				
				for (let i = 0; i < responseMessage.length; i++) { 
					let li = `<li> <a class="clickedLink" href='${responseMessage[i].show._links.self.href}'>${responseMessage[i].show.name}</a></li>`
					$('#showList').append(li); 
				}
				$('#showList').show();

				$('a.clickedLink').on('click', function (event) {
					event.preventDefault();
					$('#showList').hide();
					$('#show').empty();
					// Source: https://stackoverflow.com/questions/15661343/check-if-event-target-is-hyperlink
					onclicklink(event.target.href);
					$('#show').show();
					$('#homeLink').show();
				});
			});

		}
		else {
			$('#error').show();
            $('#error').html('You must enter an input value');
            $('#search_term').focus();
            $('#search_term').value= "";
		}
	});

	// Link Clicked
	function onclicklink(clicked_link) {

		var requestConfigLinkClicked = {
			method: 'GET',
			url: clicked_link
		};

		$.ajax(requestConfigLinkClicked).then(function(responseMessage) {

			let name;
			let language;
			let genres;
			let rating;
			let network;
			let summary;
			let image;

			if(!responseMessage.name || responseMessage.name.trim() == "") {
				name = "N/A";
			}
			else {
				name = responseMessage.name;
			}

			if(!responseMessage.language) {
				language = "N/A";
			}
			else {
				language = responseMessage.language;
			}

			if(!responseMessage.genres || responseMessage.genres.length == 0) {
				genres = ["N/A"];
			}
			else {
				genres = responseMessage.genres;
			}

			if (responseMessage.rating && !responseMessage.rating.average) {
				rating = "N/A";
			}
			if (responseMessage.rating && responseMessage.rating.average) {
				rating = responseMessage.rating.average;
			}

			if (responseMessage.network) {
				if (!responseMessage.network.name) {
					network = "N/A";
				}
				else{
					network = responseMessage.network.name;
				}
			}
			else {
				network = "N/A";
			}

			if(!responseMessage.summary) {
				summary = "N/A";
			}
			else {
				summary = responseMessage.summary;
			}

			if (responseMessage.image) {
				if (responseMessage.image.medium) {
					image = responseMessage.image.medium;
				}
				else{
					image = "/public/no_image.jpeg";
				}
			}
			else {
				image = "/public/no_image.jpeg";
			}

			let genres_list = "";
			for (let i = 0; i < genres.length; i++) {
				genres_list = genres_list + " <li>" +  genres[i] +  "</li> ";
			}

			let html = 
				`<h1>${name}</h1>
				<img alt=${name} src="${image}"/>
				<dl>
					<dt>Language</dt>
						<dd>${language}</dd>
					<dt>Genres</dt>
						<dd>
							<ul>
								${genres_list}
							</ul>
						</dd>
					<dt>Average Rating</dt>
						<dd>${rating}</dd>
					<dt>Network</dt>
						<dd>${network}</dd>
					<dt>Summary</dt>
						<dd>${summary}</dd>
				</dl>`

			$('#show').append(html);
		});
	}

})(window.jQuery);