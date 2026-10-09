/* global escapeHTML, getIcons, selectedCVColor, formatHeaderName */

function buildModele16Template(d) {
    // Couleur principale (En-tête supérieur) - Par défaut gris ardoise fonce (#52575D)
    const primaryColor = (typeof selectedCVColor !== 'undefined' && selectedCVColor) 
        ? selectedCVColor 
        : '#52575D'; 

    // Icônes circulaires pour les coordonnées à gauche
    const icons = typeof getIcons === 'function' ? getIcons(`
        width:12px;
        height:12px;
        color:#ffffff;
        fill:currentColor;
    `) : {};

    const safeName = d.name ? d.name : [d.firstName, d.lastName].filter(Boolean).join(' ');

    /* ================================
       PHOTO DE PROFIL (Ronde à cheval sur la pointe)
    ================================= */
    const photo = d.photoDataUrl
        ? `
            <div style="position: absolute; left: 35mm; top: 12mm; transform: translateX(-50%); z-index: 10;">
               <img src="${d.photoDataUrl}" alt="Photo" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; display: block; border: 4px solid #ffffff; background-color: #ffffff; box-shadow: 0 4px 10px rgba(0,0,0,0.15); -webkit-print-color-adjust: exact; print-color-adjust: exact;">
            </div>
        `
        : '';

    /* ================================
       INFORMATIONS DE CONTACT (Colonne gauche)
    ================================= */
    const circleIconStyle = `width: 22px; height: 22px; border-radius: 50%; background-color: ${primaryColor}; display: flex; align-items: center; justify-content: center; flex-shrink: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact;`;

    const contactHTML = `
        <div style="display: flex; flex-direction: column; gap: 12px; font-size: 12px; color: #4a4a4a;">
            ${d.email ? `
                <div style="display: flex; align-items: center; gap: 10px; word-break: break-all;">
                    <div style="${circleIconStyle}">${icons.email ? icons.email : '✉'}</div>
                    <span>${escapeHTML(d.email)}</span>
                </div>
            ` : ''}

            ${d.phone ? `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="${circleIconStyle}">${icons.phone ? icons.phone : '📞'}</div>
                    <span>${escapeHTML(d.phone)}</span>
                </div>
            ` : ''}

            ${d.address ? `
                <div style="display: flex; align-items: flex-start; gap: 10px;">
                    <div style="${circleIconStyle} margin-top: 2px;">${icons.home ? icons.home : '🏠'}</div>
                    <span>${escapeHTML(d.address)}</span>
                </div>
            ` : ''}

            ${d.birthdate ? `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="${circleIconStyle}">${icons.date ? icons.date : '📅'}</div>
                    <span>${escapeHTML(d.birthdate)}</span>
                </div>
            ` : ''}
        </div>
    `;

    /* ================================
       COMPÉTENCES & HOBBIES
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
        ? `<div style="display: flex; flex-direction: column; gap: 8px; font-size: 12.5px; color: #4a4a4a;">
            ${skills.map(s => `<div>${escapeHTML(s)}</div>`).join('')}
           </div>`
        : '';

    const hobbies = Array.isArray(d.hobbies) ? d.hobbies.filter(Boolean) : [];
    const hobbiesHTML = hobbies.length
        ? `<div style="display: flex; flex-direction: column; gap: 6px; font-size: 12.5px; color: #4a4a4a;">
            ${hobbies.map(h => `<div>• ${escapeHTML(h)}</div>`).join('')}
           </div>`
        : '';

    /* ================================
       FORMATIONS, DIPLÔMES & LANGUES (Sidebar)
    ================================= */
    const formations = Array.isArray(d.formations) ? d.formations : [];
    const formationsHTML = formations
        .filter(f => (f.title ? f.title : (f.degree ? f.degree : '')).trim() || (f.school ? f.school : '').trim() || (f.year ? f.year : '').trim())
        .map(f => `
            <div style="margin-bottom: 14px; position: relative; padding-left: 15px; border-left: 2px solid ${primaryColor};">
                <strong style="color: #2d3748; font-size: 13px; display: block;">${escapeHTML(f.title ? f.title : (f.degree ? f.degree : ''))}</strong>
                <div style="color: #666666; font-size: 12px; margin-top: 1px;">${escapeHTML(f.school ? f.school : '')}</div>
                <div style="color: #718096; font-size: 11.5px; margin-top: 2px;">${escapeHTML(f.year ? f.year : '')}</div>
            </div>
        `).join('');

    const diplomes = Array.isArray(d.diplomes) ? d.diplomes : [];
    const diplomesHTML = diplomes
        .filter(dip => (dip.title ? dip.title : '').trim() || (dip.school ? dip.school : '').trim() || (dip.year ? dip.year : '').trim())
        .map(dip => `
            <div style="margin-bottom: 14px; position: relative; padding-left: 15px; border-left: 2px solid ${primaryColor};">
                <strong style="color: #2d3748; font-size: 13px; display: block;">${escapeHTML(dip.title ? dip.title : '')}</strong>
                <div style="color: #666666; font-size: 12px; margin-top: 1px;">${escapeHTML(dip.school ? dip.school : '')}</div>
                <div style="color: #718096; font-size: 11.5px; margin-top: 2px;">${escapeHTML(dip.year ? dip.year : '')}</div>
            </div>
        `).join('');

    const languages = Array.isArray(d.languages) ? d.languages : [];
    const languagesHTML = languages
        .filter(lang => (lang.language ? lang.language : '').trim())
        .map(lang => `
            <div style="margin-bottom: 8px; font-size: 12.5px; color: #4a4a4a;">
                <strong>${escapeHTML(lang.language)}</strong>${lang.level ? ` - <span style="color: #666;">${escapeHTML(lang.level)}</span>` : ''}
            </div>
        `).join('');

    /* ================================
       STYLES DES TITRES
    ================================= */
    const sideTitleStyle = `color: #333333; font-size: 15px; font-weight: 700; margin-top: 0; margin-bottom: 15px; text-transform: none;`;
    const mainTitleStyle = `color: #2d3748; font-size: 16px; font-weight: 700; border-bottom: 2px solid #333333; padding-bottom: 4px; margin-top: 0; margin-bottom: 18px; page-break-after: avoid; break-after: avoid;`;

    /* ================================
       COLONNE DROITE : PROFIL & EXPÉRIENCE
    ================================= */
    const profileHTML = d.summary 
        ? `
            <section style="margin-bottom: 28px;">
                <h2 style="${mainTitleStyle}">Profil</h2>
                <p style="font-size: 13px; line-height: 1.6; color: #4a5568; margin: 0; text-align: justify;">${d.summary}</p>
            </section>
        ` 
        : '';

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
                .map(task => `<li style="margin-bottom: 4px;">${escapeHTML(task)}</li>`)
                .join('');

            return `
                <div style="margin-bottom: 22px; page-break-inside: avoid; break-inside: avoid;">
                    <div style="display: flex; justify-content: space-between; align-items: baseline;">
                        <strong style="color: #1a202c; font-size: 14.5px;">
                            ${escapeHTML(exp.job ? exp.job : (exp.title ? exp.title : ''))}${exp.company ? `, <span style="font-weight: 600; color: #2b6cb0;">${escapeHTML(exp.company)}</span>` : ''}
                        </strong>
                    </div>
                    <div style="color: #718096; font-size: 12px; margin-top: 2px; margin-bottom: 8px;">
                        ${escapeHTML(exp.year ? exp.year : (exp.period ? exp.period : ''))}
                    </div>
                    ${tasksHTML ? `<ul style="margin: 0; padding-left: 18px; color: #4a5568; font-size: 12.5px; line-height: 1.55;">${tasksHTML}</ul>` : ''}
                </div>
            `;
        }).join('');

    /* =======================================
       RENDU GLOBAL (CANVAS A4)
    ================================= */
    return `
        <div class="cv-model16-container" style="width:210mm; min-height:297mm; background-color:#ffffff; margin:0 auto; position:relative; box-sizing:border-box; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact;">
            
            <!-- EN-TÊTE GRIS AVEC COUPE EN POINTE -->
            <div style="position: relative; width: 100%; height: 145px; background-color: ${primaryColor}; -webkit-print-color-adjust: exact; print-color-adjust: exact;">
                <!-- FORME POLYGONALE EN POINTE SOUS LA PHOTO -->
                <div style="position: absolute; bottom: -30px; left: 0; width: 70mm; height: 31px; background-color: ${primaryColor}; clip-path: polygon(0 0, 100% 0, 50% 100%); -webkit-print-color-adjust: exact; print-color-adjust: exact;"></div>
                
                <!-- NOM ET POSTE À DROITE -->
                <div style="margin-left: 70mm; padding-top: 35px; padding-left: 20px; color: #ffffff;">
                    <h1 style="font-size: 32px; font-weight: 700; margin: 0; letter-spacing: 0.5px; color: #ffffff;">
                        ${safeName ? escapeHTML(safeName) : 'Nom Prénom'}
                    </h1>
                </div>
            </div>

            ${photo}

            <!-- CORPS À DEUX COLONNES -->
            <div style="width: 100%; display: flex; min-height: calc(297mm - 145px);">
                
                <!-- COLONNE GAUCHE (BEIGE CLAIR) -->
                <div style="width: 70mm; background-color: #EBE7E1; padding: 50px 20px 30px 20px; box-sizing: border-box; flex-shrink: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact;">
                    
                    ${contactHTML ? `
                        <section style="margin-bottom: 30px;">
                            <h3 style="${sideTitleStyle}">Informations personnelles</h3>
                            ${contactHTML}
                        </section>
                    ` : ''}

                    ${formationsHTML ? `
                        <section style="margin-bottom: 30px;">
                            <h3 style="${sideTitleStyle}">Formation</h3>
                            ${formationsHTML}
                        </section>
                    ` : ''}

                    ${diplomesHTML ? `
                        <section style="margin-bottom: 30px;">
                            <h3 style="${sideTitleStyle}">Diplômes</h3>
                            ${diplomesHTML}
                        </section>
                    ` : ''}

                    ${skillsHTML ? `
                        <section style="margin-bottom: 30px;">
                            <h3 style="${sideTitleStyle}">Compétences</h3>
                            ${skillsHTML}
                        </section>
                    ` : ''}

                    ${languagesHTML ? `
                        <section style="margin-bottom: 30px;">
                            <h3 style="${sideTitleStyle}">Langues</h3>
                            ${languagesHTML}
                        </section>
                    ` : ''}

                    ${hobbiesHTML ? `
                        <section style="margin-bottom: 30px;">
                            <h3 style="${sideTitleStyle}">Centres d'intérêt</h3>
                            ${hobbiesHTML}
                        </section>
                    ` : ''}

                </div>

                <!-- COLONNE DROITE (CONTENU BLANC) -->
                <div style="flex-1; background-color: #ffffff; padding: 30px 30px 30px 25px; box-sizing: border-box;">
                    
                    ${profileHTML}

                    ${experiencesHTML ? `
                        <section style="margin-bottom: 28px;">
                            <h2 style="${mainTitleStyle}">Expérience professionnelle</h2>
                            ${experiencesHTML}
                        </section>
                    ` : ''}

                </div>

            </div>

        </div>
    `;
}