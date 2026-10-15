const resignationI18n = {
    fr: {
        dear: "Madame, Monsieur",
        objet: "Démission de mon poste",
        sincerely: "Cordialement,",
        notice: "Conformément aux clauses de mon contrat et aux dispositions en vigueur, j'effectuerai mon préavis d'une durée de",
        thank: "Je tiens à vous remercier pour les opportunités qui m'ont été offertes durant mon parcours au sein de votre structure.",
        transition: "Je reste à votre entière disposition pour assurer une transition fluide de mes dossiers avant mon départ."
    },
    mg: {
        dear: "Andriamatoa / Rtoa Tompoko",
        objet: "Fametraham-pialana amin'ny toeram-piasana",
        sincerely: "Mankasitraka tompoko,",
        notice: "Araka ny fifanarahana tamin'ny orinasa sy ny lalàna manan-kery dia hanao ny fe-potoana fampandrenesana mandritra ny",
        thank: "Misaotra anao tamin'ireo fahafahana nandrato fahalalana sy traikefa maro ary ny fiaraha-miasa nandritra ny fotoana niasako tato amin'ny orinasa izay niandraiketanao.",
        transition: "Vonona aho hanampy amin'ny famindrana ny asa mba tsy hisy fikorontanana alohan'ny andehanako."
    },
    en: {
        dear: "Dear Manager,",
        objet: "Resignation Notice",
        sincerely: "Sincerely,",
        notice: "In accordance with my employment contract and company policies, I will serve my notice period of",
        thank: "I would like to thank you for the opportunities provided during my time with the organization.",
        transition: "I remain at your complete disposal to ensure a smooth transition of my duties before my departure."
    }
};

function getLang() {
    const select = document.getElementById('docLanguage');
    return select ? select.value : 'fr';
}