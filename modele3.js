function buildMinimalistTemplate(d){
    const primary='#856404';

    const photoHTML=d.photoDataUrl
        ?`
            <img
                src="${d.photoDataUrl}"
                style="
                    width:135px;
                    height:135px;
                    object-fit:cover;
                    border-radius:4px;
                    border:1px solid #ddd;">
        `
        :'';

    return `
        <div style="
            width:210mm;
            min-height:297mm;
            padding:25px 30px;
            background:white;
            box-sizing:border-box;">

            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                border-bottom:2px solid ${primary};
                padding-bottom:25px;
                margin-bottom:30px;">

                <div>

                    <h1 style="
                        font-size:24px;
                        font-weight:bold;
                        color:#222;
                        margin:0 0 5px;
                        text-transform:uppercase;">
                        ${d.name}
                    </h1>

                    <div style="
                        font-size:11px;
                        color:#555;
                        display:flex;
                        flex-wrap:wrap;
                        gap:10px;">

                        ${d.email?`<span>${d.email}</span>`:''}
                        ${d.phone?`<span>| ${d.phone}</span>`:''}
                        ${d.birthdate?`<span>| ${d.birthdate}</span>`:''}
                        ${d.address?`<span>| ${d.address.replace(/<br>/g,', ')}</span>`:''}

                    </div>

                </div>

                ${photoHTML}

            </div>

            ${buildProfileSection(d.summary,primary)}

            <table style="
                width:100%;
                border-collapse:collapse;
                table-layout:fixed;">

                <tr>

                    <td style="
                        width:65%;
                        vertical-align:top;
                        padding-right:15px;">

                        ${buildExperiencesSection(primary)}

                    </td>

                    <td style="
                        width:35%;
                        vertical-align:top;
                        border-left:1px solid #eee;
                        padding-left:15px;">
                        ${buildDiplomesSection('#3b5998')}
                        ${buildFormationsSection(primary)}
                        ${buildSkillsSection(d.skillsRaw,primary)}
                        ${buildLanguagesSection(primary)}

                    </td>

                </tr>

            </table>

        </div>
    `;
}
