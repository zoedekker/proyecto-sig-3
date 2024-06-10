<?php
// Incluir el archivo de conexión a la base de datos
include 'conexion_db.php';
$dbcon = conexion();

// Obtener los datos del formulario
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$correo = $_POST['correo'];
$password = $_POST['password'];

// Encriptar la contraseña
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Preparar la consulta SQL para insertar un nuevo usuario
$query = "INSERT INTO users (nombre, apellido, correo, password) VALUES ($1, $2, $3, $4)";
$params = array($nombre, $apellido, $correo, $hashed_password);
$resultado = pg_query_params($dbcon, $query, $params);

if ($resultado) {
    echo "Registro exitoso. Puedes <a href='inicio_servicio.html'>iniciar sesión</a> ahora."; //aqui la idea es que el usuario ingrese a la página del aplicativo
} else {
    echo "Error en el registro."; 
}

// Cerrar la conexión a la base de datos
pg_close($dbcon);
?>