<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Services</title>
    <script type="module" src="<?= url("assets/js/admin/services-poo-scripts.js"); ?>" async></script>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            padding: 20px;
            background-color: #f5f5f5;
        }

        header {
            margin-bottom: 30px;
        }

        h1 {
            color: #333;
            margin-bottom: 20px;
        }

        .search-container {
            margin-bottom: 20px;
        }

        .search-input {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
        }

        .services-list {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            overflow: hidden;
        }

        .list-header {
            background: #f8f9fa;
            padding: 15px 20px;
            border-bottom: 2px solid #eee;
            display: grid;
            grid-template-columns: 80px 1fr 1fr 120px;
            gap: 20px;
            font-weight: bold;
            color: #555;
        }

        .services-container {
            max-height: 70vh;
            overflow-y: auto;
        }

        .service-item {
            padding: 15px 20px;
            display: grid;
            grid-template-columns: 80px 1fr 1fr 120px;
            gap: 20px;
            border-bottom: 1px solid #eee;
            align-items: center;
        }

        .service-item:hover {
            background-color: #f8f9fa;
        }

        .service-actions {
            display: flex;
            gap: 8px;
        }

        .btn {
            padding: 8px 12px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s ease;
        }

        .btn-edit {
            background-color: #007bff;
            color: white;
        }

        .btn-edit:hover {
            background-color: #0056b3;
        }

        .btn-delete {
            background-color: #dc3545;
            color: white;
        }

        .btn-delete:hover {
            background-color: #c82333;
        }

        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            align-items: center;
            justify-content: center;
        }

        .modal-content {
            background: white;
            padding: 30px;
            border-radius: 8px;
            width: 100%;
            max-width: 500px;
            position: relative;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            color: #555;
            font-weight: bold;
        }

        .form-control {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
        }

        textarea.form-control {
            min-height: 100px;
            resize: vertical;
        }

        .modal-actions {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
            margin-top: 20px;
        }

        .btn-save {
            background-color: #28a745;
            color: white;
        }

        .btn-save:hover {
            background-color: #218838;
        }

        .btn-cancel {
            background-color: #6c757d;
            color: white;
        }

        .btn-cancel:hover {
            background-color: #5a6268;
        }

        @media (max-width: 768px) {
            .list-header {
                display: none;
            }

            .service-item {
                grid-template-columns: 1fr;
                gap: 10px;
                padding: 15px;
            }

            .service-item span {
                display: flex;
                gap: 10px;
            }

            .service-item span::before {
                content: attr(data-label);
                font-weight: bold;
                min-width: 80px;
            }

            .service-actions {
                justify-content: flex-end;
            }
        }
    </style>
</head>
<body>
<header>
    <h1>Admin Services</h1>
    <section class="search-container">
        <input type="text" id="searchInput" class="search-input" placeholder="Buscar pelo nome do serviço...">
    </section>
</header>

<main>
    <section class="services-list">
        <header class="list-header">
            <span>ID</span>
            <span>Nome</span>
            <span>Categoria</span>
            <span>Ações</span>
        </header>
        <section class="services-container" id="servicesList">
            <article class="service-item">
                <span data-label="ID">1</span>
                <span data-label="Name">Nome</span>
                <span data-label="Category">Categoria</span>
                <div class="service-actions">
                    <button class="btn btn-edit">Edit</button>
                    <button class="btn btn-delete">Delete</button>
                </div>
            </article>
            <article class="service-item">
                <span data-label="ID">1</span>
                <span data-label="Name">Nome</span>
                <span data-label="Category">Categoria</span>
                <div class="service-actions">
                    <button class="btn btn-edit">Edit</button>
                    <button class="btn btn-delete">Delete</button>
                </div>
            </article>
        </section>
    </section>
</main>

<section id="editModal" class="modal">
    <article class="modal-content">
        <h2>Edição de Serviços</h2>
        <form id="editForm">
            <input type="hidden" id="id" name="id">

            <div class="form-group">
                <label for="serviceName">Nome</label>
                <input type="text" id="name" name="name" class="form-control">
            </div>

            <div class="form-group">
                <label for="serviceDescription">Descrição</label>
                <textarea id="description" name="description" class="form-control"></textarea>
            </div>

            <div class="form-group">
                <label for="serviceCategory">Categoria</label>
                <select id="service_category_id" name="service_category_id" class="form-control"></select>
            </div>

            <div class="modal-actions">
                <button type="submit" class="btn btn-save">Salvar</button>
                <button type="button" class="btn btn-cancel">Cancelar</button>
            </div>
        </form>
    </article>
</section>
</body>
</html>