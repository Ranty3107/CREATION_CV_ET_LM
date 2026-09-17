function buildBannerBlueTemplate(d){
    const primary='#5B6C9B';
    const light='#EEF1F8';

    return `
        <div style="
            width:210mm;
            min-height:297mm;
            background:white;
            box-sizing:border-box;
            font-family:Arial,Helvetica,sans-serif;">

            <div style="
                background:${primary};
                color:white;
                padding:25px 30px;">

                <div style="
                    display:flex;
                    align-items:center;
                    gap:20px;">

                    ${d.photoDataUrl?`
                        <img
                            src="${d.photoDataUrl}"
                            style="
                                width:135px;
                                height:135px;
                                object-fit:cover;
                                border-radius:50%;
                                border:4px solid rgba(255,255,255,.8);">
                    `:`
                        <div style="
                            width:90px;
                            height:90px;
                            border-radius:50%;
                            background:rgba(255,255,255,.2);
                            display:flex;
                            align-items:center;
                            justify-content:center;
                            font-size:28px;">
                            📷
                        </div>
                    `}

                    <div style="flex:1;">

                        <h1 style="
                            font-size:23px;
                            margin:0;
                            text-transform:uppercase;
                            letter-spacing:1px;">
                            ${d.name}
                        </h1>

                        <div style="
                            height:2px;
                            width:50px;
                            background:white;
                            margin:10px 0;">
                        </div>

                        <div style="
                            font-size:10.5px;
                            display:flex;
                            flex-wrap:wrap;
                            gap:10px;
                            color:#F4F6FB;">

                            ${d.email?`<span>✉ ${d.email}</span>`:''}
                            ${d.phone?`<span>📞 ${d.phone}</span>`:''}
                            ${d.birthdate?`<span>📅 ${d.birthdate}</span>`:''}

                        </div>

                    </div>

                </div>

            </div>

            <div style="
                display:flex;
                min-height:245mm;">

                <div style="
                    width:65mm;
                    background:${light};
                    padding:25px 18px;
                    box-sizing:border-box;">

                    ${buildSkillsSection(d.skillsRaw,primary)}
                    ${buildLanguagesSection(primary)}

                    ${d.address?`
                        <div style="
                            font-size:10px;
                            color:#475569;
                            margin-top:15px;">
                            <strong style="color:${primary};">
                                Adresse
                            </strong>

                            <div style="margin-top:5px;">
                                ${d.address}
                            </div>
                        </div>
                    `:''}

                </div>

                <div style="
                    width:145mm;
                    padding:25px 28px;
                    box-sizing:border-box;">

                    ${buildProfileSection(d.summary,primary)}
                    ${buildDiplomesSection('#3b5998')}
                    ${buildExperiencesSection(primary)}
                    ${buildFormationsSection(primary)}

                </div>

            </div>

        </div>
    `;
}

/* =========================================================
   MODÈLE 8 — SIDEBAR BLEUE
   ========================================================= */
