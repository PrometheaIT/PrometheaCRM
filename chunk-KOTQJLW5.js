import{a as m}from"./chunk-5QACXCZZ.js";import{N as c,R as p}from"./chunk-CPJK23XT.js";import{i as d}from"./chunk-ODN5LVDJ.js";var g=class l{backendUrl="http://backend-jnk7.onrender.com2";sendEmail(e){return d(this,null,function*(){console.log("\u{1F504} ArubaMailService: Invio a backend locale:",this.backendUrl);let t={to:e.to,subject:e.subject,text:e.text,html:e.html,mailType:e.mailType,attachments:(e.attachments||[]).filter(i=>{if(!i)return!1;if(i.cid)return console.log("\u274C ArubaMailService: Scartato allegato con CID:",i.cid),!1;let o=(i.contentType||"").toString().toLowerCase();if(o.startsWith("image/"))return console.log("\u274C ArubaMailService: Scartato allegato immagine (contentType):",o),!1;let a=(i.filename||i.path||"").toString().toLowerCase();return/\.(png|jpe?g|gif|bmp|webp|svg)$/.test(a)?(console.log("\u274C ArubaMailService: Scartato allegato immagine (estensione):",a),!1):(console.log("\u2705 ArubaMailService: Allegato accettato:",a),!0)})};console.log("\u{1F50E} ArubaMailService payload COMPLETO:",{to:t.to,subject:t.subject,mailType:t.mailType,attachmentsCount:t.attachments.length,attachments:t.attachments.map(i=>({filename:i.filename,path:i.path,contentType:i.contentType})),htmlLength:t.html?.length,textLength:t.text?.length});try{let i=yield fetch(`${this.backendUrl}/api/send-email`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});console.log("\u{1F4E8} Stato risposta backend:",i.status,i.statusText);let o=yield i.text(),a;try{a=JSON.parse(o)}catch{a={success:i.ok,raw:o}}return i.ok?(console.log("\u2705 Risposta backend:",a),a):(console.error("\u274C Backend error body:",o),{success:!1,error:a?.error||`HTTP ${i.status}: ${o}`})}catch(i){return console.error("\u274C Errore ArubaMailService:",i),{success:!1,error:i.message||"Errore di connessione al server email"}}})}static \u0275fac=function(t){return new(t||l)};static \u0275prov=c({token:l,factory:l.\u0275fac,providedIn:"root"})};var f=class l{constructor(e){this.arubaMailService=e}defaultFromEmail=m.defaultFromEmail||"commerciale@prometheasrl.it";sendEmail(e){return d(this,null,function*(){console.log("\u{1F504} EmailService: Invio TRAMITE ARUBA a:",e.to);let t=yield this.arubaMailService.sendEmail({to:e.to,subject:e.subject,text:e.message,html:e.html||this.generateFallbackHtml(e.message),attachments:e.attachments||[]});return console.log("\u{1F4E8} Risposta ArubaMailService:",t),t})}generateFallbackHtml(e){return`
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <div style="white-space: pre-line;">${e}</div>
      </div>
    `}generateSingolaScadenzaMessage(e,t){let i=this.calcolaGiorniRimanenti(t.data_scadenza),o=new Date(t.data_scadenza).toLocaleDateString("it-IT");return`
Gentile ${e.referente||e.ragione_sociale},

le ricordiamo che il ${o} scade il seguente pagamento:

\u{1F4C5} ${t.tipo_scadenza}
\u{1F4B6} Importo: ${t.importo} \u20AC
\u{1F4CB} Scadenza: ${o}
\u23F3 Giorni rimanenti: ${i}

Per qualsiasi chiarimento, restiamo a disposizione.

Cordiali saluti,
Il team di Promethea S.r.l.
\u{1F4DE} Telefono: [inserisci telefono]
\u{1F310} Sito: [inserisci sito]
    `}generateTutteScadenzeMessage(e,t){let i=t.filter(n=>this.calcolaGiorniRimanenti(n.data_scadenza)<=n.giorni_avviso),o=t.filter(n=>this.calcolaGiorniRimanenti(n.data_scadenza)>n.giorni_avviso),a=`
Gentile ${e.referente||e.ragione_sociale},

ecco il riepilogo delle sue prossime scadenze fiscali:

`;return i.length>0&&(a+=`
\u26A0\uFE0F SCADENZE IMMINENTI:

`,i.forEach(n=>{let s=this.calcolaGiorniRimanenti(n.data_scadenza),r=new Date(n.data_scadenza).toLocaleDateString("it-IT");a+=`\u{1F4C5} ${n.tipo_scadenza}
`,a+=`   \u{1F4B6} ${n.importo} \u20AC
`,a+=`   \u{1F4CB} Scade il ${r} (tra ${s} giorni)
`,n.descrizione_altro&&(a+=`   \u{1F4DD} ${n.descrizione_altro}
`),a+=`
`})),o.length>0&&(a+=`
\u{1F4C5} PROSSIME SCADENZE:

`,o.forEach(n=>{let s=this.calcolaGiorniRimanenti(n.data_scadenza),r=new Date(n.data_scadenza).toLocaleDateString("it-IT");a+=`\u{1F4C5} ${n.tipo_scadenza}
`,a+=`   \u{1F4B6} ${n.importo} \u20AC
`,a+=`   \u{1F4CB} Scade il ${r} (tra ${s} giorni)
`,n.descrizione_altro&&(a+=`   \u{1F4DD} ${n.descrizione_altro}
`),a+=`
`})),a+=`
Per qualsiasi chiarimento o per prendere un appuntamento, restiamo a disposizione.

Cordiali saluti,
Il team di Promethea S.r.l.
\u{1F4DE} Telefono: [inserisci telefono]
\u{1F310} Sito: [inserisci sito]
    `,a}calcolaGiorniRimanenti(e){let t=new Date,o=new Date(e).getTime()-t.getTime();return Math.ceil(o/(1e3*60*60*24))}generateSottoTaskCompletionHtml(e,t,i){let o=r=>(r||"").toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),a=(i||[]).map(r=>`
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
          <div style="font-weight: 600; color: #32025f; margin-bottom: 4px;">${o(r.nome)}</div>
          ${r.data?`<div style="font-size: 13px; color: #666;">Scadenza: ${o(r.data)}</div>`:""}
          ${r.descrizione?`<div style="font-size: 13px; color: #444; margin-top:8px; line-height:1.4;">${o(r.descrizione)}</div>`:""}
        </td>
      </tr>
    `).join(""),n=e?.referente||e?.ragione_sociale||"Cliente",s=new Date().getFullYear();return`
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
                Gentile <strong>${o(n)}</strong>,<br>
                la informiamo che la seguente attivit\xE0 \xE8 stata completata con successo dal nostro team.
            </div>
            <div class="task-card">
                <h2 class="task-title">${o(t)}</h2>
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
    `}generateIntroEmailHtml(e,t){let i=s=>(s||"").toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),o=e?.referente||e?.ragione_sociale||"Gentile Cliente",a=i(t||""),n=new Date().getFullYear();return`
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
    .contact div { margin:3px 0; }
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
      <div class="company-name">PROMETHEA S.R.L.</div>
        <div>
          <div class="title">Presentazione Promethea S.r.l.</div>
        </div>
      </div>

      <p class="lead">Gentile <strong>${i(o)}</strong>,</p>

      <p>la ringrazio per l'interesse dimostrato verso <strong>Promethea S.r.l.</strong>. Di seguito trovate una sintesi delle nostre competenze e delle soluzioni che offriamo:</p>

      <div class="section">
        <h3>Chi siamo</h3>
        <p>Promethea S.r.l., con sede operativa a Trieste, \xE8 una realt\xE0 giovane e dinamica specializzata in consulenza aziendale integrata. Il nostro team multidisciplinare supporta le imprese nella crescita e nell'innovazione, combinando competenze manageriali, di marketing, digitali e finanziarie.</p>
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
          <li>Analisi dei requisits</li>
          <li>Progettazione dell'architettura e prototipazione</li>
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
          &copy; ${n} Promethea S.r.l.
        </div>
      </div>
    </div>
  </body>
  </html>
      `}sendPrometheaIntroEmail(e,t,i){return d(this,null,function*(){if(!e)return{success:!1,error:"Destinatario mancante"};let o=this.generatePrometheaEmailHtml(t,i),a="Presentazione Promethea S.r.l.",n=`Presentazione Promethea per ${t?.ragione_sociale||t?.referente||""}`,s=[];try{return yield this.arubaMailService.sendEmail({to:e,subject:a,text:n,html:o,attachments:s,mailType:"promethea"})}catch(r){return console.error("Errore sendPrometheaIntroEmail:",r),{success:!1,error:r?.message||"Errore invio"}}})}generatePrometheaEmailHtml(e,t){let i=s=>(s||"").toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),o=e?.referente||e?.ragione_sociale||"Gentile Cliente",a=i(t||""),n=new Date().getFullYear();return`
<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Presentazione Promethea</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');
  body { font-family: 'Inter', Arial, sans-serif; margin:0; padding:0; background:#ffffff; color:#000000; }
  .container { max-width:680px; margin:0 auto; padding:28px; background:#ffffff; border: 1px solid #e0e0e0; border-radius: 8px; }
  .header { text-align:center; padding-bottom:20px; border-bottom:2px solid #9F1893; margin-bottom:20px; }
  .company-name { font-size:24px; font-weight:700; color:#9F1893; margin:10px 0 5px 0; }
  .company-subtitle { font-size:16px; color:#666; margin-bottom:15px; }
  .title { font-size:20px; font-weight:700; color:#000; margin:20px 0 10px 0; }
  .lead { margin:18px 0 6px; line-height:1.5; color:#111; }
  h3 { margin:16px 0 8px; color:#9F1893; font-size:16px; font-weight:600; }
  p { margin:8px 0; color:#111; line-height:1.5; }
  ul { margin:8px 0; padding-left:20px; }
  li { margin:6px 0; line-height:1.5; }
  .section { padding:12px 0; border-top:1px solid #f4f4f4; }
  .signature { margin-top:20px; font-weight:600; color:#000; }
  .contact { margin-top:12px; font-size:13px; color:#333; line-height:1.45; background:#f9f9f9; padding:15px; border-radius:5px; }
  .contact div { margin:3px 0; }
  .disclaimer { margin-top:18px; font-size:12px; color:#555; font-style: italic; line-height:1.3; background:#f5f5f5; padding:15px; border-radius:5px; }
  .footer { margin-top:40px; border-top:1px solid #f0f0f0; padding-top:18px; font-size:13px; color:#333; text-align:center; }
  .highlight { background: linear-gradient(135deg, #9F1893, #A50063, #EF0095); color:white; padding:25px; border-radius:8px; margin:20px 0; text-align:center; }
  .highlight h2 { margin:0 0 10px 0; font-size:20px; }
  @media (max-width:600px){ .container{ padding:16px; } }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="company-name">PROMETHEA S.R.L.</div>
      <div class="company-subtitle">making life easier</div>
    </div>

    <div class="highlight">
      <h2>Presentazione Aziendale</h2>
      <p>Ottimizziamo le imprese a 360\xB0</p>
    </div>

    <p class="lead">Gentile <strong>${i(o)}</strong>,</p>

    <p>la ringrazio per l'interesse dimostrato verso <strong>Promethea S.r.l.</strong>. Di seguito trovate una sintesi delle nostre competenze e delle soluzioni che offriamo:</p>

    <div class="section">
      <h3>Chi siamo</h3>
      <p>Promethea S.r.l., con sede operativa a Trieste, \xE8 una realt\xE0 giovane e dinamica specializzata in consulenza aziendale integrata. Il nostro team multidisciplinare supporta le imprese nella crescita e nell'innovazione, combinando competenze manageriali, di marketing, digitali e finanziarie.</p>
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
        <li>Progettazione dell'architettura e prototipazione</li>
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
      <div>
        &copy; ${n} Promethea S.r.l. - Tutti i diritti riservati
      </div>
    </div>
  </div>
</body>
</html>
    `}sendYuviPartnerEmail(e,t,i,o){return d(this,null,function*(){if(!e)return{success:!1,error:"Destinatario mancante"};let a=this.generateYuviEmailHtml(t,i),n="Presentazione YUVI - Promethea",s=`Presentazione YUVI per ${t?.ragione_sociale||t?.referente||""}`;try{return yield this.arubaMailService.sendEmail({to:e,subject:n,text:s,html:a,attachments:o||[],mailType:"yuvi"})}catch(r){return console.error("Errore sendYuviPartnerEmail:",r),{success:!1,error:r?.message||"Errore invio"}}})}generateEmailTextInterna(e,t){let i=(t||[]).map(o=>`\u2022 ${o.nome}${o.data?` (Scadenza: ${o.data})`:""}${o.descrizione?` \u2014 ${o.descrizione}`:""}`).join(`
`);return`
Completamento attivit\xE0 interna:

SOTTO-TASK: ${e}

DETTAGLI COMPLETATI:
${i}

Questa email \xE8 stata generata automaticamente dal sistema di gestione task.

Cordiali saluti,
Sistema di Gestione Task Promethea
    `.trim()}generateEmailHtmlInterna(e,t){let i=n=>(n||"").toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),o=(t||[]).map(n=>`
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
          <div style="font-weight: 600; color: #32025f; margin-bottom: 4px;">${i(n.nome)}</div>
          ${n.data?`<div style="font-size: 13px; color: #666;">Scadenza: ${i(n.data)}</div>`:""}
          ${n.descrizione?`<div style="font-size: 13px; color: #444; margin-top:8px; line-height:1.4;">${i(n.descrizione)}</div>`:""}
        </td>
      </tr>
    `).join(""),a=new Date().getFullYear();return`
<!DOCTYPE html><html lang="it"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Completamento Attivit\xE0 Interna - Promethea</title></head><body>
  <div style="max-width:600px;margin:0 auto;background:#fff;padding:0 0 24px;border-radius:10px;">
    <div style="padding:30px;text-align:center;background:#666;color:#fff;">
      <div style="font-size:20px;font-weight:700;">ATTIVIT\xC0 INTERNA</div>
    </div>
    <div style="padding:30px;background:#fff;">
      <h2 style="margin:0 0 12px">${i(e)}</h2>
      <table style="width:100%;border-collapse:collapse;">${o}</table>
    </div>
    <div style="padding:20px;text-align:center;color:#666;font-size:12px;">Questo messaggio \xE8 stato generato automaticamente. &copy; ${a} Promethea S.r.l.</div>
  </div>
</body></html>
    `}generateYuviEmailHtml(e,t){let i=s=>(s||"").toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;"),o=e?.referente||e?.ragione_sociale||"Gentile Cliente",a=i(t||""),n=new Date().getFullYear();return`
<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Presentazione YUVI - Promethea</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');
  body { font-family: 'Inter', Arial, sans-serif; margin:0; padding:0; background:#ffffff; color:#000000; }
  .container { max-width:680px; margin:0 auto; padding:28px; background:#ffffff; border: 1px solid #e0e0e0; border-radius: 8px; }
  .header { text-align:center; padding-bottom:20px; border-bottom:2px solid #0075DB; margin-bottom:20px; }
  .company-name { font-size:24px; font-weight:700; color:#0075DB; margin:10px 0 5px 0; }
  .product-name { font-size:28px; font-weight:700; color:#0075DB; margin:15px 0; }
  .title { font-size:20px; font-weight:700; color:#000; margin:20px 0 10px 0; }
  .lead { margin:18px 0 6px; line-height:1.5; color:#111; }
  h3 { margin:16px 0 8px; color:#0075DB; font-size:16px; font-weight:600; }
  p { margin:8px 0; color:#111; line-height:1.5; }
  ul { margin:8px 0; padding-left:20px; }
  li { margin:6px 0; line-height:1.5; }
  .section { padding:12px 0; border-top:1px solid #f4f4f4; }
  .signature { margin-top:20px; font-weight:600; color:#000; }
  .contact { margin-top:12px; font-size:13px; color:#333; line-height:1.45; background:#f9f9f9; padding:15px; border-radius:5px; }
  .contact div { margin:3px 0; }
  .disclaimer { margin-top:18px; font-size:12px; color:#555; font-style: italic; line-height:1.3; background:#f5f5f5; padding:15px; border-radius:5px; }
  .footer { margin-top:40px; border-top:1px solid #f0f0f0; padding-top:18px; font-size:13px; color:#333; text-align:center; }
  .highlight { background: linear-gradient(135deg, #0075DB, #9C0485); color:white; padding:25px; border-radius:8px; margin:20px 0; text-align:center; }
  .highlight h2 { margin:0 0 10px 0; font-size:20px; }
  .feature { background:#f8f9fa; padding:15px; border-radius:5px; margin:10px 0; border-left:4px solid #0075DB; }
  @media (max-width:600px){ .container{ padding:16px; } }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="company-name">PROMETHEA S.R.L.</div>
      <div class="product-name">YUVI</div>
      <div>Piattaforma Innovativa per la Gestione Aziendale</div>
    </div>

    <div class="highlight">
      <h2>Presentazione Soluzione YUVI</h2>
      <p>Efficienza, Automazione, Risultati Misurabili</p>
    </div>

    <p class="lead">Gentile <strong>${i(o)}</strong>,</p>

    <p>la ringrazio per l'interesse dimostrato verso <strong>YUVI</strong>, la nostra piattaforma innovativa sviluppata per ottimizzare la gestione aziendale e migliorare l'efficienza operativa.</p>

    <div class="section">
      <h3>Cos'\xE8 YUVI</h3>
      <p>YUVI \xE8 una soluzione completa che integra tutte le funzionalit\xE0 necessarie per gestire in modo efficiente i processi aziendali, dall'amministrazione alla produzione, dal commerciale al marketing.</p>
    </div>

    <div class="section">
      <h3>Caratteristiche principali</h3>
      
      <div class="feature">
        <strong>Automazione dei processi:</strong> Riduzione dei tempi e degli errori nelle operazioni ripetitive.
      </div>
      
      <div class="feature">
        <strong>Analisi dati avanzata:</strong> Reportistica in tempo reale e insights per decisioni informate.
      </div>
      
      <div class="feature">
        <strong>Integrazione completa:</strong> Compatibilit\xE0 con i sistemi esistenti e soluzioni personalizzate.
      </div>
      
      <div class="feature">
        <strong>Gestione documentale:</strong> Archiviazione sicura e organizzata di tutti i documenti aziendali.
      </div>
    </div>

    <div class="section">
      <h3>Vantaggi per la tua azienda</h3>
      <ul>
        <li><strong>Riduzione dei costi operativi</strong> fino al 40%</li>
        <li><strong>Maggior controllo</strong> su tutti i processi aziendali</li>
        <li><strong>Decisioni pi\xF9 rapide</strong> basate su dati reali</li>
        <li><strong>Scalabilit\xE0</strong> per accompagnare la crescita dell'azienda</li>
        <li><strong>Supporto continuo</strong> del nostro team specializzato</li>
      </ul>
    </div>

    <p class="signature">Resto a disposizione per organizzare una dimostrazione personalizzata (in presenza o in videoconferenza).<br/>Cordiali saluti,<br/>${a?`<span>${a}</span>`:"<span>Il Team di Promethea S.r.l.</span>"}</p>

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
      <div>
        &copy; ${n} Promethea S.r.l. - Tutti i diritti riservati
      </div>
    </div>
  </div>
</body>
</html>
    `}static \u0275fac=function(t){return new(t||l)(p(g))};static \u0275prov=c({token:l,factory:l.\u0275fac,providedIn:"root"})};export{f as a};
