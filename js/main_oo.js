



// $('body').mousemove(function(e){
//     var coord = convertir_click(e);
//     $('#coordenadas').html('X: '+ coord.x+ 'Y: '+ coord.y)

// })



var figura_seleccionada = null;
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

$(dibujar_poligono_btn).click(function(){
    var poligono = new Poligono();
    poligono.metodo = 'add_entero';
    $(c).mousedown(poligono.mousedown);

});

$('#rotar-0').on('hiden.bs.collapse', function () {
    alert("mostrando");
  // do something…
})

function guardar_figura(figura){
    var backup_figura = figura;
    console.log("prime figura");
    console.log(figura);


    figuras.push(figura);
    var id =figuras.length-1;
    if(figuras.length==1){
        $('#control-figuras').removeClass('hidden');

    }
    var figura_seleccion = $('<article></article>').addClass("figura-seleccion row").attr('id', figuras.length-1);
    var template = '<div class="col-xs-2">';
    template+=          '<p>'+figura.constructor.name+'</p>';
    template+=     '</div>';
    template+=     '<div class="col-xs-10">';
    template+=          '<button class="btn btn-primary transformacion"';
    template+=          'data-toggle="collapse" parent="#'+id+'" data-target="#rotar-'+id+'"';
    template+=          'aria-expanded="false" aria-controls="rotar-'+id+'">Rotar</button>'
    template+=          '<button class="btn btn-warning transformacion"';
    template+=          'data-toggle="collapse" parent="#'+id+'" data-target="#trasladar-'+id+'"';
    template+=          'aria-expanded="false" aria-controls="trasladar-'+id+'">Trasladar</button>';
    template+=          '<button class="btn btn-danger transformacion"';
    template+=          'data-toggle="collapse" parent="#'+id+'" data-target="#escalar-'+id+'"';
    template+=          'aria-expanded="false" aria-controls="trasladar-'+id+'">Escalar</button>'
    template+=          '<button class="btn btn-default transformacion"';
    template+=          'data-toggle="collapse" parent="#'+id+'" data-target="#afilar-'+id+'"';
    template+=          'aria-expanded="false" aria-controls="trasladar-'+id+'">Afilar</button>'
    template+=          '<button class="btn btn-info transformacion"';
    template+=          'data-toggle="collapse" parent="#'+id+'" data-target="#reflejar-'+id+'"';
    template+=          'aria-expanded="false" aria-controls="reflejar-'+id+'">reflejar</button>'
    template+=          '<button class="btn btn-danger transformacion" id="transformacion-inversa-btn-'+id+'">' ;
    template+=          'Deshacer transformación</button>'
    template+=     '</div>';
    template+=     '<div class="transformacion-div collapse" id="rotar-'+id+'">';
    template+=      '<div class="well">';
    template+=          '<label>Angulo(º): </label></br><input id="alfa-rotacion-'+id+'"type="number">';
    template+=          '<button class="btn btn-success" id="rotar-btn-'+id+'">OK</button></br>';
    template+=          '<label>Punto Pivote: </label></br>';
    template+=          '<label>X </label><input readonly id="px-rotacion-'+id+'"type="number" placeholder="-" ></br>';
    template+=          '<label>Y </label><input readonly id="py-rotacion-'+id+'"type="number" placeholder="-">';
    template+=          '<button class="btn btn-success" id="rotar-pivote-btn-'+id+'">Establecer</button>';
    template+=      '</div>';
    template+=     '</div>';
    template+=     '<div class="transformacion-div collapse" id="trasladar-'+id+'">';
    template+=      '<div class="well">';
    template+=      '   <label>X(H): </label><input id="x-traslacion-'+id+'" type="number"></br>';
    template+=      '   <label>Y(V): </label><input id="y-traslacion-'+id+'"type="number">';
    template+=          '<button class="btn btn-success" id="trasladar-btn-'+id+'" >OK</button>';
    template+=      '</div>';
    template+=     '</div>';
    template+=     '<div class="transformacion-div collapse" id="escalar-'+id+'">';
    template+=      '<div class="well">';
    template+=      '   <label>Ex: </label><input id="x-escalamiento-'+id+'" type="number"></br>';
    template+=      '   <label>Ey: </label><input id="y-escalamiento-'+id+'"type="number">';
    template+=          '<button class="btn btn-success" id="escalar-btn-'+id+'" >OK</button></br>';
    template+=          '<label>Punto Pivote: </label></br>';
    template+=          '<label>X </label><input readonly id="px-escalamiento-'+id+'"type="number" placeholder="-" ></br>';
    template+=          '<label>Y </label><input readonly id="py-escalamiento-'+id+'"type="number" placeholder="-">';
    template+=          '<button class="btn btn-success" id="escalar-pivote-btn-'+id+'">Establecer</button>';
    template+=      '</div>';
    template+=     '</div>';
    template+=     '<div class="transformacion-div collapse" id="afilar-'+id+'">';
    template+=      '<div class="well">';
    template+=      '   <label>Afx: </label><input id="x-afilamiento-'+id+'" type="number"></br>';
    template+=      '   <label>Afy: </label><input id="y-afilamiento-'+id+'"type="number">';
    template+=          '<button class="btn btn-success" id="afilar-btn-'+id+'" >OK</button></br>';
    template+=      '</div>';
    template+=     '</div>';
    template+=     '<div class="transformacion-div collapse" id="reflejar-'+id+'">';
    template+=      '<div class="well">';
    template+=          '<label>Punto Pivote: </label></br>';
    template+=          '<label>X </label><input readonly id="px-reflexion-'+id+'"type="number" placeholder="-" ></br>';
    template+=          '<label>Y </label><input readonly id="py-reflexion-'+id+'"type="number" placeholder="-"></br>';
    template+=          '<button class="btn btn-success" id="reflejar-pivote-btn-'+id+'">Establecer</button>';
    template+=          '<button class="btn btn-success" id="reflejar-btn-'+id+'" >Reflejar</button></br>';
    template+=      '</div>';
    template+=     '</div>';




    figura_seleccion.html(template);
    $('#control-figuras').append(figura_seleccion);


    $('.figura-seleccion').click(function(){
        if(figura_seleccionada){
            context.fillStyle = "black";
            context.strokeStyle = "black";
            figuras[figura_seleccionada].draw('black');
            $('#'+figura_seleccionada).removeClass('selected');
        }

        context.fillStyle = "red";
        context.strokeStyle = "red";
        figura_seleccionada= this.id;
        figuras[this.id].draw('red');
        $(this).addClass('selected');

    });


    $('#trasladar-btn-'+id).click(function(){

        var H= $('#x-traslacion-'+id).val();
        var V= $('#y-traslacion-'+id).val()*-1;
        var antigua_figura = trasladar_figura(figura,H,V,id);
        // figuras[id].draw('black');
        console.log('figura_movida');
        console.log(figuras[id])
        console.log('fbackupigura_movida');
        // console.log(antigua_figura);
        if(!figuras[id].transformaciones)figuras[id].transformaciones = [];
        var transformacion = {};
        transformacion.id =1;
        transformacion.H = H;
        transformacion.V = V;
        figuras[id].transformaciones.push(transformacion);
        canvas.width= canvas.offsetWidth;
        for(var i = 0; i<figuras.length; i++){
            figuras[i].draw('black');
        }


    })

    $('#rotar-btn-'+id).click(function(){

        var alfa= $('#alfa-rotacion-'+id).val();
        rotar_figura(figura,alfa,id,null,null,true);


    })

    $('#escalar-btn-'+id).click(function(){

        var ex= $('#x-escalamiento-'+id).val();
        var ey= $('#y-escalamiento-'+id).val();
        escalar_figura(figura,ex,ey,id,null,null,true);


    })

    $('#afilar-btn-'+id).click(function(){

        var afx= $('#x-afilamiento-'+id).val();
        var afy= $('#y-afilamiento-'+id).val();
        afilar_figura(figura,afx,afy,id);
        if(!figuras[id].transformaciones)figuras[id].transformaciones = [];
        var transformacion = {};
        transformacion.id =4;
        transformacion.afx= afx;
        transformacion.afy = afy;
        figuras[id].transformaciones.push(transformacion);

    })

    $('#reflejar-btn-'+id).click(function(){
        reflejar_figura(figura,id,null,null,true);


    })



    $('#rotar-pivote-btn-'+id).click(function(e){
        e.stopPropagation();
        var pivot,py,px ;

        console.log("click");
        // $(canvas).unbind();
        $(c).css('cursor','crosshair');
        $(c).click(function(e){
            var coord= convertir_click(e);
            console.log(coord.x);
            $('#px-rotacion-'+id).val(coord.x);
            $('#py-rotacion-'+id).val(coord.y);
            $(c).css("cursor","auto");
            $(this).unbind();
        });
    })

    $('#escalar-pivote-btn-'+id).click(function(e){
        e.stopPropagation();
        var pivot,py,px;
        console.log("click");
        // $(canvas).unbind();
        $(c).css('cursor','crosshair');
        $(c).click(function(e){
            var coord= convertir_click(e);

            $('#px-escalamiento-'+id).val(coord.x);
            $('#py-escalamiento-'+id).val(coord.y);
            $(c).css("cursor","auto");
            $(this).unbind();
        });
    });


    $('#reflejar-pivote-btn-'+id).click(function(e){
        e.stopPropagation();
        var pivot,py,px;
        console.log("click");
        // $(canvas).unbind();
        $(c).css('cursor','crosshair');
        $(c).click(function(e){
            var coord= convertir_click(e);

            $('#px-reflexion-'+id).val(coord.x);
            $('#py-reflexion-'+id).val(coord.y);
            $(c).css("cursor","auto");
            $(this).unbind();
        });
    });



    $('#transformacion-inversa-btn-'+id).click(function(){
        if(figuras[id].transformaciones.length == 0) return alert("ya no hay mas transformaciones en el historial")
        var trf = figuras[id].transformaciones.pop();
        console.log(figuras[id].transformaciones)
        if(trf.id== 1) trasladar_figura(figura,trf.H*-1,trf.V*-1,id); //trasladar
        if(trf.id== 2) rotar_figura(figura,trf.alfa*-1,id,trf.px,trf.py);//rotar
        if(trf.id== 3) escalar_figura(figura,1/trf.ex,1/trf.ey,id,trf.px,trf.py);//escalar
        if(trf.id== 4) afilar_figura(figura,trf.afx*-1,trf.afy*-1,id);//afilar
        if(trf.id== 5) reflejar_figura(figura,id,trf.px,trf.py);//reflejar
        canvas.width= canvas.offsetWidth;
        for(var i = 0; i<figuras.length; i++){
            figuras[i].draw('black');
        }


    })

}


function afilar_figura(figura,afx,afy,id){
    if(figura instanceof(Linea)){
        canvas.width= canvas.offsetWidth;
        if(!afx && !afy) return alert("Debe afilar al menos de una forma");
        if(afx){
        figuras[id].xi = figuras[id].xi + figuras[id].yi* afx;
        figuras[id].xf = figuras[id].xf + figuras[id].yf* afx;

        }
        if(afy){
            figuras[id].yi = figuras[id].yi + figuras[id].xi* afy;
            figuras[id].yf = figuras[id].yf + figuras[id].xf* afy;

        }


        for(var i = 0; i<figuras.length; i++){
            figuras[i].draw('black');
        }
    }

    if(figura instanceof(Poligono)){
        canvas.width= canvas.offsetWidth;

        if(!afx && !afy) return alert("Debe afilar almenos de una forma");
        if(afx){
            for(var i =0;i<figura.puntos.length;i++){
                var xa= figura.puntos[i][0] + figura.puntos[i][1]* afx;
                figuras[id].puntos[i][0] = xa;
            }
        }
        if(afy){
            for(var i =0;i<figura.puntos.length;i++){
                var ya= figura.puntos[i][1] + figura.puntos[i][0]* afy;
                figuras[id].puntos[i][1] = ya;
            }
        }

        for(var i = 0; i<figuras.length; i++){
            figuras[i].draw('black');
        }
    }


}
function reflejar_figura(figura,id,px,py,push_array){
    rotar_figura_reflexion(figura,180,id,px,py,push_array);

}

function escalar_figura(figura,ex,ey,id,px,py,push_array){
    if(push_array){
        if(!figuras[id].transformaciones)figuras[id].transformaciones = [];
        var transformacion = {};
        transformacion.id =3;
        transformacion.ex = ex;
        transformacion.ey = ey;

    }

    if(figura instanceof(Linea)){
        canvas.width= canvas.offsetWidth;

        if(!px && !py){
            var px= $('#px-rotacion-'+id).val()* -1 || null;
            var py =$('#py-rotacion-'+id).val()* -1 || null;
            if(push_array){
                transformacion.px = px;
                transformacion.py = py;
            }
        }
        if(px) {

            trasladar_figura(figura,px,py,id);
        }

        if(ex){ figuras[id].xi *= ex;
            figuras[id].xf *= ex;}

        if(ey){
            figuras[id].yi*= ey;
            figuras[id].yf*= ey;
        }


        if(px){
            alert("hay px");
            px=px*-1;
            py=py*-1;
            trasladar_figura(figura,px,py,id)
        };
        for(var i = 0; i<figuras.length; i++){
            figuras[i].draw('black');
        }
    }

    if(figura instanceof(Poligono)){

        canvas.width= canvas.offsetWidth;

        //disminuimos el pivot
        var px= $('#px-rotacion-'+id).val()* -1 || null;
        var py =$('#py-rotacion-'+id).val()* -1 || null;

        if(px) {
            trasladar_figura(figura,px,py,id);
        }
        //pivot


        for(var i =0;i<figura.puntos.length;i++){
            var xdosprima= figura.puntos[i][0]*ex;
            var ydosprima=  figura.puntos[i][1]*ey;
            figuras[id].puntos[i][0] = xdosprima;
            figuras[id].puntos[i][1] = ydosprima;
        }
        px=px*-1;
        py= py*-1;
        trasladar_figura(figura,px,py,id);
        // figuras[id].draw('black');
        console.log('figura_movida');
        console.log(figuras[id])
        console.log('fbackupigura_movida');
        for(var i = 0; i<figuras.length; i++){
            figuras[i].draw('black');
        }
    }
    if(push_array) figuras[id].transformaciones.push(transformacion);

}

function  rotar_figura(figura,alfa,id,px,py,push_array){
    if(push_array)
    {if(!figuras[id].transformaciones)figuras[id].transformaciones = [];
        var transformacion = {};
        transformacion.id =2;
        transformacion.alfa = alfa;
    }
    if(figura instanceof(Linea)){

        canvas.width= canvas.offsetWidth;

        //disminuimos el pivot
        if(!px){
            var px= $('#px-rotacion-'+id).val()* -1  ||figura.xi *-1;
            var py =$('#py-rotacion-'+id).val()* -1  ||figura.yi * -1;
            if(push_array){
            transformacion.px= px;
            transformacion.py = py;}
        }
        console.log(px);
        alfa = alfa*Math.PI/180;
        var cosalfa = Math.cos(alfa);
        var senalfa = Math.sin(alfa);

        //la figura en su posicion origen y se guarda su backup
        var backup_figura = trasladar_figura(figura,px,py,id);

        var xidosprima= figura.xi*cosalfa - figura.yi*senalfa;
        var yidosprima=  figura.yi*cosalfa+ figura.xi*senalfa;
        var xfdosprima = figura.xf*cosalfa - figura.yf*senalfa;
        var yfdosprima = figura.yf*cosalfa+ figura.xf*senalfa;

        figuras[id].xi = xidosprima;
        figuras[id].yi = yidosprima;
        figuras[id].xf = xfdosprima;
        figuras[id].yf = yfdosprima;

        //aumentamos el pivto
        px= px*-1;
        py= py*-1;

        trasladar_figura(figura,px,py,id);

         figuras[id].draw('black');
        console.log('figura_movida');
        console.log(figuras[id])
        console.log('fbackupigura_movida');
        for(var i = 0; i<figuras.length; i++){
            figuras[i].draw('black');
        }

    }

    if(figura instanceof(Poligono)){

        canvas.width= canvas.offsetWidth;

        //disminuimos el pivot
        var px= $('#px-rotacion-'+id).val()* -1 || figura.puntos[0][0] *-1;
        var py =$('#py-rotacion-'+id).val()* -1 || figura.puntos[0][1] * -1;


        //pivot

        alfa = alfa*Math.PI/180;
        var cosalfa = Math.cos(alfa);
        var senalfa = Math.sin(alfa);

        var backup_figura = trasladar_figura(figura,px,py,id);

        for(var i =0;i<figura.puntos.length;i++){
            var xdosprima= figura.puntos[i][0]*cosalfa - figura.puntos[i][1]*senalfa;
            var ydosprima=  figura.puntos[i][1]*cosalfa+ figura.puntos[i][0]*senalfa;
            figuras[id].puntos[i][0] = xdosprima;
            figuras[id].puntos[i][1] = ydosprima;
        }
        px=px*-1;
        py= py*-1;
        trasladar_figura(figura,px,py,id);
        // figuras[id].draw('black');
        console.log('figura_movida');
        console.log(figuras[id])
        console.log('fbackupigura_movida');
        for(var i = 0; i<figuras.length; i++){
            figuras[i].draw('black');
        }
    }

    if(push_array) figuras[id].transformaciones.push(transformacion);


}
function  rotar_figura_reflexion(figura,alfa,id,px,py,push_array){
    if(push_array){
        if(!figuras[id].transformaciones)figuras[id].transformaciones = [];
        var transformacion = {};
        transformacion.id =5;
    }


    if(figura instanceof(Linea)){


        canvas.width= canvas.offsetWidth;

        //disminuimos el pivot
        if(!px && !py){
           var px= $('#px-reflexion-'+id).val()* -1 ||figura.xi *-1;
           var py =$('#py-reflexion-'+id).val()* -1 ||figura.yi * -1;
           if(push_array){
           transformacion.px =px;
           transformacion.py =py;}
        }
        console.log(px);
        alfa = alfa*Math.PI/180;
        var cosalfa = Math.cos(alfa);
        var senalfa = Math.sin(alfa);

        //la figura en su posicion origen y se guarda su backup
        var backup_figura = trasladar_figura(figura,px,py,id);

        var xidosprima= figura.xi*cosalfa - figura.yi*senalfa;
        var yidosprima=  figura.yi*cosalfa+ figura.xi*senalfa;
        var xfdosprima = figura.xf*cosalfa - figura.yf*senalfa;
        var yfdosprima = figura.yf*cosalfa+ figura.xf*senalfa;

        figuras[id].xi = xidosprima;
        figuras[id].yi = yidosprima;
        figuras[id].xf = xfdosprima;
        figuras[id].yf = yfdosprima;

        //aumentamos el pivto
        px= px*-1;
        py= py*-1;

        trasladar_figura(figura,px,py,id);

         figuras[id].draw('black');
        console.log('figura_movida');
        console.log(figuras[id])
        console.log('fbackupigura_movida');
        for(var i = 0; i<figuras.length; i++){
            figuras[i].draw('black');
        }

    }

    if(figura instanceof(Poligono)){

        canvas.width= canvas.offsetWidth;

        //disminuimos el pivot
        var px= $('#px-reflexion-'+id).val()* -1 || figura.puntos[0][0] *-1;
        var py =$('#py-reflexion-'+id).val()* -1 || figura.puntos[0][1] * -1;


        //pivot

        alfa = alfa*Math.PI/180;
        var cosalfa = Math.cos(alfa);
        var senalfa = Math.sin(alfa);

        var backup_figura = trasladar_figura(figura,px,py,id);

        for(var i =0;i<figura.puntos.length;i++){
            var xdosprima= figura.puntos[i][0]*cosalfa - figura.puntos[i][1]*senalfa;
            var ydosprima=  figura.puntos[i][1]*cosalfa+ figura.puntos[i][0]*senalfa;
            figuras[id].puntos[i][0] = xdosprima;
            figuras[id].puntos[i][1] = ydosprima;
        }
        px=px*-1;
        py= py*-1;
        trasladar_figura(figura,px,py,id);
        // figuras[id].draw('black');
        console.log('figura_movida');
        console.log(figuras[id])
        console.log('fbackupigura_movida');
        for(var i = 0; i<figuras.length; i++){
            figuras[i].draw('black');
        }
    }
    if(push_array) figuras[id].transformaciones.push(transformacion);

}

function trasladar_figura(figura,H,V,id){
    if(figura instanceof(Linea)){

        var b_fila1 =[1,0,0];
        var b_fila2= [0,1,0];
        var b_fila3= [H,V,1];
        var backup_figura = new Linea(figura.xi,figura.yi,figura.xf,figura.yf,figura.metodo);
        console.log(figura);


        var a =[figura.xi,figura.yi,1];
        var punto_transformado = multiplicar_matrices(a,b_fila1,b_fila2,b_fila3);
        console.log('viejo punto x : '+ figuras[id].xi);
        figuras[id].xi = punto_transformado[0];
        console.log('nuevo punto x : '+ figuras[id].xi);
        figuras[id].yi = punto_transformado[1];

        a = [figura.xf,figura.yf,1];
        punto_transformado = multiplicar_matrices(a,b_fila1,b_fila2,b_fila3);
        figuras[id].xf = punto_transformado[0];
        figuras[id].yf = punto_transformado[1];

        return backup_figura;
    }

    if(figura instanceof(Poligono)){
        var b_fila1 =[1,0,0];
        var b_fila2= [0,1,0];
        var b_fila3= [H,V,1];

        var backup_figura = new Poligono(figura.metodo);
        backup_figura.puntos = figura.puntos;
        console.log(backup_figura);

        for (var i=0 ; i< figura.puntos.length;i++){
            a = [figura.puntos[i][0],figura.puntos[i][1],1];
            punto_transformado = multiplicar_matrices(a,b_fila1,b_fila2,b_fila3);
            figuras[id].puntos[i][0] = punto_transformado[0];
            figuras[id].puntos[i][1]= punto_transformado[1];
        }
        return backup_figura;
    }

    // if(figura instanceof(Poligono)){

    //     var b_fila1 =[1,0,0];
    //     var b_fila2= [0,1,0];
    //     var b_fila3= [H,V,1];
    //     var backup_figura = new Linea(figura.xi,figura.yi,figura.xf,figura.yf,figura.metodo);
    //     console.log(figura);
    //     var a =[figura.xi,figura.yi,1];
    //     var punto_transformado = multiplicar_matrices(a,b_fila1,b_fila2,b_fila3);
    //     console.log('viejo punto x : '+ figuras[id].xi);
    //     figuras[id].xi = punto_transformado[0];
    //     console.log('nuevo punto x : '+ figuras[id].xi);
    //     figuras[id].yi = punto_transformado[1];

    //     a = [figura.xf,figura.yf,1];
    //     punto_transformado = multiplicar_matrices(a,b_fila1,b_fila2,b_fila3);
    //     figuras[id].xf = punto_transformado[0];
    //     figuras[id].yf = punto_transformado[1];

    //     return backup_figura;
    // }

}



function multiplicar_matrices(a,b_fila1,b_fila2,b_fila3){

    var x = a[0]*b_fila1[0]+a[1]*b_fila2[0]+a[2]*b_fila3[0];
    var y = a[0]*b_fila1[1]+a[1]*b_fila2[1]+a[2]*b_fila3[1];
    var punto = [x ,y];
    console.log(punto);
    return punto;



}

function continuar_trazo(ultima_instancia,metodo){

    var instancia = new Linea();
    instancia.metodo = metodo;
    $(c).mousedown(null);
    $(c).mousedown(instancia.mousedown);

}


function reset_function(e){

    ultima_posicion_click = null;
    $(c).css("cursor","auto");
    // area_recorte = {};
    $(c).unbind();
}
