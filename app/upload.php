<?php
// Set cache control headers to prevent browser caching
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
$target_dir = "images/fruit/";
$file_name = "enemy"; // pathinfo($_FILES["fileToUpload"]["name"], PATHINFO_FILENAME);
$imageFileType = strtolower(pathinfo($_FILES["fileToUpload"]["name"], PATHINFO_EXTENSION));
$target_file = $target_dir . $file_name . "." . $imageFileType;
$uploadOk = 1;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if ($check === false) {
        echo "File is not an image.";
        $uploadOk = 0;
    }
}

if ($_FILES["fileToUpload"]["size"] > 500000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}

$allowedFileTypes = ['jpg', 'jpeg', 'png'];
if (!in_array($imageFileType, $allowedFileTypes)) {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}

if ($uploadOk == 1) {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        // Initialize variables that will be set by splitImageInHalf
        $leftImageWithTimestamp = '';
        $rightImageWithTimestamp = '';
        
        splitImageInHalf($target_file, $target_dir, $file_name, $imageFileType);
        
        // Add a timestamp parameter to prevent browser caching
        $timestamp = time();
        echo "<div style='margin: 10px 0;'>";
        echo "<p>Original image:</p>";
        echo "<img src='" . $target_file . "?t=" . $timestamp . "' width='50' height='60'>";
        echo "</div>";
        
        // Display the split images with their timestamp parameters
        if (!empty($leftImageWithTimestamp) && !empty($rightImageWithTimestamp)) {
            echo "<div style='margin: 10px 0;'>";
            echo "<p>Split images:</p>";
            echo "<img src='" . $leftImageWithTimestamp . "' width='25' height='60' style='margin-right: 5px;'>";
            echo "<img src='" . $rightImageWithTimestamp . "' width='25' height='60'>";
            echo "</div>";
        }
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
} else {
    echo "Sorry, your file was not uploaded.";
}

function splitImageInHalf($filePath, $target_dir, $file_name, $imageFileType) {
    switch ($imageFileType) {
        case 'jpg':
        case 'jpeg':
            $origin = imagecreatefromjpeg($filePath);
            $outputFunction = 'imagejpeg';
            break;
        case 'png':
            $origin = imagecreatefrompng($filePath);
            $outputFunction = 'imagepng';
            break;
        default:
            echo "Unsupported file type.";
            return;
    }

    list($width, $height) = getimagesize($filePath);
    $halfwidth = (int)($width / 2); // Fixed: casting the result of division to int
    $leftSide = imagecreatetruecolor($halfwidth, $height);
    $rightSide = imagecreatetruecolor($halfwidth, $height);

    imagecopy($leftSide, $origin, 0, 0, 0, 0, $halfwidth, $height);
    imagecopy($rightSide, $origin, 0, 0, $halfwidth, 0, $halfwidth, $height);

    // Add a timestamp to the filenames to prevent caching issues
    $timestamp = time();
    $leftImagePath = $target_dir . $file_name . "-1." . $imageFileType;
    $rightImagePath = $target_dir . $file_name . "-2." . $imageFileType;
    
    // Also return these paths with timestamp parameters to the main script
    global $leftImageWithTimestamp, $rightImageWithTimestamp;
    $leftImageWithTimestamp = $leftImagePath . "?t=" . $timestamp;
    $rightImageWithTimestamp = $rightImagePath . "?t=" . $timestamp;
    
    $outputFunction($leftSide, $leftImagePath);
    $outputFunction($rightSide, $rightImagePath);

    imagedestroy($leftSide);
    imagedestroy($rightSide);
    imagedestroy($origin);
}
?>
