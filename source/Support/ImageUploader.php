<?php

namespace Source\Support;

use CoffeeCode\Uploader\Image;

class ImageUploader
{
    private $uploadDir;
    private $image;

    public function __construct($uploadDir = "uploads")
    {
        chdir("../");
        $this->uploadDir = $uploadDir;
        $this->image = new Image($this->uploadDir, "images");
    }

    public function upload($file)
    {
        if (!empty($file["name"])) {
            return $this->image->upload($file, uniqid(md5(time())));
        }
        return null;
    }
}