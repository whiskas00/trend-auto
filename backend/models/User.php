<?php
class User {
    private $conn;
    private $table = "users";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function findByEmail($email) {
        $query = "SELECT * FROM " . $this->table . " WHERE email = :email";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $query = "INSERT INTO " . $this->table . " 
                  (name, email, password_hash, role) 
                  VALUES (:name, :email, :password_hash, :role)";
        
        $stmt = $this->conn->prepare($query);
        
        $passwordHash = password_hash($data['password'], PASSWORD_DEFAULT);
        
        $stmt->bindParam(':name', $data['name']);
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':password_hash', $passwordHash);
        $role = $data['role'] ?? 'client';
        $stmt->bindParam(':role', $role);
        
        if($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function verifyPassword($password, $hash) {
        return password_verify($password, $hash);
    }
}
?>