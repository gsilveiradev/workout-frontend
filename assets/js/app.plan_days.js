Application.Controller.PlanDays = (function($) {

    function init() {

        // DELETE action button
        $("body").on("click", ".action-delete", function() {

            var id = $(this).data("id");

            if (confirm("Do you really want to delete this?")) {
                
                $.ajax({
                    type: "POST",
                    url: Application.vars.api_url + 'plan_days/' + id + '/',
                    data: "_method=DELETE"
                })
                .done(function(data) {
                    
                    window.location = 'plan_days.html';
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
                url: Application.vars.api_url + 'plan_days/' + id + '/'
            })
            .done(function(data) {
                
                $("#edit-form form").attr("action", Application.vars.api_url + 'plan_days/' + id + '/');
                $("#edit-form input[name=day_name]").val(data.plan_day.day_name);
                $("#edit-form input[name=order]").val(data.plan_day.order);
                $("#edit-form select[name=plan_id]").val(data.plan_day.plan_id);

                $("#list").hide();
                $("#edit-form").show();
            })
            .fail(function( jqXHR, textStatus ) {
                alert( "Request failed: " + textStatus );
            });
        });

        // CREATE action button
        $("body").on("click", ".action-create", function() {

            $("#create-form form").attr("action", Application.vars.api_url + 'plan_days/');

            $("#list").hide();
            $("#create-form").show();
        });

        // Hide edit and create forms
        $("#edit-form").hide();
        $("#create-form").hide();

        // Apply ajaxForm function to make ajax request by default
        $('form').ajaxForm({
            successCallback : (function() { window.location = 'plan_days.html'; })
        });
    }

    function index() {
        
        // Load grid data
        $.ajax({
            url: Application.vars.api_url + 'plan_days/'
        })
        .done(function(data) {

            data.plan_days.forEach(function(item) {
                
                $("table.grid tbody").append("<tr><th scope=\"row\">" + item.id + "</th><td>" + item.plan.plan_name + "</td><td>" + item.day_name + "</td><td>" + item.order + "</td><td>" + item.exercise_instances.length + "</td><td><button type=\"button\" class=\"btn btn-default action-edit\" data-id=\"" + item.id + "\">Edit</button> <button type=\"button\" class=\"btn btn-default action-delete\" data-id=\"" + item.id + "\">Delete</button></td></tr>");
            });
        })
        .fail(function( jqXHR, textStatus ) {
            alert( "Request failed: " + textStatus );
        });

        // Load plans to select field
        $.ajax({
            url: Application.vars.api_url + 'plans/'
        })
        .done(function(data) {

            data.plans.forEach(function(item) {
                
                $("select[name=plan_id]").append("<option value=\"" + item.id + "\">" + item.plan_name + "</option>");
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
