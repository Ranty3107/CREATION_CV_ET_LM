function buildBannerTemplate(d){
    const photoHTML=d.photoDataUrl
        ?`
            <img
                src="${d.photoDataUrl}"
                style="
                    width:135px;
                    height:135px;
                    object-fit:cover;
                    border-radius:8px;
                    border:3px solid white;">
        `
        :`
            <div style="
                width:135px;
                height:135px;
                background:#e2e8f0;
                border-radius:8px;
                display:flex;
                align-items:center;
                justify-content:center;
                border:3px solid white;">
                📷
            </div>
        `;

    return `
        <div style="
            width:210mm;
            min-height:297mm;
            background:white;
            box-sizing:border-box;">

            <div style="
                background:#2b5b6c;
                color:white;
                padding:25px 30px;
                display:flex;
                align-items:center;
                gap:20px;">

                ${photoHTML}

                <div style="flex-grow:1;">

                    <h1 style="
                        font-size:22px;
                        font-weight:bold;
                        margin:0 0 6px;
                        text-transform:uppercase;
                        letter-spacing:1px;">
                        ${d.name}
                    </h1>

                    <div style="
                        font-size:11px;
                        color:#e2e8f0;
                        display:flex;
                        flex-wrap:wrap;
                        gap:12px;">

                        ${d.email?`<span>✉ ${d.email}</span>`:''}
                        ${d.phone?`<span>📞 ${d.phone}</span>`:''}
                        ${d.birthdate?`<span>📅 ${d.birthdate}</span>`:''}
                        ${d.address?`<span>📍 ${d.address.replace(/<br>/g,', ')}</span>`:''}

                    </div>

                </div>

            </div>

            <table style="
                width:210mm;
                min-height:250mm;
                border-collapse:collapse;
                table-layout:fixed;">

                <tr>

                    <td style="
                        width:70mm;
                        vertical-align:top;
                        padding:25px 20px;
                        background:#f8fafc;
                        border-right:1px solid #e2e8f0;">

                        ${buildSkillsSection(d.skillsRaw,'#2b5b6c')}
                        ${buildLanguagesSection('#2b5b6c')}

                    </td>

                    <td style="
                        width:140mm;
                        vertical-align:top;
                        padding:25px;">

                        ${buildProfileSection(d.summary,'#2b5b6c')}
                        ${buildDiplomesSection('#3b5998')}
                        ${buildFormationsSection('#2b5b6c')}
                        ${buildExperiencesSection('#2b5b6c')}

                    </td>

                </tr>

            </table>

        </div>
    `;
}
