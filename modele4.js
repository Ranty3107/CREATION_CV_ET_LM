function buildHeaderCenterTemplate(d){
    const color='#2c3e50';

    const photoHTML=d.photoDataUrl
        ?`
            <img
                src="${d.photoDataUrl}"
                style="
                    width:135px;
                    height:135px;
                    object-fit:cover;
                    border-radius:50%;
                    border:3px solid #fff;
                    box-shadow:0 2px 5px rgba(0,0,0,.1);
                    margin:0 auto 12px;
                    display:block;">
        `
        :'';

    return `
        <div style="
            width:210mm;
            min-height:297mm;
            padding:30px;
            background:white;
            box-sizing:border-box;
            font-family:Arial,Helvetica,sans-serif;">

            ${photoHTML}

            <div style="
                text-align:center;
                border-bottom:1px solid #e2e8f0;
                padding-bottom:25px;
                margin-bottom:35px;">

                <h1 style="
                    font-size:22px;
                    font-weight:bold;
                    color:${color};
                    margin:0 0 6px;
                    text-transform:uppercase;
                    letter-spacing:1px;">
                    ${d.name}
                </h1>

                <div style="
                    font-size:11px;
                    color:#666;
                    display:flex;
                    justify-content:center;
                    flex-wrap:wrap;
                    gap:15px;">

                    ${d.email?`<span>✉ ${d.email}</span>`:''}
                    ${d.phone?`<span>📞 ${d.phone}</span>`:''}
                    ${d.birthdate?`<span>📅 ${d.birthdate}</span>`:''}
                    ${d.address?`<span>📍 ${d.address.replace(/<br>/g,', ')}</span>`:''}

                </div>

            </div>

            ${buildProfileSection(d.summary,color)}
            ${buildDiplomesSection('#3b5998')}
            ${buildFormationsSection(color)}
            ${buildExperiencesSection(color)}
            ${buildSkillsSection(d.skillsRaw,color)}
            ${buildLanguagesSection(color)}

        </div>
    `;
}
