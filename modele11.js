function buildModele11Template(d) {
    const primaryColor = (typeof selectedCVColor !== 'undefined' ? selectedCVColor : null)
                        || (typeof getActiveColor === 'function' ? getActiveColor() : null) 
                        || '#617278';

    const bgLight = '#f5f2eb';

    // Photo
    const photoHTML = d.photoDataUrl
        ? `<img src="${d.photoDataUrl}" alt="Photo" style="width:135px; height:135px; object-fit:cover; border-radius:50%; border:3px solid #ffffff;">`
        : `<div style="width:110px; height:110px; border-radius:50%; background:#4a585e; display:flex; align-items:center; justify-content:center; font-size:32px; color:white;">📷</div>`;

    // Compétences dynamiques
    let skillsHTML = '';
    const rawSkills = Array.isArray(d.skills) ? d.skills : (d.skillsList || []);
    let skillItems = [];
    
    if (rawSkills.length > 0) {
        skillItems = rawSkills.map(s => typeof s === 'object' ? s : { name: s, level: '' });
    } else if (d.skillsRaw) {
        skillItems = d.skillsRaw.split(',').map(s => ({ name: s.trim(), level: '' })).filter(s => s.name);
    }

    if (skillItems.length > 0) {
        skillsHTML = skillItems.map((item, index) => {
            let skillName = item.name || item.skill || '';
            let percent = 75;

            const match = (skillName + ' ' + (item.level || '')).match(/(\d{1,3})\s*%/);
            if (match) {
                percent = Math.min(100, Math.max(0, parseInt(match[1], 10)));
                skillName = skillName.replace(/[\(\[\{\s]?\d{1,3}\s*%[\)\]\}]?/, '').trim();
            } else {
                percent = Math.max(50, 90 - (index * 8));
            }

            return `
                <div style="margin-bottom:14px; text-align:center;">
                    <div style="font-size:10px; color:#ffffff; margin-bottom:4px; font-weight:500;">
                        ${escapeHTML(skillName)}
                    </div>
                    <div style="width:90px; height:10px; background:#f5f2eb; border-radius:5px; margin:0 auto; overflow:hidden; display:flex;">
                        <div style="width:${percent}%; background:${primaryColor}; height:100%; border-radius:5px 0 0 5px;"></div>
                        <div style="width:${100 - percent}%; background:#ffffff; height:100%;"></div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Langues dynamiques (Liaison avec script.js)
    const validLanguages = typeof getValidLanguages === 'function' ? getValidLanguages() : (d.languages || []);
    let languagesHTML = '';
    
    if (validLanguages.length > 0) {
        languagesHTML = validLanguages.map((l, idx) => {
            const langName = l.language || l.name || '';
            let percent = 80;
            if (l.level) {
                const match = l.level.match(/(\d{1,3})\s*%/);
                if (match) percent = parseInt(match[1], 10);
                else if (/natif|courant|avancé/i.test(l.level)) percent = 95;
                else if (/intermédiaire/i.test(l.level)) percent = 70;
                else percent = 45;
            } else {
                percent = 85 - (idx * 15);
            }

            return `
                <div style="margin-bottom:14px; text-align:center;">
                    <div style="font-size:10px; color:#ffffff; margin-bottom:4px; font-weight:500;">
                        ${escapeHTML(langName)}
                    </div>
                    <div style="width:90px; height:10px; background:#f5f2eb; border-radius:5px; margin:0 auto; overflow:hidden; display:flex;">
                        <div style="width:${percent}%; background:${primaryColor}; height:100%; border-radius:5px 0 0 5px;"></div>
                        <div style="width:${100 - percent}%; background:#ffffff; height:100%;"></div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Expériences professionnelles (Liaison avec script.js)
    let expHTML = '';
    const experiences = typeof getValidExperiences === 'function' ? getValidExperiences() : (d.experiences || []);
    
    if (experiences.length > 0) {
        expHTML = experiences.map(exp => {
            // Mapping des variables (job de script.js vers title du modèle, etc.)
            const title = exp.job || exp.title || '';
            const company = exp.company || '';
            const city = exp.city ? ', ' + exp.city : '';
            const period = exp.year || exp.period || '';
            
            // Les tâches sont des tableaux dans votre outil
            let descriptionHTML = '';
            if (Array.isArray(exp.tasks) && exp.tasks.length > 0) {
                descriptionHTML = exp.tasks.filter(t => t.trim() !== '').map(t => escapeHTML(t)).join('<br>');
            } else if (exp.description) {
                descriptionHTML = escapeHTML(exp.description).replace(/\n/g, '<br>');
            }

            return `
            <div style="position:relative; padding-left:18px; margin-bottom:18px;">
                <div style="position:absolute; left:-5px; top:3px; width:7px; height:7px; border-radius:50%; border:2px solid ${primaryColor}; background:#ffffff;"></div>
                <div style="font-size:11px; font-weight:bold; color:#333333; text-transform:uppercase; letter-spacing:0.5px;">
                    ${escapeHTML(title)}
                </div>
                <div style="font-size:10px; color:#666666; margin-bottom:6px; font-style:italic;">
                    ${escapeHTML(company)}${escapeHTML(city)} ${period ? '• ' + escapeHTML(period) : ''}
                </div>
                ${descriptionHTML ? `
                    <div style="font-size:9.5px; color:#444444; line-height:1.45; text-align:justify;">
                        ${descriptionHTML}
                    </div>
                ` : ''}
            </div>
            `;
        }).join('');
    }

    // Formations et Diplômes (Liaison avec script.js)
    let eduHTML = '';
    let formations = [];
    
    if (typeof getValidFormations === 'function') {
        const appFormations = getValidFormations();
        const appDiplomes = typeof getValidDiplomes === 'function' ? getValidDiplomes() : [];
        // On fusionne les diplômes et les formations pour cette section
        formations = [...appDiplomes, ...appFormations];
    } else {
        formations = d.formations || d.education || [];
    }

    if (formations.length > 0) {
        eduHTML = formations.map(edu => {
            const degree = edu.title || edu.degree || '';
            const school = edu.school || '';
            const year = edu.year || edu.period || '';
            
            return `
            <div style="margin-bottom:10px; text-align:center;">
                <div style="font-size:10px; font-weight:bold; color:#ffffff; text-transform:uppercase;">
                    ${escapeHTML(degree)}
                </div>
                <div style="font-size:9px; color:#e0e0e0;">
                    ${escapeHTML(school)} ${year ? '• ' + escapeHTML(year) : ''}
                </div>
            </div>
            `;
        }).join('');
    }

    // Centres d'intérêt (Optionnel si renseigné)
    let hobbiesHTML = '';
    const hobbies = d.hobbies || d.interests || [];
    if (hobbies.length > 0) {
        const hobbiesList = Array.isArray(hobbies) ? hobbies : String(hobbies).split(',').map(h => h.trim());
        hobbiesHTML = `
            <div style="display:flex; justify-content:center; gap:20px; flex-wrap:wrap; margin-top:8px;">
                ${hobbiesList.map(h => `
                    <div style="text-align:center;">
                        <div style="width:36px; height:36px; border-radius:50%; background:#ffffff; display:flex; align-items:center; justify-content:center; margin:0 auto 4px auto; box-shadow:0 2px 4px rgba(0,0,0,0.1); color:${primaryColor}; font-size:14px;">
                            ★
                        </div>
                        <div style="font-size:9px; color:#ffffff;">${escapeHTML(typeof h === 'object' ? h.name : h)}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    return `
        <div style="width:210mm; min-height:297mm; background:${bgLight}; font-family:'Georgia', 'Times New Roman', serif; box-sizing:border-box; margin:0 auto; overflow:hidden;">
            <table style="width:100%; border-collapse:collapse; table-layout:fixed;">
                <tr>
                    <td style="width:75mm; vertical-align:top; background:${primaryColor}; padding:0 0 20px 0;">
                        <div style="background:${bgLight}; padding-bottom:15px; text-align:center;">
                            <div style="background:${primaryColor}; padding:20px 10px 30px 10px; border-bottom-left-radius:50% 40px; border-bottom-right-radius:50% 40px; display:inline-block; width:100%; box-sizing:border-box;">
                                <div style="display:flex; justify-content:center;">${photoHTML}</div>
                            </div>
                        </div>
                        <div style="padding:10px 20px;">
                            <h3 style="font-size:12px; color:#ffffff; text-transform:uppercase; letter-spacing:1.5px; text-align:center; margin:15px 0 15px 0; font-weight:normal; border-bottom:1px solid rgba(255,255,255,0.2); padding-bottom:6px;">Compétences</h3>
                            ${skillsHTML || '<div style="font-size:9px; color:#dddddd; text-align:center;">-</div>'}
                        </div>
                        <div style="padding:10px 20px;">
                            <h3 style="font-size:12px; color:#ffffff; text-transform:uppercase; letter-spacing:1.5px; text-align:center; margin:10px 0 15px 0; font-weight:normal; border-bottom:1px solid rgba(255,255,255,0.2); padding-bottom:6px;">Langues</h3>
                            ${languagesHTML || '<div style="font-size:9px; color:#dddddd; text-align:center;">-</div>'}
                        </div>
                    </td>
                    <td style="width:135mm; vertical-align:top; background:${bgLight}; padding:0;">
                        <div style="background:#a3b1b6; padding:35px 25px 20px 25px; color:#ffffff; text-align:center;">
                            <h1 style="font-size:24px; font-weight:normal; letter-spacing:2px; text-transform:uppercase; margin:0 0 8px 0; font-family:'Georgia', serif;">${escapeHTML(d.name || 'Votre Nom')}</h1>
                            <div style="font-size:11px; text-transform:uppercase; letter-spacing:1.5px; font-weight:300; margin-bottom:20px; color:#f0f0f0;">${escapeHTML(d.summary || '')}</div>
                            <div style="display:flex; justify-content:center; gap:15px; font-size:9.5px; flex-wrap:wrap; color:#ffffff;">
                                ${d.phone ? `<div>📞 ${escapeHTML(d.phone)}</div>` : ''}
                                ${d.email ? `<div>✉ ${escapeHTML(d.email)}</div>` : ''}
                                ${d.address ? `<div>🚗 ${escapeHTML(d.address)}</div>` : ''}
                            </div>
                        </div>
                        <div style="padding:30px 25px 20px 30px;">
                            <h2 style="font-size:13px; color:${primaryColor}; text-transform:uppercase; letter-spacing:1.5px; margin:0 0 20px 0; font-weight:normal;">Expériences Professionnelles</h2>
                            <div style="border-left:1px solid #a3b1b6; padding-left:10px; margin-left:5px;">
                                ${expHTML || '<div style="font-size:10px; color:#777777;">Aucune expérience renseignée</div>'}
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
            <table style="width:100%; border-collapse:collapse; background:${primaryColor}; margin-top:20px; border-top:2px solid #ffffff;">
                <tr>
                    <td style="width:50%; vertical-align:top; padding:20px; border-right:1px solid rgba(255,255,255,0.2);">
                        <h3 style="font-size:12px; color:#ffffff; text-transform:uppercase; letter-spacing:1.5px; text-align:center; margin:0 0 12px 0; font-weight:normal;">Formation</h3>
                        ${eduHTML || '<div style="font-size:9px; color:#dddddd; text-align:center;">-</div>'}
                    </td>
                    <td style="width:50%; vertical-align:top; padding:20px;">
                        <h3 style="font-size:12px; color:#ffffff; text-transform:uppercase; letter-spacing:1.5px; text-align:center; margin:0 0 12px 0; font-weight:normal;">Centres d'intérêt</h3>
                        ${hobbiesHTML || '<div style="font-size:9px; color:#dddddd; text-align:center;">-</div>'}
                    </td>
                </tr>
            </table>
        </div>
    `;
}