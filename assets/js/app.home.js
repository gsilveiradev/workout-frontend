Application.Controller.Home = (function($) {

	function init() {

		// This function will be called for all methods in controller='home'
	}

    function index() {

        // This function will be called for only method='index' in controller='home'
        
        $.ajax({
            url: Application.vars.api_url + 'exercises/'
        }).then(function(data) {
            
            data.exercises.forEach(function(item) {
                
                $("table.grid tbody").append("<tr><th scope=\"row\">" + item.id + "</th><td>" + item.exercise_name + "</td></tr>");
            });
        });
    }

    return {

    	'init'  	: init,
        'index' 	: index
    };

})(jQuery);
