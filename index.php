<?php

// Set the path to the index.html file (relative to the front controller)
$file_path = 'index.html';

// Check if the file exists
if (file_exists($file_path)) {
  // Read the contents of the file
  $content = file_get_contents($file_path);

  // Send the content as the response
  header('Content-Type: text/html');
  echo $content;
} else {
  // Handle the case where the file is not found
  header('HTTP/1.1 404 Not Found');
  echo 'File not found';
}

?>