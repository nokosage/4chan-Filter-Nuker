// ==UserScript==
// @name         4chan Filter Nuker
// @version      1.0.0
// @namespace    nokosage
// @description  Nukes comments made to filtered posts, like the filtered post was never there.
// @author       nokosage
// @include      *://boards.4chan.org/*
// @run-at       document-start
// ==/UserScript==
(function() {
	var jq = document.createElement('script');
	jq.src = "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
	document.getElementsByTagName('head')[0].appendChild(jq);
	
	$ = jQuery.noConflict();
	
	function nukeComments() {
		$(".postMessage > .filtered").each(function() {
			com = $(this.parentNode).html().split(/<br\s*\/?>/);
			
			filtered = true;
			filtering = false;
			for (idx = 0; idx < com.length && filtered; idx++) {
				if (com[idx].lastIndexOf('<a', 0) === 0 && com[idx].indexOf('filtered"') > -1) 
					filtering = true;
				else if (com[idx].lastIndexOf('<a', 0) === 0 && com[idx].indexOf('quotelink"') > -1)
					filtering = false;
				
				if (filtering){
					com[idx] = '';
				}
			}
			
			$(this.parentNode).html('').html(function() {
				comment = '';
				for (idx = 0; idx < com.length && filtered; idx++) {
					if (com[idx] !== '') comment += com[idx] + '<br/>';
				}
				return comment;
			});
		});
	)

	document.addEventListener('NamesSynced', nukeComments);
}).call(this);