<?php
    echo $this->layout("_theme");
?>
<?php
    $this->start("specific-script");
?>
    <script type="module" src="<?= url("assets/js/web/about.js"); ?>" async></script>
<?php
    $this->end();
?>
