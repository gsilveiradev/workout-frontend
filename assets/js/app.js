// define application namespace
Application = {
    Controller: {}
};

/**
 * Trigger an javascript native alert
 *
 * @param  string str The text to display
 * @return event Alert javascript event
 */
Application.alert = function(str) {

    alert(str);
}

jQuery(document).ready(function($) {
    
    // invoca o controlador e o método solicitados
    Application.vars  = {

        api_url     : 'http://localhost:8000/api/',
        //api_url     : 'http://workout-api.rlv.me/api/',
        controller  : $('meta[name=controller]').attr('content'),
        method      : $('meta[name=method]').attr('content'), 
        directory   : $('meta[name=directory]').attr('content')
    };
    
    var camelizedController = $.map(Application.vars.controller.split('_'), function(val) { return val.substr(0,1).toUpperCase() + val.substr(1) } ).join('');
    var camelizedDirectory = $.map(Application.vars.directory.split('/'), function(val) { return val.substr(0,1).toUpperCase() + val.substr(1) } ).join('');
    
    var igniter = camelizedDirectory ? camelizedDirectory+'__'+camelizedController : camelizedController;
    
    Application.Controller[igniter] &&
    Application.Controller[igniter]['init'] &&
    Application.Controller[igniter]['init'].call();

    Application.Controller[igniter] &&
    Application.Controller[igniter][Application.vars.method] &&
    Application.Controller[igniter][Application.vars.method].call();

});

jQuery.fn.ajaxForm = ( function(options) 
{
    var options = $.extend(
    {
        successCallback : (function() {}),
        errorCallback   : (function() {})
    }, options);

    return this.submit( function() 
    {
        var form = $(this);
        
        $.ajax({

            type: 'post',
            url: form.attr('action'),
            data: form.serialize(),
            beforeSend: function() 
            {

            },
            success: function(XMLHttpRequest) 
            {
                if (options.successCallback) 
                {
                    options.successCallback(XMLHttpRequest);
                }
            },
            error: function(XMLHttpRequest) 
            {
                
                if (XMLHttpRequest.status == '422') 
                {
                    var data = $.parseJSON(XMLHttpRequest.responseText);

                    for (var fieldName in data.errors) 
                    {
                        for (var i in data.errors[fieldName]) alert(data.errors[fieldName][i]);
                    }
                    
                    if (options.errorCallback) 
                    {
                        options.errorCallback(XMLHttpRequest);
                    }
                    
                }
                else
                {
                    alert('Unexpected error!');
                }
            }
        });

        return false;
    });
});