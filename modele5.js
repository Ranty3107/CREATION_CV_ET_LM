function buildDarkSidebarTemplate(d){
    const primary='#1abc9c';
    const dark='#2c3e50';

    const photoHTML=d.photoDataUrl
        ?`
            <img
                src="${d.photoDataUrl}"
                style="
                    width:135px;
                    height:135px;
                    object-fit:cover;
                    border-radius:50%;
                    border:3px solid ${primary};
                    margin:0 auto 15px;
                    display:block;">
        `
        :'';

    return `
        <table
            class="cv-full-height-table"
            style="
                width:210mm;
                height:297mm;
                background:white;">

            <tr style="height:297mm;">

                <td style="
                    width:70mm;
                    height:297mm;
                    background:${dark};
                    color:white;
                    vertical-align:top;
                    padding:25px 20px;">

                    ${photoHTML}

                    <h2 style="
                        font-size:16px;
                        font-weight:bold;
                        text-align:center;
                        margin-bottom:15px;
                        color:white;">
                        ${d.name}
                    </h2>

                    <div style="
                        font-size:11px;
                        margin-bottom:20px;
                        color:#ecf0f1;">

                        ${d.email?`<div style="margin-bottom:6px;">✉ ${d.email}</div>`:''}
                        ${d.phone?`<div style="margin-bottom:6px;">📞 ${d.phone}</div>`:''}
                        ${d.birthdate?`<div style="margin-bottom:6px;">📅 ${d.birthdate}</div>`:''}
                        ${d.address?`<div style="margin-bottom:6px;">📍 ${d.address}</div>`:''}

                    </div>

                    ${buildSkillsSection(d.skillsRaw,primary,'#ecf0f1')}
                    ${buildLanguagesSection(primary,'#ecf0f1')}

                </td>

                <td style="
                    width:140mm;
                    height:297mm;
                    vertical-align:top;
                    padding:30px;
                    background:white;">

                    ${buildProfileSection(d.summary,dark)}
                    ${buildDiplomesSection('#3b5998')}
                    ${buildFormationsSection(dark)}
                    ${buildExperiencesSection(dark)}

                </td>

            </tr>

        </table>
    `;
}
