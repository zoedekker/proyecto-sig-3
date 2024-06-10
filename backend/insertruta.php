<?php
include 'conexion_db.php';
$cnx = conexion();

// Decode JSON from request body
$data = json_decode(file_get_contents("php://input"), true);

if (json_last_error() !== JSON_ERROR_NONE) {
    die(json_encode(['status' => 'error', 'message' => 'JSON decoding error: ' . json_last_error_msg()]));
}

// Validate and decode GeoJSON data
if (!isset($data['geo']) || !is_string($data['geo'])) {
    die(json_encode(['status' => 'error', 'message' => 'GeoJSON data is missing or incorrect']));
}

$geojson = json_decode($data['geo'], true);
if (json_last_error() !== JSON_ERROR_NONE) {
    die(json_encode(['status' => 'error', 'message' => 'GeoJSON decoding error: ' . json_last_error_msg()]));
}

$geometryJson = json_encode($geojson['geometry']);
if (!$geometryJson) {
    die(json_encode(['status' => 'error', 'message' => 'Error encoding geometry JSON']));
}

// Prepare and execute SQL statement
$query = "INSERT INTO rutas (user_id, fecha, geom, length) VALUES ($1, CURRENT_DATE, ST_GeomFromGeoJSON($2), ST_Length(ST_GeomFromGeoJSON($2)::geography))";
$result = pg_prepare($cnx, "insert_geojson_with_length", $query);
if (!$result) {
    die(json_encode(['status' => 'error', 'message' => 'Preparing statement failed: ' . pg_last_error($cnx)]));
}

$result = pg_execute($cnx, "insert_geojson_with_length", array(1, $geometryJson));
if (!$result) {
    $error = pg_last_error($cnx);
    die(json_encode(['status' => 'error', 'message' => 'SQL error: ' . $error]));
}

// Output success message
header('Content-Type: application/json');
echo json_encode(['status' => 'success', 'message' => 'Data saved successfully with length calculated']);

?>
