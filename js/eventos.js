

var inicio = function(){

	var datos = [];
	//Declaramos las funciones.

	
	
	var validaUsuario = function(){
		var u = $("#txtUsuario").val();
		var c = $("#txtClave").val();
		var t = $("#ddlTipoUsuario").val();
		var parametros = "opc=validaentrada"+"&tu="+t+"&usuario="+u+"&clave="+c+"&id="+Math.random();
		if (t!="alumno" && t!="asesor" && t!="divestpro" && t!="vinculacion")
		{
			alert("Tipo de usuario inválido");
		}
		else
		{
		if(u!="" && c!="")
		{
			$.ajax({
				cache:false,
				url: "data/funciones.php",
				type: "POST",
				dataType: "json",
				data: parametros,
				success: function(response){
					if(response.respuesta == true) 
					{
						$("#panelEntrada").hide("slow");
						$("#nav1").show("slow");
						
						$("#btnEntregas").show("slow");
						$("#informacion").show();
						$("#btnIngresar").hide("slow");
						$("#btnSalir").show("slow");

						$("#tablaproy").html(response.renglones);
						$("#tablaproy").show();
						$("#altaProyectos").hide("slow");
							datos["ncontrol"] = u;

							alert("Bienvenido: "+response.nombre);
							if(response.pnom != null){
								llenarTablaProy(true);
							}
							else llenarTablaProy(false);
							anoalumno();


						// alert("Bienvenido: "+response.nombre);
						
						anoalumno();

						$("#bienvenido").show("slow");

						$("#ttipo").show();
						$("#usuario").show();
						
						var options = document.getElementById("ddlTipoUsuario").getElementsByTagName("option");
    					var optionHTML = options[document.getElementById("ddlTipoUsuario").selectedIndex].innerHTML;
						document.getElementById("ttipo").innerHTML = optionHTML+":";

					document.getElementById("usuario").innerHTML = response.nombre;

						document.getElementById("pa").innerHTML = response.pnom;
						if (document.getElementById("pa").innerHTML == ""){
							document.getElementById("pa").innerHTML = "No asignado"
							$("#btnCargarProy").show();
							$("#btnSolicita").show();
						}

						if(optionHTML == "Alumno"){
							$("#proyectoasign").show();
							$("#pa").show();
							$("#btnGuardaProyecto").hide();

							$("#btnSolicitaProy").show();										
							$("#btnCargarProy").show();

							$("#entregaRev").hide();
							$("#entregaSelect").hide();
							
							

						}
			

						if(optionHTML == "División de estudios profesionales"){
							$("#btnSolicitud").show("slow");
							$("#l").show("slow");

							$("#btnRegistrar").show();
							$("#btnSolicitaProy").hide();
							$("#btnGuardaProyecto").show();

							$("#btnSolicita").hide();
							$("#btnCargarProy").hide();
						}

						if(optionHTML == "Vinculacion"){
							$("#proyectoasign").show();
							$("#pa").show();
							$("#btnGuardaProyecto").hide();
						}

						if(optionHTML != "Alumno"){
							$("btnSolicita").hide();
							document.getElementById("btnEntregas").innerHTML = "REVISIONES";
						}
					
					}
					else
						alert("Nombre de usuario y/o contraseña incorrectos");
				}
			});
		}
		else
			alert("Llene todos campos");
		// if(u=="pw" && c=="clave")
		// {
		// 	$("#panelEntrada").hide("slow");
		// 	$("nav").show("slow");
		// }
	}
	}
	
	var llenarTablaProy = function(cargado){

		// //$u = GetSQLValueString($_POST["aluctr"],"text");
		// //$c = GetSQLValueString(md5($_POST["alupas"]),"text");

		// var c = cargado;
		// var parametros = "opc=llenarTablaProy"+"&cargado="+c+"&id="+Math.random();
		// $.ajax({
		// 		cache:false,
		// 		url: "data/funciones.php",
		// 		type: "POST",
		// 		dataType: "json",
		// 		data: parametros,
		// 		success: function(response){
		// 			if(response.respuesta == true) 
		// 			{
		// 				alert("Tabla proyecto");
		// 				$("#tablaproy").html(response.renglones);
		// 				$("#tablaproy").show();
		// 			}
		// 			else
		// 				alert("No hay proyectos");

		// 				$("#tablaproy").html(response.renglones);
		// 		}
		// 	});
	}

	var validaAluProy = function(response){
			
		// if (nomproy != null){
		// 	document.getElementById("tusuario").innerHTML = "Maestro: "
		// 	$("#btnRegistrar").show("slow");s
		// 	$("#proyectosbox").show("slow");

		// 	//Cambio de nombre de botones
		// 	document.getElementById("btnEntregas").innerHTML = "Revisiones"
		// }
		// else{
		// 	document.getElementById("tusuario").innerHTML = "Alumno: "
		// }
	}

	var anoalumno = function (){
		var u = $("#txtUsuario").val();
		var ano = parseInt(u.substring(0,2));
			if(ano>=9){
				$("#PlanViejo").hide();
				$("#PlanNuevo").show();
			}
			else{
				$("#PlanNuevo").hide();
				$("#PlanViejo").show();
			}
	}

	var traeInicio = function(){

		$("#informacion").show();
		$("#documentacion").hide();
		$("#banco").hide();
		$("#entregas").hide();
		$("#panelEntrada").hide("slow");
		$("#altaProyectos").hide("slow");
		$("#entregas").hide("slow");
		$("#divSolicitudes").hide();
		$("#solicitaProyecto").hide();


	}

	var traeSolicitud = function ()
	 {
		var parametros = "opc=LlenarTablaSolicitud"+"&id="+Math.random();
			$.ajax({
				cache:false,
				url: "data/funciones.php",
				type: "POST",
				dataType: "json",
				data: parametros,
				success: function(response){
					if(response.respuesta == true){
						$("#tablaSolicitud").html(response.renglones);
						$("#tablaSolicitud").show();
					}
				}
			});
				
	}
	var traeBanco = function (){
		if(document.getElementById("usuario").innerHTML == ""){
			var parametros = "opc=llenarTablaProy"+"&id="+Math.random();
			$.ajax({
				cache:false,
				url: "data/funciones.php",
				type: "POST",
				dataType: "json",
				data: parametros,
				success: function(response){
					if(response.respuesta == true){
						$("#tablaproy").html(response.renglones);
						$("#tablaproy").show();
					}
				}
			});
		}

		$("#informacion").hide();
		$("#documentacion").hide();
		$("#entregas").hide();
		$("#banco").show();
		$("#panelEntrada").hide("slow");
		$("#altaProyectos").hide("slow");
		$("#entregas").hide("slow");
		$("#divSolicitudes").hide();


	}

	var traeDocumentacion = function(){
		$("#informacion").hide();
		$("#documentacion").show();
		$("#banco").hide();
		$("#entregas").hide();
		$("#panelEntrada").hide("slow");
		$("#altaProyectos").hide("slow");
		$("#entregas").hide("slow");
		$("#divSolicitudes").hide();
		$("#solicitaProyecto").hide();


	}

	var traeEntregas = function(){
	 	$("#entregas").show();
		$("#informacion").hide();
		$("#documentacion").hide();
		$("#banco").hide();
		$("#panelEntrada").hide("slow");
		$("#altaProyectos").hide("slow");
		$("#divSolicitudes").hide();
		$("#solicitaProyecto").hide();


	 }


	var teclaUsuario = function(tecla){
		if(tecla.which == 13) //Enter
		{
			//Pongo el cursor en el cuadro 
			//de texto de la Clave.
			$("#txtClave").focus();
		}
	}

	var teclaClave = function(tecla){
		if(tecla.which == 13)
		{
			validaUsuario();
		}
	}

	var DivUsuarios = function(){
		$("#altaProyectos").show("slow");
		$("#btnGuardaProyecto").show();
		$("#btnEliminaProyecto").hide();
	}

	var Ingresar = function(){
		$("#panelEntrada").show("slow");
		// $("#nav1").hide("slow");
		$("#informacion").hide();
		$("#entregas").hide();
		$("#banco").hide();
		$("#seccionlinks").show();
		$("#documentacion").hide();
		$("#docsAmbos").hide("slow");
		$("#divSolicitudes").hide();
		$("#docsGenerales").show("slow");
	}

	var GuardaProyecto = function(){
		var u = $("#txtNombreEmpresa").val();
		var n = $("#txtDireccion").val();
		var a = $("#txtTelefono").val();
		var t = $("#txtEncargado").val();
		var e = $("#txtNombreProyecto").val();
		var c = $("#txtCarrrera").val();
		var r = $("#txtCupos").val();
		
			var parametros = "opc=guardaproyecto"+"&nombre_empresa="+u+"&direccion="+n+"&telefono="+a+"&encargado="+t+"&nombre_proyecto="+e+"&carrera="+c+"&cupos="+r+"&id="+Math.random();
			$.ajax({
				cache:false,
				type: "POST",
				dataType: "json",
				url:'data/funciones.php',
				data: parametros,
				success: function(response){
					if(response.respuesta == true)
					{
						alert("Proyecto registrado con éxito");
					}
					else
						alert("No se ha podido registrar el proyecto");
				},
				error: function(xhr,ajaxOption,x){
					alert("Sin conexión");
				}
			});
		$("#altaProyectos").hide("slow");
	}

	var mostrarDatosUsuario = function(){
		var u = $("#txtNombreUsuario").val();
		var parametros = "opc=mostrarDatosUsuario"+
						 "&usuario="+u+
						 "&id="+Math.random();
		$.ajax({
			cache: false,
			type: "POST",
			dataType: "json",
			url: "data/funciones.php",
			data: parametros,
			success: function(response){
				if(response.respuesta == true)
				{
					$("#txtNombre").val(response.nombre);
					$("#txtApellido").val(response.apellido);
					$("#txtTipoUsuario").val(response.tipousuario);
					$("#txtEstatus").val(response.estatus);
				}
				else
					$("#txtNombre").focus();
			},
			error: function(xhr,ajaxOption,x){
				alert("Error de conexión");
			}
		});
	}

	var teclaNombreUsuario = function(tecla){
		if(tecla.which == 13) //Enter
		{
			mostrarDatosUsuario();
		}		
	}

	var solicitaProy =function(){

		$("#solicitaProyecto").show();
	}

	var Solicitaste = function(){
		alert("Tu proyecto esta en proceso de aceptacion, podras cargarlo una vez lo validemos");
		$("#solicitaProyecto").hide();
		$("#banco").hide();
		$("#informacion").show();
	}

	var EliminaUsuario = function(){
		var u = $("#txtNombreUsuario").val();
		var parametros = "opc=EliminaUsuario"+"&usuario="+u+"&id="+Math.random();
		$.ajax({
			cache: false,
			url: "data/funciones.php",
			type: "POST",
			dataType: "json",
			data:parametros,
			success: function(response){
				if(response.respuesta == true)
				{
					alert("El usuario ha sido dado de baja");
					$("#altaUsuarios > input").val("");
				}
			},
			error: function(xhr,ajaxOption,x){
			}
		});
	}
	var Solicitudes = function()
	{
		$("#divSolicitudes").show();
		$("#informacion").hide();
		$("#documentacion").hide();
		$("#entregas").hide();
		$("#banco").hide();
		$("#panelEntrada").hide("slow");
		$("#altaProyectos").hide("slow");
		$("#entregas").hide("slow");
	}

	var cambiaTexto = function (){
		if (this.innerHTML == "Ver más")
			this.innerHTML = "Ver menos";
		else
			this.innerHTML = "Ver más";
	}


	//Configuramos los eventos.
	$("#btnEntrar").on("click",validaUsuario);
	$("#btnInicio").on("click",traeInicio);
	$("#btnEntregas").on("click", traeEntregas);
	$("#txtUsuario").on("keypress",teclaUsuario);
	$("#txtClave").on("keypress",teclaClave);
	$("#btnDivUsuarios").on("click",DivUsuarios);
	$("#btnDivBanco").on("click",traeBanco);
	$("#btnGuardaProyecto").on("click",GuardaProyecto);
	$("#txtNombreUsuario").on("keypress",teclaNombreUsuario);
	$("#btnDivDocumentacion").on("click",traeDocumentacion);
	$("#btnEliminaUsuario").on("click",EliminaUsuario);
	$("#btnSolicitud").on("click",Solicitudes);
	
	$("#btnIngresar").on("click",Ingresar);
	$("#btnRegistrar").on("click",solicitaProy);
	$("#btnSolicita").on("click",solicitaProy);
	$("#btnSolicitaProy").on("click",Solicitaste);
	$("#lm1").on("click",cambiaTexto);
	$("#lm2").on("click",cambiaTexto);
	$("#lm3").on("click",cambiaTexto);


}

$(document).on("ready",inicio);









