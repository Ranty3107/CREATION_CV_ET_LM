# Générateur de CV Pro — structure séparée

principal.html : interface principale du générateur et onglet Lettre de motivation.
style.css : styles communs.
script.js : logique commune du CV (formulaire, données, modèles, couleurs, impression/PDF, MVola).
lettre.js : logique de la lettre de motivation séparée du moteur CV.

9 modèles :
1. Moderne — modele1.html / modele1.js
2. Bandeau — modele2.html / modele2.js
3. Épuré — modele3.html / modele3.js
4. Centré — modele4.html / modele4.js
5. Sombre — modele5.html / modele5.js
6. Moderne Bleu — modele6.html / modele6.js
7. Bannière Pro — modele7.html / modele7.js
8. Sidebar Bleue — modele8.html / modele8.js
9. Élégant Rouge — modele9.html / modele9.js

Tous les fichiers doivent rester dans le même dossier. principal.html charge les 9 JS de modèles, donc chaque bouton de modèle continue de fonctionner sans copier les longs blocs de modèles dans script.js.
Les modeleX.html sont des pages d’aperçu autonomes du modèle correspondant.
