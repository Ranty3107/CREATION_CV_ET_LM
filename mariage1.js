/* =========================================================
   GÉNÉRATEUR D'INVITATION DE MARIAGE - MODÈLE 1 AVEC FOND
   ========================================================= */

var mariagePhotoBase64 = '';
var mariageBgBase64 = '';

function safeEscapeHTMLMariage(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function getMariageFieldValue(id, defaultValue) {
    var el = document.getElementById(id);
    if (!el) return defaultValue || '';
    var val = el.value.trim();
    return val !== '' ? val : (defaultValue || '');
}

document.addEventListener('DOMContentLoaded', function () {
    // Écouteur pour la photo des mariés
    var photoInput = document.getElementById('mariagePhotoFile');
    if (photoInput) {
        photoInput.addEventListener('change', handleMariagePhotoUpload);
    }

    // Écouteur pour l'image de fond
    var bgInput = document.getElementById('mariageBgFile');
    if (bgInput) {
        bgInput.addEventListener('change', handleMariageBgUpload);
    }

    var watchIds = [
        'mariageFamilleMarie', 'mariageFamilleMariee',
        'mariageNomMarie', 'mariageNomMariee',
        'mariageCivil', 'mariageCoutumier',
        'mariageMessage', 'mariageNB'
    ];

    watchIds.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', createMariageLetter);
        }
    });

    setTimeout(createMariageLetter, 250);
});

// Upload Photo des mariés
function handleMariagePhotoUpload(event) {
    var file = event.target.files && event.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function (e) {
        mariagePhotoBase64 = e.target.result || '';
        createMariageLetter();
    };
    reader.readAsDataURL(file);
}

// Upload Image de Fond / Fleurs
function handleMariageBgUpload(event) {
    var file = event.target.files && event.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function (e) {
        mariageBgBase64 = e.target.result || '';
        createMariageLetter();
    };
    reader.readAsDataURL(file);
}

function createMariageLetter() {
    var preview = document.getElementById('mariagePreview');
    if (!preview) return;

    var familleMarie = safeEscapeHTMLMariage(getMariageFieldValue('mariageFamilleMarie', 'KOTO & BOZY'));
    var familleMariee = safeEscapeHTMLMariage(getMariageFieldValue('mariageFamilleMariee', 'BANDY & SIPA'));
    var nomMarie = safeEscapeHTMLMariage(getMariageFieldValue('mariageNomMarie', 'RANGAHY'));
    var nomMariee = safeEscapeHTMLMariage(getMariageFieldValue('mariageNomMariee', 'RAMATOA'));
    
    var civil = safeEscapeHTMLMariage(getMariageFieldValue('mariageCivil', 'Samedi 17 Octobre 2026 à 10h, Firaisana I Analakely.'));
    var coutumier = safeEscapeHTMLMariage(getMariageFieldValue('mariageCoutumier', 'Samedi 17 Octobre 2026 à 12h, au carlton, quartier Tana (Anaran-dalana : lalana rakoto, Dago).'));
    
    var message = safeEscapeHTMLMariage(getMariageFieldValue('mariageMessage', 'Votre présence contribuera à notre bonheur.\nEt si vous souhaitez nous offrir quelque chose, nous préférons les cadeaux en espèces.'));
    var nb = safeEscapeHTMLMariage(getMariageFieldValue('mariageNB', 'NB: L\'invité est prié de ne pas inviter.'));

    // Photo des mariés (si présente)
    var photoHtml = '';
    if (mariagePhotoBase64) {
        photoHtml = '<div style="margin: 12px auto; text-align: center;">' +
            '<img src="' + mariagePhotoBase64 + '" alt="Photo des mariés" style="width: 110px; height: 110px; border-radius: 50%; object-fit: cover; border: 3px solid #b3533b; box-shadow: 0 4px 8px rgba(0,0,0,0.15); display: inline-block;">' +
        '</div>';
    }

    // Gestion du Fond (Image importée OU décor aquarelle CSS par défaut)
    var bgStyle = '';
    var decorOverlay = '';

    if (mariageBgBase64) {
        // Si l'utilisateur a uploadé une image de fond (avec fleurs/cadre)
        bgStyle = 'background-image: url(\'' + mariageBgBase64 + '\'); background-size: cover; background-position: center;';
    } else {
        // Décor de fond aquarelle champêtre par défaut
        bgStyle = 'background: #fffdf9;';
        decorOverlay = 
            '<!-- Taches d\'aquarelle dans les coins -->' +
            '<div style="position: absolute; top: -20px; left: -20px; width: 180px; height: 180px; background: radial-gradient(circle, rgba(179,83,59,0.2) 0%, rgba(255,253,249,0) 70%); pointer-events: none;"></div>' +
            '<div style="position: absolute; bottom: -20px; right: -20px; width: 200px; height: 200px; background: radial-gradient(circle, rgba(140,43,24,0.25) 0%, rgba(255,253,249,0) 70%); pointer-events: none;"></div>';
    }

    preview.innerHTML = 
        '<div contenteditable="true" class="mariage-card-frame" style="position: relative; font-family: \'Georgia\', \'Times New Roman\', serif; color: #2c221e; outline: none; padding: 22mm 18mm; width: 100%; min-height: 297mm; box-sizing: border-box; text-align: center; ' + bgStyle + '">' +
            
            decorOverlay +

            '<!-- Cadre Arch Style / Arche de Mariage -->' +
            '<div style="position: absolute; top: 10mm; left: 10mm; right: 10mm; bottom: 10mm; border: 2px solid #b3533b; border-radius: 110mm 110mm 0 0; pointer-events: none;"></div>' +

            '<!-- En-tête / Les Familles -->' +
            '<div style="margin-top: 12mm; margin-bottom: 6mm; position: relative; z-index: 2;">' +
                '<h2 style="font-size: 15pt; font-weight: bold; letter-spacing: 3px; text-transform: uppercase; color: #1a120c; margin-bottom: 10px;">LES FAMILLES</h2>' +
                '<table style="width: 100%; max-width: 500px; margin: 0 auto; border-collapse: collapse; font-size: 12pt; font-weight: bold; color: #a16335;">' +
                    '<tr>' +
                        '<td style="width: 45%; text-align: center; vertical-align: top;">' + familleMarie.replace(/&amp;/g, '<div style="margin: 3px 0;">&amp;</div>') + '</td>' +
                        '<td style="width: 10%;"></td>' +
                        '<td style="width: 45%; text-align: center; vertical-align: top;">' + familleMariee.replace(/&amp;/g, '<div style="margin: 3px 0;">&amp;</div>') + '</td>' +
                    '</tr>' +
                '</table>' +
            '</div>' +

            '<p style="font-style: italic; font-size: 11.5pt; color: #5a4a42; margin-bottom: 12px; position: relative; z-index: 2;">' +
                'ont le plaisir de vous inviter au mariage<br>de leurs enfants' +
            '</p>' +

            '<!-- Noms des Mariés & Photo -->' +
            '<div style="margin-bottom: 15px; position: relative; z-index: 2;">' +
                '<h1 style="font-size: 32pt; font-family: \'Georgia\', serif; font-weight: bold; color: #8c2b18; margin: 0; line-height: 1.1;">' + nomMarie + '</h1>' +
                
                photoHtml +

                '<div style="font-size: 24pt; font-family: \'Georgia\', serif; font-style: italic; color: #8c2b18; margin: 4px 0;">&amp;</div>' +
                '<h1 style="font-size: 32pt; font-family: \'Georgia\', serif; font-weight: bold; color: #8c2b18; margin: 0; line-height: 1.1;">' + nomMariee + '</h1>' +
            '</div>' +

            '<p style="font-size: 11pt; font-weight: 500; color: #3d312a; margin-bottom: 12px; position: relative; z-index: 2;">' +
                'Selon le programme ci-dessous :' +
            '</p>' +

            '<!-- Mariage Civil -->' +
            (civil ? 
            '<div style="margin-bottom: 15px; position: relative; z-index: 2;">' +
                '<h3 style="font-size: 13pt; font-weight: bold; color: #1a120c; margin: 0 0 3px 0;">Mariage Civil :</h3>' +
                '<p style="font-size: 11pt; color: #3d312a; margin: 0; line-height: 1.4;">' + civil.replace(/\n/g, '<br>') + '</p>' +
            '</div>' : '') +

            '<!-- Mariage Coutumier -->' +
            (coutumier ? 
            '<div style="margin-bottom: 20px; position: relative; z-index: 2;">' +
                '<h3 style="font-size: 13pt; font-weight: bold; color: #1a120c; margin: 0 0 3px 0;">Mariage coutumier :</h3>' +
                '<p style="font-size: 11pt; color: #3d312a; margin: 0; line-height: 1.4; max-width: 550px; margin-left: auto; margin-right: auto;">' + coutumier.replace(/\n/g, '<br>') + '</p>' +
            '</div>' : '') +

            '<!-- Message & Cadeaux -->' +
            '<div style="margin-top: 15px; font-style: italic; font-size: 11pt; color: #3d312a; line-height: 1.5; position: relative; z-index: 2;">' +
                '<p style="margin: 0 0 8px 0;">' + message.replace(/\n/g, '<br>') + '</p>' +
            '</div>' +

            '<!-- NB -->' +
            (nb ? 
            '<div style="margin-top: 15px; font-size: 10.5pt; color: #1a120c; position: relative; z-index: 2;">' +
                '<strong>NB:</strong> <span style="font-style: italic;">' + nb.replace(/^NB:\s*/i, '') + '</span>' +
            '</div>' : '') +

        '</div>';
}

function renderMariagePreview() {
    createMariageLetter();
}