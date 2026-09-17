function buildModernBlueTemplate(d){
    const primary='#263F5B';
    const accent='#3B82A0';

    const photoHTML=d.photoDataUrl
        ?`
            <img
                src="${d.photoDataUrl}"
                style="
                    width:135px;
                    height:135px;
                    object-fit:cover;
                    border-radius:50%;
                    border:5px solid white;
                    box-shadow:0 3px 8px rgba(0,0,0,.18);">
        `
        :`
            <div style="
                width:135px;
                height:135px;
                border-radius:50%;
                background:#D9E2E8;
                border:5px solid white;
                display:flex;
                align-items:center;
                justify-content:center;
                font-size:30px;">
                📷
            </div>
        `;

    const validF=getValidFormations();
    const validD=getValidDiplomes ? getValidDiplomes() : []; // Récupération des diplômes valides
    const validE=getValidExperiences();
    const validL=getValidLanguages();

    return `
        <table
            class="cv-full-height-table"
            style="
                width:210mm;
                height:297mm;
                background:white;">

            <tr style="height:297mm;">

                <td style="
                    width:72mm;
                    height:297mm;
                    padding:0;
                    vertical-align:top;
                    background:${primary};
                    color:white;">

                    <div style="
                        padding:28px 20px 24px;
                        text-align:center;">

                        <div style="
                            display:flex;
                            justify-content:center;
                            margin-bottom:15px;">
                            ${photoHTML}
                        </div>

                        <div style="
                            font-size:17px;
                            font-weight:700;
                            text-transform:uppercase;
                            letter-spacing:.7px;">
                            ${d.firstName}
                        </div>

                        <div style="
                            font-size:15px;
                            text-transform:uppercase;
                            letter-spacing:1px;
                            color:#D9E8EF;
                            margin-top:3px;">
                            ${d.lastName}
                        </div>

                        <div style="
                            height:2px;
                            width:42px;
                            background:${accent};
                            margin:14px auto 0;">
                        </div>

                    </div>

                    <div style="padding:0 20px 30px;">

                        <h3 style="
                            font-size:11px;
                            text-transform:uppercase;
                            letter-spacing:1px;
                            border-bottom:1px solid rgba(255,255,255,.3);
                            padding-bottom:6px;
                            margin-bottom:12px;">
                            Contact
                        </h3>

                        ${d.email?`
                            <div style="
                                font-size:10.5px;
                                margin-bottom:9px;
                                word-break:break-word;">
                                <span style="color:#8FC4D7;">✉</span>
                                ${d.email}
                            </div>
                        `:''}

                        ${d.phone?`
                            <div style="
                                font-size:10.5px;
                                margin-bottom:9px;">
                                <span style="color:#8FC4D7;">☎</span>
                                ${d.phone}
                            </div>
                        `:''}

                        ${d.address?`
                            <div style="
                                font-size:10.5px;
                                margin-bottom:9px;">
                                <span style="color:#8FC4D7;">⌂</span>
                                ${d.address}
                            </div>
                        `:''}

                        ${d.birthdate?`
                            <div style="
                                font-size:10.5px;
                                margin-bottom:9px;">
                                <span style="color:#8FC4D7;">●</span>
                                ${d.birthdate}
                            </div>
                        `:''}

                        ${d.skillsList.length?`
                            <div style="margin-top:22px;">

                                <h3 style="
                                    font-size:11px;
                                    text-transform:uppercase;
                                    letter-spacing:1px;
                                    border-bottom:1px solid rgba(255,255,255,.3);
                                    padding-bottom:6px;
                                    margin-bottom:10px;">
                                    Compétences
                                </h3>

                                ${d.skillsList.map(skill=>`
                                    <div style="
                                        font-size:10.5px;
                                        margin-bottom:6px;">
                                        <span style="color:#8FC4D7;">•</span>
                                        ${escapeHTML(skill)}
                                    </div>
                                `).join('')}

                            </div>
                        `:''}

                        ${validL.length?`
                            <div style="margin-top:22px;">

                                <h3 style="
                                    font-size:11px;
                                    text-transform:uppercase;
                                    letter-spacing:1px;
                                    border-bottom:1px solid rgba(255,255,255,.3);
                                    padding-bottom:6px;
                                    margin-bottom:10px;">
                                    Langues
                                </h3>

                                ${validL.map(lang=>`
                                    <div style="
                                        font-size:10.5px;
                                        margin-bottom:7px;">
                                        <strong>
                                            ${escapeHTML(lang.language)}
                                        </strong>
                                        ${lang.level?`
                                            <span style="color:#BBD3DC;">
                                                — ${escapeHTML(lang.level)}
                                            </span>
                                        `:''}
                                    </div>
                                `).join('')}

                            </div>
                        `:''}

                    </div>

                </td>

                <td style="
                    width:138mm;
                    height:297mm;
                    padding:34px 30px;
                    vertical-align:top;
                    background:white;">

                    ${d.summary?`
                        <div style="margin-bottom:21px;">

                            <div style="
                                display:flex;
                                align-items:center;
                                gap:9px;
                                margin-bottom:9px;">

                                <span style="
                                    width:5px;
                                    height:20px;
                                    background:${accent};
                                    display:block;">
                                </span>

                                <h2 style="
                                    font-size:13px;
                                    color:${primary};
                                    text-transform:uppercase;
                                    letter-spacing:.7px;
                                    margin:0;">
                                    Profil
                                </h2>

                            </div>

                            <p style="
                                font-size:10.8px;
                                line-height:1.55;
                                color:#374151;
                                margin:0;
                                text-align:justify;">
                                ${d.summary}
                            </p>

                        </div>
                    `:''}

                    ${validE.length?`
                        <div style="margin-bottom:21px;">

                            <div style="
                                display:flex;
                                align-items:center;
                                gap:9px;
                                margin-bottom:10px;">

                                <span style="
                                    width:5px;
                                    height:20px;
                                    background:${accent};
                                    display:block;">
                                </span>

                                <h2 style="
                                    font-size:13px;
                                    color:${primary};
                                    text-transform:uppercase;
                                    letter-spacing:.7px;
                                    margin:0;">
                                    Expérience professionnelle
                                </h2>

                            </div>

                            ${validE.map(e=>`
                                <div style="
                                    margin-bottom:14px;
                                    break-inside:avoid;
                                    page-break-inside:avoid;">

                                    <div style="
                                        display:flex;
                                        justify-content:space-between;
                                        gap:10px;">

                                        <strong style="
                                            font-size:11.5px;
                                            color:${primary};">
                                            ${escapeHTML(e.job)}
                                        </strong>

                                        <span style="
                                            font-size:10px;
                                            color:${accent};
                                            white-space:nowrap;">
                                            ${escapeHTML(e.year)}
                                        </span>

                                    </div>

                                    <div style="
                                        font-size:10.5px;
                                        color:${accent};
                                        margin-top:2px;">
                                        ${escapeHTML(e.company)}
                                    </div>

                                     ${(e.tasks||[]).filter(t=>t.trim()).length?`
                                        <ul style="
                                            margin:5px 0 0;
                                            padding-left:16px;">

                                            ${(e.tasks||[])
                                                .filter(t=>t.trim())
                                                .map(t=>`
                                                    <li style="
                                                        font-size:10.2px;
                                                        line-height:1.4;
                                                        margin-bottom:2px;">
                                                        ${escapeHTML(t)}
                                                    </li>
                                                `).join('')}

                                        </ul>
                                    `:''}

                                </div>
                            `).join('')}

                        </div>
                    `:''}

                    <!-- SECTION DIPLÔMES AJOUTÉE ICI (AU-DESSUS DE LA FORMATION) -->
                    ${validD.length?`
                        <div style="margin-bottom:21px;">

                            <div style="
                                display:flex;
                                align-items:center;
                                gap:9px;
                                margin-bottom:10px;">

                                <span style="
                                    width:5px;
                                    height:20px;
                                    background:${accent};
                                    display:block;">
                                </span>

                                <h2 style="
                                    font-size:13px;
                                    color:${primary};
                                    text-transform:uppercase;
                                    letter-spacing:.7px;
                                    margin:0;">
                                    Diplômes
                                </h2>

                            </div>

                            ${validD.map(dip=>`
                                <div style="
                                    margin-bottom:10px;
                                    break-inside:avoid;
                                    page-break-inside:avoid;">

                                    <div style="
                                        display:flex;
                                        justify-content:space-between;
                                        gap:10px;">

                                        <strong style="
                                            font-size:11px;
                                            color:${primary};">
                                            ${escapeHTML(dip.title)}
                                        </strong>

                                        <span style="
                                            font-size:10px;
                                            color:${accent};
                                            white-space:nowrap;">
                                            ${escapeHTML(dip.year)}
                                        </span>

                                    </div>

                                    <div style="
                                        font-size:10.3px;
                                        color:#555;
                                        margin-top:2px;">
                                        ${escapeHTML(dip.school)}
                                    </div>

                                </div>
                            `).join('')}

                        </div>
                    `:''}

                    ${validF.length?`
                        <div style="margin-bottom:21px;">

                            <div style="
                                display:flex;
                                align-items:center;
                                gap:9px;
                                margin-bottom:10px;">

                                <span style="
                                    width:5px;
                                    height:20px;
                                    background:${accent};
                                    display:block;">
                                </span>

                                <h2 style="
                                    font-size:13px;
                                    color:${primary};
                                    text-transform:uppercase;
                                    letter-spacing:.7px;
                                    margin:0;">
                                    Formation
                                </h2>

                            </div>

                            ${validF.map(f=>`
                                <div style="
                                    margin-bottom:10px;
                                    break-inside:avoid;
                                    page-break-inside:avoid;">

                                    <div style="
                                        display:flex;
                                        justify-content:space-between;
                                        gap:10px;">

                                        <strong style="
                                            font-size:11px;
                                            color:${primary};">
                                            ${escapeHTML(f.title)}
                                        </strong>

                                        <span style="
                                            font-size:10px;
                                            color:${accent};
                                            white-space:nowrap;">
                                            ${escapeHTML(f.year)}
                                        </span>

                                    </div>

                                    <div style="
                                        font-size:10.3px;
                                        color:#555;
                                        margin-top:2px;">
                                        ${escapeHTML(f.school)}
                                    </div>

                                </div>
                            `).join('')}

                        </div>
                    `:''}

                </td>

            </tr>

        </table>
    `;
}
