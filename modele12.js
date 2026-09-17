function buildModele12Template(d){

    // Récupération de la couleur
    const primaryColor = 
        (typeof selectedCVColor !== 'undefined' ? selectedCVColor : null)
        || '#3B5998';

    const icons =
        typeof getIcons === 'function'
            ? getIcons(`
                width:12px;
                height:12px;
                min-width:12px;
                min-height:12px;
                color:${primaryColor};
                fill:currentColor;
            `)
            : {};

    const safeName =
        d.name ||
        [d.firstName,d.lastName]
            .filter(Boolean)
            .join(' ');

    // AJUSTEMENT PHOTO : Bordure blanche, ombre et affichage inline-block
    const photo =
        d.photoDataUrl
        ? `
            <img
                class="cv-model12-photo"
                src="${d.photoDataUrl}"
                alt="Photo"
                style="width: 135px; height: 135px; border-radius: 50%; object-fit: cover; border: 4px solid #ffffff; box-shadow: 0 4px 8px rgba(0,0,0,0.15); background-color: #ffffff; display: inline-block;">
        `
        : '';

    /* ================================
       FORMATIONS
    ================================= */
    const formations = Array.isArray(d.formations) ? d.formations : [];
    const formationsHTML = formations
        .filter(f => (f.title || f.degree || '').trim() || (f.school || '').trim() || (f.year || '').trim())
        .map(f => `
            <div class="cv-model12-formation" style="margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; font-weight: bold; color: ${primaryColor};">
                    <div>${escapeHTML(f.title || f.degree || '')}</div>
                    <div style="font-size: 0.9em; color: #555;">${escapeHTML(f.year || '')}</div>
                </div>
                <div style="font-style: italic; color: #333;">
                    ${escapeHTML(f.school || '')}
                </div>
            </div>
        `).join('');

    /* ================================
       DIPLOMES
    ================================= */
    const diplomes = Array.isArray(d.diplomes) ? d.diplomes : [];
    const diplomesHTML = diplomes
        .filter(dip => (dip.title || '').trim() || (dip.school || '').trim() || (dip.year || '').trim())
        .map(dip => `
            <div class="cv-model12-formation" style="margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; font-weight: bold; color: ${primaryColor};">
                    <div>${escapeHTML(dip.title || '')}</div>
                    <div style="font-size: 0.9em; color: #555;">${escapeHTML(dip.year || '')}</div>
                </div>
                <div style="font-style: italic; color: #333;">
                    ${escapeHTML(dip.school || '')}
                </div>
            </div>
        `).join('');

    /* ================================
       EXPERIENCES
    ================================= */
    const experiences = Array.isArray(d.experiences) ? d.experiences : [];
    const experiencesHTML = experiences
        .filter(exp => (exp.job || exp.title || '').trim() || (exp.company || '').trim() || (exp.year || exp.period || '').trim())
        .map(exp => {
            let tasks = [];
            if(Array.isArray(exp.tasks)){
                tasks = exp.tasks;
            }else if(exp.description){
                tasks = String(exp.description).split(/\r?\n/).filter(Boolean);
            }
            const tasksHTML = tasks
                .filter(task => String(task || '').trim())
                .map(task => `<li style="margin-bottom: 3px;">${escapeHTML(task)}</li>`)
                .join('');

            return `
                <div class="cv-model12-experience" style="margin-bottom: 20px;">
                    <div style="display: flex; justify-content: space-between; font-weight: bold; color: #333; font-size: 1.1em;">
                        <div>${escapeHTML(exp.job || exp.title || '')}</div>
                        <div style="font-size: 0.85em; color: #666; font-weight: normal;">${escapeHTML(exp.year || exp.period || '')}</div>
                    </div>
                    <div style="color: ${primaryColor}; font-weight: bold; margin-bottom: 5px;">
                        ${escapeHTML(exp.company || '')}
                    </div>
                    ${tasksHTML ? `<ul style="margin: 0; padding-left: 20px; color: #444; font-size: 0.95em;">${tasksHTML}</ul>` : ''}
                </div>
            `;
        }).join('');

    /* ================================
       COMPETENCES, LANGUES, HOBBIES, CONTACT
    ================================= */
    let skills = [];
    if(Array.isArray(d.skillsList)){
        skills = d.skillsList.map(skill => typeof skill === 'string' ? skill : (skill && typeof skill === 'object' ? skill.name || '' : '')).filter(Boolean);
    }else if(d.skillsRaw){
        skills = String(d.skillsRaw).split(',').map(skill => skill.trim()).filter(Boolean);
    }
    const skillsHTML = skills.length ? `<ul style="list-style: none; padding: 0; margin: 0; color: #333;">${skills.map(skill => `<li style="margin-bottom: 5px; font-size: 0.95em;">• ${escapeHTML(skill)}</li>`).join('')}</ul>` : '';

    const languages = Array.isArray(d.languages) ? d.languages : [];
    const languagesHTML = languages.filter(lang => (lang.language || '').trim()).map(lang => `
        <li style="margin-bottom: 5px; font-size: 0.95em;">
            • ${escapeHTML(lang.language)} ${lang.level ? `<span style="opacity: 0.8; font-size: 0.9em;">(${escapeHTML(lang.level)})</span>` : ''}
        </li>
    `).join('');

    const hobbies = Array.isArray(d.hobbies) ? d.hobbies.filter(Boolean) : [];
    const hobbiesHTML = hobbies.length ? `<ul style="list-style: none; padding: 0; margin: 0; color: #333;">${hobbies.map(hobby => `<li style="margin-bottom: 5px; font-size: 0.95em;">• ${escapeHTML(hobby)}</li>`).join('')}</ul>` : '';

    const contactHTML = `
        <div style="display: flex; flex-direction: column; gap: 10px; color: #333; font-size: 0.95em; word-break: break-word;">
            ${d.name ? `<div style="display: flex; align-items: center; gap: 8px;">${icons.user || '👤'} <span>${escapeHTML(d.name)}</span></div>` : ''}
            ${d.email ? `<div style="display: flex; align-items: center; gap: 8px;">${icons.email || '✉️'} <span>${escapeHTML(d.email)}</span></div>` : ''}
            ${d.phone ? `<div style="display: flex; align-items: center; gap: 8px;">${icons.phone || '📞'} <span>${escapeHTML(d.phone)}</span></div>` : ''}
            ${d.address ? `<div style="display: flex; align-items: center; gap: 8px;">${icons.home || '📍'} <span>${String(d.address)}</span></div>` : ''}
            ${d.birthdate ? `<div style="display: flex; align-items: center; gap: 8px;">${icons.date || '📅'} <span>${escapeHTML(d.birthdate)}</span></div>` : ''}
        </div>
    `;

    /* ================================
       RENDU DU TEMPLATE 
    ================================= */
    
    const titleStyle = `color: ${primaryColor}; border-bottom: 2px solid ${primaryColor}; padding-bottom: 5px; margin-top: 0; margin-bottom: 15px; font-size: 1.2em; text-transform: uppercase;`;
    
    // STYLE MODIFIÉ : Titres de la sidebar avec bordure bleue inférieure pour correspondre à votre capture
    const sideTitleStyle = `color: ${primaryColor}; border-bottom: 1px solid ${primaryColor}; padding-bottom: 5px; margin-top: 25px; margin-bottom: 15px; font-size: 0.9em; text-transform: uppercase; font-weight: bold;`;

    return `
        <div class="cv-model12-container" style="width:210mm; min-height:297mm; background-color:#ffffff; margin:0 auto; overflow:hidden; box-sizing:border-box; font-family: 'Arial', sans-serif;">
            
            <table style="width:100%; border-collapse:collapse; table-layout:fixed; min-height:297mm; background-color:#ffffff;">
                <tr>
                    <!-- COLONNE GAUCHE (SIDEBAR) - 75mm -->
                    <td class="cv-model12-sidebar" style="width:75mm; vertical-align:top; background-color:#f8f9fa; padding:0; border-right: 1px solid #eeeeee; -webkit-print-color-adjust: exact; print-color-adjust: exact;">
                        
                        <!-- HEADER BLEU AVEC COURBE ET PHOTO CHEVAUCHANTE -->
                        <div style="background-color:#f8f9fa; text-align: center; padding-bottom: 10px;">
                            
                            <!-- Forme bleue incurvée -->
                            <div style="background-color:${primaryColor}; padding: 25px 15px 45px 15px; border-bottom-left-radius: 50% 30px; border-bottom-right-radius: 50% 30px; color: #ffffff; -webkit-print-color-adjust: exact; print-color-adjust: exact;">
                                <h1 style="margin: 0; font-size: 18px; line-height: 1.2;">
                                    ${typeof formatHeaderName === 'function' ? formatHeaderName(safeName) : escapeHTML(safeName)}
                                </h1>
                            </div>
                            
                            <!-- Photo qui remonte (margin-top négatif) -->
                            <div style="margin-top: -60px; position: relative; z-index: 10;">
                                ${photo}
                            </div>
                            
                        </div>

                        <!-- CONTENU SIDEBAR -->
                        <div style="padding: 65px 20px 20px 20px;">
                            <h3 style="${sideTitleStyle} margin-top: 0;">Informations Personnelles</h3>
                            ${contactHTML}

                            ${skillsHTML ? `
                                <h3 style="${sideTitleStyle}">Compétences</h3>
                                ${skillsHTML}
                            ` : ''}

                            ${languagesHTML ? `
                                <h3 style="${sideTitleStyle}">Langues</h3>
                                <ul style="list-style: none; padding: 0; margin: 0; color: #333;">${languagesHTML}</ul>
                            ` : ''}

                            ${hobbiesHTML ? `
                                <h3 style="${sideTitleStyle}">Centres d'intérêt</h3>
                                ${hobbiesHTML}
                            ` : ''}
                        </div>

                    </td>

                    <!-- COLONNE DROITE (MAIN) - 135mm -->
                    <td class="cv-model12-main" style="width:135mm; vertical-align:top; padding: 35px 30px; background-color:#ffffff; -webkit-print-color-adjust: exact; print-color-adjust: exact;">
                        
                        ${d.summary ? `
                            <section style="margin-bottom: 25px;">
                                <h2 style="${titleStyle}">Profil</h2>
                                <p style="text-align: justify; line-height: 1.5; color: #444; margin: 0;">
                                    ${d.summary}
                                </p>
                            </section>
                        ` : ''}

                        ${experiencesHTML ? `
                            <section style="margin-bottom: 25px;">
                                <h2 style="${titleStyle}">Expérience Professionnelle</h2>
                                ${experiencesHTML}
                            </section>
                        ` : ''}

                        ${formationsHTML ? `
                            <section style="margin-bottom: 25px;">
                                <h2 style="${titleStyle}">Formation</h2>
                                ${formationsHTML}
                            </section>
                        ` : ''}

                        ${diplomesHTML ? `
                            <section style="margin-bottom: 25px;">
                                <h2 style="${titleStyle}">Diplômes</h2>
                                ${diplomesHTML}
                            </section>
                        ` : ''}

                    </td>
                </tr>
            </table>
        </div>
    `;
}