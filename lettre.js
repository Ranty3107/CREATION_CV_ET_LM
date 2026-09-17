function getMotivationCandidateData(){

    const rawName=getInputValue('inputName');

    const email=getInputValue('inputEmail');
    const phone=getInputValue('inputPhone');
    const address=getInputValue('inputAddress');
    const summary=getInputValue('inputSummary');
    const skills=getInputValue('inputSkills');

    const validExperiences=getValidExperiences();
    const validFormations=getValidFormations();

    return{
        name:rawName,
        email:email,
        phone:phone,
        address:address,
        summary:summary,
        skills:skills,
        experiences:validExperiences,
        formations:validFormations
    };
}


/* =========================================================
   APERÇU DE LA LETTRE
   ========================================================= */

function updateMotivationLetterPreview(){

    const d=getMotivationCandidateData();

    const nameElement=document.getElementById(
        'letterPreviewName'
    );

    const contactElement=document.getElementById(
        'letterPreviewContact'
    );

    const signatureElement=document.getElementById(
        'letterPreviewSignature'
    );

    const recipientElement=document.getElementById(
        'letterPreviewRecipient'
    );

    const companyElement=document.getElementById(
        'letterPreviewCompany'
    );

    const cityDateElement=document.getElementById(
        'letterPreviewCityDate'
    );

    const city=getInputValue('letterCity');
    const recipient=getInputValue('letterRecipient');
    const company=getInputValue('letterCompany');

    if(nameElement){
        nameElement.textContent=d.name||'Votre Nom';
    }

    if(signatureElement){
        signatureElement.textContent=d.name||'Votre Nom';
    }

    if(contactElement){

        const contactParts=[];

        if(d.email)contactParts.push(d.email);
        if(d.phone)contactParts.push(d.phone);
        if(d.address)contactParts.push(d.address);

        contactElement.textContent=
            contactParts.join(' • ')||
            'Email • Téléphone';
    }

    if(recipientElement){

        recipientElement.textContent=
            recipient||
            'À l’attention du responsable du recrutement';
    }

    if(companyElement){

        companyElement.textContent=
            company||'';
    }

    if(cityDateElement){

        const date=new Date();

        const dateText=date.toLocaleDateString(
            'fr-FR',
            {
                day:'numeric',
                month:'long',
                year:'numeric'
            }
        );

        cityDateElement.textContent=
            city
            ?`${city}, le ${dateText}`
            :dateText;
    }
}


/* =========================================================
   GÉNÉRATION DE LA LETTRE
   ========================================================= */

function createMotivationLetter(){

    const d=getMotivationCandidateData();

    const job=getInputValue('letterJob');
    const company=getInputValue('letterCompany');
    const recipient=getInputValue('letterRecipient');
    const tone=getInputValue('letterTone');

    if(!d.name){

        alert(
            'Veuillez d’abord renseigner votre nom dans la section CV.'
        );

        switchMainTab('cv');

        return;
    }

    if(!job){

        alert(
            'Veuillez renseigner le poste recherché.'
        );

        const field=document.getElementById('letterJob');

        if(field)field.focus();

        return;
    }

    const letterHTML=
        buildMotivationLetterHTML(
            d,
            job,
            company,
            recipient,
            tone
        );

    const editor=document.getElementById(
        'motivationLetterEditable'
    );

    if(editor){

        editor.innerHTML=letterHTML;
    }

    updateMotivationLetterPreview();
}


/* =========================================================
   CONSTRUCTION DE LA LETTRE
   ========================================================= */

function buildMotivationLetterHTML(
    d,
    job,
    company,
    recipient,
    tone
){

    const safeJob=escapeLetterText(job);
    const safeCompany=escapeLetterText(company);

    let experienceText='';

    if(d.experiences.length){

        const bestExperience=d.experiences[0];

        const jobTitle=
            escapeLetterText(bestExperience.job||'');

        const companyName=
            escapeLetterText(bestExperience.company||'');

        if(jobTitle&&companyName){

            experienceText=
                `Mon parcours professionnel m’a permis de développer une expérience concrète en tant que ${jobTitle} au sein de ${companyName}.`;

        }else if(jobTitle){

            experienceText=
                `Mon parcours professionnel m’a permis de développer une expérience concrète en tant que ${jobTitle}.`;

        }else{

            experienceText=
                `Mon parcours professionnel m’a permis de développer des compétences directement mobilisables pour ce poste.`;
        }

    }else{

        experienceText=
            `Mon parcours m’a permis de développer des compétences et une capacité d’adaptation que je souhaite aujourd’hui mettre au service de votre organisation.`;
    }


    let formationText='';

    if(d.formations.length){

        const formation=d.formations[0];

        const title=
            escapeLetterText(formation.title||'');

        const school=
            escapeLetterText(formation.school||'');

        if(title&&school){

            formationText=
                `Ma formation en ${title} à ${school} m’a également permis d’acquérir des connaissances solides et une bonne capacité d’adaptation.`;

        }else if(title){

            formationText=
                `Ma formation en ${title} m’a permis d’acquérir des connaissances solides et une bonne capacité d’adaptation.`;

        }
    }


    let skillsText='';

    if(d.skills){

        const skills=d.skills
            .split(',')
            .map(s=>s.trim())
            .filter(Boolean)
            .slice(0,6);

        if(skills.length){

            skillsText=
                `Je peux notamment m’appuyer sur mes compétences en ${escapeLetterText(skills.join(', '))}.`;
        }
    }


    const summaryText=
        d.summary
        ?escapeLetterText(
            d.summary
        )
        :'';


    let opening='';

    if(company){

        opening=
            `Je souhaite vous soumettre ma candidature au poste de <strong>${safeJob}</strong> au sein de <strong>${safeCompany}</strong>.`;

    }else{

        opening=
            `Je souhaite vous soumettre ma candidature au poste de <strong>${safeJob}</strong>.`;
    }


    let motivation='';

    if(tone==='dynamique'){

        motivation=
            `Dynamique, motivé(e) et pleinement engagé(e) dans mon évolution professionnelle, je suis particulièrement intéressé(e) par cette opportunité. Je souhaite mettre mon expérience, mes compétences et ma capacité d’adaptation au service de vos objectifs.`;

    }else if(tone==='classique'){

        motivation=
            `Intéressé(e) par cette opportunité, je souhaite mettre à profit mon parcours, mes compétences et ma motivation afin de contribuer efficacement aux activités de votre organisation.`;

    }else if(tone==='sobre'){

        motivation=
            `Je souhaite aujourd’hui mettre mon expérience et mes compétences au service de votre organisation et contribuer de manière concrète à la réussite des missions qui me seront confiées.`;

    }else{

        motivation=
            `Votre offre représente pour moi une opportunité de mettre à profit mon parcours et mes compétences dans un environnement professionnel stimulant. Sérieux(se), motivé(e) et capable de m’adapter rapidement, je suis prêt(e) à m’investir pleinement dans les missions qui me seront confiées.`;
    }


    let html='';

    html+=`<p>${opening}</p>`;

    if(summaryText){

        html+=`
            <p>
                ${summaryText}
            </p>
        `;
    }

    html+=`
        <p>
            ${experienceText}
            ${formationText?' '+formationText:''}
        </p>
    `;

    if(skillsText){

        html+=`
            <p>
                ${skillsText}
            </p>
        `;
    }

    html+=`
        <p>
            ${motivation}
        </p>
    `;

    html+=`
        <p>
            Je serais heureux(se) de pouvoir échanger avec vous
            afin de vous présenter plus en détail ma motivation et
            la manière dont je pourrais contribuer à votre équipe.
        </p>
    `;

    html+=`
        <p>
            Je vous remercie par avance de l’attention portée à ma
            candidature et vous prie d’agréer, ${recipient
                ?escapeLetterText(recipient)+', '
                :'Madame, Monsieur, '
            }l’expression de mes salutations distinguées.
        </p>
    `;

    return html;
}


/* =========================================================
   SÉCURISATION DU TEXTE LETTRE
   ========================================================= */

function escapeLetterText(value){

    if(value===null||value===undefined)return '';

    return String(value)
        .replace(/&/g,'&amp;')
        .replace(/</g,'&lt;')
        .replace(/>/g,'&gt;')
        .replace(/"/g,'&quot;')
        .replace(/'/g,"&#39;");
}


/* =========================================================
   RÉINITIALISATION
   ========================================================= */

function resetMotivationLetter(){

    const fields=[
        'letterJob',
        'letterCompany',
        'letterRecipient',
        'letterCity'
    ];

    fields.forEach(id=>{

        const element=document.getElementById(id);

        if(element){
            element.value='';
        }
    });

    const editor=document.getElementById(
        'motivationLetterEditable'
    );

    if(editor){

        editor.innerHTML=`
            <p>
                Votre lettre de motivation apparaîtra ici.
            </p>
        `;
    }

    updateMotivationLetterPreview();
}


/* =========================================================
   IMPRESSION / PDF
   ========================================================= */

function printMotivationLetter(){

    const name=getInputValue('inputName');

    let safeName=name
        .replace(/[\\/:*?"<>|]+/g,'')
        .replace(/\s+/g,'_')
        .trim();

    if(!safeName){
        safeName='Mon_Nom';
    }

    const originalTitle=document.title;

    document.title=
        `Lettre_Motivation_${safeName}`;

    setTimeout(()=>{

        window.print();

        setTimeout(()=>{

            document.title=originalTitle;

        },1000);

    },300);
}

document.addEventListener(
    'DOMContentLoaded',
    ()=>{

        [
            'letterJob',
            'letterCompany',
            'letterRecipient',
            'letterCity',
            'letterTone'
        ].forEach(id=>{

            const element=document.getElementById(id);

            if(element){

                element.addEventListener(
                    'input',
                    updateMotivationLetterPreview
                );

                element.addEventListener(
                    'change',
                    updateMotivationLetterPreview
                );
            }
        });

        updateMotivationLetterPreview();
    }
);
