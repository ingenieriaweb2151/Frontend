<?php 

function conectaBDalumno()
{
  $conexion = mysql_connect("localhost","root","");
  mysql_select_db('residenciasitc');
  return $conexion;
}

function EntraAlumn($u,$c)
{
  $conexion = conectaBDalumno();
      if(buscaralumno($u))
      {
       /*
        $consulta  = sprintf("select * from dalumn where aluctr=%s and alupas=%s",$u,$c);
        //Ejecutamos la consulta.
        $resultado = mysql_query($consulta);
        //Validamos los datos.
        $res = false; //Saber el correcto
        $nombre = ""; //Nombre completo
        $registro = mysql_fetch_array($resultado);
        if($registro>0)
        {
          $res = true;
          $nombre = $registro["alunom"]." ".$registro["aluapp"];
        }
        //else{
         //$res = false;     
       // }
        $salidaJSON = array('respuesta' => $res,
                  'nombre'    => $nombre);
        //print json_encode($salidaJSON);
        return $salidaJSON;
        */
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
            'pnom'    => $pnom,
            'pnumr'   => $pnumr,
            'pobj'    => $pobj,
            'pjust'   => $pjust,
            'pnomresp'  => $pnomresp,
            'enom'    => $enom,
            'etel'    => $etel,
            'renglones' => $renglones); 
  //Codificamos a JSON el array asociativo.
  return $salidaJSON;


      }
      else
      {//configurar eventos.js para que aparesca el mensaje en un alert();
        $msj = "Lo sentimos el alumno no esta en proceso de residencias";
        $res = false;
        $salidaJSON = array('respuesta' => $res,
                  'nombre'    => $msj);
        //print json_encode($salidaJSON);
        return $salidaJSON;
      } 
}
 //Busca al alumno en la tabla alureg: esta tabla almacena a todos los alumnos que estan en proceso de residencias
function buscaralumno($aluctr)
{
  $conexion = conectaBDalumno("root");
  $consulta = sprintf("Select * from alureg where aluctr=%s",$aluctr); //Verificamos si ya esta registrado
  $resultado = mysql_query($consulta);
  if($registro = mysql_fetch_array($resultado))
  {
    return true;
    print("El alumno esta en proceso de recidencias");
  }//sino esta registrado verificamos si cargo la mat. residencias y así darlo de alta
  elseif(cargoresidencias($aluctr)){
    $registrar = registraalumno($aluctr);
    return $registrar; 
  }
  else
    return false;
}

//funcion para registrar al alumno en el proceso de recidencias
function registraalumno($aluctr)
{
  $conexion = conectaBDalumno('root');
  $consulta = sprintf("insert into alureg values (%s)",$aluctr);
    $resultado = mysql_query($consulta,$conexion);
    if (mysql_affected_rows() > 0) {
      return true;
      //print("Registrado con exito");
    }
    else{
      return false;
      //print("No se pudo registrar");
    }
      
}

//Funcion buscar la materia de residencias y si el alumno la cargo
//buscamat: vista que contiene la consulta para buscar al alumno.
function cargoresidencias($aluctr)
{
  $conexion = conectaBDalumno("root");
  //Consulara para buscar al alumno en la tabla DLISTA: aqui se almacena las materias que cargo 
  $consulta = sprintf("select * from buscarmat where aluctr=%s",$aluctr);
  $resultado = mysql_query($consulta);
  if($registro = mysql_fetch_array($resultado))
    return true;
  else
    return false;
}
?>