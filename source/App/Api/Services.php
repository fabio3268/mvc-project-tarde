<?php

namespace Source\App\Api;

use Source\Models\Service;
use Source\Models\ServiceCategory;

class Services extends Api
{
    public function __construct()
    {
        parent::__construct();
        // quando todas as rotas da classe são autenticadas, o método $this->auth() pode ser evocado aqui
        // $this->auth();
    }

    public function getById(array $data)
    {
        // método é chamaddo quando a rota precisa de autenticação
        //$this->auth();
        $service = new Service();
        $response = $service->listById($data["serviceId"]);
        $this->back($response);
    }

    public function selectAll(array $data): void
    {
        // quando a rota não necessita de autenticação, não evoca o método $this->auth()
        $service = new Service();
        $services = $service->selectAll();

        $i = 0;
        foreach ($services as $service) {
            //var_dump($service->service_category_id);
            $category = (new ServiceCategory())->selectById($service->service_category_id);
            $services[$i]->category = $category->name;
            $i++;
        }

        $this->back($services);
    }

    public function listByCategory (array $data)
    {
        // quando a rota não necessita de autenticação, não evoca o método $this->auth()
        $service = new Service();
        $listServices = $service->listByCategory($data["categoryId"]);
        $this->back($listServices);
    }

    public function update(array $data)
    {
        //$this->auth();
        $service = new Service(
            $data["id"],
            $data["service_category_id"],
            $data["name"],
            $data["description"]
        );

        if(!$service->update()) {
            $this->back([
                "error" => [
                    "code" => "500",
                    "type" => "error",
                    "message" => $service->getMessage()
                ]
            ]);
            return;
        }

        $response = [
            "success" => [
                "code" => "200",
                "type" => "success",
                "message" => "Serviço alterado com sucesso"
            ]
        ];

        $this->back($response);
    }

    public function delete (array $data)
    {
        $this->auth();

        $response = [
            "success" => [
                "code" => "200",
                "type" => "success",
                "message" => "Serviço deletado com sucesso"
            ]
        ];

        $this->back($response);
    }

    public function insert (array $data): void
    {
        $this->auth();
        $service = new Service(
            NULL,
            $data["service_category_id"],
            $data["name"],
            $data["description"]
        );

        $idService = $service->insert();

        if(!$idService) {
            $this->back([
                "type" => "error",
                "message" => $service->getMessage()
            ]);
            return;
        }

        $this->back([
            "type" => "success",
            "message" => "Serviço cadastrado com sucesso",
            "service" => [
                "id" => $idService,
                "idCategory" => $data["service_category_id"],
                "name" => $data["name"],
                "description" => $data["description"]
            ]
        ]);

    }
}