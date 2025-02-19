<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $tweet_content = $_POST['tweet_content'];
    $user_id = $_POST['user_id']; // Assuming user_id is passed from a session or form

    if (!empty($tweet_content) && !empty($user_id)) {
        $stmt = $conn->prepare("INSERT INTO tweets (user_id, content, created_at) VALUES (?, ?, NOW())");
        $stmt->bind_param("is", $user_id, $tweet_content);

        if ($stmt->execute()) {
            echo "Tweet created successfully!";
        } else {
            echo "Error: " . $stmt->error;
        }

        $stmt->close();
    } else {
        echo "Tweet content and user ID cannot be empty.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Create Tweet</title>
</head>

    <form method="POST" action="">
        <textarea name="tweet_content" placeholder="What's happening?" required></textarea><br>
        <input type="hidden" name="user_id" value="1"> <!-- Replace with dynamic user ID -->
        <button type="submit">Tweet</button>
    </form>
</html>