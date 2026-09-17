function buildModele10Template(d) {
    const primaryColor = (typeof selectedCVColor !== 'undefined' ? selectedCVColor : null)
                        || (typeof getActiveColor === 'function' ? getActiveColor() : null) 
                        || document.documentElement.style.getPropertyValue('--primary-color') 
                        || '#f59e0b';

    const iconStyle = `width:14px;height:14px;min-width:14px;min-height:14px;color:${primaryColor};fill:currentColor;margin-top:2px;flex-shrink:0;display:inline-block;vertical-align:middle;`;
    const icons = getIcons(iconStyle);

    const photoHTML = d.photoDataUrl
        ? `
            <img
                src="${d.photoDataUrl}"
                alt="Photo du candidat"
                style="
                    width:135px;
                    height:135px;
                    object-fit:cover;
                    border-radius:50%;
                    border:4px solid ${primaryColor};
                    box-shadow:0 4px 6px rgba(0,0,0,.2);">
        `
        : `
            <div style="
                width:135px;
                height:135px;
                border-radius:50%;
                background:#334155;
                display:flex;
                align-items:center;
                justify-content:center;
                font-size:32px;
                border:4px solid ${primaryColor};
                color:#94a3b8;">
                📷
            </div>
        `;

    // 1. Analyse dynamique des compétences avec extraction automatique du pourcentage (ex: "Word (90%)" ou "Excel - 80%")
    let skillsHTML = '';
    const skillsArray = Array.isArray(d.skills) ? d.skills : (d.skillsList || []);
    
    // Si l'utilisateur saisit via un tableau structuré ou une liste brute
    let rawItems = [];
    if (skillsArray.length > 0) {
        rawItems = skillsArray.map(s => typeof s === 'object' ? (s.name || s.skill || '') + (s.level ? ' ' + s.level : '') : s);
    } else if (d.skillsRaw) {
        rawItems = d.skillsRaw.split(',').map(s => s.trim()).filter(Boolean);
    }

    if (rawItems.length > 0) {
        skillsHTML = rawItems.map((item, index) => {
            let skillName = item;
            let numericPercent = 80; // Valeur par défaut si aucun pourcentage n'est spécifié

            // Cherche un motif de pourcentage dans le texte (ex: "80%", "100", etc.)
            const match = item.match(/(\d{1,3})\s*%/);
            if (match) {
                numericPercent = Math.min(100, Math.max(0, parseInt(match[1], 10)));
                // Nettoie le nom de la compétence en retirant le pourcentage du texte affiché si souhaité
                skillName = item.replace(/[\(\[\{\s]?\d{1,3}\s*%[\)\]\}]?/, '').trim();
            } else {
                // Si pas de pourcentage explicite, attribue un pourcentage dégressif modifiable
                numericPercent = Math.max(50, 95 - (index * 8));
            }

            return `
                <div style="margin-bottom:10px; font-size:10.5px;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:3px; color:#e2e8f0;">
                        <span>${escapeHTML(skillName)}</span>
                        <span style="color:#94a3b8; font-size:9px;">${numericPercent}%</span>
                    </div>
                    <div style="width:100%; background:#374151; height:4px; border-radius:2px; overflow:hidden;">
                        <div style="width:${numericPercent}%; background:${primaryColor}; height:100%;"></div>
                    </div>
                </div>
            `;
        }).join('');
    } else {
        skillsHTML = `<div style="font-size:10.5px; color:#94a3b8; font-style:italic;">Aucune compétence</div>`;
    }

    // 2. Gestion des langues (identique au modèle 9)
    const validLanguages = typeof getValidLanguages === 'function' ? getValidLanguages() : (d.languages || []);
    let languagesHTML = '';
    if (validLanguages.length > 0) {
        languagesHTML = validLanguages.map(l => `
            <div style="font-size:10.5px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center;">
                <strong style="color:#e2e8f0;">${escapeHTML(l.language || l.name || '')}</strong>
                ${l.level ? `<span style="color:#94a3b8; font-size:9.5px;">${escapeHTML(l.level)}</span>` : ''}
            </div>
        `).join('');
    } else {
        languagesHTML = `<div style="font-size:10.5px; color:#94a3b8; font-style:italic;">Aucune langue renseignée</div>`;
    }

    return `
        <table class="cv-full-height-table" style="background:#1e293b; width:210mm; border-collapse:collapse; margin:0 auto;">
            <tr>
                <!-- COLONNE LATÉRALE GAUCHE -->
                <td style="width:75mm; background:#111827; vertical-align:top; padding:0; color:#e2e8f0;">
                    
                    <div style="background:${primaryColor}; padding:25px 20px 35px 20px; text-align:center; border-bottom-right-radius:40px;">
                        <div style="display:flex; justify-content:center;">
                            ${photoHTML}
                        </div>
                    </div>

                    <div style="padding:25px 20px;">
                        
                        <!-- Contact -->
                        <div style="margin-bottom:25px;">
                            <h3 style="font-size:11px; color:${primaryColor}; text-transform:uppercase; letter-spacing:1px; border-bottom:1px solid #374151; padding-bottom:5px; margin-bottom:12px; font-weight:bold;">
                                Contact
                            </h3>
                            <div style="font-size:10.5px; color:#cbd5e1;">
                                ${d.phone ? `
                                    <div style="display:flex; gap:8px; margin-bottom:8px; align-items:center;">
                                        ${icons.phone}
                                        <span>${escapeHTML(d.phone)}</span>
                                    </div>
                                ` : ''}
                                ${d.email ? `
                                    <div style="display:flex; gap:8px; margin-bottom:8px; align-items:center;">
                                        ${icons.email}
                                        <span style="word-break:break-all;">${escapeHTML(d.email)}</span>
                                    </div>
                                ` : ''}
                                ${d.address ? `
                                    <div style="display:flex; gap:8px; margin-bottom:8px; align-items:center;">
                                        ${icons.home}
                                        <span>${escapeHTML(d.address)}</span>
                                    </div>
                                ` : ''}
                            </div>
                        </div>

                        <!-- Pro Skills (Barres de progression pilotées par le niveau saisi) -->
                        <div style="margin-bottom:25px;">
                            <h3 style="font-size:11px; color:${primaryColor}; text-transform:uppercase; letter-spacing:1px; border-bottom:1px solid #374151; padding-bottom:5px; margin-bottom:12px; font-weight:bold;">
                                Pro Skills
                            </h3>
                            ${skillsHTML}
                        </div>

                        <!-- Langues -->
                        <div>
                            <h3 style="font-size:11px; color:${primaryColor}; text-transform:uppercase; letter-spacing:1px; border-bottom:1px solid #374151; padding-bottom:5px; margin-bottom:12px; font-weight:bold;">
                                Langues
                            </h3>
                            <div>
                                ${languagesHTML}
                            </div>
                        </div>

                    </div>
                </td>

                <!-- COLONNE PRINCIPALE DROITE -->
                <td style="width:135mm; vertical-align:top; background:#ffffff; padding:0;">
                    
                    <!-- En-tête du nom -->
                    <div style="background:#1e293b; color:white; padding:30px 35px 25px 35px; border-bottom:3px solid ${primaryColor};">
                        <h1 style="font-size:20px; font-weight:900; color:${primaryColor}; margin:0 0 5px 0; text-transform:uppercase; letter-spacing:1px;">
                            ${formatHeaderName(d.name || '')}
                        </h1>
                        <p style="font-size:10px; color:#94a3b8; margin:0; text-transform:uppercase; letter-spacing:2px; font-weight:600;">
                            ${escapeHTML(d.jobTitle || '')}
                        </p>
                    </div>

                    <!-- Corps de texte -->
                    <div style="padding:30px 35px;">
                        ${typeof buildProfileSection === 'function' ? buildProfileSection(d.summary, primaryColor) : ''}
                        ${typeof buildDiplomesSection === 'function' ? buildDiplomesSection(primaryColor) : ''}
                        ${typeof buildFormationsSection === 'function' ? buildFormationsSection(primaryColor) : ''}
                        ${typeof buildExperiencesSection === 'function' ? buildExperiencesSection(primaryColor) : ''}
                    </div>

                </td>
            </tr>
        </table>
    `;
}