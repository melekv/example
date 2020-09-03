<?php

$servername = "localhost";
$username = "root";
$password = "";

try {
    $pdo = new PDO("mysql:host=$servername;dbname=example", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    // echo "Connected successfully";
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

$method = $_SERVER['REQUEST_METHOD'];
$params = $_SERVER['REQUEST_URI'];

if (isset($params[2])) $id = $params[2];

if ($method == 'GET') {
    if (isset($id)) {
        $sql = "SELECT * FROM user WHERE id='$id'";
        $result = $pdo->query($sql)->fetch();
    } else {
        $sql = "SELECT * FROM user";
        $result = $pdo->query($sql)->fetchAll();
    }
    
    echo json_encode($result);
}

if ($method == 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $info = $_POST['info'];

    $sql = "INSERT INTO user (name, email, info) VALUES (?, ?, ?)";
    $pdo->prepare($sql)->execute([$name, $email, $info]);
    echo 'ok';
}

if ($method == 'DELETE') {
    $sql = "DELETE FROM user WHERE id='$id'";
    $pdo->exec($sql);
    echo 'ok';
}

if ($method == 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $name = $data['name'];
    $email = $data['email'];
    $info = $data['info'];

    $sql = "UPDATE user SET name=?, email=?, info=? WHERE id=?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$name, $email, $info, $id]);
}

?>