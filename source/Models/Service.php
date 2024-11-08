<?php

namespace Source\Models;

use Source\Core\Connect;
use Source\Core\Model;

class Service extends Model
{
    private $id;
    private $service_category_id;
    private $name;
    private $description;
    private $message;

    public function __construct(
        ?int $id = NULL,
        int $categoryId = NULL,
        string $name = NULL,
        string $description = NULL
    )
    {
        $this->id = $id;
        $this->service_category_id = $categoryId;
        $this->name = $name;
        $this->description = $description;
        $this->entity = "services";
    }

    public function listById (int $id)
    {
        $query = "SELECT services.id, services.name, services.description, services.service_category_id, 
                  services_categories.name as 'category_name'
                  FROM services
                  INNER JOIN services_categories ON services.service_category_id = services_categories.id
                  WHERE services.id = :service_id";

        $conn = Connect::getInstance();
        $stmt = $conn->prepare($query);
        $stmt->bindParam("service_id",$id);
        $stmt->execute();
        return $stmt->fetch();

    }

    public function listByCategory (int $categoryId): array
    {
        $query = "SELECT services.id, services.name, services.description, 
                  services_categories.name as 'category_name'
                  FROM services
                  INNER JOIN services_categories ON services.service_category_id = services_categories.id
                  WHERE services_categories.id = :category_id";
        $conn = Connect::getInstance();
        $stmt = $conn->prepare($query);
        $stmt->bindParam("category_id", $categoryId);
        $stmt->execute();
        return $stmt->fetchAll();

    }

    public function insert (): int
    {
        $query = "INSERT INTO services (service_category_id, name, description) VALUES (:category_id, :name, :description)";
        $conn = Connect::getInstance();
        $stmt = $conn->prepare($query);
        $stmt->bindParam("category_id", $this->service_category_id);
        $stmt->bindParam("name", $this->name);
        $stmt->bindParam("description", $this->description);
        $stmt->execute();
        return $conn->lastInsertId();

    }

}