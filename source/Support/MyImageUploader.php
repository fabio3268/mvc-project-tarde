<?php

namespace Source\Support;

class MyImageUploader
{





}

if (!empty($_FILES["photo"]["name"])) {
    if(!strripos($_FILES["photo"]["type"],"jpeg") &&
        !strripos($_FILES["photo"]["type"],"jpg") &&
        !strripos($_FILES["photo"]["type"],"png")) {
        $response = [
            "admin" => ["photo" => "empty"],
            "type" => "warning",
            "typeMessage" => "alert-info",
            "iconMessage" => "fa-info",
            "message" => "Por favor, envie uma imagem do tipo jpg, jpeg ou png"
        ];
        echo json_encode($response);
        return;
    }
    $image = $_FILES["photo"]["tmp_name"];
    $extensao = strtolower(pathinfo($_FILES["photo"]["name"], PATHINFO_EXTENSION));
    /*if(file_exists(__DIR__ . "/../../" . CONF_UPLOAD_DIR . "/" . CONF_UPLOAD_IMAGE_DIR . "/Admin_T.php")){
        unlink(__DIR__ . "/../../" . CONF_UPLOAD_DIR . "/" . CONF_UPLOAD_IMAGE_DIR . "/Admin_T.php");
    }*/
    $pathPhoto = md5(uniqid(rand(), true)) . "." . $extensao;
    move_uploaded_file($image, __DIR__ . "/../../upload/images/" . $pathPhoto);

}