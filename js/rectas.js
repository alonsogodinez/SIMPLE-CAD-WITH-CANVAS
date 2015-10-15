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

    function metodo_add_simple(){

        //verifica si hay area de recorte
        console.log(area_recorte);
        if(area_recorte.xi) recortar_linea();

        console.log("xi: "+xi+" yi: "+yi+" xf: "+xf+" yf:"+yf);

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




    // function linea_horizontal(xi,yi,xf,yf){
    //     if(xi>xf){
    //         var aux = xf;
    //         xf=xi;
    //         xi=aux;
    //     }
    //     for(xi;xi<=xf;xi++){
    //         dibujar(xi,yi);
    //     }
    // }

    // function linea_vertical(xi,yi,xf,yf){
    //     if(yi>yf){
    //         var aux = yf;
    //         yf=yi;
    //         yi=aux;
    //     }
    //     for(yi;yi<=yf;yi++){
    //         dibujar(xi,yi);
    //     }
    // }

    // function linea_diagonal(xi,yi,xf){

    //     for (xi;xi<=xf;xi++){
    //         dibujar(xi,yi);
    //         yi++;
    //     }
    // }
