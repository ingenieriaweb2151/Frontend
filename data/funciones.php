<?php 
require('conexionalumno.php');
require('algoritmo.php');
require('conexionpersonal.php');

function conectaBD()
{
	//Servidor, Usuario, Contraseña
	$conexion =  mysql_connect('localhost','root','');
	//Seleccionamos la BD
	mysql_select_db('residenciasitc',$conexion) or die ('No es posible conectarse a la BD residencias');
	return $conexion;
}	


function ValidaEntrada()
{
	$tipousuario = $_POST["tu"];
	$u = GetSQLValueString($_POST["usuario"],"text");
	$c = GetSQLValueString($_POST["clave"],"text");
	//global $u;
	//print ($tipousuario);
	if($tipousuario == "alumno")
	{
		
		$respuesta = EntraAlumn($u,$c);
		print json_encode($respuesta); 

	}

	elseif ($tipousuario == 'asesor')
	{

		$respuesta = EntraAsesor($u,$c);
		print json_encode($respuesta);
	}

	elseif ($tipousuario == 'divestpro') 
	{
		$respuesta = EntraDivespro($u,$c);
		print json_encode($respuesta);
	}

	elseif ($tipousuario == 'vinculacion') {
		$respuesta =  EntraVinculacion($u,$c);
		print json_encode($respuesta);
	}

}

// function consultaUsuario($usuario)
// {
// 	$respuesta = false;
// 	$conexion = conectaBD();
// 	$consulta = sprintf("select usuario from usuarios where usuario=%s",$usuario);
// 	$resconsulta = mysql_query($consulta); //ejecutamos la consulta.
// 	if($registro = mysql_fetch_array($resconsulta))
// 	{
// 		$respuesta = true;
// 	}
// 	return $respuesta;
// }

function GuardaProyecto()
{
	$nombre_empresa     = GetSQLValueString($_POST["usuario"],"text");
	$direccion      = GetSQLValueString($_POST["direccion"],"text");
	$telefono    = GetSQLValueString($_POST["telefono"],"text");
	$encargado = GetSQLValueString($_POST["encargado"],"long");
	$nombre_proyecto     = GetSQLValueString($_POST["nombre_proyecto"],"text");
	$carrera       = GetSQLValueString($_POST["carrera"],"text");
	$cupos = GetSQLValueString($_POST["cupos"],"text");
	$respuesta   = false; 
	if($clave == $repiteclave)
	{
		$conexion    = conectaBD();
		if(consultaUsuario($usuario) == false)
		{
			$consulta = sprintf("insert into proyectos values(%s,%s,%s,%s,%d,%s)",$nombre_empresa,$direccion,$telefono,$encargado,$nombre_proyecto,$carrera,$cupos);
			$resconsulta = mysql_query($consulta);
			if(mysql_affected_rows() > 0)
				$respuesta = true;
		}
		// else
		// {
		// 	$consulta = sprintf("update proyectos set clave=%s,nombre=%s,apellido=%s,tipousuario=%d,estatus=%s where usuario=%s",$clave,$nombre,$apellido,$tipousuario,$estatus,$usuario);
		// 	$resconsulta = mysql_query($consulta);
		// 	if(mysql_affected_rows() > 0)
		// 		$respuesta = true;
		// }
	}
	$salidaJSON = array('respuesta' => $respuesta);
	print json_encode($salidaJSON);
}

function MostrarDatosUsuario()
{
	$respuesta = false;
	$usuario   = GetSQLValueString($_POST["usuario"],"text");
	$conexion  = conectaBD();
	$consulta  = sprintf("select * from usuarios where usuario=%s",$usuario);
	$resconsulta =  mysql_query($consulta);
	//Inicializar variables.
	$nombre      = "";
	$apellido    = "";
	$tipousuario = 0;
	$estatus     = "";
	if($registro = mysql_fetch_array($resconsulta))
	{
		$nombre      = $registro["nombre"];
		$apellido    = $registro["apellido"];
		$tipousuario = $registro["tipousuario"];
		$estatus     = $registro["estatus"];
		$respuesta   = true;
	}
	$salidaJSON = array('respuesta'  => $respuesta, 
						'nombre'     => $nombre,
						'apellido'   => $apellido,
						'tipousuario'=> $tipousuario,
						'estatus'    => $estatus);
	print json_encode($salidaJSON);
}

function EliminaUsuario()
{
	$usuario =  GetSQLValueString($_POST["usuario"],"text");
	$conexion = conectaBD();
	$consulta = sprintf("delete from usuarios where usuario=%s",$usuario);
	$resconsulta = mysql_query($consulta);
	$respuesta = false;
	if(mysql_affected_rows()>0)
		$respuesta = true;
	$salidaJSON = array('respuesta' => $respuesta);
	print json_encode($salidaJSON);
}

function ValidaAluProy(){
	$u = GetSQLValueString($_POST["aluctr"],"text");
	$c = GetSQLValueString(md5($_POST["alupas"]),"text");
	//Conectar a la BD
	$conexion = conectaBD();
	//Preparar la consulta SQL
	$consulta  = sprintf("select P.nombre as nombreproy,P.numresi,P.objetiv,P.justifi,P.nomresp,E.nombre as nombreemp,E.telef,DA.alunom,DA.aluapp from dalumn DA left join asignproyectos AP ON AP.aluctr=DA.aluctr left join proyectos P ON AP.cveproy=P.cveproy left join empresas E ON AP.cveempr=E.cveempr where DA.aluctr=%s and DA.alupas=%s",$u,$c);
	//Ejecutamos la consulta.
	$resultado = mysql_query($consulta);
	//Validamos los datos.
	$res = false; //Saber el correcto
	$renglones = "";
	$nombre = ""; //Nombre completo
	$pnom = "";
	$pnumr = 0;
	$pobj = "";
	$pjust = "";
	$pnomresp = "";
	$enom = "";
	$etel = "";
	if($registro = mysql_fetch_array($resultado))
	{
		$res = true;
		$nombre = $registro["alunom"]." ".$registro["aluapp"];
		$pnom = $registro["nombreproy"];
		$pnumr = $registro["numresi"];
		$pobj = $registro["objetiv"];
		$pjust = $registro["justifi"];
		$pnomresp = $registro["nomresp"];
		$enom = $registro["nombreemp"];
		$etel = $registro["telef"];
	}
	$consulta2  = sprintf("select P.nombre as nombreproy,P.numresi,P.objetiv,P.justifi,P.nomresp,E.nombre as nombreemp,E.telef from proyectos P inner join empresas E ON P.cveempr=E.cveempr"); 
	$resultado2 = mysql_query($consulta2);

	if($pnom!=NULL){
		$renglones.="<tr>";
		$renglones.="<th>Nombre Proyecto</th>";
		$renglones.="<th>Objetivo</th>";
		$renglones.="<th>Justificacion</th>";
		$renglones.="<th>Empresa</th>";
		$renglones.="<th>Encargado</th>";
		$renglones.="<th>Telefono</th>";
		$renglones.="<th>Cupos</th>";
		$renglones.="</tr>";
		while($registro = mysql_fetch_array($resultado2)){
			$renglones.="<tr>";
			$renglones.="<td>".$registro["nombreproy"]."</td>";
			$renglones.="<td>".$registro["objetiv"]."</td>";
			$renglones.="<td>".$registro["justifi"]."</td>";
			$renglones.="<td>".$registro["nombreemp"]."</td>";
			$renglones.="<td>".$registro["nomresp"]."</td>";
			$renglones.="<td>".$registro["telef"]."</td>";
			$renglones.="<td>".$registro["numresi"]."</td>";
			$renglones.="</tr>";

		}
	}
	else{
		$renglones.="<tr>";
		$renglones.="<th>Nombre Proyecto</th>";
		$renglones.="<th>Objetivo</th>";
		$renglones.="<th>Justificacion</th>";
		$renglones.="<th>Empresa</th>";
		$renglones.="<th>Encargado</th>";
		$renglones.="<th>Telefono</th>";
		$renglones.="<th>Cupos</th>";
		$renglones.="<th>Cargar</th>";
		$renglones.="</tr>";

		while($registro = mysql_fetch_array($resultado2)){
			$renglones.="<tr>";
			$renglones.="<td>".$registro["nombreproy"]."</td>";
			$renglones.="<td>".$registro["objetiv"]."</td>";
			$renglones.="<td>".$registro["justifi"]."</td>";
			$renglones.="<td>".$registro["nombreemp"]."</td>";
			$renglones.="<td>".$registro["nomresp"]."</td>";
			$renglones.="<td>".$registro["telef"]."</td>";
			$renglones.="<td>".$registro["numresi"]."</td>";
			$renglones.="<td>";
			$renglones.="<input type='checkbox' name=".$registro["nombreproy"].">";
			$renglones.="</td>";
			$renglones.="</tr>";
		}
	}
	$salidaJSON = array('respuesta' => $res,
						'nombre'    => $nombre,
						'pnom'		=> $pnom,
						'pnumr'		=> $pnumr,
						'pobj'		=> $pobj,
						'pjust'		=> $pjust,
						'pnomresp'	=> $pnomresp,
						'enom'		=> $enom,
						'etel'		=> $etel,
						'renglones' => $renglones); 
	//Codificamos a JSON el array asociativo.
	print json_encode($salidaJSON);
}

function LlenarTablaProy(){
	$conexion = conectaBD();
	//Preparar la consulta SQL
	$consulta  = sprintf("SELECT * FROM BancoProy where numresi > 0");
		

	//Ejecutamos la consulta.
	$resultado = mysql_query($consulta);
	//Validamos los datos.
	$res = false; //Saber el correcto
	$renglones = "";
	
		$renglones.="<tr>";
		$renglones.="<th>Nombre Proyecto</th>";
		$renglones.="<th>Objetivo</th>";
		$renglones.="<th>Justificacion</th>";
		$renglones.="<th>Empresa</th>";
		$renglones.="<th>Encargado</th>";
		$renglones.="<th>Telefono</th>";
		$renglones.="<th>Cupos</th>";
		$renglones.="<th>Cargar</th>";
		$renglones.="</tr>";
		while($registro = mysql_fetch_array($resultado)){
			$res = true;

			$renglones.="<tr>";
			$renglones.="<td>".$registro["nombreproy"]."</td>";
			$renglones.="<td>".$registro["objetiv"]."</td>";
			$renglones.="<td>".$registro["justifi"]."</td>";
			$renglones.="<td>".$registro["nombreemp"]."</td>";
			$renglones.="<td>".$registro["nomresp"]."</td>";
			$renglones.="<td>".$registro["telef"]."</td>";
			$renglones.="<td>".$registro["numresi"]."</td>";
			$renglones.="<td>";
			$renglones.="<input type='radio' class='radProy' name='seleccionar' value=".$registro["clave"].">";
			$renglones.="</td>";
			$renglones.="</tr>";
		}
	//}
	$salidaJSON = array('respuesta'	=> $res,
						'renglones'	=> $renglones);
	print json_encode($salidaJSON);
}
/*
function LlenarTablaProy(){
	$conexion = conectaBD();
	//Preparar la consulta SQL
	$consulta  = sprintf("select P.nombre as nombreproy,P.numresi,P.objetiv,P.justifi,P.nomresp,E.nombre as nombreemp,E.telef from proyectos P inner join empresas E ON P.cveempr=E.cveempr");
	//Ejecutamos la consulta.
	$resultado = mysql_query($consulta);
	//Validamos los datos.
	$res = false; //Saber el correcto
	$renglones = "";
		$renglones.="<tr class='warning'>";
		$renglones.="<th>Nombre Proyecto</th>";
		$renglones.="<th>Objetivo</th>";
		$renglones.="<th>Justificacion</th>";
		$renglones.="<th>Empresa</th>";
		$renglones.="<th>Encargado</th>";
		$renglones.="<th>Telefono</th>";
		$renglones.="<th>Cupos</th>";
		$renglones.="</tr>";
		while($registro = mysql_fetch_array($resultado)){
			$res = true;
			$renglones.="<tr>";
			$renglones.="<td>".$registro["nombreproy"]."</td>";
			$renglones.="<td>".$registro["objetiv"]."</td>";
			$renglones.="<td>".$registro["justifi"]."</td>";
			$renglones.="<td>".$registro["nombreemp"]."</td>";
			$renglones.="<td>".$registro["nomresp"]."</td>";
			$renglones.="<td>".$registro["telef"]."</td>";
			$renglones.="<td>".$registro["numresi"]."</td>";
			$renglones.="</tr>";
		}
	$salidaJSON = array('respuesta'	=> $res,
						'renglones'	=> $renglones);
	print json_encode($salidaJSON);
}
*/
//Opciones a ejecutar.
$opcion = $_POST["opc"];
switch ($opcion) {
	case 'validaentrada':
		ValidaEntrada();
		break;
	case 'guardaproyecto':
		GuardaUsuario();
		break;
	case 'mostrarDatosUsuario':
		MostrarDatosUsuario();
		break;
	case 'EliminaUsuario':
		EliminaUsuario();
		break;
	case 'validaAluProy':
		ValidaAluProy();
		break;
	case 'llenarTablaProy':
		LlenarTablaProy();
	default:
		# code...
		break;
}
?>




