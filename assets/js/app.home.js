Application.Controller.Home = (function($) {

	function init() {

		// This function will be called for all methods in controller='home'
		$('.starter-template h1').html('We are at: '+ Application.vars.controller + '/' + Application.vars.method);
	}

    function index() {

    	// This function will be called for only method='index' in controller='home'

        Application.alert('index');
    }

    function about() {

        Application.alert('about');
    }

    function contact() {

        Application.alert('contact');
    }

    return {

    	'init'  	: init,
        'index' 	: index,
        'about'		: about,
        'contact'	: contact
    };

})(jQuery);
