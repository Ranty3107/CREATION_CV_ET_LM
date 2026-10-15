/* =========================================================
   GÉNÉRATEUR DE FAIRE-PART DE DÉCÈS - MODÈLE 2 (MALAGASY)
   ========================================================= */

function buildDecesModele2(data) {
    var name = safeEscapeHTML(data.name || 'RABERAZANA Modimandry');
    var alias = safeEscapeHTML(data.alias || '(Ramody)');
    var dateLieu = safeEscapeHTML(data.dateLieu || 'dia nodimandry ny daty teo amin\'ny faha 72 taonany');
    
    var vadiny = safeEscapeHTML(data.vadiny || 'VADINDRARAZANA');
    var zanany = safeEscapeHTML(data.zanany || 'ZANADRAZANA\nMBOLA ZANADRASANA\nZANADRAZANA sy VADINDRAZANA');
    var zafiny = safeEscapeHTML(data.zafiny || 'Prénom maro tanisaina asiana séparation,\neto koa mbola ampiana,\ndia eto');
    var irayTampo = safeEscapeHTML(data.irayTampo || 'Terak\' Itpkl razana\nrazana sy razana\nTerak\' Itpkv razambavy');
    var irayTampoVady = safeEscapeHTML(data.irayTampoVady || 'rova mivady sy ny zanaka aman-jafiny\ncarime mivady sy ny zanaka aman-jafiny');
    var mpiaraMiasa = safeEscapeHTML(data.mpiaraMiasa || 'jex, rafa, Rasoa, Aribe');
    var havany = safeEscapeHTML(data.havany || 'Taranak\' ANDRIA G., Mpitandrina\nTaranaky hedy sy reko (ova)\nTaranaky RABE');
    var mpitandrina = safeEscapeHTML(data.mpitandrina || 'Ny Mpitandrina sy ny Fiangonana TANJOMBATO\nNy Fokontany TSY LAZAINA\nNy Fokontany MBOLA TSY LAZAINA');
    
    var details = safeEscapeHTML(data.details || 'Ny nofony dia hiala ao an-tranony ADIRESY\'ny 12 ora sy sasany ary entina hatao veloma farany ao amin\'ny Fiangonana ANDAVAMAMBA, alohan\'ny hametrahana azy ao amin\'ny fasam-pianakaviana TANANA.\n\nTsy misy fiaretan-tory');
    
    var versetTexte = safeEscapeHTML(data.versetTexte || '« ... Andriamanitra dia fitiavana; ary izay mitoetra amin\'ny fitiavana no mitoetra ao amin\'Andriamanitra, ary Andriamanitra ao aminy. »');
    var versetRef = safeEscapeHTML(data.versetRef || '1 Jaona 4 : 16');

    // Photo du défunt
    var photoHtml = '';
    if (data.photoBase64) {
        photoHtml = '<img src="' + data.photoBase64 + '" alt="Photo" style="width: 145px; height: 185px; object-fit: cover; border: 1px solid #64748b; display: block;">';
    } else {
        photoHtml = '<div style="width: 145px; height: 185px; background: #f1f5f9; border: 1px dashed #94a3b8; display: flex; align-items: center; justify-content: center; text-align: center; font-size: 11px; color: #64748b;"><span>Insérer une photo</span></div>';
    }

    return '<div contenteditable="true" style="font-family: \'Times New Roman\', Times, serif; color: #0f172a; outline: none; padding: 20mm 15mm; width: 100%; min-height: 297mm; box-sizing: border-box; font-size: 11.5pt; line-height: 1.4;">' +
        '<!-- En-tête : Photo à gauche + Verset à droite -->' +
        '<table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">' +
            '<tr>' +
                '<td style="vertical-align: top; width: 155px;">' +
                    photoHtml +
                '</td>' +
                '<td style="vertical-align: middle; text-align: center; padding-left: 20px;">' +
                    '<p style="font-style: italic; font-weight: bold; font-size: 13pt; margin: 0 0 10px 0; line-height: 1.4;">' + versetTexte + '</p>' +
                    '<p style="font-size: 10pt; text-align: right; margin: 0; font-weight: bold;">' + versetRef + '</p>' +
                '</td>' +
            '</tr>' +
        '</table>' +

        '<!-- Annonce du décès -->' +
        '<div style="text-align: center; margin-bottom: 20px;">' +
            '<p style="font-size: 11pt; margin: 0 0 12px 0;">Amin\'ny finoana sy fanantenana ny fitsanganana\'ny tena amin\'ny maty<br>no ampandrenesanay anareo fa ny malalanay</p>' +
            '<h1 style="font-size: 18pt; font-weight: bold; text-transform: uppercase; margin: 0 0 4px 0; letter-spacing: 0.5px;">' + name + '</h1>' +
            (alias ? '<p style="font-size: 13pt; font-weight: bold; margin: 0 0 10px 0;">' + alias + '</p>' : '') +
            '<p style="font-size: 11pt; margin: 0;">' + dateLieu + '</p>' +
        '</div>' +

        '<!-- Liste de la famille -->' +
        '<div style="margin-bottom: 25px; font-size: 10.5pt; line-height: 1.5;">' +
            '<p style="margin: 0 0 8px 0; font-style: italic;">hoy</p>' +
            '<table style="width: 100%; border-collapse: collapse;">' +
                (vadiny ? '<tr><td style="vertical-align: top; width: 25px;">-</td><td style="vertical-align: top; width: 220px;"><strong>Ny vadiny :</strong></td><td style="vertical-align: top;">' + vadiny + '</td></tr>' : '') +
                (zanany ? '<tr><td style="vertical-align: top;">-</td><td style="vertical-align: top;"><strong>Ny zanany :</strong></td><td style="vertical-align: top;">' + zanany.replace(/\n/g, '<br>') + '</td></tr>' : '') +
                (zafiny ? '<tr><td style="vertical-align: top;">-</td><td style="vertical-align: top;"><strong>Ny zafiny :</strong></td><td style="vertical-align: top;">' + zafiny.replace(/\n/g, '<br>') + '</td></tr>' : '') +
                (irayTampo ? '<tr><td style="vertical-align: top;">-</td><td style="vertical-align: top;"><strong>Ny iray tampo amin-dray sy renim-paritra :</strong></td><td style="vertical-align: top;">' + irayTampo.replace(/\n/g, '<br>') + '</td></tr>' : '') +
                (irayTampoVady ? '<tr><td style="vertical-align: top;">-</td><td style="vertical-align: top;"><strong>Ny iray tampo amin\'ny vadiny :</strong></td><td style="vertical-align: top;">' + irayTampoVady.replace(/\n/g, '<br>') + '</td></tr>' : '') +
                (mpiaraMiasa ? '<tr><td style="vertical-align: top;">-</td><td style="vertical-align: top;"><strong>Ny Mpiara-miasa aminy :</strong></td><td style="vertical-align: top;">' + mpiaraMiasa + '</td></tr>' : '') +
                (havany ? '<tr><td style="vertical-align: top;">-</td><td style="vertical-align: top;"><strong>Ny havany :</strong></td><td style="vertical-align: top;">' + havany.replace(/\n/g, '<br>') + '</td></tr>' : '') +
                (mpitandrina ? '<tr><td style="vertical-align: top;">-</td><td style="vertical-align: top;" colspan="2"><strong>' + mpitandrina.replace(/\n/g, '<br><strong>') + '</strong></td></tr>' : '') +
            '</table>' +
        '</div>' +

        '<!-- Programme des obsèques / Veillée -->' +
        '<div style="text-align: center; font-size: 11pt; line-height: 1.6; font-weight: bold; padding-top: 10px; border-top: 1px solid #cbd5e1;">' +
            details.replace(/\n/g, '<br>') +
        '</div>' +
    '</div>';
}