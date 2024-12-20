<?php
    echo $this->layout("_theme");
?>
<?php
$this->start("specific-script");
?>
<script type="module" src="<?= url("assets/js/app/profile.js"); ?>"></script>
<?php
$this->end();
?>

<!-- Formulário para alteração do Perfil do Usuário
  Nome, E-mail, Senha e Foto.
-->

<div class="private-area">
    <h1>Perfil do Usuário</h1>
    <form id="profile" class="private-area">
        <div class="form-group">
            <label for="nome">Nome:</label>
            <input type="text" id="name" name="name">
        </div>
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email">
        </div>
        <div class="form-group">
            <label for="endereco">Endereço:</label>
            <input type="text" id="address" name="address" value="dfghnm">
        <button type="submit">Atualizar Perfil</button>
    </form>
    <form id="form-photo" enctype="multipart/form-data">
        <div class="form-group">
            <label for="foto">Foto:</label>
            <input type="file" id="photo" name="photo">
            <button type="submit">Atualizar Foto</button>
        </div>
    </form>
</div>