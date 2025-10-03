<?php
include 'inc/data/social-network.php';

?>

<section class="copy">
    <div class="container">

        <div class="left-area">
            <figure class="info">
                <img src="assets/images/icons/icon-info.svg" alt="Íconde de um balão de informação.">
            </figure>
            <ul>
                <?php foreach ($dados_socials as $dados_social): ?>
                    <li>
                        <a href="<?= $dados_social['link'] ?>" target="_blank" title="<?= $dados_social['title'] ?>">
                            <img src="<?= $dados_social['image'] ?>" alt="<?= $dados_social['label'] ?>">
                        </a>
                    </li>
                <?php endforeach; ?>
            </ul>
        </div>

        <div class="right">
            <p class="texto-developer">Desenvolvido por
            </p>
            <a href="https://www.agenciaaffinity.com.br/" target="_blank" class="logo-copy">
                <img src="assets/images/logo/logo-affinity.svg" alt="Logo da Agencia Affinity">
            </a>
        </div>
    </div>
</section>