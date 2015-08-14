/* Global React, UI, HYC */

// set up global HYC
if (typeof(HYC) === 'undefined') var HYC = {
	data: {},
	events: {},
	router: {},
};

// set up global UI
if (typeof(UI) === 'undefined') var UI = {
	admin: {
		modal: {},
		page: {}
	},
	common: {},
	section: {},
	main: {},
};

document.addEventListener('DOMContentLoaded', function(){
	HYC.router.init();
    // if you're on the admin page, render that
    if (document.getElementById('main')) {
	    console.groupCollapsed("Initializing router");
	    HYC.router.init();

	    for (var section in UI.section) {
	        if(UI.section.hasOwnProperty(section) && UI.section[section].register){
	            UI.section[section].register();
	        }
	    }
	    console.groupEnd();


        React.render(<UI.main.layout />, document.getElementById('main'));

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

    }
    window.onhashchange = function(){
        var loc = window.location.hash;
        if(loc.charAt(0) === '#') loc = loc.substr(1);
        HYC.events.publish('hashchange', loc);
	};
});