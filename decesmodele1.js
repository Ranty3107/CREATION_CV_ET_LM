/* =========================================================
   GÉNÉRATEUR DE FAIRE-PART DE DÉCÈS - SCRIPT PRINCIPAL
   ========================================================= */

var decesPhotoBase64 = '';
var currentDecesModel = 'modele1';

function safeEscapeHTML(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function getDecesFieldValue(id, defaultValue) {
    var el = document.getElementById(id);
    if (!el) return defaultValue || '';
    var val = el.value.trim();
    return val !== '' ? val : (defaultValue || '');
}

function selectDecesModel(modelId) {
    currentDecesModel = modelId;
    
    // Mettre à jour l'apparence des boutons de modèles
    document.querySelectorAll('.deces-tpl-btn').forEach(function(btn) {
        btn.classList.remove('ring-4', 'ring-indigo-600', 'border-indigo-600', 'bg-indigo-50');
        btn.classList.add('border-slate-200', 'bg-white');
    });

    var activeBtn = document.getElementById('btn-deces-tpl-' + modelId);
    if (activeBtn) {
        activeBtn.classList.remove('border-slate-200', 'bg-white');
        activeBtn.classList.add('ring-4', 'ring-indigo-600', 'border-indigo-600', 'bg-indigo-50');
    }

    createDecesLetter();
}

document.addEventListener('DOMContentLoaded', function () {
    var photoInput = document.getElementById('decesPhotoFile');
    if (photoInput) {
        photoInput.addEventListener('change', handleDecesPhotoUpload);
    }

    var watchIds = [
        'decesName', 'decesAlias', 'decesTitles', 'decesDateLieu',
        'decesEpouse', 'decesEnfants', 'decesZafiny', 'decesParents',
        'decesFreresSoeurs', 'decesIrayTampoVady', 'decesMpiaraMiasa', 
        'decesHavany', 'decesMpitandrina', 'decesDetails', 
        'decesCustomVerset', 'decesCustomVersetRef'
    ];

    watchIds.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', createDecesLetter);
        }
    });

    setTimeout(createDecesLetter, 250);
});

function handleDecesPhotoUpload(event) {
    var file = event.target.files && event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        alert('Veuillez sélectionner un fichier image valide.');
        return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
        decesPhotoBase64 = e.target.result || '';
        createDecesLetter();
    };
    reader.readAsDataURL(file);
}

function onVersetChange() {
    var select = document.getElementById('decesVersetSelect');
    var customContainer = document.getElementById('decesCustomVersetContainer');
    if (select && customContainer) {
        if (select.value === 'custom') {
            customContainer.classList.remove('hidden');
        } else {
            customContainer.classList.add('hidden');
        }
    }
    createDecesLetter();
}

function createDecesLetter() {
    var preview = document.getElementById('decesPreview');
    if (!preview) return;

    var selectVerset = document.getElementById('decesVersetSelect');
    var versetTexte = '« J\'ai combattu le bon combat, j\'ai achevé la course, j\'ai gardé la foi. »';
    var versetRef = '2 Timothée 4:7';

    if (selectVerset) {
        var val = selectVerset.value;
        if (val === 'jaona') {
            versetTexte = '« ... Andriamanitra dia fitiavana; ary izay mitoetra amin\'ny fitiavana no mitoetra ao amin\'Andriamanitra, ary Andriamanitra ao aminy. »';
            versetRef = '1 Jaona 4 : 16';
        } else if (val === 'jean') {
            versetTexte = '« Je suis la résurrection et la vie. Celui qui croit en moi vivra, quand même il serait mort. »';
            versetRef = 'Jean 11:25';
        } else if (val === 'psaume') {
            versetTexte = '« L\'Éternel est mon berger : je ne manquerai de rien. »';
            versetRef = 'Psaume 23:1';
        } else if (val === 'custom') {
            versetTexte = getDecesFieldValue('decesCustomVerset', '');
            versetRef = getDecesFieldValue('decesCustomVersetRef', '');
        }
    }

    var formData = {
        name: getDecesFieldValue('decesName', ''),
        alias: getDecesFieldValue('decesAlias', ''),
        titles: getDecesFieldValue('decesTitles', ''),
        dateLieu: getDecesFieldValue('decesDateLieu', ''),
        vadiny: getDecesFieldValue('decesEpouse', ''),
        zanany: getDecesFieldValue('decesEnfants', ''),
        zafiny: getDecesFieldValue('decesZafiny', ''),
        parents: getDecesFieldValue('decesParents', ''),
        irayTampo: getDecesFieldValue('decesFreresSoeurs', ''),
        irayTampoVady: getDecesFieldValue('decesIrayTampoVady', ''),
        mpiaraMiasa: getDecesFieldValue('decesMpiaraMiasa', ''),
        havany: getDecesFieldValue('decesHavany', ''),
        mpitandrina: getDecesFieldValue('decesMpitandrina', ''),
        details: getDecesFieldValue('decesDetails', ''),
        versetTexte: versetTexte,
        versetRef: versetRef,
        photoBase64: decesPhotoBase64
    };

    if (currentDecesModel === 'modele2' && typeof buildDecesModele2 === 'function') {
        preview.innerHTML = buildDecesModele2(formData);
    } else {
        preview.innerHTML = buildDecesModele1(formData);
    }
}

function buildDecesModele1(data) {
    var name = safeEscapeHTML(data.name || 'Jean-Mort Rakoto');
    var titles = safeEscapeHTML(data.titles || 'Membre titulaire de l\'Académie Malgache\nCommandeur des XXXX\nOfficier de l\'Ordre National Malgache');
    var dateLieu = safeEscapeHTML(data.dateLieu || 'survenu le xxx à l\'âge de xx ans');
    var epouse = safeEscapeHTML(data.vadiny || 'Sahala RAZAFINDRAZAKA née RABOZAKA');
    var enfants = safeEscapeHTML(data.zanany || 'NOM PRENOM\nNOM PRENOM\nNOM PRENOM');
    var parents = safeEscapeHTML(data.parents || 'Laurent RAZAFIMILANJA et Suzanne Marie Reko miantso');
    var freresSoeurs = safeEscapeHTML(data.irayTampo || 'Erac et Samie et leurs enfants\nvavy et lahy et leurs enfants');
    var details = safeEscapeHTML(data.details || 'L\'enterrement a eu lieu le date dans le caveau familial à isotry.\nLa famille se réunira à la Villa Suzlau BE\nle Jeudi DATE de xxh à xxh\nTél. / WhatsApp : xxx xxx xxx');

    var photoBlock = data.photoBase64 
        ? '<img src="' + data.photoBase64 + '" alt="Photo" style="width: 140px; height: 180px; object-fit: cover; border: 1px solid #1e293b; display: block; margin-left: auto;">'
        : '<div style="width: 140px; height: 180px; background: #f8fafc; border: 1px dashed #94a3b8; display: flex; align-items: center; justify-content: center; text-align: center; font-size: 11px; color: #64748b; margin-left: auto;"><span>Insérer une photo</span></div>';

    return '<div contenteditable="true" style="font-family: \'Times New Roman\', Times, serif; color: #0f172a; outline: none; padding: 20mm 15mm; width: 100%; min-height: 297mm; box-sizing: border-box;">' +
            '<div style="text-align: center; margin-bottom: 20px;">' +
                '<div style="font-size: 36px; font-weight: bold; line-height: 1;">†</div>' +
                '<div style="font-style: italic; font-size: 16px; font-weight: bold; margin-top: -5px;">✝M</div>' +
            '</div>' +
            '<table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">' +
                '<tr>' +
                    '<td style="vertical-align: top; text-align: left; padding-right: 15px;">' +
                        '<p style="font-size: 13px; margin: 0 0 10px 0;">Nous avons la douleur de vous faire part du décès de notre bien-aimé</p>' +
                        '<h1 style="font-size: 21px; font-weight: bold; text-transform: uppercase; margin: 0 0 8px 0; line-height: 1.2;">' + name + '</h1>' +
                        '<div style="font-size: 11.5px; font-style: italic; line-height: 1.4; margin-bottom: 12px; color: #334155;">' + titles.replace(/\n/g, '<br>') + '</div>' +
                        '<p style="font-size: 12.5px; font-weight: bold; margin: 0;">' + dateLieu + '</p>' +
                    '</td>' +
                    '<td style="vertical-align: top; width: 150px;">' + photoBlock + '</td>' +
                '</tr>' +
            '</table>' +
            '<div style="font-size: 11.5px; line-height: 1.7; margin-bottom: 25px; text-align: justify;">' +
                '<p style="margin: 0 0 6px 0;"><strong>Son épouse :</strong> ' + epouse + '</p>' +
                '<p style="margin: 0 0 6px 0;"><strong>Ses enfants :</strong><br>' + enfants.replace(/\n/g, '<br>') + '</p>' +
                '<p style="margin: 0 0 6px 0;"><strong>Ses parents :</strong> ' + parents + '</p>' +
                '<p style="margin: 0 0 6px 0;"><strong>Ses frères, sœurs et familles :</strong><br>' + freresSoeurs.replace(/\n/g, '<br>') + '</p>' +
                '<p style="margin: 10px 0 0 0;"><strong>Ses autres membres de la famille, collaborateurs et amis</strong></p>' +
            '</div>' +
            '<div style="text-align: center; font-size: 12px; line-height: 1.6; margin-bottom: 30px; border-top: 1px solid #cbd5e1; border-bottom: 1px solid #cbd5e1; padding: 15px 0;">' +
                details.replace(/\n/g, '<br>') +
            '</div>' +
            '<div style="text-align: center; font-size: 13px; font-style: italic; font-weight: bold; color: #1e293b;">' +
                data.versetTexte + '<br>' + data.versetRef +
            '</div>' +
        '</div>';
}