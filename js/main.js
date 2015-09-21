$(function(){

    var click_apretado = false;
    var ultima_posicion_click = null;

    var c = document.getElementById("myCanvas");
    var metodo_directo_btn = document.getElementById("metodo_directo_btn");
    var metodo_add_simple_btn = document.getElementById("metodo_add_simple_btn");
    var metodo_add_entero_btn = document.getElementById("metodo_add_entero_btn");
    var limpiar = document.getElementById("limpiar");

    $(limpiar).click(function(){
        c.width= c.offsetWidth;
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

    $(metodo_directo_btn).click(function(){
        reset_function();
        var xi=null , yi = null, xf =null, xf= null;
        $(c).css("cursor","crosshair");
        $(c).mousedown(metodo_directo_click);

    });

    $(metodo_add_simple_btn).click(function(){
        reset_function();
        var xi=null , yi = null, xf =null, xf= null;
        $(c).css("cursor","crosshair");
        $(c).mousedown(metodo_add_simple_click);

    });

    $(metodo_add_entero_btn).click(function(){
        reset_function();
        var xi=null , yi = null, xf =null, xf= null;
        $(c).css("cursor","crosshair");
        $(c).mousedown(metodo_add_entero_click);

    });


    //establecer el ancho y largo del canvas del DOM con el de CSS
    c.width = c.offsetWidth;
    c.height = c.offsetHeight;

    var pincel = c.getContext("2d");
    pincel.fillStyle = "darkblue";


    function metodo_directo(xi,yi,xf,yf){
        if(xi== xf) return linea_vertical(xi,yi,xf,yf);
        if(yi==yf) return linea_horizontal(xi,yi,xf,yf);
        var  m = (yf-yi)/(xf-xi);
        if(Math.abs(m) == 1) return linea_diagonal(xi,yi,xf);
        if( (Math.abs(m) < 1  && xi > xf )|| (Math.abs(m) > 1 && yf< yi)){
            var aux=xi;
            xi=xf;
            xf=aux;

            aux=yi;
            yi=yf;
            yf=aux;
        }

        var b = yi - (m*xi);
        var p = 0; //nuevo punto a hallar

        if(Math.abs(m) < 1){
            for(xi;xi<=xf;xi++){
                p= (m*xi)+b;
                dibujar(xi,Math.round(p));
            }
            return;
        }

        for( yi;yi<=yf;yi++){
            p=(yi-b)/m;
            dibujar(Math.round(p),yi);
        }
    }

    function metodo_add_simple(xi,yi,xf,yf){
        if(xi== xf) return linea_vertical(xi,yi,xf,yf);
        if(yi==yf) return linea_horizontal(xi,yi,xf,yf)

        var  m = (yf-yi)/(xf-xi)
        if(Math.abs(m) == 1) return linea_diagonal(xi,yi,xf)
        else{
            //intercambio de valores
            if(Math.abs(m)<1 && xi > xf){
                var aux = xi;
                xi= xf;
                xf=aux;

                aux=yi;
                yi=yf;
                yf=aux;
            }
            if(Math.abs(m)> 1 && yi > yf){
                var aux = yi;
                yi=yf;
                yf=aux;

                aux=xi;
                xi=xf;
                xf=aux;
            }

            if(Math.abs(m) < 1){
                var yc = yi;
                for(xi;xi<xf;xi++){
                    yc=yc+m;
                    dibujar(xi,Math.round(yc));
                }
                return dibujar(xf,yf);
            }

            var im= 1/m;
            var xc = xi;
            for(yi;yi<yf;yi++){
                    xc=xc+im;
                    dibujar(Math.round(xc),yi);
            }
        }
    }
    function metodo_add_entero(xi,yi,xf,yf){
        if(xi==xf) return linea_vertical(xi,yi,xf,yf);

        if(yi==yf) return linea_horizontal(xi,yi,xf,yf);

        var m = (yf-yi)/(xf-xi);
        if (Math.abs(m) == 1) return linea_diagonal(xi,yi,xf);
        if( yi>yf ){
            var aux = xi;
            xi=xf;
            xf=aux;
            aux=yi;
            yi=yf;
            yf=aux;
        }

        var caso = 0;
        var deltax = xf - xi;
        var deltay = yf - yi;
        var error = 0;

        if(m >0 && m<1) caso=1;
        else if (m>1) caso=2;
        else if(m>-1 && m<0) caso=3;
        else if(m < -1) caso=4;
        dibujar(xi,yi);
        if(caso==1){
            console.log("caso1")
            for(xi; xi<=xf;++xi){

                if(error<0){
                    dibujar(xi,yi);
                    error=error+deltay
                }
                else{
                    dibujar(xi,yi+1);
                    error = error + (deltay - deltax);
                    yi = yi+1;
                }
            }
            return;
        }
        if(caso==2){

            for(i=yi+1;i<=yf;i++){
                if(error<0){
                    dibujar(xi+1,i);
                    error = error + (deltay - deltax);
                    xi= xi +1;
                }
                else{
                    dibujar(xi,i);
                    error = error - deltax;
                }
            }
            return;
        }

        if(caso==3){
            console.log("caso3")
            while(xi > xf){

                xi=xi-1;
                if(error < 0){
                    dibujar(xi,yi);
                    error = error + deltay;
                }
                else{

                    yi=yi+1;
                    dibujar(xi,yi)
                    error = error + (deltax + deltay);
                }
            }
            return;
        }

        if(caso==4){
            console.log("caso4")
            for(yi; yi<=yf; yi++){
                if(error<0){
                    dibujar(xi-1,yi);
                    error = error + (deltay + deltax);
                    xi = xi - 1;
                }
                else{
                    dibujar(xi,yi);
                    error = error +deltax;
                }
            }
            return;
        }
    }

    function linea_horizontal(xi,yi,xf,yf){
        if(xi>xf){
            var aux = xf;
            xf=xi;
            xi=aux;
        }
        for(xi;xi<=xf;xi++){
            dibujar(xi,yi);
        }
    }

    function linea_vertical(xi,yi,xf,yf){
        if(yi>yf){
            var aux = yf;
            yf=yi;
            yi=aux;
        }
        for(yi;yi<=yf;yi++){
            dibujar(xi,yi);
        }
    }

    function linea_diagonal(xi,yi,xf){

        for (xi;xi<=xf;xi++){
            dibujar(xi,yi);
            yi++;
        }
    }

    function dibujar(x,y){
        pincel.fillRect(x,y,1,1);
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
            pincel.beginPath();
            pincel.moveTo(x,y);
            window.started = true;

        }
        else{
            pincel.lineTo(x,y);
            pincel.stroke();
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
        metodo_add_simple(xi,yi,xf,yf);
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

    function reset_function(e){

        ultima_posicion_click = null;
        $(c).unbind();
        $(c).css("cursor","auto");
    }


})