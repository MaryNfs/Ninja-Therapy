<?php
$target_dir = "images/fruit/";
$file_name = "enemy"; //pathinfo($_FILES["fileToUpload"]["name"],PATHINFO_FILENAME);
$imageFileType = strtolower(pathinfo($_FILES["fileToUpload"]["name"],PATHINFO_EXTENSION));
$target_file = $target_dir . $file_name . ".png";

// Check if image file is a actual image or fake image
if($_SERVER['REQUEST_METHOD']=='POST') {
  $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
  if($check !== false) {
    // echo "File is an image - " . $check["mime"] . ".";
    $uploadOk = 1;
  } else {
    echo "File is not an image.";
    $uploadOk = 0;
  }
}

// // Check if file already exists
// if (file_exists($target_file)) {
//   echo "Sorry, file already exists.";
//   $uploadOk = 0;
// }

// Check file size
if ($_FILES["fileToUpload"]["size"] > 500000) {
  echo "Sorry, your file is too large.";
  $uploadOk = 0;
}

// Allow certain file formats
// if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
// && $imageFileType != "gif" ) {
//   echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
//   $uploadOk = 0;
// }

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
  echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
  if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
    
    // splite image in half
    $origin = imagecreatefrompng($target_file);
    list($width, $height) = getimagesize($target_file);
    $leftSide = imagecreatetruecolor($width/2, $height);
    $rightSide = imagecreatetruecolor($width/2, $height);
    
    imagecopy($leftSide, $origin, 0, 0, 0, 0, $width/2, $height);
    imagecopy($rightSide, $origin, 0, 0, $width/2, 0, $width/2, $height);
  
    header('Content-type: image/png');
    imagepng($leftSide,$target_dir. $file_name . "-1.png");
    imagepng($rightSide,$target_dir. $file_name . "-2.png");
    imagedestroy($leftSide);
    imagedestroy($rightSide);
    
    echo "<image src=".$target_file." width='50' height='60'>";
  } else {
    echo "Sorry, there was an error uploading your file.";
  }
}
?>