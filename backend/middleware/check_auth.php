<?php
session_start();
header('Content-Type: application/json; charset=utf-8');

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Требуется авторизация']);
    exit;
}

function requireAdmin() {
    if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
        http_response_code(403);
        echo json_encode(['error' => 'Доступ запрещен. Требуются права администратора']);
        exit;
    }
}
?>