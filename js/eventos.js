var inicio = function()
{
	//Declaramos las funciones.
	var validaUsuario = function()
	{
		var u = $("#txtUsuario").val();
		var c = $("#txtClave").val();
		var t = $("#ddlTipoUsuario").val();
		var parametros = "opc=validaAluProy"+"&tu="+t+"&aluctr="+u+"&alupas="+c+"&id="+Math.random();
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
							$("#informacion").show("slow");
							$("#btnIngresar").hide("slow");
							$("#altaProyectos").hide("slow");
		

							alert("Bienvenido: "+response.nombre);
							if(response.pnom != null){
								llenarTablaProy(true);
							}
							else llenarTablaProy(false);
							anoalumno();

							$("#bienvenido").show("slow");
							
							document.getElementById("usuario").innerHTML = response.nombre;

							var options = document.getElementById("ddlTipoUsuario").getElementsByTagName("option");
    						var optionHTML = options[document.getElementById("ddlTipoUsuario").selectedIndex].innerHTML;
							document.getElementById("tusuario").innerHTML = optionHTML+":";
						}
						else
							alert("Nombre de usuario y/o contraseña incorrectos");
					}
				});
			}
			else
				alert("Llene todos campos");
		}
		// if(u=="pw" && c=="clave")
		// {
		// 	$("#panelEntrada").hide("slow");
		// 	$("nav").show("slow");
		// }
	}
	
	var llenarTablaProy = function(cargado){
		var c = cargado;
		var parametros = "opc=llenarTablaProy"+"&cargado="+c+"&id="+Math.random();
		$.ajax({
				cache:false,
				url: "data/funciones.php",
				type: "POST",
				dataType: "json",
				data: parametros,
				success: function(response){
					if(response.respuesta == true) 
					{
						alert("Tabla proyecto");
						$("#tablaproy").html(response.renglones);
						$("#tablaproy").show();
					}
					else
						alert("No hay proyectos");
						$("#tablaproy").html(response.renglones);
				}
			});
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
				$("#PlanNuevo").show();				}
			else{
				$("#PlanNuevo").hide();
				$("#PlanViejo").show();
			}
	}

	var traeInicio = function()
	{
		// $.ajax({
		//   url: 'http://api.randomuser.me/',
		//   dataType: 'json',
		//   success: function(data){
		//   	$("img").attr("src",data.results[0].user.picture.medium);
		//   	$("h1").html(data.results[0].user.name.first+' '+
		//   		         data.results[0].user.name.last);
		//   	$("h2").html(data.results[0].user.email);
		//   }
		// });

		$("#informacion").show();
		$("#documentacion").hide();
		$("#banco").hide();
		$("#entregas").hide();
		$("#panelEntrada").hide("slow");
		$("#altaProyectos").hide("slow");
		$("#entregas").hide("slow");

	}

	var traeBanco = function ()
	{
		$("#informacion").hide();
		$("#documentacion").hide();
		$("#entregas").hide();
		$("#banco").show();
		$("#panelEntrada").hide("slow");
		$("#altaProyectos").hide("slow");
		$("#entregas").hide("slow");
		llenarTablaProy(true);

	}


		var traeDocumentacion = function()
	{
		$("#informacion").hide();
		$("#documentacion").show();
		$("#banco").hide();
		$("#entregas").hide();
		$("#panelEntrada").hide("slow");
		$("#altaProyectos").hide("slow");
		$("#entregas").hide("slow");
	}

	  var traeEntregas = function ()
	  {
	  	$("#entregas").show();
		$("#informacion").hide();
		$("#documentacion").hide();
		$("#banco").hide();
		$("#panelEntrada").hide("slow");
		$("#altaProyectos").hide("slow");
	  }


	var teclaUsuario = function(tecla)
	{
		if(tecla.which == 13) //Enter
		{
			//Pongo el cursor en el cuadro 
			//de texto de la Clave.
			$("#txtClave").focus();
		}
	}

	var teclaClave = function(tecla)
	{
		if(tecla.which == 13)
		{
			validaUsuario();
		}
	}

	var DivUsuarios = function()
	{
		$("#altaProyectos").show("slow");
		$("#btnGuardaProyecto").show();
		$("#btnEliminaProyecto").hide();
	}

		var Ingresar = function()
	{
		$("#panelEntrada").show("slow");
		// $("#nav1").hide("slow");
		$("#informacion").hide("slow");
		$("#entregas").hide();
		$("#banco").hide();
		$("#seccionlinks").show();
		$("#documentacion").hide();
		$("#altaProyectos").hide("slow");
		$("#docsAmbos").hide("slow");
		$("#docsGenerales").show("slow");

	}

	var GuardaProyecto = function()
	{
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

	var mostrarDatosUsuario = function()
	{
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

	var teclaNombreUsuario = function(tecla)
	{
		if(tecla.which == 13) //Enter
		{
			mostrarDatosUsuario();
		}		
	}


	var EliminaUsuario = function()
	{
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

	/*var calisBtn = function()
	{
		$("#art1").hide("slow");
		$("#art3").hide("slow");
		document.getElementById("art2").style.width = "800px";
	}*/
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

	// Nuevas Acciones

	$("#btnIngresar").on("click",Ingresar);
	$("#btnRegistrar").on("click",DivUsuarios);
	$("#lm1").on("click",cambiaTexto);
	$("#lm2").on("click",cambiaTexto);
	$("#lm3").on("click",cambiaTexto);



}
$(document).on("ready",inicio);












