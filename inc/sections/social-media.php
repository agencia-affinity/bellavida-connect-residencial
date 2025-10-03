<?php include 'inc/data/social-network.php'; ?>

<ul id="social-sidebar">
    <?php foreach ($dados_socials as $social): ?>
        <li>
            <a href="<?= $social['link']; ?>"
               target="_blank"
               rel="noopener noreferrer"
               class="<?= $social['icon_class']; ?>"
               aria-label="<?= $social['label']; ?>"
               title="<?= $social['title']; ?>">
                <span class="<?= $social['extra_class']; ?>">
                    <?= strtok($social['label'], ' '); ?>
                </span>
            </a>
        </li>
    <?php endforeach; ?>
</ul>
