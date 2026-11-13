<?php
session_start();
header('Content-Type: application/json');

$file = __DIR__ . '/counter.json';
$data = file_exists($file) ? json_decode(file_get_contents($file), true) : ['count' => 0];
if (!is_array($data) || !isset($data['count'])) $data = ['count' => 0];

if (empty($_SESSION['counted'])) {
    $_SESSION['counted'] = true;
    $data['count']++;
    file_put_contents($file, json_encode($data));
}

echo json_encode($data);
