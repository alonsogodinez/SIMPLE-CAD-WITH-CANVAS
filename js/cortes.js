var c = document.getElementById("myCanvas");
c.width = c.offsetWidth;
c.height = c.offsetHeight;
var pincel = c.getContext("2d");
pincel.fillStyle = "darkblue";

function dibujar_area_recorte(xi,yi,xf,yf){
    if(xi>xf){
        aux = xf;
        xf = xi;
        xi= aux;
    }
    if(yi>yf){
        aux = yf;
        yf = yi;
        yi= aux;

    }
    distancia_x= xf-xi;
    distancia_y = yf-yi;

    c.width= c.offsetWidth;
    pincel.strokeStyle = "red";
    pincel.strokeRect(xi,yi,distancia_x,distancia_y);
    reset_function();
    area_recorte.xi = xi;
    area_recorte.yi= yi;
    area_recorte.xf = xf;
    area_recorte.yf = yf;


}



//recorta una linea respecto a un area definida
function recortar_linea(xi,yi,xf,yf){
    //Se guardan los puntos en un array para mayor encapsulamiento
    console.log(area_recorte)
    var inicio = [xi,yi];
    var fin = [xf,yf];
    console.log("inicio: "+inicio);
    var puntos = [];

    puntos.push(inicio);
    puntos.push(fin);

    //se hallan los codigos en binario de los puntos segun su ubicacion
    binario_inicio = binario(inicio);
    binario_fin = binario(fin);


    //si ambos puntos estan dentro del area
    if(binario_inicio == '0000' && binario_fin == '0000')
        console.log('TRIVIAL');//es un caso trivial y no se realiza corte

    //cuanto ambos puntos estan fuera del area pero comparten un bit
    else if((parseInt(binario_inicio,2) & parseInt(binario_fin,2)) != 0 )
    {

        console.log('TRIVIAL');
        //se borra toda la linea
        xi = xf+1;
        yi = yf+1;

    }

    //un punto esta dentro del area pero otro esta fuera ( 0000 * XXXX siempre da 0)
    else if( (binario_inicio & binario_fin) == 0 && binario_inicio == '0000' || binario_fin == '0000')
    {
        //si el primer punto esta dentro del area, se halla la interseccion respecto al punto final
        if(binario_inicio=='0000') var intersecciones = encontrar_interseccion(binario_fin, puntos);
        //si el  punto final esta dentro del area, se halla la interseccion respecto al primer punto
        else var intersecciones = encontrar_interseccion(binario_inicio, puntos);


        console.log("Las intersecciones son : " + intersecciones[0]);

        var cant = intersecciones.length -1;//puede que hayan sido 1 o 2 intersecciones

        //si el punto inicial estaba afuera
        if(binario_inicio != '0000')
        {
            //la interseccion se vuelve el nuevo punto inicial
            xi = intersecciones[cant][0];
            yi = intersecciones[cant][1];
        }
        //si el punto final estaba afuera
        else if(binario_fin != '0000')
        {
            //la interseccion se vuelve el nuevo punto final
            xf = intersecciones[cant][0];
            yf = intersecciones[cant][1];

        }
    }

    // cuando los dos puntos estan afuera pero no comparten ningun bit ( no hay interseccion)
    else if( (parseInt(binario_inicio,2) & parseInt(binario_fin,2)) == 0)
    {
        //se halla la interseccion del primer punto
        intersecciones = encontrar_interseccion(binario_inicio, puntos);
        console.log("intersecciones de punto inicio : " + intersecciones[0]);

        var cant = intersecciones.length -1;//cantidad de intersecciones
        //la interseccion de vuelve el nuevo punto inicial
        xi = intersecciones[cant][0];
        yi = intersecciones[cant][1];

        //se halla la interseccion del punto final
        intersecciones = encontrar_interseccion(binario_fin, puntos);
        console.log("intersecciones de punto final : " + intersecciones[0]);
        var cant = intersecciones.length -1;//cantidad de intersecciones

        //la interseccion de vuelve el nuevo punto final
        xf = intersecciones[cant][0];
        yf = intersecciones[cant][1];
    }
    var nuevos_puntos ={xi: xi, yi:yi,xf:xf,yf:yf};
    return nuevos_puntos;
}

//convierte un punto a su "cuadrante segun su posicion respecto a X e Y"
function binario(punto){

    var codigo = '';

    x = punto[0];
    y = punto[1];

    //se obtiene los valores maximos y minimos del area generada anteriormente
    xmax = area_recorte.xf;
    xmin = area_recorte.xi;

    ymax = area_recorte.yf;
    ymin = area_recorte.yi;


    if(y >ymax)
        codigo = codigo + '1';
    else
        codigo = codigo + '0';

    if(y < ymin)
        codigo = codigo + '1';
    else
        codigo = codigo + '0';

    if(x > xmax)
        codigo = codigo + '1';
    else
        codigo = codigo + '0';

    if(x < xmin)
        codigo = codigo + '1';
    else
        codigo = codigo + '0';

    return codigo;
}

function encontrar_interseccion(codigo, puntos)
{

    //se divide en punto inicial y final
    var inicio = puntos[0];
    var fin = puntos[1];

    //se obtienes los vlaores maximos y minimos del area generada
    xmax = area_recorte.xf;
    xmin = area_recorte.xi;

    ymax = area_recorte.yf;
    ymin = area_recorte.yi;


    //se divide en sus respectivas coordenadas
    var xi = inicio[0];
    var yi = inicio[1];
    var xf = fin[0];
    var yf = fin[1];



    //array para guardar 1 o 2 interseciones segun el numero de "unos" en el codigo binario
    var intersecciones = []

    //contador de unos en el codigo binario
    var unos= 0;

    //pendiente
    var m = (yf-yi)/(xf-xi);


    //constante de la formula de la recta (y= x*m +c)
    var c = yi - m*xi;

    if(codigo.charAt(0) == '1')
    {
        //se halla la interseccion con ymax

        var interseccion =[];//varialbe que guarda coordenadas de la interseccion
        if(xi == xf) interseccion[0]= xi; // si su pendiente es 0, la interseccion en el eje x es el mismo punto
        else {
            //si la pendiente no es 0
            interseccion[0] = Math.floor((ymax - c)/m); // se halla el X con la formula
            xi= interseccion[0]; //El X encontrado se vuelve parte del nuevo punto inicial
        }
        interseccion[1]= ymax; //la coordenada Y de la interseccion es ymax
        yi = interseccion[1]; //el Y se vuelve parte de nuevo punto inicial
        c = yi - m*xi; //se halla la  constante de la formula con los nuevos X e Y
        intersecciones.push(interseccion); // se guarda la primera interseccion
        unos++; //se aumenta al encontrar un "1"
    }

    if(codigo.charAt(1) == '1')
    {
        //se halla la interseccion con ymin
        var interseccion =[];//varialbe que guarda coordenadas de la interseccion
        if(xi == xf) interseccion[0]= xi; // si su pendiente es 0, la interseccion en el eje x es el mismo punto
        else{
           interseccion[0] = Math.floor((ymin - c)/m) // se halla el X con la formula;
           xi= interseccion[0];///El X encontrado se vuelve parte del nuevo punto inicial
        }
        interseccion[1] = ymin;//la coordenada Y de la interseccion es ymin
        yi = interseccion[1];//el Y se vuelve parte de nuevo punto inicial
        c = yi - m*xi;//se halla la  constante de la formula con los nuevos X e Y

        intersecciones.push(interseccion);// se guarda la primera interseccion
        unos++; //se aumenta al encontrar un "1"

    }

    if(codigo.charAt(2) == '1')
    {
        //se halla la interseccion con xmax ( con los nuevos X Y si es que fuera el caso)
        var interseccion =[];//varialbe que guarda coordenadas de la interseccion
        if(yi == yf) interseccion[1]= yi;// si su pendiente es 0, la interseccion en el eje Y es el mismo punto
        else interseccion[1] = Math.floor(m * xmax + c); // se halla Y con la formula
        interseccion[0] = xmax; //la coordena X de la interseccion es xmax
        intersecciones.push(interseccion); //se guarda la interseccion
        unos++;////se aumenta al encontrar un "1"
    }

    if(codigo.charAt(3) == '1')
    {
        //se halla la interseccion con xmin ( con los nuevos X Y si es que fuera el caso)
        var interseccion =[];//variable que guarda coordenadas de la interseccion
        if(yi == yf) interseccion[1]= yi;// si su pendiente es 0, la interseccion en el eje Y es el mismo punto
        else interseccion[1] = Math.floor((m * xmin + c));// se halla Y con la formula

        interseccion[0] = xmin;//la coordena X de la interseccion es xmmin
        intersecciones.push(interseccion);//se guarda la interseccion
        unos++;//se aumenta al encontrar un "1"
    }

    //si hubieron dos "unos" se comprueba que el corte se realizo en orden.
    if(unos > 1) {
        //si el corte de la recta se ejecuto en orden inverso
        //utilizamos la primera interseccion como la interseccion final
        if (intersecciones[1][1]> ymax || intersecciones[1][1]< ymin)
            intersecciones[1]= intersecciones[0]
    }

    return intersecciones;
}
