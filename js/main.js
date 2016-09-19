    var click_apretado = false;
    var ultima_posicion_click = null;

    var canvas = document.getElementById("myCanvas");
    var metodo_directo_btn = document.getElementById("metodo_directo_btn");
    var metodo_add_simple_btn = document.getElementById("metodo_add_simple_btn");
    var metodo_add_entero_btn = document.getElementById("metodo_add_entero_btn");
    var metodo_implicito_circulo_btn = document.getElementById("metodo_implicito_circulo_btn");
    var metodo_coordenadas_polares_btn = document.getElementById("metodo_coordenadas_polares_btn");
    var metodo_incremental_circulo_btn = document.getElementById("metodo_incremental_circulo_btn");
    var limpiar = document.getElementById("limpiar");
    var dibujar_area_recorte_btn = document.getElementById("dibujar_area_recorte_btn");
    var dibujar_poligono_btn = document.getElementById("dibujar_poligono_btn");
    var area_recorte ={};
    var figuras = [];
    context = canvas.getContext("2d");
    context.fillStyle = "darkblue";
    context.strokeStyle = "darkblue";


$(function(){

    // $(this).bind("contextmenu", function(e) {
    //     e.preventDefault();
    // });

    $(limpiar).click(function(){

        canvas.width= canvas.offsetWidth;
        reset_function();
    })



    $(lapiz).click(function(){
        ultima_posicion_click = null;
        $(c).unbind();
        $(c).css("cursor","crosshair");

        $(c).mousedown(apretar_click)
        $(c).mouseup(soltar_click);
        $(c).mousemove(mover_mouse);
    });


    $(metodo_implicito_circulo_btn).click(function(){
        reset_function();
        var xi=null , yi = null, xf =null, yf= null;
        $(c).css("cursor","crosshair");
        $(c).mousedown(init_xy);
        $(c).mouseup(metodo_implicito_circulo_mouseup);

    });

    $(metodo_coordenadas_polares_btn).click(function(){
        reset_function();
        var xi=null , yi = null, xf =null, yf= null;
        $(c).css("cursor","crosshair");
        $(c).mousedown(init_xy);
        $(c).mouseup(metodo_coordenadas_polares_mouseup);

    });

    $(metodo_incremental_circulo_btn).click(function(){
        reset_function();
        var xi=null , yi = null, xf =null, yf= null;
        $(c).css("cursor","crosshair");
        $(c).mousedown(init_xy);
        $(c).mouseup(metodo_incremental_circulo_mouseup);

    });

    $(dibujar_area_recorte_btn).click(function(){
        reset_function();
        var xi=null , yi = null, xf =null, yf= null;
        $(c).css("cursor","crosshair");
        $(c).mousedown(init_xy);
        $(c).mouseup(dibujar_area_recorte_mouseup);

    });


    //establecer el ancho y largo del canvas del DOM con el de CSS
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;





});







    function metodo_implicito_circulo(xi,yi,xf,yf){

        var radio = Math.sqrt(Math.pow(xf-xi,2)+Math.pow(yf-yi,2));
        var radio2 = Math.pow(radio,2);


        for(x=xi-radio ; x<=xi+radio ; x++){
            raiz= Math.sqrt(radio2 - Math.pow(x-xi,2));
            y= yi + raiz;
            y2= yi - raiz;
            dibujar(x,y);
            dibujar(x,y2);
        }
    }

    function metodo_coordenadas_polares(xi,yi,xf,yf){
        var radio = Math.sqrt(Math.pow(xf-xi,2)+Math.pow(yf-yi,2));
        var radian = (Math.PI*2)/360;
        var a = 0;
        while(a <=2*Math.PI){
            x = xi + radio * Math.cos(a);
            y = yi + radio* Math.sin(a);
            dibujar(x,y);
            a = a + radian;
        }
    }

    function metodo_incremental_circulo(xi,yi,xf,yf){// parametrica polar

        var radio = Math.sqrt(Math.pow(xf-xi,2)+Math.pow(yf-yi,2));

        var dx = 1 /radio;
        var sa = Math.sin(dx);
        var ca = Math.cos(dx);
        var x = 0;
        var y = radio;

        while(y>= x){
            dibujar(xi+x,yi+y);
            dibujar(xi-x,yi+y);
            dibujar(xi+x,yi-y);
            dibujar(xi-x,yi-y);
            dibujar(xi+y,yi+x);
            dibujar(xi-y,yi+x);
            dibujar(xi+y,yi-x);
            dibujar(xi-y,yi-x);

            aux = x;
            x = (x*ca) - (y* sa);
            y = (y*ca) + (aux * sa);
        }


    }




    function convertir_click(e){
        var x;
        var y;
        x = e.offsetX;
        y =e.offsetY;
        return {x:x,y:y}
    }

    function apretar_click (e){
            click_apretado = true;
            ultima_posicion_click = convertir_click(e);;
            dibujar_lapiz(ultima_posicion_click);
    }

    function soltar_click (e){
        click_apretado= false;
        ultima_posicion_click = convertir_click(e);
        window.started = false;
    }

    function mover_mouse(e){
        if(click_apretado) apretar_click(e);
    }

    function dibujar_lapiz (clickedPosition){
        x = clickedPosition.x;
        y = clickedPosition.y;

        if(!window.started){
            context.beginPath();
            context.moveTo(x,y);
            window.started = true;

        }
        else{
            context.strokeStyle = "darkblue";
            context.lineTo(x,y);
            context.stroke();
        }
    }

    function metodo_directo_click(e){

        var coord = convertir_click(e);
        if(ultima_posicion_click == null){
            xi=coord.x;
            yi=coord.y;
            return ultima_posicion_click = "primer click";
        }
        xf=coord.x;
        yf= coord.y;
        metodo_directo(xi,yi,xf,yf);
        ultima_posicion_click=null;

    };

    function metodo_add_simple_click(e){

        var coord = convertir_click(e);
        if(ultima_posicion_click == null){
            xi=coord.x;
            yi=coord.y;
            return ultima_posicion_click = "primer click";
        }
        xf=coord.x;
        yf= coord.y;
        metodo_add_simple();
        ultima_posicion_click=null;

    };

    function metodo_add_entero_click(e){

        var coord = convertir_click(e);
        if(ultima_posicion_click == null){
            xi=coord.x;
            yi=coord.y;
            return ultima_posicion_click = "primer click";
        }
        xf=coord.x;
        yf= coord.y;
        metodo_add_entero(xi,yi,xf,yf);
        ultima_posicion_click=null;

    };

    function metodo_implicito_circulo_mouseup(e){
        var coord = convertir_click(e);
        xf = coord.x;
        yf = coord.y;
        metodo_implicito_circulo(xi,yi,xf,yf);
    }

    function metodo_coordenadas_polares_mouseup(e){
        var coord = convertir_click(e);
        xf = coord.x;
        yf = coord.y;
        metodo_coordenadas_polares(xi,yi,xf,yf);
    }

    function metodo_incremental_circulo_mouseup(e){
        var coord = convertir_click(e);
        xf = coord.x;
        yf = coord.y;
        metodo_incremental_circulo(xi,yi,xf,yf);
    }

    function dibujar_area_recorte_mouseup(e){
        var coord = convertir_click(e);
        xf = coord.x;
        yf = coord.y;
        dibujar_area_recorte(xi,yi,xf,yf);
    }

    function init_xy(e){
        var coord = convertir_click(e);
        xi=coord.x;
        yi=coord.y;
    }

function dibujar(x,y){
        context.fillRect(x,y,1,1);
    }

function reset_function(e){

    ultima_posicion_click = null;
    // area_recorte = {};
    $(c).unbind();
    $(c).css("cursor","auto");
}