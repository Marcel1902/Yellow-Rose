
document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour charger les traductions
    function loadTranslations(language) {
        // Détermine le chemin du fichier JSON en fonction de la langue
        const url = `../src/${language}.json`;
        console.log('Chargement des traductions depuis :', url);
        
        // Effectue une requête fetch pour récupérer le fichier JSON
        fetch(url)
            .then(response => {
                // Vérifie si la requête a réussi
                if (!response.ok) {
                    throw new Error('Impossible de charger le fichier JSON');
                }
                // Retourne les données JSON de la réponse
                return response.json();
            })
            .then(data => {
                // Applique les traductions récupérées
                applyTranslations(data);
            })
            .catch(error => {
                // Gère les erreurs survenues lors du chargement des traductions
                console.error('Erreur lors du chargement des traductions :', error);
            });
    }

    // Fonction pour appliquer les traductions aux éléments HTML
    function applyTranslations(translations) {
        // Parcourt chaque élément avec un attribut data-translate
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            // Vérifie si la clé de traduction existe
            if (translations.hasOwnProperty(key)) {
                // Applique la traduction à l'élément
                element.textContent = translations[key];
            }
        });
    }

    // Écoute les changements de langue
    document.getElementById('language').addEventListener('change', function() {
        const selectedLanguage = this.value;
        // Charge les traductions correspondant à la langue sélectionnée
        loadTranslations(selectedLanguage);
    });

    // Charge les traductions pour la langue par défaut au chargement de la page
    loadTranslations('fr');
});


$(document).ready(function() {
    // Fonction pour gérer l'affichage du menu en fonction de la largeur de l'écran
    function toggleMenu() {
        // Vérifier si la largeur de l'écran est inférieure ou égale à 485 pixels
        if ($(window).width() <= 485) {
            // Cacher la barre de navigation au chargement de la page
            $('.nav').hide();

            // Gérer le clic sur l'icône du menu
            $('#menu').click(function() {
                // Basculer l'affichage de la barre de navigation
                $('.nav').toggle();
            });
        } else {
            // Afficher la barre de navigation si la largeur de l'écran est supérieure à 485 pixels
            $('.nav').show();
        }
    }

    // Appeler la fonction au chargement de la page
    toggleMenu();

    // Appeler la fonction à chaque redimensionnement de la fenêtre
    $(window).resize(function() {
        toggleMenu();
    });
});

