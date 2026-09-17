function buildModele13Template(d) {
    // Récupération de la couleur
    const primaryColor = 
        (typeof selectedCVColor !== 'undefined' ? selectedCVColor : null)
        || '#3b5998'; // Bleu par défaut similaire à votre capture

    // Icônes personnalisées
    const icons = typeof getIcons === 'function' ? getIcons(`
        width:16px;
        height:16px;
        color:${primaryColor};
        fill:currentColor;
    `) : {};

    const safeName = d.name || [d.firstName, d.lastName].filter(Boolean).join(' ');

    // PHOTO : Rectangulaire, bordure blanche, superposée sur la bannière (AGRANDIE)
    const photo = d.photoDataUrl
        ? `
            <div style="margin-top: -140px; text-align: center; position: relative; z-index: 10;">
               <img src="${d.photoDataUrl}" alt="Photo" style="width: 180px; height: 230px; object-fit: cover; border: 5px solid #ffffff; display: inline-block; background-color: #ffffff; -webkit-print-color-adjust: exact; print-color-adjust: exact;">
            </div>
        `
        : '';

    /* ================================
       CONTACT 
    ================================= */
    const contactHTML = `
        <div style="display: flex; flex-direction: column; gap: 12px; font-size: 13px; color: #333;">
            ${d.name ? `<div style="display: flex; align-items: center; gap: 10px;">${icons.user || '👤'}<span>${escapeHTML(d.name)}</span></div>` : ''}
            ${d.phone ? `<div style="display: flex; align-items: center; gap: 10px;">${icons.phone || '📞'}<span>${escapeHTML(d.phone)}</span></div>` : ''}
            ${d.email ? `<div style="display: flex; align-items: center; gap: 10px;">${icons.email || '✉️'}<span>${escapeHTML(d.email)}</span></div>` : ''}
            ${d.address ? `<div style="display: flex; align-items: center; gap: 10px;">${icons.home || '🏠'}<span>${String(d.address)}</span></div>` : ''}
            ${d.birthdate ? `<div style="display: flex; align-items: center; gap: 10px;">${icons.date || '📅'}<span>${escapeHTML(d.birthdate)}</span></div>` : ''}
        </div>
    `;

    /* ================================
       LANGUES (Avec barres de progression)
    ================================= */
    const languages = Array.isArray(d.languages) ? d.languages : [];
    const languagesHTML = languages
        .filter(lang => (lang.language || '').trim())
        .map(lang => {
            let pct = '75%'; 
            if (lang.level) {
                const l = lang.level.toLowerCase();
                if (l.includes('débutant') || l.includes('a1') || l.includes('a2')) pct = '35%';
                else if (l.includes('intermédiaire') || l.includes('b1') || l.includes('b2')) pct = '65%';
                else if (l.includes('avancé') || l.includes('courant') || l.includes('c1')) pct = '85%';
                else if (l.includes('maternel') || l.includes('bilingue') || l.includes('c2')) pct = '100%';
            }
            return `
                <div style="margin-bottom: 12px; font-size: 13px; color: #333;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                        <strong>${escapeHTML(lang.language)}</strong>
                    </div>
                    <div style="width: 100%; background-color: #d1d5db; height: 6px; -webkit-print-color-adjust: exact; print-color-adjust: exact;">
                        <div style="width: ${pct}; background-color: ${primaryColor}; height: 100%; -webkit-print-color-adjust: exact; print-color-adjust: exact;"></div>
                    </div>
                </div>
            `;
        }).join('');

    /* ================================
       COMPÉTENCES & HOBBIES
    ================================= */
    let skills = [];
    if(Array.isArray(d.skillsList)){
        skills = d.skillsList.map(skill => {
            if(typeof skill === 'string') return skill;
            if(skill && typeof skill === 'object') return skill.name || '';
            return '';
        }).filter(Boolean);
    } else if(d.skillsRaw) {
        skills = String(d.skillsRaw).split(',').map(skill => skill.trim()).filter(Boolean);
    }
    const skillsHTML = skills.length
        ? `<ul style="list-style-type: none; padding: 0; margin: 0; font-size: 13px; color: #333;">${skills.map(s => `<li style="margin-bottom: 6px; padding-left: 12px; position: relative;"><span style="position: absolute; left: 0; color: ${primaryColor}; font-weight: bold;">›</span>${escapeHTML(s)}</li>`).join('')}</ul>`
        : '';

    const hobbies = Array.isArray(d.hobbies) ? d.hobbies.filter(Boolean) : [];
    const hobbiesHTML = hobbies.length
        ? `<ul style="list-style-type: none; padding: 0; margin: 0; font-size: 13px; color: #333;">${hobbies.map(h => `<li style="margin-bottom: 6px; padding-left: 12px; position: relative;"><span style="position: absolute; left: 0; color: ${primaryColor}; font-weight: bold;">›</span>${escapeHTML(h)}</li>`).join('')}</ul>`
        : '';

    /* ================================
       STYLES DES TITRES
    ================================= */
    const titleStyle = `color: ${primaryColor}; border-bottom: 2px solid ${primaryColor}; padding-bottom: 5px; margin-top: 0; margin-bottom: 20px; font-size: 18px; text-transform: uppercase; font-weight: bold;`;
    const sideTitleStyle = `color: ${primaryColor}; font-size: 14px; font-weight: bold; margin-top: 25px; margin-bottom: 15px;`;

    /* ================================
       PROFIL, FORMATIONS, EXPÉRIENCES
    ================================= */
    const profileHTML = d.summary 
        ? `
            <section style="margin-bottom: 30px;">
                <h2 style="${titleStyle}">Profil</h2>
                <p style="font-size: 14px; line-height: 1.6; color: #444; margin: 0; text-align: justify;">${d.summary}</p>
            </section>
        ` 
        : '';

    const formations = Array.isArray(d.formations) ? d.formations : [];
    const formationsHTML = formations
        .filter(f => (f.title || f.degree || '').trim() || (f.school || '').trim() || (f.year || '').trim())
        .map(f => `
            <div style="margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline;">
                    <strong style="color: #333; font-size: 15px;">${escapeHTML(f.title || f.degree || '')}</strong>
                    <span style="color: ${primaryColor}; font-size: 13px; font-weight: bold;">${escapeHTML(f.year || '')}</span>
                </div>
                <div style="color: #555; font-size: 14px; margin-top: 3px; font-style: italic;">${escapeHTML(f.school || '')}</div>
            </div>
        `).join('');

    const experiences = Array.isArray(d.experiences) ? d.experiences : [];
    const experiencesHTML = experiences
        .filter(exp => (exp.job || exp.title || '').trim() || (exp.company || '').trim() || (exp.year || exp.period || '').trim())
        .map(exp => {
            let tasks = [];
            if(Array.isArray(exp.tasks)){
                tasks = exp.tasks;
            } else if(exp.description){
                tasks = String(exp.description).split(/\r?\n/).filter(Boolean);
            }
            const tasksHTML = tasks
                .filter(task => String(task || '').trim())
                .map(task => `<li style="margin-bottom: 4px;">${escapeHTML(task)}</li>`)
                .join('');

            return `
                <div style="margin-bottom: 25px;">
                    <div style="display: flex; justify-content: space-between; align-items: baseline;">
                        <strong style="color: #333; font-size: 15px;">${escapeHTML(exp.job || exp.title || '')}</strong>
                        <span style="color: ${primaryColor}; font-size: 13px; font-weight: bold;">${escapeHTML(exp.year || exp.period || '')}</span>
                    </div>
                    <div style="color: ${primaryColor}; font-weight: bold; font-size: 14px; margin-top: 3px; margin-bottom: 6px;">
                        ${escapeHTML(exp.company || '')}
                    </div>
                    ${tasksHTML ? `<ul style="margin: 0; padding-left: 18px; color: #555; font-size: 14px;">${tasksHTML}</ul>` : ''}
                </div>
            `;
        }).join('');

    /* =======================================
       RENDU DU TEMPLATE (STRUCTURE TABLEAU + BANNIÈRE SYNCHRONISÉE)
    ======================================= */
    return `
        <div class="cv-model13-container" style="width:210mm; min-height:297mm; background-color:#ffffff; margin:0 auto; overflow:hidden; box-sizing:border-box; font-family: 'Arial', sans-serif;">
            
            <table style="width:100%; border-collapse:collapse; table-layout:fixed; min-height:297mm; background-color:#ffffff;">
                <tr>
                    <!-- COLONNE GAUCHE (SIDEBAR) -->
                    <td style="width:75mm; vertical-align:top; background-color:#eeeeee; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact;">
                        
                        <!-- Espace gris en haut -->
                        <div style="height: 40px; width: 100%;"></div>
                        
                        <!-- Morceau gauche de la bannière bleue -->
                        <div style="height: 120px; width: 100%; background-color: ${primaryColor}; -webkit-print-color-adjust: exact; print-color-adjust: exact;"></div>
                        
                        <!-- Photo remontée sur la bannière -->
                        ${photo}
                        
                        <!-- Contenu Sidebar -->
                        <div style="padding: 10px 25px 30px 25px;">
                            ${contactHTML ? `
                                <h3 style="${sideTitleStyle} margin-top: 20px;">Coordonnées</h3>
                                ${contactHTML}
                            ` : ''}

                            ${languagesHTML ? `
                                <h3 style="${sideTitleStyle}">Langues</h3>
                                ${languagesHTML}
                            ` : ''}

                            ${skillsHTML ? `
                                <h3 style="${sideTitleStyle}">Compétences</h3>
                                ${skillsHTML}
                            ` : ''}

                            ${hobbiesHTML ? `
                                <h3 style="${sideTitleStyle}">Centres d'intérêt</h3>
                                ${hobbiesHTML}
                            ` : ''}
                        </div>
                    </td>

                    <!-- COLONNE DROITE (MAIN) -->
                    <td style="width:135mm; vertical-align:top; padding: 0; background-color:#ffffff; -webkit-print-color-adjust: exact; print-color-adjust: exact;">
                        
                        <!-- Espace blanc en haut -->
                        <div style="height: 40px; width: 100%;"></div>
                        
                        <!-- Morceau droit de la bannière bleue (avec le nom) -->
                        <div style="height: 120px; width: 100%; background-color: ${primaryColor}; display: flex; align-items: center; padding: 0 40px; box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact;">
                            <h1 style="color: #ffffff; font-size: 28px; margin: 0; text-transform: uppercase; font-weight: bold; letter-spacing: 1px;">
                                ${typeof formatHeaderName === 'function' ? formatHeaderName(safeName) : escapeHTML(safeName)}
                            </h1>
                        </div>

                        <!-- Contenu Principal -->
                        <div style="padding: 40px;">
                            ${profileHTML}

                            ${formationsHTML ? `
                                <section style="margin-bottom: 30px;">
                                    <h2 style="${titleStyle}">Formation</h2>
                                    ${formationsHTML}
                                </section>
                            ` : ''}

                            ${experiencesHTML ? `
                                <section style="margin-bottom: 30px;">
                                    <h2 style="${titleStyle}">Expérience Professionnelle</h2>
                                    <div>
                                        ${experiencesHTML}
                                    </div>
                                </section>
                            ` : ''}
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    `;
}