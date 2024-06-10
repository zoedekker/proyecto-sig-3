<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
</head>
<body>

<?php//Validacion login
 //  Conectarse a la base de datos

 include ("conexion_db.php");
 $dbcon = conexion();

 
$correo=$_POST['correo'];
$clave=$_POST['clave'];

// Preparar la consulta SQL para buscar el usuario por correo electrónico
$query = "SELECT * FROM users WHERE correo = $1";
$resultado = pg_query_params($dbcon, $query, array($correo));

if ($resultado) {
    $usuario = pg_fetch_assoc($resultado);
    
    // Verificar si el usuario existe y si la contraseña es correcta
    if ($usuario && password_verify($clave, $usuario['clave'])) {
        header("location: inicio_servicio.html"); //aqui la idea es que el usuario ingrese a la página del aplicativo
    } else {
        echo "Error en la autenticación</br></br>";
        echo '<a href="login.html"> Regresar a inicio</a>'; //aqui el usuario regresa a la página de login
    }
} else {
    echo "Error en la consulta a la base de datos.";
}

// Liberar el resultado y cerrar la conexión
pg_free_result($resultado);
pg_close($dbcon);
?>