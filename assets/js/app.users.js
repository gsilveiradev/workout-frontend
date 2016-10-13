Application.Controller.Users = (function($) {

    function init() {

        // DELETE action button
        $("body").on("click", ".action-delete", function() {

            var id = $(this).data("id");

            if (confirm("Do you really want to delete this?")) {
                
                $.ajax({
                    type: "POST",
                    url: Application.vars.api_url + 'users/' + id + '/',
                    data: "_method=DELETE"
                })
                .done(function(data) {
                    
                    window.location = 'users.html';
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
                url: Application.vars.api_url + 'users/' + id + '/'
            })
            .done(function(data) {
                
                $("#edit-form form").attr("action", Application.vars.api_url + 'users/' + id + '/');
                $("#edit-form input[name=firstname]").val(data.user.firstname);
                $("#edit-form input[name=lastname]").val(data.user.lastname);
                $("#edit-form input[name=email]").val(data.user.email);

                $("#list").hide();
                $("#edit-form").show();
            })
            .fail(function( jqXHR, textStatus ) {
                alert( "Request failed: " + textStatus );
            });
        });

        // CREATE action button
        $("body").on("click", ".action-create", function() {

            $("#create-form form").attr("action", Application.vars.api_url + 'users/');

            $("#list").hide();
            $("#create-form").show();
        });

        // MANAGE PLANS action button
        $("body").on("click", ".action-manage-plans", function() {

            var id = $(this).data("id");

            $.ajax({
                url: Application.vars.api_url + 'users/' + id + '/'
            })
            .done(function(data) {
                
                $("#manage-plans-form form").attr("action", Application.vars.api_url + 'users/' + id + '/plans/');
                $("#manage-plans-form input[name=firstname]").val(data.user.firstname);

                // Set all checkboxes to unchecked
                $("#manage-plans-form .plans input[type=checkbox]").each(function() {

                    $(this).prop('checked', false);
                });

                // Set user plans checboxes to checked
                data.user.plans.forEach(function(plan) {

                    $("#manage-plans-form .plans input[data-plan_id=" + plan.id + "]").prop('checked', true);
                });

                $("#list").hide();
                $("#manage-plans-form").show();
            })
            .fail(function( jqXHR, textStatus ) {
                alert( "Request failed: " + textStatus );
            });
        });

        // Hide edit and create forms
        $("#edit-form").hide();
        $("#create-form").hide();
        $("#manage-plans-form").hide();

        // Apply ajaxForm function to make ajax request by default
        $('form').ajaxForm({
            successCallback : (function() { window.location = 'users.html'; })
        });
    }

    function index() {
        
        // Load grid data
        $.ajax({
            url: Application.vars.api_url + 'users/'
        })
        .done(function(data) {

            data.users.forEach(function(item) {
                
                $("table.grid tbody").append("<tr><th scope=\"row\">" + item.id + "</th><td>" + item.firstname + "</td><td>" + item.email + "</td><td>" + item.plans.length + " <button type=\"button\" class=\"btn btn-default action-manage-plans\" data-id=\"" + item.id + "\">Manage</button></td><td><button type=\"button\" class=\"btn btn-default action-edit\" data-id=\"" + item.id + "\">Edit</button> <button type=\"button\" class=\"btn btn-default action-delete\" data-id=\"" + item.id + "\">Delete</button></td></tr>");
            });
        })
        .fail(function( jqXHR, textStatus ) {
            alert( "Request failed: " + textStatus );
        });

        // Load plans data
        $.ajax({
            url: Application.vars.api_url + 'plans/'
        })
        .done(function(data) {

            data.plans.forEach(function(item) {
                
                $("#manage-plans-form .plans").append("<div class=\"checkbox\"><label><input type=\"checkbox\" name=\"plans[]\" value=\"" + item.id + "\" data-plan_id=\"" + item.id + "\"> " + item.plan_name + "</label></div>");
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
