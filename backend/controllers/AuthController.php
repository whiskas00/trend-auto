<?php
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../core/Response.php';

class AuthController {
    private $db;
    private $user;

    public function __construct() {
        require_once __DIR__ . '/../config/database.php';
        $database = new Database();
        $this->db = $database->getConnection();
        $this->user = new User($this->db);
    }

    public function register($data) {
        if(empty($data['name']) || empty($data['email']) || empty($data['password'])) {
            return Response::error('Заполните все обязательные поля', 400);
        }

        $existingUser = $this->user->findByEmail($data['email']);
        if($existingUser) {
            return Response::error('Пользователь с таким email уже существует', 409);
        }

        if($this->user->create($data)) {
            return Response::success('Пользователь зарегистрирован', ['email' => $data['email']], 201);
        }
        return Response::error('Ошибка при регистрации', 500);
    }

    public function login($data) {
        if(empty($data['email']) || empty($data['password'])) {
            return Response::error('Заполните все поля', 400);
        }

        $user = $this->user->findByEmail($data['email']);
        if(!$user) {
            return Response::error('Пользователь не найден', 404);
        }

        if(!$this->user->verifyPassword($data['password'], $user['password_hash'])) {
            return Response::error('Неверный пароль', 401);
        }

        unset($user['password_hash']);
        return Response::success('Успешная авторизация', $user);
    }
}
?>