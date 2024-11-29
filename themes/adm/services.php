<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Services</title>
    <script type="module" src="<?= url("assets/js/admin/services-poo-scripts.js"); ?>" async></script>
    <link rel="stylesheet" href="<?= url("assets/css/admin/services.css"); ?>">
</head>
<body>
<header>
    <h1>Admin Services</h1>
    <section class="search-container">
        <input type="text" id="searchInput" class="search-input" placeholder="Buscar pelo nome do serviço...">
    </section>
    <section class="search-container">
        <select name="searchCategories" id="searchCategories">
            <option value="all">Todos</option>
        </select>
    </section>
</header>
<!-- Contêiner para as mensagens toast -->
<div id="toast-container"></div>
<main>
    <section class="services-list">
        <header class="list-header">
            <span>ID</span>
            <span>Nome</span>
            <span>Categoria</span>
            <span>Ações</span>
        </header>
        <section class="services-container" id="servicesList">
            <article service-id="3" class="service-item">
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