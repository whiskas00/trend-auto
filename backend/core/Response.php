<?php
class Response {
    public static function json($data, $statusCode = 200) {
        http_response_code($statusCode);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit;
    }

    public static function success($message, $data = null, $statusCode = 200) {
        return self::json([
            'status' => 'success',
            'message' => $message,
            'data' => $data
        ], $statusCode);
    }

    public static function error($message, $statusCode = 400) {
        return self::json([
            'status' => 'error',
            'message' => $message
        ], $statusCode);
    }

    public static function data($data, $statusCode = 200) {
        return self::json($data, $statusCode);
    }
}
?>