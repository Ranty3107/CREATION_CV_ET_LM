/* =========================================================
   RECUPERATION DES DONNEES CV POUR LA DEMANDE
   ========================================================= */
function getJobApplicationData(){
    const rawName = getInputValue('inputName');
    const email = getInputValue('inputEmail');
    const phone = getInputValue('inputPhone');
    const address = getInputValue('inputAddress');
    const summary = getInputValue('inputSummary');
    const skills = getInputValue('inputSkills');

    const validExperiences = typeof getValidExperiences === 'function' ? getValidExperiences() : [];
    const validFormations = typeof getValidFormations === 'function' ? getValidFormations() : [];
    const validDiplomes = typeof getValidDiplomes === 'function' ? getValidDiplomes() : [];

    return {
        name: rawName,
        email: email,
        phone: phone,
        address: address,
        summary: summary,
        skills: skills,
        experiences: validExperiences,
        formations: validFormations,
        diplomes: validDiplomes
    };
}

/* =========================================================
   APERÇU DYNAMIQUE DE LA DEMANDE
   ========================================================= */
function updateJobApplicationPreview(){
    const d = getJobApplicationData();

    const nameEl = document.getElementById('demandePreviewName');
    const contactEl = document.getElementById('demandePreviewContact');
    const signatureEl = document.getElementById('demandePreviewSignature');
    const recipientEl = document.getElementById('demandePreviewRecipient');
    const companyEl = document.getElementById('demandePreviewCompany');
    const cityDateEl = document.getElementById('demandePreviewCityDate');
    const objetEl = document.getElementById('demandePreviewObjet');

    const city = getInputValue('demandeCity');
    const recipient = getInputValue('demandeRecipient');
    const company = getInputValue('demandeCompany');
    const job = getInputValue('demandeJob');
    const objetCustom = getInputValue('demandeObjet');

    if(nameEl) nameEl.textContent = d.name || 'Votre Nom';
    if(signatureEl) signatureEl.textContent = d.name || 'Votre Nom';

    if(contactEl){
        const contactParts = [];
        if(d.address) contactParts.push(d.address);
        if(d.phone) contactParts.push('Tél : ' + d.phone);
        if(d.email) contactParts.push('Email : ' + d.email);

        contactEl.innerHTML = contactParts.join('<br>') || 'Adresse • Téléphone • Email';
    }

    if(recipientEl){
        recipientEl.textContent = recipient || 'À Monsieur le Directeur Général';
    }

    if(companyEl){
        companyEl.textContent = company || '';
    }

    if(objetEl){
        if(objetCustom){
            objetEl.textContent = objetCustom;
        } else if(job){
            objetEl.textContent = `Demande d'emploi pour le poste de ${job}`;
        } else {
            objetEl.textContent = "Demande d'emploi";
        }
    }

    if(cityDateEl){
        const date = new Date();
        const dateText = date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        cityDateEl.textContent = city ? `${city}, le ${dateText}` : dateText;
    }
}

/* =========================================================
   GÉNÉRATION AUTOMATIQUE DU TEXTE DE LA DEMANDE
   ========================================================= */
function createJobApplication(){
    const d = getJobApplicationData();

    const job = getInputValue('demandeJob');
    const company = getInputValue('demandeCompany');
    const recipient = getInputValue('demandeRecipient');
    const type = getInputValue('demandeType');

    if(!d.name){
        alert('Veuillez d’abord renseigner votre nom dans la section CV.');
        switchMainTab('cv');
        return;
    }

    if(!job){
        alert('Veuillez renseigner le poste sollicité.');
        const field = document.getElementById('demandeJob');
        if(field) field.focus();
        return;
    }

    const htmlContent = buildJobApplicationTextHTML(d, job, company, recipient, type);

    const editor = document.getElementById('jobApplicationEditable');
    if(editor){
        editor.innerHTML = htmlContent;
    }

    updateJobApplicationPreview();
}

/* =========================================================
   RÉDACTION DU TEXTE SELON LES INFORMATIONS DU CV
   ========================================================= */
function buildJobApplicationTextHTML(d, job, company, recipient, type){
    const safeJob = escapeDemandeText(job);
    const safeCompany = escapeDemandeText(company);
    const salutation = recipient ? escapeDemandeText(recipient) : 'Monsieur le Directeur';

    // 1. Diplôme ou formation principale
    let qualifText = '';
    if(d.diplomes && d.diplomes.length){
        const dip = d.diplomes[0];
        qualifText = `titulaire du diplôme de <strong>${escapeDemandeText(dip.title)}</strong>${dip.school ? ' obtenu à ' + escapeDemandeText(dip.school) : ''}`;
    } else if(d.formations && d.formations.length){
        const form = d.formations[0];
        qualifText = `ayant suivi une formation en <strong>${escapeDemandeText(form.title)}</strong>${form.school ? ' à ' + escapeDemandeText(form.school) : ''}`;
    } else {
        qualifText = `fort(e) de mon parcours et de mes qualifications professionnelles`;
    }

    // 2. Expérience clé
    let expText = '';
    if(d.experiences && d.experiences.length){
        const exp = d.experiences[0];
        expText = `J'ai acquis une expérience significative en tant que ${escapeDemandeText(exp.job)}${exp.company ? ' au sein de ' + escapeDemandeText(exp.company) : ''}, ce qui m'a permis d'acquérir une solide maîtrise du domaine.`;
    }

    // 3. Compétences
    let skillText = '';
    if(d.skills){
        const skillsList = d.skills.split(',').map(s=>s.trim()).filter(Boolean).slice(0, 5);
        if(skillsList.length){
            skillText = `Mes compétences clés couvrent notamment : ${escapeDemandeText(skillsList.join(', '))}.`;
        }
    }

    // Formule d'introduction selon le type
    let intro = '';
    if(type === 'spontanee'){
        intro = `J'ai l'honneur de solliciter par la présente votre haute bienveillance afin de vous poser ma candidature spontanée pour le poste de <strong>${safeJob}</strong>${company ? ' au sein de votre établissement <strong>' + safeCompany + '</strong>' : ''}.`;
    } else if(type === 'reponse_offre'){
        intro = `Faisant suite à votre offre concernant le recrutement d'un(e) <strong>${safeJob}</strong>, j'ai l'honneur de soumettre à votre appréciation ma candidature pour ce poste.`;
    } else if(type === 'stage'){
        intro = `J'ai l'honneur de solliciter votre haute bienveillance pour l'octroi d'un stage au poste de <strong>${safeJob}</strong> au sein de <strong>${safeCompany || 'votre structure'}</strong>.`;
    } else {
        intro = `J'ai l'honneur de solliciter votre haute bienveillance pour solliciter un emploi en qualité de <strong>${safeJob}</strong> au sein de votre honorable institution${company ? ' <strong>' + safeCompany + '</strong>' : ''}.`;
    }

    let html = '';
    html += `<p>${salutation},</p>`;
    html += `<p>${intro}</p>`;
    html += `<p>En effet, ${qualifText}, je souhaite mettre mon savoir-faire et mes compétences théoriques et pratiques au service de votre organisme.</p>`;

    if(expText){
        html += `<p>${expText}</p>`;
    }

    if(skillText){
        html += `<p>${skillText}</p>`;
    }

    html += `<p>Rigoureux(se), motivé(e) et soucieux(se) du travail bien fait, je reste convaincu(e) de pouvoir répondre aux exigences requises pour ce poste et exécuter les tâches qui me seront confiées avec professionnalisme.</p>`;

    html += `<p>Je me tiens à votre entière disposition pour tout entretien ou renseignement complémentaire, et je vous joins mon Curriculum Vitae pour une prise en connaissance plus détaillée de mon parcours.</p>`;

    html += `<p>Dans l'attente d'une suite favorable, je vous prie d'agréer, ${salutation}, l'expression de ma très haute considération.</p>`;

    return html;
}

/* =========================================================
   FONCTIONS UTILITAIRES DE SÉCURISATION ET RÉINITIALISATION
   ========================================================= */
function escapeDemandeText(value){
    if(value === null || value === undefined) return '';
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, "&#39;");
}

function resetJobApplication(){
    const fields = ['demandeJob', 'demandeCompany', 'demandeRecipient', 'demandeCity', 'demandeObjet'];
    fields.forEach(id => {
        const el = document.getElementById(id);
        if(el) el.value = '';
    });

    const editor = document.getElementById('jobApplicationEditable');
    if(editor){
        editor.innerHTML = '<p>Votre demande d\'emploi rédigée apparaîtra ici...</p>';
    }

    updateJobApplicationPreview();
}

/* =========================================================
   IMPRESSION ET IMPRESSION PDF DEMANDE
   ========================================================= */
function printJobApplication() {
    const element = document.getElementById('jobApplicationPreview');

    if (!element) {
        alert("Impossible de trouver la demande d'emploi à imprimer.");
        return;
    }

    const name = getInputValue('inputName');
    let safeName = name.replace(/[\\/:*?"<>|]+/g, '').replace(/\s+/g, '_').trim();
    if (!safeName) safeName = 'Candidat';

    const opt = {
        margin: [0, 0, 0, 0],
        filename: `Demande_Emploi_${safeName}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2, 
            useCORS: true,
            logging: false
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait' 
        }
    };

    if (typeof html2pdf !== 'undefined') {
        html2pdf().set(opt).from(element).save();
    } else {
        const originalTitle = document.title;
        document.title = `Demande_Emploi_${safeName}`;
        setTimeout(() => {
            window.print();
            setTimeout(() => {
                document.title = originalTitle;
            }, 1000);
        }, 300);
    }
}