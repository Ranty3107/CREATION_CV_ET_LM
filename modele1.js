function buildModernTemplate(d){
    const iconStyle='width:14px;height:14px;min-width:14px;min-height:14px;color:#3A5A78;fill:currentColor;margin-top:2px;flex-shrink:0;display:inline-block;vertical-align:middle;';
    const icons=getIcons(iconStyle);

    const photoHTML=d.photoDataUrl
        ?`
            <img
                src="${d.photoDataUrl}"
                alt="Photo du candidat"
                style="
                    width:135px;
                    height:135px;
                    object-fit:cover;
                    border-radius:50%;
                    border:4px solid white;
                    box-shadow:0 4px 6px rgba(0,0,0,.15);">
        `
        :`
            <div style="
                width:135px;
                height:135px;
                border-radius:50%;
                background:#e2e8f0;
                display:flex;
                align-items:center;
                justify-content:center;
                font-size:28px;
                border:4px solid white;">
                📷
            </div>
        `;

    return `
        <table class="cv-full-height-table">

            <tr>

                <td
                    class="cv-sidebar-full"
                    style="
                        width:75mm;
                        background:#f3f4f6;
                        vertical-align:top;
                        padding:0;">

                    <div style="
                        background:#3b5998;
                        color:white;
                        padding:25px 15px 35px;
                        text-align:center;">

                        <h2 style="
                            font-size:15px;
                            font-weight:bold;
                            line-height:1.3;
                            margin:0;">
                            ${formatHeaderName(d.name)}
                        </h2>

                    </div>

                    <div style="
                        display:flex;
                        justify-content:center;
                        margin-top:-45px;
                        margin-bottom:20px;">
                        ${photoHTML}
                    </div>

                    <div style="padding:0 20px 20px;">

                        <h3 style="
                            font-size:12px;
                            color:#3b5998;
                            text-transform:uppercase;
                            border-bottom:1px solid #d1d5db;
                            padding-bottom:4px;
                            margin-bottom:12px;">
                            Informations
                        </h3>

                        <div style="
                            font-size:11px;
                            color:#333;">

                            ${d.name?`
                                <div style="
                                    display:flex;
                                    gap:8px;
                                    margin-bottom:8px;">
                                    ${icons.user}
                                    <span>${d.name}</span>
                                </div>
                            `:''}

                            ${d.email?`
                                <div style="
                                    display:flex;
                                    gap:8px;
                                    margin-bottom:8px;">
                                    ${icons.email}
                                    <span style="word-break:break-all;">
                                        ${d.email}
                                    </span>
                                </div>
                            `:''}

                            ${d.phone?`
                                <div style="
                                    display:flex;
                                    gap:8px;
                                    margin-bottom:8px;">
                                    ${icons.phone}
                                    <span>${d.phone}</span>
                                </div>
                            `:''}

                            ${d.address?`
                                <div style="
                                    display:flex;
                                    gap:8px;
                                    margin-bottom:8px;">
                                    ${icons.home}
                                    <span>${d.address}</span>
                                </div>
                            `:''}

                            ${d.birthdate?`
                                <div style="
                                    display:flex;
                                    gap:8px;
                                    margin-bottom:8px;">
                                    ${icons.date}
                                    <span>${d.birthdate}</span>
                                </div>
                            `:''}

                        </div>

                        ${buildSkillsSection(d.skillsRaw,'#3b5998')}
                        ${buildLanguagesSection('#3b5998')}

                    </div>

                </td>

                <td
                    class="cv-main-full"
                    style="
                        width:135mm;
                        vertical-align:top;
                        padding:35px 30px;
                        background:white;">

                    ${buildProfileSection(d.summary,'#3b5998')}
                    ${buildDiplomesSection('#3b5998')}
                    ${buildFormationsSection('#3b5998')}
                    ${buildExperiencesSection('#3b5998')}

                </td>

            </tr>

        </table>
    `;
}
