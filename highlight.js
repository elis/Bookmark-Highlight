jQuery(function() {

	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	var links = $('a[href]');
//	var container = $('<ul/>').attr('id', 'linksContainer').appendTo('body');

	if (links.length > 0) {
		var sendLinks = [];
		for (var i = 0; i < links.length; ++i) {
			var link = links[i],
				text = link.innerHTML,
				href = link.href;

			sendLinks[i] = {
				'href': href,
				'text': text.toString(),
				'id': i
			};
		}

		chrome.extension.sendRequest({act: 'checkLinks', links: sendLinks}, function(response) {
			if (response.length > 0) {
				var i = response.length;
				while (--i) {
					var link = response[i].link,
						bookmark = response[i].bookmark;
					var dt = new Date(bookmark.dateAdded);
					
					var theString = "Date added: <span class='data'>";
					theString += dt.getDate()+' '+months[dt.getMonth()]+' '+dt.getFullYear();
					theString += "</span> Title: <span class='title'>" + bookmark.title + "</span>";
					
					var docLink = $(links[link.id]);
					docLink.tipsy({
						gravity: $.fn.tipsy.autoNS,
						html: true,
						title: theString
					});

					docLink[0].showTipsy();
					docLink.data('tip').fadeTo('fast', 0.1);
					docLink.hover(function () {
						$(this).data('tip').fadeTo('fast', 1);
					},
					function () {
						$(this).data('tip').fadeTo('fast', 0.1);
					});

				}
			}
		});
	}

});










