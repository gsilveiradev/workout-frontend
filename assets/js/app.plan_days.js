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

        var exercises;

        $.ajax({
            url: Application.vars.api_url + 'exercises/'
        })
        .done(function(data) {

            exercises = data.exercises;
        })
        .fail(function( jqXHR, textStatus ) {
            alert( "Request failed: " + textStatus );
        });

        // MANAGE EXERCISES action button
        $("body").on("click", ".action-manage-exercises", function() {

            var plan_day_id = $(this).data("id");
            var id = 1;

            $.ajax({
                url: Application.vars.api_url + 'plan_days/' + plan_day_id + '/'
            })
            .done(function(data) {

                $("#manage-exercises-form form").attr("action", Application.vars.api_url + 'plan_days/' + plan_day_id + '/exercises/');
                $("#manage-exercises-form input[name=day_name]").val(data.plan_day.day_name);

                data.plan_day.exercise_instances.forEach(function(item) {

                    var exercises_select = "<select name=\"exercises[" + id + "][exercise_id]\" class=\"form-control\">";
                    exercises.forEach(function(obj) {

                        var selected = "";

                        if (obj.id == item.exercise_id) {

                            selected = "selected=\"selected\"";
                        }
                        
                        exercises_select += "<option value=\"" + obj.id + "\" " + selected + ">" + obj.exercise_name + "</option>";
                    });
                    exercises_select += "</select>";
                    
                    $("#manage-exercises-form table.grid tbody").append("<tr><th scope=\"row\">" + id + "<input type=\"hidden\" name=\"exercises[" + id + "][id]\" value=\"" + item.id + "\" /></th><td>" + exercises_select + "</td><td><input type=\"text\" name=\"exercises[" + id + "][exercise_duration]\" value=\"" + item.exercise_duration + "\" class=\"form-control\" /></td><td><input type=\"text\" name=\"exercises[" + id + "][order]\" value=\"" + item.order + "\" class=\"form-control\" /></td><td><button type=\"button\" class=\"btn btn-default action-delete-exercise\" data-row=\"" + id + "\" data-plan_day_id=\"" + plan_day_id + "\"data-id=\"" + item.id + "\">Delete</button></td></tr>");

                    id++;
                });

                $("#list").hide();
                $("#manage-exercises-form").show();
            })
            .fail(function( jqXHR, textStatus ) {
                alert( "Request failed: " + textStatus );
            });
        });

        // CREATE EXERCISES action button
        $("body").on("click", ".action-create-exercise", function() {

            var id = $("#manage-exercises-form table.grid tbody tr").length + 1;

            var exercises_select = "<select name=\"exercises[" + id + "][exercise_id]\" class=\"form-control\">";
            exercises.forEach(function(obj) {
                
                exercises_select += "<option value=\"" + obj.id + "\" >" + obj.exercise_name + "</option>";
            });
            exercises_select += "</select>";
            
            $("#manage-exercises-form table.grid tbody").append("<tr><th scope=\"row\">" + id + "</th><td>" + exercises_select + "</td><td><input type=\"text\" name=\"exercises[" + id + "][exercise_duration]\" value=\"\" class=\"form-control\" /></td><td><input type=\"text\" name=\"exercises[" + id + "][order]\" value=\"\" class=\"form-control\" /></td><td><button type=\"button\" class=\"btn btn-default action-delete-exercise\" data-row=\"" + id + "\">Delete</button></td></tr>");
        });

        // DELETE EXERCISES action button
        $("body").on("click", ".action-delete-exercise", function() {

            var deleteButton = $(this);

            if (!$(this).data('plan_day_id')) {

                deleteButton.parent().parent().remove();
            }
            else {

                if (confirm("Do you really want to delete this?")) {
                    
                    $.ajax({
                        type: "POST",
                        url: Application.vars.api_url + 'plan_days/' + $(this).data('plan_day_id') + '/exercises/' + $(this).data('id'),
                        data: "_method=DELETE"
                    })
                    .done(function(data) {
                        
                        deleteButton.parent().parent().remove();
                    })
                    .fail(function( jqXHR, textStatus ) {
                        alert( "Request failed: " + textStatus );
                    });
                }
            }
        });

        // Hide edit and create forms
        $("#edit-form").hide();
        $("#create-form").hide();
        $("#manage-exercises-form").hide();

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
                
                $("#list table.grid tbody").append("<tr><th scope=\"row\">" + item.id + "</th><td>" + item.plan.plan_name + "</td><td>" + item.day_name + "</td><td>" + item.order + "</td><td>" + item.exercise_instances.length + " <button type=\"button\" class=\"btn btn-default action-manage-exercises\" data-id=\"" + item.id + "\">Manage</button></td><td><button type=\"button\" class=\"btn btn-default action-edit\" data-id=\"" + item.id + "\">Edit</button> <button type=\"button\" class=\"btn btn-default action-delete\" data-id=\"" + item.id + "\">Delete</button></td></tr>");
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
