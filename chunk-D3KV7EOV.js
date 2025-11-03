import{a as c}from"./chunk-3ZXX2K2L.js";import{N as g,R as m}from"./chunk-6W5NKFNP.js";import{i as d}from"./chunk-ODN5LVDJ.js";var p=class l{backendUrl="http://localhost:3001";sendEmail(e){return d(this,null,function*(){console.log("\u{1F504} ArubaMailService: Invio a backend locale:",this.backendUrl);try{let i=yield fetch(`${this.backendUrl}/api/send-email`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({to:e.to,subject:e.subject,text:e.text,html:e.html})});if(console.log("\u{1F4E8} Stato risposta backend:",i.status,i.statusText),!i.ok){let o=yield i.text();throw new Error(`HTTP ${i.status}: ${o}`)}let n=yield i.json();return console.log("\u2705 Risposta backend:",n),n}catch(i){return console.error("\u274C Errore ArubaMailService:",i),{success:!1,error:i.message||"Errore di connessione al server email"}}})}static \u0275fac=function(i){return new(i||l)};static \u0275prov=g({token:l,factory:l.\u0275fac,providedIn:"root"})};var f=class l{constructor(e){this.arubaMailService=e}defaultFromEmail=c.defaultFromEmail||"commerciale@prometheasrl.it";functionsUrl=`${c.supabase.url.replace(".supabase.co",".functions.supabase.co")}/send-email-smtp`;sendEmail(e){return d(this,null,function*(){console.log("\u{1F504} EmailService: Invio TRAMITE ARUBA a:",e.to);let i=yield this.arubaMailService.sendEmail({to:e.to,subject:e.subject,text:e.message,html:e.html||this.generateFallbackHtml(e.message)});return console.log("\u{1F4E8} Risposta ArubaMailService:",i),i})}generateFallbackHtml(e){return`
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <div style="white-space: pre-line;">${e}</div>
      </div>
    `}generateSingolaScadenzaMessage(e,i){let n=this.calcolaGiorniRimanenti(i.data_scadenza),o=new Date(i.data_scadenza).toLocaleDateString("it-IT");return`
Gentile ${e.referente||e.ragione_sociale},

le ricordiamo che il ${o} scade il seguente pagamento:

\u{1F4C5} ${i.tipo_scadenza}
\u{1F4B6} Importo: ${i.importo} \u20AC
\u{1F4CB} Scadenza: ${o}
\u23F3 Giorni rimanenti: ${n}

Per qualsiasi chiarimento, restiamo a disposizione.

Cordiali saluti,
Il team di Promethea S.r.l.
\u{1F4DE} Telefono: [inserisci telefono]
\u{1F310} Sito: [inserisci sito]
    `}generateTutteScadenzeMessage(e,i){let n=i.filter(t=>this.calcolaGiorniRimanenti(t.data_scadenza)<=t.giorni_avviso),o=i.filter(t=>this.calcolaGiorniRimanenti(t.data_scadenza)>t.giorni_avviso),a=`
Gentile ${e.referente||e.ragione_sociale},

ecco il riepilogo delle sue prossime scadenze fiscali:

`;return n.length>0&&(a+=`
\u26A0\uFE0F SCADENZE IMMINENTI:

`,n.forEach(t=>{let s=this.calcolaGiorniRimanenti(t.data_scadenza),r=new Date(t.data_scadenza).toLocaleDateString("it-IT");a+=`\u{1F4C5} ${t.tipo_scadenza}
`,a+=`   \u{1F4B6} ${t.importo} \u20AC
`,a+=`   \u{1F4CB} Scade il ${r} (tra ${s} giorni)
`,t.descrizione_altro&&(a+=`   \u{1F4DD} ${t.descrizione_altro}
`),a+=`
`})),o.length>0&&(a+=`
\u{1F4C5} PROSSIME SCADENZE:

`,o.forEach(t=>{let s=this.calcolaGiorniRimanenti(t.data_scadenza),r=new Date(t.data_scadenza).toLocaleDateString("it-IT");a+=`\u{1F4C5} ${t.tipo_scadenza}
`,a+=`   \u{1F4B6} ${t.importo} \u20AC
`,a+=`   \u{1F4CB} Scade il ${r} (tra ${s} giorni)
`,t.descrizione_altro&&(a+=`   \u{1F4DD} ${t.descrizione_altro}
`),a+=`
`})),a+=`
Per qualsiasi chiarimento o per prendere un appuntamento, restiamo a disposizione.

Cordiali saluti,
Il team di Promethea S.r.l.
\u{1F4DE} Telefono: [inserisci telefono]
\u{1F310} Sito: [inserisci sito]
    `,a}calcolaGiorniRimanenti(e){let i=new Date,o=new Date(e).getTime()-i.getTime();return Math.ceil(o/(1e3*60*60*24))}generateSottoTaskCompletionHtml(e,i,n){let o=r=>(r||"").toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),a=(n||[]).map(r=>`
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
        <div style="font-weight: 600; color: #32025f; margin-bottom: 4px;">${o(r.nome)}</div>
        ${r.data?`<div style="font-size: 13px; color: #666;">Scadenza: ${o(r.data)}</div>`:""}
        ${r.descrizione?`<div style="font-size: 13px; color: #444; margin-top:8px; line-height:1.4;">${o(r.descrizione)}</div>`:""}
      </td>
    </tr>
  `).join(""),t=e?.referente||e?.ragione_sociale||"Cliente",s=new Date().getFullYear();return`
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Promethea - Aggiornamento Attivit\xE0</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Inter', Arial, sans-serif; margin: 0; padding: 0; background-color: #f8f9fa; color: #0F0F0F; }
        .email-container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(159, 24, 147, 0.15); }
        .email-header { background: linear-gradient(135deg, #9F1893, #A50063, #EF0095); padding: 30px; text-align: center; color: #ffffff; }
        .email-logo { font-size: 28px; font-weight: 700; margin-bottom: 10px; letter-spacing: 0.5px; }
        .email-title { font-size: 20px; font-weight: 600; margin: 0; opacity: 0.95; }
        .email-body { padding: 30px; background: #ffffff; }
        .greeting { font-size: 16px; color: #0F0F0F; margin-bottom: 20px; line-height: 1.5; }
        .task-card { background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 12px; padding: 20px; margin: 20px 0; border-left: 4px solid #9F1893; }
        .task-title { font-size: 18px; font-weight: 700; color: #32025f; margin: 0 0 15px 0; }
        .details-table { width: 100%; border-collapse: collapse; }
        .section-title { font-size: 16px; font-weight: 600; color: #0F0F0F; margin: 25px 0 15px 0; padding-left: 10px; border-left: 3px solid #EF0095; }
        .footer { background: linear-gradient(135deg, #EF0095, #f8f9fa 20%, #9F1893 100%); padding: 25px 30px; text-align: center; color: #ffffff; font-size: 14px; }
        .contact-info { margin: 15px 0; font-size: 13px; opacity: 0.9; }
        .signature { margin-top: 20px; font-weight: 600; font-size: 15px; }
        .automated-notice { font-size: 12px; opacity: 0.7; margin-top: 20px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.3); }
        .badge { display: inline-block; padding: 6px 12px; background: rgba(159, 24, 147, 0.15); color: #9F1893; border-radius: 20px; font-size: 13px; font-weight: 600; margin: 5px 5px 5px 0; border: 1px solid rgba(159, 24, 147, 0.3); }
        @media (max-width: 600px) {
            .email-body { padding: 20px; }
            .email-header { padding: 20px; }
            .task-card { padding: 15px; }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <div class="email-logo">PROMETHEA S.R.L.</div>
            <h1 class="email-title">Aggiornamento Attivit\xE0 Completata</h1>
        </div>
        <div class="email-body">
            <div class="greeting">
                Gentile <strong>${o(t)}</strong>,<br>
                la informiamo che la seguente attivit\xE0 \xE8 stata completata con successo dal nostro team.
            </div>
            <div class="task-card">
                <h2 class="task-title">${o(i)}</h2>
                <div class="badge">STATO: COMPLETATO</div>
            </div>
            <h3 class="section-title">DETTAGLI COMPLETATI</h3>
            <table class="details-table">
                ${a}
            </table>
            <div style="margin-top: 25px; padding: 15px; background: rgba(239, 0, 149, 0.05); border-radius: 8px; border-left: 3px solid #EF0095;">
                <p style="margin: 0; color: #0F0F0F; line-height: 1.5;">
                    <strong>Per qualsiasi chiarimento o necessit\xE0</strong>, restiamo a sua completa disposizione.<br>
                    Il nostro team \xE8 sempre pronto a supportarla nel raggiungimento dei suoi obiettivi.
                </p>
            </div>
        </div>
        <div class="footer">
            <div class="signature">Con i migliori saluti,<br>Il Team di <strong>Promethea S.r.l.</strong></div>
            <div class="contact-info">
                \u{1F4E7} commerciale@prometheasrl.it<br>
                \u{1F310} www.prometheasrl.it
            </div>
            <div class="automated-notice">
                Questo messaggio \xE8 stato generato automaticamente.<br>
                &copy; ${s} Promethea S.r.l. - Tutti i diritti riservati.
            </div>
        </div>
    </div>
</body>
</html>
  `}generateIntroEmailHtml(e,i){let n=h=>(h||"").toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),o=e?.referente||e?.ragione_sociale||"Gentile Cliente",a=n(i||""),t=new Date().getFullYear(),s=typeof c<"u"&&c.frontendUrl?c.frontendUrl.replace(/\/$/,""):"",r=s?`${s}/assets/logo.png`:"cid:logo",u=s?`${s}/assets/logo-light.png`:"cid:logo_light";return`
<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Presentazione Promethea</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');
  body { font-family: 'Inter', Arial, sans-serif; margin:0; padding:0; background:#ffffff; color:#000000; }
  .container { max-width:680px; margin:0 auto; padding:28px; background:#ffffff; }
  .header { text-align:left; padding-bottom:12px; border-bottom:1px solid #eee; display:flex; align-items:center; gap:12px; }
  .logo { width:140px; height:auto; display:block; }
  .title { font-size:20px; font-weight:700; color:#000; margin:0; }
  .lead { margin:18px 0 6px; line-height:1.5; color:#111; }
  h3 { margin:16px 0 8px; color:#111; font-size:16px; }
  p { margin:8px 0; color:#111; line-height:1.5; }
  .section { padding:12px 0; border-top:1px solid #f4f4f4; }
  .signature { margin-top:20px; font-weight:600; color:#000; }
  .contact { margin-top:12px; font-size:13px; color:#333; line-height:1.45; }
  .contact div { margin:3px 0; } /* ogni informazione su riga separata */
  .disclaimer { margin-top:18px; font-size:12px; color:#555; font-style: italic; line-height:1.3; }
  .footer { margin-top:40px; border-top:1px solid #f0f0f0; padding-top:18px; font-size:13px; color:#333; display:flex; gap:12px; align-items:center; }
  .footer .footer-info { flex:1; }
  .footer-logo { width:100px; height:auto; display:block; }
  @media (max-width:600px){ .container{ padding:16px; } .logo{ width:110px; } .footer { flex-direction:column; align-items:flex-start; } .footer-logo{ width:120px; } }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img class="logo" src="${r}" alt="Promethea" />
      <div>
        <div class="title">Presentazione Promethea S.r.l.</div>
      </div>
    </div>

    <p class="lead">Gentile <strong>${n(o)}</strong>,</p>

    <p>la ringrazio per l\u2019interesse dimostrato verso <strong>Promethea S.r.l.</strong>. Di seguito trovate una sintesi delle nostre competenze e delle soluzioni che offriamo:</p>

    <div class="section">
      <h3>Chi siamo</h3>
      <p>Promethea S.r.l., con sede operativa a Trieste, \xE8 una realt\xE0 giovane e dinamica specializzata in consulenza aziendale integrata. Il nostro team multidisciplinare supporta le imprese nella crescita e nell\u2019innovazione, combinando competenze manageriali, di marketing, digitali e finanziarie.</p>
    </div>

    <div class="section">
      <h3>Le nostre aree di intervento</h3>
      <p><strong>Ottimizzazione & Management:</strong> formazione manageriale, reengineering dei processi, sviluppo del capitale umano.</p>
      <p><strong>Immagine & Marketing:</strong> branding, strategie social media, comunicazione integrata e produzione grafica.</p>
      <p><strong>Digitalizzazione & Automatismi:</strong> sviluppo di software personalizzati (ERP, CRM, BI), automazione dei flussi, integrazioni IoT e soluzioni cloud-native.</p>
      <p><strong>Contabilit\xE0 & Fiscalit\xE0:</strong> gestione contabile, consulenza fiscale, controllo di gestione e budgeting.</p>
    </div>

    <div class="section">
      <h3>Software su misura</h3>
      <p>Realizziamo applicazioni desktop, web e mobile, progettate secondo le specifiche esigenze del cliente. Il nostro processo include:</p>
      <ul>
        <li>Analisi dei requisiti</li>
        <li>Progettazione dell\u2019architettura e prototipazione</li>
        <li>Sviluppo Agile con rilasci incrementali</li>
        <li>Deploy & Training per gli utenti finali</li>
        <li>Supporto continuativo e manutenzione evolutiva</li>
      </ul>
    </div>

    <p class="signature">Resto a disposizione per organizzare un incontro (in presenza o in videoconferenza).<br/>Cordiali saluti,<br/>${a?`<span>${a}</span>`:"<span>Il Team di Promethea S.r.l.</span>"}</p>

    <div class="contact">
      <div><strong>PROMETHEA S.R.L.</strong></div>
      <div>VIA DELLA GINNASTICA, 21/A - 34125 TRIESTE (TS)</div>
      <div>TEL: +39 040 9932100</div>
      <div>PH: +39 346 3107902</div>
      <div>EMAIL: INFO@PROMETHEASRL.IT</div>
      <div>WEBSITE: www.prometheasrl.it</div>
    </div>

    <div class="disclaimer">
      Avvertenza ai sensi del D.Lgs. nr 196/2003 e del GDPR. Si precisa che le informazioni contenute in questo messaggio e negli eventuali allegati sono riservate ed a uso esclusivo del destinatario e per conoscenza dei soli soggetti eventualmente in copia. Qualora il messaggio in oggetto Le fosse pervenuto per errore, La invitiamo ad eliminarlo senza copiarlo e a non inoltrarlo a terzi, dandocene gentilmente comunicazione. Grazie.<br/><br/>
      You are hereby informed that this message, including any possible attachments, contains confidential information intended for the exclusive use of addressee and of subjects - if any - reading this message in copy. If you are not the addressee, and have received this message by mistake, please delete it and immediately notify us. You must not copy or disseminate this message to any third party. Thank you.
    </div>

    <div class="footer">
      <div class="footer-info">
        &copy; ${t} Promethea S.r.l.
      </div>
      <img class="footer-logo" src="${u}" alt="Promethea" />
    </div>
  </div>
</body>
</html>
    `}static \u0275fac=function(i){return new(i||l)(m(p))};static \u0275prov=g({token:l,factory:l.\u0275fac,providedIn:"root"})};export{f as a};
