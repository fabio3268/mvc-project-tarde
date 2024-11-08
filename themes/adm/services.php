<?php $this->layout('_theme') ?>
<?php $this->start("specific-script"); ?>
<!--<script type="module" src="--><?php //= url("assets/js/admin/services.js"); ?><!--"></script>-->
<script type="module" src="<?= url("assets/js/admin/services-poo-scripts.js"); ?>"></script>
<link rel="stylesheet" href="<?= url("assets/css/admin/services.css"); ?>">
<?php $this->end(); ?>

<section class="services">
    <h2>Lista de Serviços</h2>
    <ul class="services-item" id="list-services">
    </ul>
</section>

<div id="edit-modal" class="modal">
    <div class="modal-content">
        <span class="close-button">&times;</span>
        <h2>Editar Serviço</h2>
        <form id="edit-form">
            <label for="id">ID</label>
            <input type="text" id="id" name="id" readonly>
            <label for="name">Nome</label>
            <input type="text" id="name" name="name">
            <label for="description">Descrição</label>
            <textarea id="description" name="description"></textarea>
            <label for="service-category">Categoria</label>
            <select name="service_category_id" id="service_category_id">
            </select>
            <input type="submit" value="Salvar">
        </form>
    </div>
</div>

<!--<h1>Olá, eu sou o Sobre!</h1>
<h2>Editar Serviço</h2>
<form id="form-insert-service">
    <label for="name">Nome</label>
    <input type="text" id="name" name="name" value="Consultoria em Projetos em POO">
    <label for="description">Descrição</label>
    <textarea id="description" name="description">Consultoria de programação orientada a objetos</textarea>
    <label for="service-category">Categoria</label>
    <select name="service_category_id" id="service_category_id">
        <option value="1">Consultoria</option>
        <option value="2">Projetos</option>
    </select>
    <input type="submit" value="Salvar">
</form>-->