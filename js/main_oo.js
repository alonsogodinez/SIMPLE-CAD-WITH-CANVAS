

$(metodo_directo_btn).click(function(){
    var linea = new Linea();
    linea.metodo = 'directo';
    $(c).mousedown(linea.mousedown);

});


$(metodo_add_simple_btn).click(function(){
    var linea = new Linea();
    linea.metodo = 'add_simple';
    $(c).mousedown(linea.mousedown);

});

$(metodo_add_entero_btn).click(function(){
    var linea = new Linea();
    linea.metodo = 'add_entero';
    $(c).mousedown(linea.mousedown);

});


function continuar_trazo(ultima_instancia){
    var clase = ultima_instancia.constructor;
    var instancia = new clase();
    instancia.metodo = ultima_instancia.metodo;
    $(c).mousedown(instancia.mousedown);

}


function reset_function(e){

    ultima_posicion_click = null;
    // area_recorte = {};
    $(c).unbind();
}
