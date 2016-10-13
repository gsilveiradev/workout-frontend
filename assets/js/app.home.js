Application.Controller.Home = (function($) {

	function init() {

        // DELETE action button
        $("body").on("click", ".action-delete", function() {

            var id = $(this).data("id");

            if (confirm("Do you really want to delete this?")) {
                
                $.ajax({
                    type: "POST",
                    url: Application.vars.api_url + 'exercises/' + id + '/',
                    data: "_method=DELETE"
                })
                .done(function(data) {
                    
                    window.location = 'index.html';
                })
                .fail(function( jqXHR, textStatus ) {
                    alert( "Request failed: " + textStatus );
                });
            }
        });

        // EDIT action button
        $("body").on("click", ".action-edit", function() {

            var id = $(this).data("id");

            $.ajax({
                url: Application.vars.api_url + 'exercises/' + id + '/'
            })
            .done(function(data) {
                
                $("#edit-form form").attr("action", Application.vars.api_url + 'exercises/' + id + '/');
                $("#edit-form input[name=exercise_name]").val(data.exercise.exercise_name);

                $("#list").hide();
                $("#edit-form").show();
            })
            .fail(function( jqXHR, textStatus ) {
                alert( "Request failed: " + textStatus );
            });
        });

        // CREATE action button
        $("body").on("click", ".action-create", function() {

            $("#create-form form").attr("action", Application.vars.api_url + 'exercises/');

            $("#list").hide();
            $("#create-form").show();
        });

        // Hide edit and create forms
        $("#edit-form").hide();
        $("#create-form").hide();

        // Apply ajaxForm function to make ajax request by default
        $('form').ajaxForm({
            successCallback : (function() { window.location = 'index.html'; })
        });
	}

    function index() {
        
        // Load grid data
        $.ajax({
            url: Application.vars.api_url + 'exercises/'
        })
        .done(function(data) {

            data.exercises.forEach(function(item) {
                
                $("table.grid tbody").append("<tr><th scope=\"row\">" + item.id + "</th><td>" + item.exercise_name + "</td><td><button type=\"button\" class=\"btn btn-default action-edit\" data-id=\"" + item.id + "\">Edit</button> <button type=\"button\" class=\"btn btn-default action-delete\" data-id=\"" + item.id + "\">Delete</button></td></tr>");
            });
        })
        .fail(function( jqXHR, textStatus ) {
            alert( "Request failed: " + textStatus );
        });
    }

    return {

    	'init'  : init,
        'index' : index
    };

})(jQuery);
