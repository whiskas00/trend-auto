<?php
require_once __DIR__ . '/../models/Car.php';
require_once __DIR__ . '/../core/Response.php';

class CarController {
    private $db;
    private $car;

    public function __construct() {
        require_once __DIR__ . '/../config/database.php';
        $database = new Database();
        $this->db = $database->getConnection();
        $this->car = new Car($this->db);
    }

    public function index() {
        $cars = $this->car->getAll();
        return Response::data($cars);
    }

    public function show($id) {
        $car = $this->car->getById($id);
        if(!$car) {
            return Response::error('Автомобиль не найден', 404);
        }
        return Response::data($car);
    }

    public function store($data) {
        if(empty($data['brand']) || empty($data['model']) || empty($data['price'])) {
            return Response::error('Заполните обязательные поля', 400);
        }

        if($this->car->create($data)) {
            return Response::success('Автомобиль добавлен', $data, 201);
        }
        return Response::error('Ошибка при добавлении', 500);
    }

    public function update($id, $data) {
        if($this->car->update($id, $data)) {
            return Response::success('Автомобиль обновлён');
        }
        return Response::error('Ошибка при обновлении', 500);
    }

    public function delete($id) {
        if($this->car->delete($id)) {
            return Response::success('Автомобиль удалён');
        }
        return Response::error('Ошибка при удалении', 500);
    }
}
?>