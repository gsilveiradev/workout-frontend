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