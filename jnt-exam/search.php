<?php
header('Content-Type: application/json');
require_once 'database.php';

$question = $_POST['question'] ?? '';

if (empty($question)) {
    echo json_encode(['error' => 'Please enter a question.']);
    exit;
}

// Load Q&A data from JSON (or database)
$qaData = json_decode(file_get_contents('questions.json'), true);

$results = [];
foreach ($qaData as $item) {
    if (stripos($item['question'], $question) !== false) {
        $results[] = $item;
    }
}

echo json_encode($results);
?>