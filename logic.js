//INICIO FIREBASE
var db = firebase.database();
//INICIO REFERENCIA
var ref = db.ref("task/");

//CODIGO

$(function(){
    //VARIABLE GLOBAL DE ASIGNACION
    var resTable = "";
    //RECORREMOS VALORES
    ref.on('value',function(res){
        resTable="";
        $.each(res.val(),function(key,val){
            //LLENAMOS TABLA
            resTable+=dataTbody(val.name,val.description,val.date,key);        
        });
        //ASIGNAMOS HTML A ID
        $("#tablaLoad").html(resTable);

        //EDIT
        $("a[rel='mod']").on('click',function(){
            var key = $(this).attr("idKey");
            db.ref("task/"+key).on('value',function(res){
                $("#name").val(res.val().name);
                $("#desc").val(res.val().description);
                $("#valNext").val(key);
            });
        }); 

        //EDITAR 
        $("#modf").on('click',function(){
            db.ref("task/"+$("#valNext").val()).update({
                name:$("#name").val(),
                description:$("#desc").val(),
                dateUpdate:dateStart()
            });
        });

        //ELIMINAR 
        $("a[rel='elm']").on('click',function(){
            if(confirm("Desea eliminar")){
            db.ref("task/"+ $(this).attr("idKey")).remove();
            }
        }); 
    });

    //INSERCION
    $("#add").on('click',function(){
        //OBTENEMOS VALORES
        var name = $("#name").val();
        var desc = $("#desc").val();
        //INSERTAMOS
        insertTask(name,desc);
    });
    
    
    
    //FUNCIONES COMPLEMENTARIAS

    //FUNCION DE FECHA
    function dateStart(){
        var date = new Date();
        return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
    }

    //JSON DE INSERCION
    function insertTask(name,desc){
        db.ref("task/").push({
            name:name,
            description:desc,
            date:dateStart()
        });
    }

    //CARGAR TABLA DINAMICA
    function dataTbody(task,desc,date,key){
        return "<tr>"+
        "<td>"+task+"</td>"+
        "<td>"+desc+"</td>"+
        "<td>"+date+"</td>"+
        "<td><a rel='mod' idKey='"+key+"' ><span class='badge badge-pill badge-primary'>Modificar</span></a>"+
        "<td><a rel='elm' idKey='"+key+"'><span class='badge badge-pill badge-danger'>Eliminar</span></a>"+
        "</tr>";
    }

    

});