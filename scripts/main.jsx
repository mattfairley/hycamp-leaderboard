/* Global React, UI, HYC */

if (typeof(HYC) === 'undefined') var HYC = {};

document.addEventListener('DOMContentLoaded', function(){
	HYC.router.init();
    // if you're on the admin page, render that
    if (document.getElementById('main')) {


    } else {
	    console.groupCollapsed("Initializing router");
	    HYC.router.init();

	    for (var page in UI.admin.page) {
	        if(UI.admin.page.hasOwnProperty(page) && UI.admin.page[page].register){
	            UI.admin.page[page].register();
	        }
	    }
	    console.groupEnd();


        React.render(<UI.admin.layout />, document.getElementById('admin'));

        window.onhashchange = function(){
	        var loc = window.location.hash;
	        if(loc.charAt(0) === '#') loc = loc.substr(1);
	        HYC.events.publish('hashchange', loc);
    	};
    }
});