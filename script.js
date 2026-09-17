let photoBase64='';
let currentTemplate='modern';
let formations=[];
let experiences=[];
let languages=[];
let selectedCVColor='#3B5998';
let diplomes=[];
const CV_COLOR_PRESETS=['#3B5998','#2563EB','#4F46E5','#7C3AED','#9333EA','#DB2777','#DC2626','#EA580C','#D97706','#16A34A','#059669','#0891B2','#0F766E','#475569','#1F2937'];
const GOOGLE_SCRIPT_URL="https://script.google.com/macros/s/AKfycbwSVrWGRzoXjU5OmAS1iHpE2L_d9moFI9WMKRUtgYhkXjNOjlkfhdUefXaa2Meym31/exec";

document.addEventListener('DOMContentLoaded',()=>{
    const photoInput=document.getElementById('inputPhotoFile');

    if(photoInput){
        photoInput.addEventListener('change',handlePhotoUpload);
    }

    const inputIds=[
        'inputName',
        'inputEmail',
        'inputPhone',
        'inputAddress',
        'inputBirthdate',
        'inputSummary',
        'inputSkills',
        'inputHobbies'
    ];

    inputIds.forEach(id=>{
        const element=document.getElementById(id);

        if(element){
            element.addEventListener('input',renderCV);
        }
    });

    renderFormationsInputs();
    renderExperiencesInputs();
    renderLanguagesInputs();
    renderDiplomesInputs();
    updateTemplateButtons();

    createCVColorPicker();

    renderCV();
});

function handlePhotoUpload(event){
    const file=event.target.files&&event.target.files[0];

    if(!file)return;

    if(!file.type.startsWith('image/')){
        alert('Veuillez sélectionner une image valide.');
        event.target.value='';
        return;
    }

    const reader=new FileReader();

    reader.onload=function(e){
        photoBase64=e.target.result||'';
        renderCV();
    };

    reader.onerror=function(){
        alert('Impossible de lire cette image.');
    };

    reader.readAsDataURL(file);
}

function escapeHTML(value){
    if(value===null||value===undefined)return '';

    return String(value)
        .replace(/&/g,'&amp;')
        .replace(/</g,'&lt;')
        .replace(/>/g,'&gt;')
        .replace(/"/g,'&quot;')
        .replace(/'/g,'&#039;');
}

function getInputValue(id){
    const element=document.getElementById(id);
    return element?element.value.trim():'';
}

function selectTemplate(templateId){ const validTemplates=[ 'modern', 'banner', 'minimalist', 'headerCenter', 'darkSidebar', 'modernBlue', 'bannerBlue', 'sidebarBlue', 'waveRed', 'left-sidebar', 'modele10', 'modele11', 'modele12', 'modele13' ]; if(!validTemplates.includes(templateId)){ templateId='modern'; } currentTemplate=templateId; updateTemplateButtons(); renderCV(); }

function updateTemplateButtons(){

    document.querySelectorAll('.template-card').forEach(button=>{
        button.classList.remove(
            'ring-4',
            'ring-indigo-600',
            'border-indigo-600',
            'bg-indigo-50',
            'shadow-lg'
        );

        button.classList.add(
            'border-slate-200',
            'bg-white'
        );
    });

    const active=document.getElementById(
        'btn-tpl-'+currentTemplate
    );

    if(active){
        active.classList.remove(
            'border-slate-200',
            'bg-white'
        );

        active.classList.add(
            'ring-4',
            'ring-indigo-600',
            'border-indigo-600',
            'bg-indigo-50',
            'shadow-lg'
        );
    }
}

function collectCandidateData(){
    const rawName=getInputValue('inputName');
    const parts=rawName.split(/\s+/).filter(Boolean);

    const firstName=parts.length>0?parts[0]:'';
    const lastName=parts.length>1?parts.slice(1).join(' '):'';

    const skillsRaw=getInputValue('inputSkills');

    const skillsList=skillsRaw
        ?skillsRaw
            .split(',')
            .map(s=>s.trim())
            .filter(Boolean)
        :[];

    const hobbiesRaw=getInputValue('inputHobbies');

    const hobbiesList=hobbiesRaw
        ?hobbiesRaw
            .split(',')
            .map(s=>s.trim())
            .filter(Boolean)
        :[];

    return{
        name:escapeHTML(rawName),
        firstName:escapeHTML(firstName),
        lastName:escapeHTML(lastName),

        email:escapeHTML(getInputValue('inputEmail')),
        phone:escapeHTML(getInputValue('inputPhone')),

        address:escapeHTML(
            getInputValue('inputAddress')
        ).replace(/\n/g,'<br>'),

        birthdate:escapeHTML(
            getInputValue('inputBirthdate')
        ),

        summary:escapeHTML(
            getInputValue('inputSummary')
        ).replace(/\n/g,'<br>'),

        skillsRaw:skillsRaw,
        skillsList:skillsList,

        hobbies:hobbiesList,

        formations:Array.isArray(formations)
            ?formations
            :[],

        experiences:Array.isArray(experiences)
            ?experiences
            :[],

        languages:Array.isArray(languages)
            ?languages
            :[],

        diplomes:Array.isArray(diplomes)
            ?diplomes
            :[],

        photoDataUrl:photoBase64
    };
}

function renderDiplomesInputs(){
    const container=document.getElementById('diplomesContainer');
    if(!container)return;
    container.innerHTML='';

    diplomes.forEach((dip,index)=>{
        const block=document.createElement('div');
        block.className='p-2 border rounded bg-gray-50 space-y-1 relative text-xs';

        block.innerHTML=`
            <button
                type="button"
                onclick="removeDiplome(${index})"
                class="absolute top-1 right-1 text-red-500 font-bold text-xs hover:text-red-700 cursor-pointer"
                title="Supprimer">
                ✕
            </button>

            <input
                type="text"
                placeholder="Intitulé du diplôme"
                value="${escapeHTML(dip.title)}"
                oninput="updateDiplome(${index},'title',this.value)"
                class="w-full border rounded p-1">

            <input
                type="text"
                placeholder="Établissement / École"
                value="${escapeHTML(dip.school)}"
                oninput="updateDiplome(${index},'school',this.value)"
                class="w-full border rounded p-1">

            <input
                type="text"
                placeholder="Année d'obtention"
                value="${escapeHTML(dip.year)}"
                oninput="updateDiplome(${index},'year',this.value)"
                class="w-full border rounded p-1">
        `;
        container.appendChild(block);
    });
}

function addDiplomeField(){
    diplomes.push({title:'', school:'', year:''});
    renderDiplomesInputs();
    renderCV();
}

function updateDiplome(index,field,value){
    if(!diplomes[index])return;
    diplomes[index][field]=value;
    renderCV();
}

function removeDiplome(index){
    if(index<0||index>=diplomes.length)return;
    diplomes.splice(index,1);
    renderDiplomesInputs();
    renderCV();
}

function getValidDiplomes(){
    return diplomes.filter(d=>
        (d.title||'').trim()||
        (d.school||'').trim()||
        (d.year||'').trim()
    );
}

function renderCV(){ 
    const cvPreview = document.getElementById('cvPreview'); 
    if(!cvPreview) return; 
    const d = collectCandidateData(); 
    let html = ''; 

    switch(currentTemplate){ 
        case 'modern': html = buildModernTemplate(d); break; 
        case 'banner': html = buildBannerTemplate(d); break; 
        case 'minimalist': html = buildMinimalistTemplate(d); break; 
        case 'headerCenter': html = buildHeaderCenterTemplate(d); break; 
        case 'darkSidebar': html = buildDarkSidebarTemplate(d); break; 
        case 'modernBlue': html = buildModernBlueTemplate(d); break; 
        case 'bannerBlue': html = buildBannerBlueTemplate(d); break; 
        case 'sidebarBlue': html = buildSidebarBlueTemplate(d); break; 
        case 'waveRed': html = buildWaveRedTemplate(d); break;
        case 'modele10': html = buildModele10Template(d); break;
        case 'left-sidebar': html = buildLeftSidebarPhotoTemplate(d); break;
        case 'modele11': html = buildModele11Template(d); break;
        case 'modele12': html = buildModele12Template(d); break;
        case 'modele13': html = buildModele13Template(d); break;
        default: 
            currentTemplate = 'modern'; 
            updateTemplateButtons(); 
            html = buildModernTemplate(d); 
            break; 
    } 
    cvPreview.innerHTML = applyCVColor ? applyCVColor(html) : html; 
    updateColorPickerSelection(); 
}

function renderSelectedCVTemplate(templateId,candidateData){
    const d=candidateData||collectCandidateData();

    switch(templateId){

        case 'modern':
            return buildModernTemplate(d);

        case 'banner':
            return buildBannerTemplate(d);

        case 'minimalist':
            return buildMinimalistTemplate(d);

        case 'headerCenter':
            return buildHeaderCenterTemplate(d);

        case 'darkSidebar':
            return buildDarkSidebarTemplate(d);

        case 'modernBlue':
            return buildModernBlueTemplate(d);

        case 'bannerBlue':
            return buildBannerBlueTemplate(d);

        case 'sidebarBlue':
            return buildSidebarBlueTemplate(d);

        case 'waveRed':
            return buildWaveRedTemplate(d);

        case 'left-sidebar':
            return buildLeftSidebarPhotoTemplate(d);
         case 'modele10':   
          return buildModele10Template(d);
          case 'modele11':   
          return buildModele11Template(d);
          case 'modele12':
        return buildModele12Template(d);
        case 'modele13':
        return  buildModele13Template(d);

        default:
            return buildModernTemplate(d);
    }
}

function renderFormationsInputs(){
    const container=document.getElementById('formationsContainer');

    if(!container)return;

    container.innerHTML='';

    formations.forEach((form,index)=>{
        const block=document.createElement('div');

        block.className='p-2 border rounded bg-gray-50 space-y-1 relative text-xs';

        block.innerHTML=`
            <button
                type="button"
                onclick="removeFormation(${index})"
                class="absolute top-1 right-1 text-red-500 font-bold text-xs hover:text-red-700 cursor-pointer"
                title="Supprimer">
                ✕
            </button>

            <input
                type="text"
                placeholder="Diplôme"
                value="${escapeHTML(form.title)}"
                oninput="updateFormation(${index},'title',this.value)"
                class="w-full border rounded p-1">

            <input
                type="text"
                placeholder="École / Université"
                value="${escapeHTML(form.school)}"
                oninput="updateFormation(${index},'school',this.value)"
                class="w-full border rounded p-1">

            <input
                type="text"
                placeholder="Période"
                value="${escapeHTML(form.year)}"
                oninput="updateFormation(${index},'year',this.value)"
                class="w-full border rounded p-1">
        `;

        container.appendChild(block);
    });
}

function addFormationField(){
    formations.push({
        title:'',
        school:'',
        year:''
    });

    renderFormationsInputs();
    renderCV();
}

function updateFormation(index,field,value){
    if(!formations[index])return;

    formations[index][field]=value;
    renderCV();
}

function removeFormation(index){
    if(index<0||index>=formations.length)return;

    formations.splice(index,1);

    renderFormationsInputs();
    renderCV();
}

function renderExperiencesInputs(){
    const container=document.getElementById('experiencesContainer');

    if(!container)return;

    container.innerHTML='';

    experiences.forEach((exp,index)=>{
        if(!Array.isArray(exp.tasks)){
            exp.tasks=[];
        }

        const block=document.createElement('div');

        block.className='p-2 border rounded bg-gray-50 space-y-2 relative text-xs';

        let tasksHTML='';

        exp.tasks.forEach((task,taskIndex)=>{
            tasksHTML+=`
                <div class="flex gap-1 mb-1">

                    <textarea
                        placeholder="Description de la tâche..."
                        oninput="updateTask(${index},${taskIndex},this.value)"
                        class="w-full border rounded p-1 text-xs"
                        rows="2">${escapeHTML(task)}</textarea>

                    <button
                        type="button"
                        onclick="removeTask(${index},${taskIndex})"
                        class="bg-red-100 text-red-600 px-2 rounded text-xs hover:bg-red-200 cursor-pointer"
                        title="Supprimer">
                        ✕
                    </button>

                </div>
            `;
        });

        block.innerHTML=`
            <button
                type="button"
                onclick="removeExperience(${index})"
                class="absolute top-1 right-1 text-red-500 font-bold text-xs hover:text-red-700 cursor-pointer"
                title="Supprimer l'expérience">
                ✕
            </button>

            <div class="pr-6 space-y-1">

                <input
                    type="text"
                    placeholder="Poste"
                    value="${escapeHTML(exp.job)}"
                    oninput="updateExperience(${index},'job',this.value)"
                    class="w-full border rounded p-1">

                <input
                    type="text"
                    placeholder="Entreprise"
                    value="${escapeHTML(exp.company)}"
                    oninput="updateExperience(${index},'company',this.value)"
                    class="w-full border rounded p-1">

                <input
                    type="text"
                    placeholder="Période"
                    value="${escapeHTML(exp.year)}"
                    oninput="updateExperience(${index},'year',this.value)"
                    class="w-full border rounded p-1">

            </div>

            <div class="mt-2 pt-2 border-t border-gray-200">

                <div class="flex justify-between items-center mb-1">

                    <span class="text-[11px] font-semibold text-gray-600">
                        Détails du poste :
                    </span>

                    <button
                        type="button"
                        onclick="addTask(${index})"
                        class="bg-indigo-100 text-indigo-700 text-[10px] px-2 py-0.5 rounded hover:bg-indigo-200 font-medium cursor-pointer">
                        + Ligne
                    </button>

                </div>

                <div class="space-y-1">
                    ${tasksHTML}
                </div>

            </div>
        `;

        container.appendChild(block);
    });
}

function addExperienceField(){
    experiences.push({
        job:'',
        company:'',
        year:'',
        tasks:['']
    });

    renderExperiencesInputs();
    renderCV();
}

function updateExperience(index,field,value){
    if(!experiences[index])return;

    experiences[index][field]=value;
    renderCV();
}

function removeExperience(index){
    if(index<0||index>=experiences.length)return;

    experiences.splice(index,1);

    renderExperiencesInputs();
    renderCV();
}

function addTask(expIndex){
    if(!experiences[expIndex])return;

    if(!Array.isArray(experiences[expIndex].tasks)){
        experiences[expIndex].tasks=[];
    }

    experiences[expIndex].tasks.push('');

    renderExperiencesInputs();
    renderCV();
}

function updateTask(expIndex,taskIndex,value){
    if(!experiences[expIndex])return;

    if(!Array.isArray(experiences[expIndex].tasks)){
        experiences[expIndex].tasks=[];
    }

    experiences[expIndex].tasks[taskIndex]=value;

    renderCV();
}

function removeTask(expIndex,taskIndex){
    if(!experiences[expIndex])return;

    if(!Array.isArray(experiences[expIndex].tasks))return;

    experiences[expIndex].tasks.splice(taskIndex,1);

    if(experiences[expIndex].tasks.length===0){
        experiences[expIndex].tasks.push('');
    }

    renderExperiencesInputs();
    renderCV();
}

function renderLanguagesInputs(){
    const container=document.getElementById('languagesContainer');

    if(!container)return;

    container.innerHTML='';

    languages.forEach((lang,index)=>{
        const block=document.createElement('div');

        block.className='p-2 border rounded bg-gray-50 space-y-1 relative text-xs flex gap-1 items-center';

        block.innerHTML=`
            <input
                type="text"
                placeholder="Langue"
                value="${escapeHTML(lang.language)}"
                oninput="updateLanguage(${index},'language',this.value)"
                class="w-1/2 border rounded p-1">

            <input
                type="text"
                placeholder="Niveau"
                value="${escapeHTML(lang.level)}"
                oninput="updateLanguage(${index},'level',this.value)"
                class="w-1/2 border rounded p-1">

            <button
                type="button"
                onclick="removeLanguage(${index})"
                class="text-red-500 font-bold text-xs hover:text-red-700 px-1 cursor-pointer"
                title="Supprimer">
                ✕
            </button>
        `;

        container.appendChild(block);
    });
}

function addLanguageField(){
    languages.push({
        language:'',
        level:''
    });

    renderLanguagesInputs();
    renderCV();
}

function updateLanguage(index,field,value){
    if(!languages[index])return;

    languages[index][field]=value;
    renderCV();
}

function removeLanguage(index){
    if(index<0||index>=languages.length)return;

    languages.splice(index,1);

    renderLanguagesInputs();
    renderCV();
}

function getValidFormations(){
    return formations.filter(f=>
        (f.title||'').trim()||
        (f.school||'').trim()||
        (f.year||'').trim()
    );
}

function getValidExperiences(){
    return experiences.filter(e=>
        (e.job||'').trim()||
        (e.company||'').trim()||
        (e.year||'').trim()
    );
}

function getValidLanguages(){
    return languages.filter(l=>
        (l.language||'').trim()
    );
}

function buildProfileSection(summary,color){
    if(!summary)return '';

    return `
        <div style="margin-bottom:20px;break-inside:avoid;page-break-inside:avoid;">

            <h3 style="
                font-size:13px;
                color:${color};
                text-transform:uppercase;
                border-bottom:1px solid #e5e7eb;
                padding-bottom:3px;
                margin-bottom:8px;
                font-weight:bold;">
                Profil
            </h3>

            <p style="
                font-size:11px;
                color:#333;
                line-height:1.5;
                margin:0;
                text-align:justify;">
                ${summary}
            </p>

        </div>
    `;
}

function buildFormationsSection(color){
    const valid=getValidFormations();

    if(!valid.length)return '';

    let html=`
        <div style="margin-bottom:20px;">

            <h3 style="
                font-size:13px;
                color:${color};
                text-transform:uppercase;
                border-bottom:1px solid #e5e7eb;
                padding-bottom:3px;
                margin-bottom:10px;
                font-weight:bold;">
                Formation
            </h3>
    `;

    valid.forEach(f=>{
        html+=`
            <div style="
                margin-bottom:10px;
                break-inside:avoid;
                page-break-inside:avoid;">

                <table style="
                    width:100%;
                    border-collapse:collapse;
                    font-size:11px;">

                    <tr>

                        <td style="
                            font-weight:bold;
                            color:#333;
                            width:65%;">
                            ${escapeHTML(f.title)}
                        </td>

                        <td style="
                            text-align:right;
                            font-weight:bold;
                            color:#555;
                            width:35%;">
                            ${escapeHTML(f.year)}
                        </td>

                    </tr>

                    <tr>

                        <td colspan="2" style="
                            color:${color};
                            font-size:10.5px;">
                            ${escapeHTML(f.school)}
                        </td>

                    </tr>

                </table>

            </div>
        `;
    });

    return html+'</div>';
}

function buildExperiencesSection(color){
    const valid=getValidExperiences();

    if(!valid.length)return '';

    let html=`
        <div style="margin-bottom:20px;">

            <h3 style="
                font-size:13px;
                color:${color};
                text-transform:uppercase;
                border-bottom:1px solid #e5e7eb;
                padding-bottom:3px;
                margin-bottom:10px;
                font-weight:bold;">
                Expérience professionnelle
            </h3>
    `;

    valid.forEach(e=>{
        const validTasks=(e.tasks||[])
            .filter(t=>(t||'').trim());

        let tasks='';

        if(validTasks.length){
            tasks=`
                <ul style="
                    margin:4px 0 0;
                    padding-left:16px;">

                    ${validTasks.map(t=>`
                        <li style="
                            font-size:11px;
                            color:#333;
                            margin-bottom:2px;
                            line-height:1.4;">
                            ${escapeHTML(t)}
                        </li>
                    `).join('')}

                </ul>
            `;
        }

        html+=`
            <div style="
                margin-bottom:14px;
                break-inside:avoid;
                page-break-inside:avoid;">

                <table style="
                    width:100%;
                    border-collapse:collapse;
                    font-size:11px;">

                    <tr>

                        <td style="
                            font-weight:bold;
                            color:#333;">
                            ${escapeHTML(e.job)}
                        </td>

                        <td style="
                            text-align:right;
                            font-weight:bold;
                            color:#555;
                            white-space:nowrap;
                            vertical-align:top;">
                            ${escapeHTML(e.year)}
                        </td>

                    </tr>

                    <tr>

                        <td colspan="2" style="
                            color:${color};
                            font-weight:500;">
                            ${escapeHTML(e.company)}
                        </td>

                    </tr>

                </table>

                ${tasks}

            </div>
        `;
    });

    return html+'</div>';
}

function buildSkillsSection(skillsRaw,color,textColor='#333'){
    if(!skillsRaw)return '';

    const skills=skillsRaw
        .split(',')
        .map(s=>s.trim())
        .filter(Boolean);

    if(!skills.length)return '';

    return `
        <div style="
            margin-bottom:20px;
            break-inside:avoid;
            page-break-inside:avoid;">

            <h3 style="
                font-size:12px;
                color:${color};
                text-transform:uppercase;
                border-bottom:1px solid rgba(255,255,255,.2);
                padding-bottom:3px;
                margin-bottom:8px;
                font-weight:bold;">
                Compétences
            </h3>

            ${skills.map(skill=>`
                <p style="
                    margin:3px 0;
                    font-size:11px;
                    color:${textColor};">
                    • ${escapeHTML(skill)}
                </p>
            `).join('')}

        </div>
    `;
}

function buildLanguagesSection(color,textColor='#333'){
    const valid=getValidLanguages();

    if(!valid.length)return '';

    return `
        <div style="
            margin-bottom:20px;
            break-inside:avoid;
            page-break-inside:avoid;">

            <h3 style="
                font-size:12px;
                color:${color};
                text-transform:uppercase;
                border-bottom:1px solid rgba(255,255,255,.2);
                padding-bottom:3px;
                margin-bottom:8px;
                font-weight:bold;">
                Langues
            </h3>

            ${valid.map(lang=>`
                <div style="
                    font-size:11px;
                    margin-bottom:4px;
                    color:${textColor};">

                    •
                    <strong>
                        ${escapeHTML(lang.language)}
                    </strong>

                    ${lang.level.trim()
                        ?`: ${escapeHTML(lang.level)}`
                        :''
                    }

                </div>
            `).join('')}

        </div>
    `;
}

function formatHeaderName(name){
    if(!name)return '';

    const parts=String(name)
        .replace(/<[^>]*>/g,'')
        .split(/\s+/)
        .filter(Boolean);

    if(!parts.length)return '';

    const firstNames=[];
    const lastNames=[];

    parts.forEach(part=>{
        if(
            part.length>1 &&
            part===part.toUpperCase() &&
            /[A-ZÀ-ÖØ-Ý]/.test(part)
        ){
            lastNames.push(part);
        }else{
            firstNames.push(part);
        }
    });

    if(firstNames.length&&lastNames.length){
        return `
            ${escapeHTML(firstNames.join(' '))}<br>
            <span style="text-transform:uppercase;">
                ${escapeHTML(lastNames.join(' '))}
            </span>
        `;
    }

    return escapeHTML(parts.join(' '));
}

function getIcons(iconStyle){
    return{
        user:`
            <svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                style="${iconStyle}">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>`,

        email:`
            <svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                style="${iconStyle}">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>`,

        phone:`
            <svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                style="${iconStyle}">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>`,

        home:`
            <svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                style="${iconStyle}">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>`,

        date:`
            <svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                style="${iconStyle}">
                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
            </svg>`
    };
}

function waitForImages(element){
    if(!element)return Promise.resolve();

    const images=Array.from(element.querySelectorAll('img'));

    if(!images.length){
        return Promise.resolve();
    }

    return Promise.all(
        images.map(img=>{
            if(img.complete){
                return Promise.resolve();
            }

            return new Promise(resolve=>{
                img.onload=resolve;
                img.onerror=resolve;
            });
        })
    );
}

function setPDFButtonsLoading(loading){
    const buttons=[
        document.getElementById('downloadPdfBtn'),
        document.getElementById('modalDownloadPdfBtn')
    ].filter(Boolean);

    buttons.forEach(button=>{
        if(loading){

            if(!button.dataset.originalHtml){
                button.dataset.originalHtml=button.innerHTML;
            }

            button.innerHTML='⏳ Génération en cours...';
            button.disabled=true;

            button.classList.add(
                'opacity-70',
                'cursor-not-allowed'
            );

        }else{

            if(button.dataset.originalHtml){
                button.innerHTML=button.dataset.originalHtml;
            }

            button.disabled=false;

            button.classList.remove(
                'opacity-70',
                'cursor-not-allowed'
            );
        }
    });
}

let pendingDownloadType='cv';

function openMvolaModal(type='cv'){
    const modal=document.getElementById('mvolaModal');

    if(!modal)return;

    pendingDownloadType=type;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeMvolaModal(){
    const modal=document.getElementById('mvolaModal');

    if(!modal)return;

    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

async function downloadPDF(){
    closeMvolaModal();

    if(pendingDownloadType==='letter'){
        printMotivationLetter();
        return;
    }

    const cv = document.getElementById('cvPreview');

    if(!cv){
        alert('Impossible de trouver le CV à imprimer.');
        return;
    }

    const name = getInputValue('inputName');

    let safeName = name
        .replace(/[\\/:*?"<>|]+/g,'')
        .replace(/\s+/g,'_')
        .trim();

    if(!safeName){
        safeName = 'Mon_CV';
    }

    const originalTitle = document.title;
    document.title = `CV_${safeName}`;

    setPDFButtonsLoading(true);

    try{
        // Attendre que toutes les images (photos de profil, etc.) soient chargées
        await waitForImages(cv);

        setTimeout(()=>{
            // Lancer l'impression du navigateur configurée pour le format A4
            window.print();

            setTimeout(()=>{
                document.title = originalTitle;
                setPDFButtonsLoading(false);
            }, 1000);

        }, 300);

    }catch(error){
        console.error('Erreur impression PDF:', error);

        document.title = originalTitle;
        setPDFButtonsLoading(false);

        alert('Impossible de préparer le CV pour l’impression.');
    }
}
/* =========================================================
   COMPATIBILITÉ AVEC D'ANCIEN CODE
   ========================================================= */

function updateCVPreview(){
    renderCV();
}

function collectCandidateDataFromForm(){
    return collectCandidateData();
}

function formatCVText(text){
    if(!text)return '';

    return String(text)
        .replace(/&#039;/gi,"'")
        .replace(/&#39;/gi,"'")
        .replace(/&apos;/gi,"'")
        .replace(/&quot;/gi,'"')
        .replace(/&amp;/gi,'&')
        .replace(/&lt;br\s*\/?&gt;/gi,'<br>')
        .replace(/\r?\n/g,'<br>');
}
/* =========================================================
   ONGLET LETTRE DE MOTIVATION
   ========================================================= */

function switchMainTab(tab){

    const cvTab=document.getElementById('cvTabContent');
    const letterTab=document.getElementById('letterTabContent');

    const cvBtn=document.getElementById('tabCvBtn');
    const letterBtn=document.getElementById('tabLetterBtn');

    if(!cvTab||!letterTab)return;

    if(tab==='letter'){

        cvTab.classList.add('hidden');
        letterTab.classList.remove('hidden');

        if(cvBtn){
            cvBtn.className=
                'px-5 py-2.5 rounded-xl bg-white text-slate-600 border border-slate-200 font-bold text-sm hover:border-indigo-400 transition-all';
        }

        if(letterBtn){
            letterBtn.className=
                'px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-md transition-all';
        }

        updateMotivationLetterPreview();

    }else{

        letterTab.classList.add('hidden');
        cvTab.classList.remove('hidden');

        if(cvBtn){
            cvBtn.className=
                'px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-sm shadow-md transition-all';
        }

        if(letterBtn){
            letterBtn.className=
                'px-5 py-2.5 rounded-xl bg-white text-slate-600 border border-slate-200 font-bold text-sm hover:border-indigo-400 transition-all';
        }

        renderCV();
    }
}


/* =========================================================
   DONNÉES DU CV POUR LA LETTRE
   ========================================================= */

function createCVColorPicker(){ if(document.getElementById('cvColorPicker'))return; const preview=document.getElementById('cvPreview'); if(!preview)return; const wrapper=document.createElement('div'); wrapper.id='cvColorPicker'; wrapper.style.cssText=` background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin-bottom:15px; box-shadow:0 2px 6px rgba(0,0,0,.05); `; wrapper.innerHTML=` <div style=" display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:10px; flex-wrap:wrap;"> <div> <div style=" font-size:13px; font-weight:700; color:#1e293b;"> 🎨 Couleur du CV </div> <div style=" font-size:10px; color:#64748b; margin-top:2px;"> Personnalisez la couleur principale de votre CV </div> </div> <input type="color" id="customCVColor" value="${selectedCVColor}" title="Choisir une couleur" style=" width:42px; height:32px; padding:2px; border:1px solid #cbd5e1; border-radius:6px; cursor:pointer; background:white;"> </div> <div style=" display:flex; flex-wrap:wrap; gap:7px;"> ${CV_COLOR_PRESETS.map(color=>` <button type="button" class="cv-color-preset" data-color="${color}" title="${color}" style=" width:25px; height:25px; border-radius:50%; background:${color}; border:2px solid white; box-shadow:0 0 0 1px #cbd5e1; cursor:pointer;"> </button> `).join('')} </div> `; const title=document.getElementById('cvGeneratorTitle'); if(title){ title.insertAdjacentElement('afterend',wrapper); }else{ preview.parentNode.insertBefore(wrapper,preview); } const colorInput=document.getElementById('customCVColor'); if(colorInput){ colorInput.addEventListener('input',function(){ selectedCVColor=this.value; updateColorPickerSelection(); renderCV(); }); } wrapper.querySelectorAll('.cv-color-preset').forEach(button=>{ button.addEventListener('click',function(){ selectedCVColor=this.dataset.color; if(colorInput){ colorInput.value=selectedCVColor; } updateColorPickerSelection(); renderCV(); }); }); updateColorPickerSelection(); }

function applyCVColor(html){
    if(!html)return html;

    const color=selectedCVColor||'#3B5998';

    const colorMap={
        '#3b5998':color,
        '#3B5998':color,

        '#2b5b6c':color,
        '#2B5B6C':color,

        '#856404':color,
        '#2c3e50':color,
        '#2C3E50':color,

        '#1abc9c':color,
        '#1ABC9C':color,

        '#263F5B':color,
        '#263f5b':color,

        '#5B6C9B':color,
        '#5b6c9b':color,

        '#4F65F1':color,
        '#4f65f1':color,

        '#8A233A':color,
        '#8a233a':color,

        '#6B5B52':color,
        '#6b5b52':color
    };

    Object.keys(colorMap).forEach(oldColor=>{
        html=html.split(oldColor).join(colorMap[oldColor]);
    });

    return html;
}

function updateColorPickerSelection(){
    const picker=document.getElementById('cvColorPicker');

    if(!picker)return;

    const colorInput=document.getElementById('customCVColor');

    if(colorInput){
        colorInput.value=selectedCVColor;
    }

    picker.querySelectorAll('.cv-color-preset').forEach(button=>{
        const color=button.dataset.color;

        if(color.toLowerCase()===selectedCVColor.toLowerCase()){
            button.style.boxShadow=
                `0 0 0 2px white,0 0 0 4px ${selectedCVColor}`;

            button.style.transform='scale(1.12)';
        }else{
            button.style.boxShadow='0 0 0 1px #cbd5e1';
            button.style.transform='scale(1)';
        }
    });
}

function buildDiplomesSection(color){
    const valid=getValidDiplomes();
    if(!valid.length)return '';

    let html=`
        <div style="margin-bottom:20px;">
            <h3 style="
                font-size:13px;
                color:${color};
                text-transform:uppercase;
                border-bottom:1px solid #e5e7eb;
                padding-bottom:3px;
                margin-bottom:10px;
                font-weight:bold;">
                Diplômes
            </h3>
    `;

    valid.forEach(dip=>{
        html+=`
            <div style="
                margin-bottom:10px;
                break-inside:avoid;
                page-break-inside:avoid;">
                <table style="
                    width:100%;
                    border-collapse:collapse;
                    font-size:11px;">
                    <tr>
                        <td style="
                            font-weight:bold;
                            color:#333;
                            width:65%;">
                            ${escapeHTML(dip.title)}
                        </td>
                        <td style="
                            text-align:right;
                            font-weight:bold;
                            color:#555;
                            width:35%;">
                            ${escapeHTML(dip.year)}
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2" style="
                            color:${color};
                            font-size:10.5px;">
                            ${escapeHTML(dip.school)}
                        </td>
                    </tr>
                </table>
            </div>
        `;
    });

    return html+'</div>';
}
