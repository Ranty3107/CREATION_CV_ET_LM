function buildSidebarBlueTemplate(d){
    const primary='#4F65F1';
    const dark='#172554';

    return `
        <table
            class="cv-full-height-table"
            style="
                width:210mm;
                height:297mm;
                background:white;
                font-family:Arial,Helvetica,sans-serif;
                border-collapse:collapse;
                table-layout:fixed;">

            <tr style="height:297mm;">

                <td style="
                    width:65mm;
                    height:297mm;
                    vertical-align:top;
                    background:${primary};
                    color:white;
                    padding:28px 18px;
                    box-sizing:border-box;
                    -webkit-print-color-adjust: exact; 
                    print-color-adjust: exact;">

                    <div style="
                        width:100%;
                        text-align:center;
                        margin:0 0 25px 0;
                        padding:0;">

                        ${d.photoDataUrl?`
                            <!-- PHOTO AGRANDIE (Passée à 160px et retrait du max-width limitant) -->
                            <img
                                src="${d.photoDataUrl}"
                                style="
                                    display:block;
                                    width:160px;
                                    height:160px;
                                    object-fit:cover;
                                    border-radius:50%;
                                    border:4px solid white;
                                    box-sizing:border-box;
                                    margin:0 auto 15px auto;
                                    padding:0;
                                    -webkit-print-color-adjust: exact; 
                                    print-color-adjust: exact;">
                        `:`
                            <!-- ICÔNE DE REMPLACEMENT AGRANDIE (Pour correspondre à la taille de 160px) -->
                            <div style="
                                width:160px;
                                height:160px;
                                border-radius:50%;
                                background:rgba(255,255,255,.2);
                                display:flex;
                                align-items:center;
                                justify-content:center;
                                margin:0 auto 15px auto;
                                padding:0;
                                box-sizing:border-box;
                                font-size:45px;
                                -webkit-print-color-adjust: exact; 
                                print-color-adjust: exact;">
                                📷
                            </div>
                        `}

                        <h1 style="
                            font-size:16px;
                            line-height:1.3;
                            text-transform:uppercase;
                            margin:0;
                            padding:0;
                            font-weight:bold;
                            text-align:center;">
                            ${escapeHTML(d.name)}
                        </h1>

                    </div>

                    <h3 style="
                        font-size:10px;
                        text-transform:uppercase;
                        letter-spacing:1px;
                        border-bottom:1px solid rgba(255,255,255,.4);
                        padding:0 0 5px 0;
                        margin:0 0 10px 0;">
                        Contact
                    </h3>

                    ${d.email?`
                        <div style="
                            font-size:9.8px;
                            margin-bottom:8px;
                            word-break:break-word;">
                            ✉ ${escapeHTML(d.email)}
                        </div>
                    `:''}

                    ${d.phone?`
                        <div style="
                            font-size:9.8px;
                            margin-bottom:8px;">
                            ☎ ${escapeHTML(d.phone)}
                        </div>
                    `:''}

                    ${d.address?`
                        <div style="
                            font-size:9.8px;
                            margin-bottom:8px;
                            word-break:break-word;">
                            ⌂ ${escapeHTML(d.address)}
                        </div>
                    `:''}

                    ${d.birthdate?`
                        <div style="
                            font-size:9.8px;
                            margin-bottom:8px;">
                            ● ${escapeHTML(d.birthdate)}
                        </div>
                    `:''}

                    <div style="margin-top:22px;">

                        <h3 style="
                            font-size:10px;
                            text-transform:uppercase;
                            letter-spacing:1px;
                            border-bottom:1px solid rgba(255,255,255,.4);
                            padding:0 0 5px 0;
                            margin:0 0 10px 0;">
                            Compétences
                        </h3>

                        ${d.skillsList.length
                            ?d.skillsList.map(s=>`
                                <div style="
                                    font-size:9.8px;
                                    margin-bottom:6px;">
                                    • ${escapeHTML(s)}
                                </div>
                            `).join('')
                            :'<div style="font-size:9px;">Aucune</div>'
                        }

                    </div>

                    ${getValidLanguages().length?`
                        <div style="margin-top:22px;">

                            <h3 style="
                                font-size:10px;
                                text-transform:uppercase;
                                letter-spacing:1px;
                                border-bottom:1px solid rgba(255,255,255,.4);
                                padding:0 0 5px 0;
                                margin:0 0 10px 0;">
                                Langues
                            </h3>

                            ${getValidLanguages().map(l=>`
                                <div style="
                                    font-size:9.8px;
                                    margin-bottom:6px;">
                                    <strong>
                                        ${escapeHTML(l.language)}
                                    </strong>
                                    ${l.level
                                        ?` — ${escapeHTML(l.level)}`
                                        :''
                                    }
                                </div>
                            `).join('')}

                        </div>
                    `:''}

                </td>

                <td style="
                    width:145mm;
                    height:297mm;
                    vertical-align:top;
                    padding:30px;
                    background:white;
                    box-sizing:border-box;">

                    ${d.summary?`
                        <div style="
                            border-left:5px solid ${primary};
                            padding-left:12px;
                            margin-bottom:22px;">

                            <h2 style="
                                font-size:14px;
                                color:${dark};
                                text-transform:uppercase;
                                margin:0 0 8px 0;">
                                Profil
                            </h2>

                            <p style="
                                font-size:10.5px;
                                line-height:1.55;
                                margin:0;
                                color:#475569;">
                               ${escapeHTML(d.summary || '')
.replace(/&(amp;)?(#0?39|apos);/gi, "'")
    .replace(/&lt;br\s*\/?&gt;/gi, "<br>")}
                            </p>

                        </div>
                    `:''}
                    <div style="
                        border-left:5px solid ${primary};
                        padding-left:12px;">

                        ${buildDiplomesSection('#3b5998')}

                    </div>

                    <div style="
                        border-left:5px solid ${primary};
                        padding-left:12px;
                        margin-bottom:22px;">

                        ${buildExperiencesSection(dark)}

                    </div>

                    <div style="
                        border-left:5px solid ${primary};
                        padding-left:12px;">

                        ${buildFormationsSection(dark)}

                    </div>

                </td>

            </tr>

        </table>
    `;
}
