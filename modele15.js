/* global escapeHTML, getIcons, selectedCVColor, formatHeaderName */

function buildModele15Template(d) {
    // Couleur principale (fond colonne droite et sous-titres)
    const primaryColor = (typeof selectedCVColor !== 'undefined' && selectedCVColor) 
        ? selectedCVColor 
        : '#214263'; 

    // Icônes personnalisées
    const icons = typeof getIcons === 'function' ? getIcons(`
        width:14px;
        height:14px;
        color:#666666;
        fill:currentColor;
        display:inline-block;
        vertical-align:middle;
    `) : {};

    const safeName = d.name ? d.name : [d.firstName, d.lastName].filter(Boolean).join(' ');

    /* ================================
       PHOTO DE PROFIL (Ronde à droite)
    ================================= */
    const photo = d.photoDataUrl
        ? `
            <div style="text-align: center; margin-bottom: 25px;">
               <img src="${d.photoDataUrl}" alt="Photo" style="width: 130px; height: 130px; border-radius: 50%; object-fit: cover; display: inline-block; border: 3px solid rgba(255, 255, 255, 0.2); background-color: #ffffff; -webkit-print-color-adjust: exact; print-color-adjust: exact;">
            </div>
        `
        : '';

    /* ================================
       INFORMATIONS DE CONTACT (En haut à gauche)
    ================================= */
    const contactItems = [];
    if (d.phone) contactItems.push(`<span>${icons.phone ? icons.phone : '📞'} ${escapeHTML(d.phone)}</span>`);
    if (d.email) contactItems.push(`<span>${icons.email ? icons.email : '✉️'} ${escapeHTML(d.email)}</span>`);
    if (d.address) contactItems.push(`<span>${icons.home ? icons.home : '🏠'} ${escapeHTML(d.address)}</span>`);
    if (d.birthdate) contactItems.push(`<span>${icons.date ? icons.date : '📅'} ${escapeHTML(d.birthdate)}</span>`);

    const contactHTML = contactItems.length 
        ? `<div style="display: flex; flex-wrap: wrap; gap: 15px; font-size: 12px; color: #555555; margin-top: 12px; align-items: center;">${contactItems.join('')}</div>`
        : '';

    /* ================================
       STYLES DES TITRES
    ================================= */
    const mainTitleStyle = `color: #333333; font-size: 15px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #e5e7eb; padding-bottom: 5px; margin-top: 0; margin-bottom: 20px; page-break-after: avoid; break-after: avoid;`;
    const sideTitleStyle = `color: #ffffff; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.8px; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 6px; margin-top: 0; margin-bottom: 15px; page-break-after: avoid; break-after: avoid;`;

    /* ================================
       SECTION DROITE : PROFIL
    ================================= */
    const profileHTML = d.summary 
        ? `
            <div style="margin-bottom: 30px;">
                <h3 style="${sideTitleStyle}">Profil professionnel</h3>
                <p style="font-size: 12px; line-height: 1.6; color: #e2e8f0; margin: 0; text-align: justify;">${d.summary}</p>
            </div>
        ` 
        : '';

    /* ================================
       SECTION DROITE : COMPÉTENCES
    ================================= */
    let skills = [];
    if (Array.isArray(d.skillsList)) {
        skills = d.skillsList.map(skill => {
            if (typeof skill === 'string') return skill;
            if (skill && typeof skill === 'object') return skill.name ? skill.name : '';
            return '';
        }).filter(Boolean);
    } else if (d.skillsRaw) {
        skills = String(d.skillsRaw).split(',').map(s => s.trim()).filter(Boolean);
    }

    const skillsHTML = skills.length
        ? `
            <div style="margin-bottom: 30px;">
                <h3 style="${sideTitleStyle}">Compétences</h3>
                <div style="font-size: 12px; color: #ffffff; line-height: 1.8;">
                    ${skills.map(s => `<div>• ${escapeHTML(s)}</div>`).join('')}
                </div>
            </div>
        `
        : '';

    /* ================================
       SECTION DROITE : LANGUES ET HOBBIES
    ================================= */
    const languages = Array.isArray(d.languages) ? d.languages : [];
    const languagesHTML = languages
        .filter(lang => (lang.language ? lang.language : '').trim())
        .map(lang => `
            <div style="margin-bottom: 8px; font-size: 12px; color: #ffffff;">
                <strong>${escapeHTML(lang.language)}</strong>${lang.level ? ` : <span style="color: #cbd5e1;">${escapeHTML(lang.level)}</span>` : ''}
            </div>
        `).join('');

    const sideLanguagesHTML = languagesHTML
        ? `
            <div style="margin-bottom: 30px;">
                <h3 style="${sideTitleStyle}">Langues</h3>
                ${languagesHTML}
            </div>
        `
        : '';

    const hobbies = Array.isArray(d.hobbies) ? d.hobbies.filter(Boolean) : [];
    const sideHobbiesHTML = hobbies.length
        ? `
            <div style="margin-bottom: 30px;">
                <h3 style="${sideTitleStyle}">Centres d'intérêt</h3>
                <div style="font-size: 12px; color: #ffffff; line-height: 1.8;">
                    ${hobbies.map(h => `<div>• ${escapeHTML(h)}</div>`).join('')}
                </div>
            </div>
        `
        : '';

    /* ================================
       SECTION GAUCHE : EXPÉRIENCE
    ================================= */
    const experiences = Array.isArray(d.experiences) ? d.experiences : [];
    const experiencesHTML = experiences
        .filter(exp => (exp.job ? exp.job : (exp.title ? exp.title : '')).trim() || (exp.company ? exp.company : '').trim() || (exp.year ? exp.year : (exp.period ? exp.period : '')).trim())
        .map(exp => {
            let tasks = [];
            if (Array.isArray(exp.tasks)) {
                tasks = exp.tasks;
            } else if (exp.description) {
                tasks = String(exp.description).split(/\r?\n/).filter(Boolean);
            }
            const tasksHTML = tasks
                .filter(task => String(task ? task : '').trim())
                .map(task => `<li style="margin-bottom: 5px;">${escapeHTML(task)}</li>`)
                .join('');

            return `
                <div style="margin-bottom: 22px; page-break-inside: avoid; break-inside: avoid;">
                    <div style="display: flex; justify-content: space-between; align-items: baseline;">
                        <strong style="color: #2d3748; font-size: 15px; font-weight: bold;">${escapeHTML(exp.job ? exp.job : (exp.title ? exp.title : ''))}</strong>
                        <span style="color: #718096; font-size: 12px; font-weight: 600;">${escapeHTML(exp.year ? exp.year : (exp.period ? exp.period : ''))}</span>
                    </div>
                    
                    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 2px; margin-bottom: 8px;">
                        <span style="color: ${primaryColor}; font-weight: bold; font-size: 13.5px;">
                            ${escapeHTML(exp.company ? exp.company : '')}
                        </span>
                    </div>

                    ${tasksHTML ? `<ul style="margin: 0; padding-left: 16px; color: #4a5568; font-size: 12.5px; line-height: 1.5;">${tasksHTML}</ul>` : ''}
                </div>
            `;
        }).join('');

    /* ================================
       SECTION GAUCHE : FORMATION
    ================================= */
    const formations = Array.isArray(d.formations) ? d.formations : [];
    const formationsHTML = formations
        .filter(f => (f.title ? f.title : (f.degree ? f.degree : '')).trim() || (f.school ? f.school : '').trim() || (f.year ? f.year : '').trim())
        .map(f => `
            <div style="margin-bottom: 16px; page-break-inside: avoid; break-inside: avoid;">
                <div style="display: flex; justify-content: space-between; align-items: baseline;">
                    <strong style="color: #2d3748; font-size: 14.5px;">${escapeHTML(f.title ? f.title : (f.degree ? f.degree : ''))}</strong>
                    <span style="color: #718096; font-size: 12px; font-weight: 600;">${escapeHTML(f.year ? f.year : '')}</span>
                </div>
                <div style="color: ${primaryColor}; font-size: 13px; font-weight: 600; margin-top: 2px;">
                    ${escapeHTML(f.school ? f.school : '')}
                </div>
            </div>
        `).join('');

    /* ================================
       SECTION GAUCHE : DIPLÔMES
    ================================= */
    const diplomes = Array.isArray(d.diplomes) ? d.diplomes : [];
    const diplomesHTML = diplomes
        .filter(dip => (dip.title ? dip.title : '').trim() || (dip.school ? dip.school : '').trim() || (dip.year ? dip.year : '').trim())
        .map(dip => `
            <div style="margin-bottom: 16px; page-break-inside: avoid; break-inside: avoid;">
                <div style="display: flex; justify-content: space-between; align-items: baseline;">
                    <strong style="color: #2d3748; font-size: 14.5px;">${escapeHTML(dip.title ? dip.title : '')}</strong>
                    <span style="color: #718096; font-size: 12px; font-weight: 600;">${escapeHTML(dip.year ? dip.year : '')}</span>
                </div>
                <div style="color: ${primaryColor}; font-size: 13px; font-weight: 600; margin-top: 2px;">
                    ${escapeHTML(dip.school ? dip.school : '')}
                </div>
            </div>
        `).join('');

    /* =======================================
       RENDU GLOBAL DU TEMPLATE (FORMAT A4)
    ================================= */
    return `
        <div class="cv-model15-container" style="width:210mm; min-height:297mm; background-color:#ffffff; background-image: linear-gradient(to right, #ffffff 0%, #ffffff 138mm, ${primaryColor} 138mm, ${primaryColor} 100%); margin:0 auto; box-sizing:border-box; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; display: block; -webkit-print-color-adjust: exact; print-color-adjust: exact;">
            
            <!-- COLONNE GAUCHE (CONTENU PRINCIPAL) -->
            <div style="float: left; width: 138mm; box-sizing: border-box; padding: 35px 25px 30px 35px;">
                <!-- EN-TÊTE DU CV -->
                <div style="margin-bottom: 30px;">
                    <h1 style="color: #1a202c; font-size: 28px; font-weight: 800; text-transform: uppercase; margin: 0; letter-spacing: 0.5px;">
                        ${safeName ? escapeHTML(safeName) : 'VOTRE NOM'}
                    </h1>
                    ${contactHTML}
                </div>

                <!-- EXPÉRIENCES -->
                ${experiencesHTML ? `
                    <section style="margin-bottom: 30px;">
                        <h2 style="${mainTitleStyle}">Expérience</h2>
                        ${experiencesHTML}
                    </section>
                ` : ''}

                <!-- FORMATION -->
                ${formationsHTML ? `
                    <section style="margin-bottom: 25px;">
                        <h2 style="${mainTitleStyle}">Formation</h2>
                        ${formationsHTML}
                    </section>
                ` : ''}

                <!-- DIPLÔMES -->
                ${diplomesHTML ? `
                    <section style="margin-bottom: 25px;">
                        <h2 style="${mainTitleStyle}">Diplômes</h2>
                        ${diplomesHTML}
                    </section>
                ` : ''}
            </div>

            <!-- COLONNE DROITE (BARRE LATÉRALE FONCÉE) -->
            <div style="margin-left: 138mm; width: 72mm; box-sizing: border-box; padding: 35px 20px 30px 20px; background-color: ${primaryColor}; min-height: 297mm; -webkit-print-color-adjust: exact; print-color-adjust: exact;">
                ${photo}
                ${profileHTML}
                ${skillsHTML}
                ${sideLanguagesHTML}
                ${sideHobbiesHTML}
            </div>

            <div style="clear: both;"></div>
        </div>
    `;
}