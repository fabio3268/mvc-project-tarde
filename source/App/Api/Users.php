<?php

namespace Source\App\Api;

use Source\Core\TokenJWT;
use Source\Models\User;
use Source\Support\ImageUploader;

class Users extends Api
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getUser ()
    {
        $this->auth();

        $users = new User();
        $user = $users->selectById($this->userAuth->id);

        $this->back([
            "type" => "success",
            "message" => "Usuário autenticado",
            "user" => [
                "id" => $this->userAuth->id,
                "name" => $user->name,
                "email" => $user->email,
                "address" => $user->address,
                "photo" => $user->photo
            ]
        ]);

    }

    public function tokenValidate ()
    {
        $this->auth();

        $this->back([
            "type" => "success",
            "message" => "Token válido",
            "user" => [
                "id" => $this->userAuth->id,
                "name" => $this->userAuth->name,
                "email" => $this->userAuth->email
            ]
        ]);
    }

    public function listUsers ()
    {
        $this->auth();
        $users = new User();
        $this->back($users->selectAll());
    }

    public function createUser (array $data)
    {
        if(in_array("", $data)) {
            $this->back([
                "type" => "error",
                "message" => "Preencha todos os campos"
            ]);
            return;
        }

        $user = new User(
            null,
            $data["name"],
            $data["email"],
            $data["password"]
        );

        $insertUser = $user->insert();

        if(!$insertUser){
            $this->back([
                "type" => "error",
                "message" => $user->getMessage()
            ]);
            return;
        }

        $this->back([
            "type" => "success",
            "message" => "Usuário cadastrodo com sucesso!"
        ]);

    }

    public function loginUser (array $data) {
        $user = new User();

        if(!$user->login($data["email"],$data["password"])){
            $this->back([
                "type" => "error",
                "message" => $user->getMessage()
            ]);
            return;
        }
        $token = new TokenJWT();
        $this->back([
            "type" => "success",
            "message" => $user->getMessage(),
            "user" => [
                "id" => $user->getId(),
                "name" => $user->getName(),
                "email" => $user->getEmail(),
                "photo" => $user->getPhoto(),
                "token" => $token->create([
                    "id" => $user->getId(),
                    "name" => $user->getName(),
                    "email" => $user->getEmail()
                ])
            ]
        ]);

    }

    public function updateUser(array $data)
    {

        if(!$this->userAuth){
            $this->back([
                "type" => "error",
                "message" => "Você não pode estar aqui.."
            ]);
            return;
        }

        $user = new User(
            $this->userAuth->id,
            $data["name"],
            $data["email"],
            '',
            $data["address"]
        );

        if(!$user->update()){
            $this->back([
                "type" => "error",
                "message" => $user->getMessage()
            ]);
            return;
        }

        $this->back([
            "type" => "success",
            "message" => $user->getMessage(),
            "user" => [
                "id" => $user->getId(),
                "name" => $user->getName(),
                "email" => $user->getEmail()
            ]
        ]);

    }

    public function updatePhoto(array $data)
    {

        $imageUploader = new ImageUploader();
        $photo = (!empty($_FILES["photo"]["name"]) ? $_FILES["photo"] : null);

        $this->auth();

        if (!$photo) {
            $this->back([
                "type" => "error",
                "message" => "Por favor, envie uma foto do tipo JPG ou JPEG"
            ]);
            return;
        }

        $upload = $imageUploader->upload($photo);

        $user = new User(
            id: $this->userAuth->id,
            photo: $upload
        );

        if (!$user->updatePhoto()) {
            $this->back([
                "type" => "error",
                "message" => $user->getMessage()
            ]);
            return;
        }

        $this->back([
            "type" => "success",
            "message" => $user->getMessage(),
            "user" => [
                "id" => $user->getId(),
                "name" => $user->getName(),
                "email" => $user->getEmail(),
                "photo" => $user->getPhoto()
            ]
        ]);

    }

    public function getPhoto (array $data)
    {
        $this->auth();

        $user = new User();
        $userPhoto = $user->selectById($this->userAuth->id);

        $this->back([
            "type" => "success",
            "message" => "Foto do usuário",
            "photo" => $userPhoto->photo
        ]);
    }

    public function setPassword(array $data)
    {
        if(!$this->userAuth){
            $this->back([
                "type" => "error",
                "message" => "Você não pode estar aqui.."
            ]);
            return;
        }

        $user = new User($this->userAuth->id);

        if(!$user->updatePassword($data["password"],$data["newPassword"],$data["confirmNewPassword"])){
            $this->back([
                "type" => "error",
                "message" => $user->getMessage()
            ]);
            return;
        }

        $this->back([
            "type" => "success",
            "message" => $user->getMessage()
        ]);
    }
}