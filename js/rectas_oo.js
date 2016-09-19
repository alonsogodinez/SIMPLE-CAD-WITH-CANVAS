function Linea(xi,yi,xf,yf,metodo){
    context.fillStyle = "black";
    context.strokeStyle = "black";
    reset_function();
    var self = this;
    self.xi = xi;
    self.yi = yi;
    self.xf = xf;
    self.yf = yf;
    self.metodo = metodo;
    self.punto_referencia = null;


    $(c).css("cursor","crosshair");


    self.mousedown = function (e){
        if( e.which >='2' ) return reset_function();

        var coord = convertir_click(e);
        if(self.xi == null){
            self.xi=coord.x;
            self.yi=coord.y;
            return;
        }
        self.xf=coord.x;
        self.yf= coord.y;
        self.draw();
        self.save();
    };

    self.draw = function(color){
        metodos_linea[self.metodo](self.xi,self.yi,self.xf,self.yf,color);

    }

    self.save= function(){
        console.log("save");
        guardar_figura(self);
        reset_function();
        // continuar_trazo(self.constructor,self.metodo);
    }

}




function Poligono(metodo){

    var self = this;
    self.puntos = [];
    self.punto_referencia = null;
    self.metodo = null;

    reset_function();

    $(c).css("cursor","crosshair");


    self.mousedown = function (e){
        var coord = convertir_click(e);
        var punto =[];
        if(e.which >='2') {
            punto[0] =self.puntos[0][0];
            punto[1] =self.puntos[0][1];
            self.puntos.push(punto);
            // self.punto_referencia=2;
            //guarda puntos si es que hubo algun corte;(reconsiderarlo)
            self.puntos= self.draw();
            self.save();
            return reset_function();
        }
        punto[0]=coord.x;
        punto[1]= coord.y;
        self.puntos.push(punto);
    };

    self.draw = function(color,width){
        context.lineWidth = width || 1;
        return dibujar_poligono(self.puntos,self.metodo,self,color);

    }

    self.save= function(){
        guardar_figura(self);
        reset_function();
    }

}


function dibujar_poligono (puntos,metodo,poligono,color){

    var puntos_corte = [];

    if(area_recorte.xi){
        //definir nuevos puntos
        for(var i =0; i<puntos.length-1;i++){

                var nuevos_puntos = recortar_linea_poligono(puntos[i][0],
                                                            puntos[i][1],
                                                            puntos[i+1][0],
                                                            puntos[i+1][1]);
                if(!(nuevos_puntos.xi==-1 && nuevos_puntos.yi == -1)){

                    puntos_corte.push([nuevos_puntos.xi,nuevos_puntos.yi]);
                    puntos_corte.push([nuevos_puntos.xf,nuevos_puntos.yf]);
                }

        }

        var puntos_nuevo_poligono=[];
        for(var i = 0; i<puntos_corte.length;i++){
            if(puntos_nuevo_poligono.indexOf(puntos_corte[i])==- 1)
                puntos_nuevo_poligono.push(puntos_corte[i])
        }
        puntos_nuevo_poligono.push(puntos_corte[0]);

        puntos = puntos_nuevo_poligono;

    }

    for(var i =0; i<puntos.length-1;i++){

        var inicio = puntos[i];
        var fin = puntos[i+1];
        linea = new Linea(inicio[0],inicio[1],fin[0],fin[1]);
        linea.metodo = metodo;
        // var area_recorte_backup = area_recorte;
        // area_recorte={};
        context.fillStyle = color;
        context.strokeStyle = color;
        linea.draw();
        // area_recorte=area_recorte_backup;
    }
    return puntos;


}

var metodos_linea = {

    directo : function(xi,yi,xf,yf,color){
        context.fillStyle = color;
        context.strokeStyle = color;
        if(area_recorte.xi) {
            var nuevos_puntos =recortar_linea(xi,yi,xf,yf);
            xi = nuevos_puntos.xi;
            yi= nuevos_puntos.yi;
            xf = nuevos_puntos.xf;
            yf = nuevos_puntos.yf;
        }


        if(xi== xf) return this.linea_vertical(xi,yi,xf,yf,color);
        if(yi==yf) return this.linea_horizontal(xi,yi,xf,yf,color);
        var  m = (yf-yi)/(xf-xi);
        if(Math.abs(m) == 1) return this.linea_diagonal(xi,yi,xf);
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
        reset_function();
    },

    add_simple: function (xi,yi,xf,yf,color){

        //verifica si hay area de recorte
        //
        context.fillStyle = color;
        context.strokeStyle = color;
        if(area_recorte.xi) {
            var nuevos_puntos =recortar_linea(xi,yi,xf,yf);
            xi = nuevos_puntos.xi;
            yi= nuevos_puntos.yi;
            xf = nuevos_puntos.xf;
            yf = nuevos_puntos.yf;
        }


        console.log("xi: "+xi+" yi: "+yi+" xf: "+xf+" yf:"+yf);

        if(xi== xf) return this.linea_vertical(xi,yi,xf,yf,color);
        if(yi==yf) return this.linea_horizontal(xi,yi,xf,yf,color)

        var  m = (yf-yi)/(xf-xi)

        if(Math.abs(m) == 1) return this.linea_diagonal(xi,yi,xf,color)
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
    },
    add_entero: function (xi,yi,xf,yf,color){

        context.fillStyle = color;
        context.strokeStyle = color;
        if(area_recorte.xi) {
            var nuevos_puntos =recortar_linea(xi,yi,xf,yf);
            xi = nuevos_puntos.xi;
            yi= nuevos_puntos.yi;
            xf = nuevos_puntos.xf;
            yf = nuevos_puntos.yf;
        }


        if(xi==xf) return this.linea_vertical(xi,yi,xf,yf,color);

        if(yi==yf) return this.linea_horizontal(xi,yi,xf,yf,color);

        var m = (yf-yi)/(xf-xi);
        if (Math.abs(m) == 1) return this.linea_diagonal(xi,yi,xf,color);
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
            console.log("caso1")
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
    },

    linea_horizontal: function (xi,yi,xf,yf,color){
        context.fillStyle = color;
        context.strokeStyle = color;
        if(xi>xf){
            var aux = xf;
            xf=xi;
            xi=aux;
        }
        for(xi;xi<=xf;xi++){
            dibujar(xi,yi);
        }
    },

    linea_vertical:function (xi,yi,xf,yf,color){
        context.fillStyle = color;
        context.strokeStyle = color;
        if(yi>yf){
            var aux = yf;
            yf=yi;
            yi=aux;
        }
        for(yi;yi<=yf;yi++){
            dibujar(xi,yi);
        }
    },

    linea_diagonal: function (xi,yi,xf,yf,color){
        context.fillStyle = color;
        context.strokeStyle = color;
        for(xi;xi<=xf;xi++){
            dibujar(xi,yi);
            yi++;
        }
    }
}






