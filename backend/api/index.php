<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../controllers/CarController.php';
require_once __DIR__ . '/../controllers/AuthController.php';

$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = str_replace('/api', '', $uri);

$input = json_decode(file_get_contents('php://input'), true);

switch (true) {
    // Авторизация
    case $uri === '/auth/register' && $method === 'POST':
        $controller = new AuthController();
        $controller->register($input);
        break;
    
    case $uri === '/auth/login' && $method === 'POST':
        $controller = new AuthController();
        $controller->login($input);
        break;
    
    // Автомобили - CRUD
    case $uri === '/cars' && $method === 'GET':
        $controller = new CarController();
        $controller->index();
        break;
    
    case $uri === '/cars' && $method === 'POST':
        $controller = new CarController();
        $controller->store($input);
        break;
    
    case preg_match('#^/cars/(\d+)$#', $uri, $matches) && $method === 'GET':
        $controller = new CarController();
        $controller->show($matches[1]);
        break;
    
    case preg_match('#^/cars/(\d+)$#', $uri, $matches) && $method === 'PUT':
        $controller = new CarController();
        $controller->update($matches[1], $input);
        break;
    
    case preg_match('#^/cars/(\d+)$#', $uri, $matches) && $method === 'DELETE':
        $controller = new CarController();
        $controller->delete($matches[1]);
        break;
    
    default:
        Response::error('Маршрут не найден', 404);
}
?>