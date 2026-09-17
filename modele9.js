function buildWaveRedTemplate(d){
    const primary='#8A233A';
    const cream='#F7F5F0';

    return `
        <div style="
            width:210mm;
            min-height:297mm;
            background:${cream};
            box-sizing:border-box;
            font-family:Arial,Helvetica,sans-serif;
            position:relative;">

            <!-- 1. BANDEAU AGRANDI (Passé de 95px à 135px) -->
            <div style="
                height:135px; 
                background:${primary};
                border-bottom-left-radius:90px;
                padding:35px 30px;
                box-sizing:border-box;
                color:white;">

                <div style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;">

                    <div>
                        
                        <h1 style="
                            font-size:26px;
                            text-transform:uppercase;
                            letter-spacing:1px;
                            margin:0;">
                            ${d.name}
                        </h1>

                        <div style="
                            font-size:11px;
                            margin-top:8px;
                            color:#F8E8EC;">

                            ${d.email?`✉ ${d.email}`:''}
                            ${d.phone?` &nbsp; • &nbsp; 📞 ${d.phone}`:''}

                        </div>

                    </div>

                    ${d.photoDataUrl?`
                        
                        <img
                            src="${d.photoDataUrl}"
                            style="
                                width:145px;
                                height:145px;
                                object-fit:cover;
                                border-radius:50%;
                                border:5px solid ${cream};
                                position:relative;
                                top:35px; /* Décalé de 35px vers le bas pour le chevauchement */
                                -webkit-print-color-adjust: exact; 
                                print-color-adjust: exact;">
                    `:''}

                </div>

            </div>

            <!-- 3. ESPACE SOUS LE BANDEAU -->
            <div style="
                padding:65px 30px 30px;
                box-sizing:border-box;">

                <table style="
                    width:100%;
                    border-collapse:collapse;">

                    <tr>

                        <td style="
                            width:62mm;
                            vertical-align:top;
                            padding-right:20px;
                            border-right:1px solid #D9D1C9;">

                            <h3 style="
                                font-size:11px;
                                color:${primary};
                                text-transform:uppercase;
                                letter-spacing:1px;
                                border-bottom:2px solid ${primary};
                                padding-bottom:5px;
                                margin-bottom:10px;">
                                Contact
                            </h3>

                            ${d.email?`
                                <div style="
                                    font-size:10px;
                                    margin-bottom:7px;">
                                    ${d.email}
                                </div>
                            `:''}

                            ${d.phone?`
                                <div style="
                                    font-size:10px;
                                    margin-bottom:7px;">
                                    ${d.phone}
                                </div>
                            `:''}

                            ${d.address?`
                                <div style="
                                    font-size:10px;
                                    margin-bottom:7px;">
                                    ${d.address}
                                </div>
                            `:''}

                            ${d.birthdate?`
                                <div style="
                                    font-size:10px;
                                    margin-bottom:7px;">
                                    ${d.birthdate}
                                </div>
                            `:''}

                            ${d.skillsList.length?`
                                <div style="margin-top:22px;">

                                    <h3 style="
                                        font-size:11px;
                                        color:${primary};
                                        text-transform:uppercase;
                                        letter-spacing:1px;
                                        border-bottom:2px solid ${primary};
                                        padding-bottom:5px;
                                        margin-bottom:10px;">
                                        Compétences
                                    </h3>

                                    ${d.skillsList.map(s=>`
                                        <div style="
                                            font-size:10px;
                                            margin-bottom:6px;">
                                            • ${escapeHTML(s)}
                                        </div>
                                    `).join('')}

                                </div>
                            `:''}

                            ${getValidLanguages().length?`
                                <div style="margin-top:22px;">

                                    <h3 style="
                                        font-size:11px;
                                        color:${primary};
                                        text-transform:uppercase;
                                        letter-spacing:1px;
                                        border-bottom:2px solid ${primary};
                                        padding-bottom:5px;
                                        margin-bottom:10px;">
                                        Langues
                                    </h3>

                                    ${getValidLanguages().map(l=>`
                                        <div style="
                                            font-size:10px;
                                            margin-bottom:6px;">
                                            <strong>
                                                ${escapeHTML(l.language)}
                                            </strong>

                                            ${l.level
                                                ?`<br><span style="color:#64748b;">
                                                    ${escapeHTML(l.level)}
                                                </span>`
                                                :''
                                            }
                                        </div>
                                    `).join('')}

                                </div>
                            `:''}

                        </td>

                        <td style="
                            width:148mm;
                            vertical-align:top;
                            padding-left:25px;">

                            ${d.summary?`
                                <div style="margin-bottom:22px;">

                                    <h2 style="
                                        color:${primary};
                                        font-size:14px;
                                        text-transform:uppercase;
                                        letter-spacing:.7px;
                                        margin:0 0 8px;">
                                        Profil professionnel
                                    </h2>

                                    <p style="
                                        font-size:10.5px;
                                        line-height:1.55;
                                        color:#374151;
                                        margin:0;
                                        text-align:justify;">
                                        ${d.summary}
                                    </p>

                                </div>
                            `:''}
                            
                            ${buildDiplomesSection('#3b5998')}

                            ${buildExperiencesSection(primary)}
                            ${buildFormationsSection(primary)}

                        </td>

                    </tr>

                </table>

            </div>

        </div>
    `;
}