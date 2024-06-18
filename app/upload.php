<?php
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
        splitImageInHalf($target_file, $target_dir, $file_name, $imageFileType);
        echo "<img src='" . $target_file . "' width='50' height='60'>";
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
    $halfwidth = (int) $width / 2; // TODO: using int did not solve the problem
    $leftSide = imagecreatetruecolor($halfwidth, $height);
    $rightSide = imagecreatetruecolor($halfwidth, $height);

    imagecopy($leftSide, $origin, 0, 0, 0, 0, $halfwidth, $height);
    imagecopy($rightSide, $origin, 0, 0, $halfwidth, 0, $halfwidth, $height);

    $outputFunction($leftSide, $target_dir . $file_name . "-1." . $imageFileType);
    $outputFunction($rightSide, $target_dir . $file_name . "-2." . $imageFileType);

    imagedestroy($leftSide);
    imagedestroy($rightSide);
    imagedestroy($origin);
}
?>
