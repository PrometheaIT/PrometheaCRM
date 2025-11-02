import{a as m}from"./chunk-3ZXX2K2L.js";import{N as c,R as p}from"./chunk-6W5NKFNP.js";import{i as l}from"./chunk-ODN5LVDJ.js";var d=class n{backendUrl="http://localhost:3001";sendEmail(t){return l(this,null,function*(){console.log("\u{1F504} ArubaMailService: Invio a backend locale:",this.backendUrl);try{let e=yield fetch(`${this.backendUrl}/api/send-email`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({to:t.to,subject:t.subject,text:t.text,html:t.html})});if(console.log("\u{1F4E8} Stato risposta backend:",e.status,e.statusText),!e.ok){let o=yield e.text();throw new Error(`HTTP ${e.status}: ${o}`)}let r=yield e.json();return console.log("\u2705 Risposta backend:",r),r}catch(e){return console.error("\u274C Errore ArubaMailService:",e),{success:!1,error:e.message||"Errore di connessione al server email"}}})}static \u0275fac=function(e){return new(e||n)};static \u0275prov=c({token:n,factory:n.\u0275fac,providedIn:"root"})};var f=class n{constructor(t){this.arubaMailService=t}defaultFromEmail=m.defaultFromEmail||"commerciale@prometheasrl.it";functionsUrl=`${m.supabase.url.replace(".supabase.co",".functions.supabase.co")}/send-email-smtp`;sendEmail(t){return l(this,null,function*(){console.log("\u{1F504} EmailService: Invio TRAMITE ARUBA a:",t.to);let e=yield this.arubaMailService.sendEmail({to:t.to,subject:t.subject,text:t.message,html:t.html||this.generateFallbackHtml(t.message)});return console.log("\u{1F4E8} Risposta ArubaMailService:",e),e})}generateFallbackHtml(t){return`
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <div style="white-space: pre-line;">${t}</div>
      </div>
    `}generateSingolaScadenzaMessage(t,e){let r=this.calcolaGiorniRimanenti(e.data_scadenza),o=new Date(e.data_scadenza).toLocaleDateString("it-IT");return`
Gentile ${t.referente||t.ragione_sociale},

le ricordiamo che il ${o} scade il seguente pagamento:

\u{1F4C5} ${e.tipo_scadenza}
\u{1F4B6} Importo: ${e.importo} \u20AC
\u{1F4CB} Scadenza: ${o}
\u23F3 Giorni rimanenti: ${r}

Per qualsiasi chiarimento, restiamo a disposizione.

Cordiali saluti,
Il team di Promethea S.r.l.
\u{1F4DE} Telefono: [inserisci telefono]
\u{1F310} Sito: [inserisci sito]
    `}generateTutteScadenzeMessage(t,e){let r=e.filter(i=>this.calcolaGiorniRimanenti(i.data_scadenza)<=i.giorni_avviso),o=e.filter(i=>this.calcolaGiorniRimanenti(i.data_scadenza)>i.giorni_avviso),a=`
Gentile ${t.referente||t.ragione_sociale},

ecco il riepilogo delle sue prossime scadenze fiscali:

`;return r.length>0&&(a+=`
\u26A0\uFE0F SCADENZE IMMINENTI:

`,r.forEach(i=>{let s=this.calcolaGiorniRimanenti(i.data_scadenza),g=new Date(i.data_scadenza).toLocaleDateString("it-IT");a+=`\u{1F4C5} ${i.tipo_scadenza}
`,a+=`   \u{1F4B6} ${i.importo} \u20AC
`,a+=`   \u{1F4CB} Scade il ${g} (tra ${s} giorni)
`,i.descrizione_altro&&(a+=`   \u{1F4DD} ${i.descrizione_altro}
`),a+=`
`})),o.length>0&&(a+=`
\u{1F4C5} PROSSIME SCADENZE:

`,o.forEach(i=>{let s=this.calcolaGiorniRimanenti(i.data_scadenza),g=new Date(i.data_scadenza).toLocaleDateString("it-IT");a+=`\u{1F4C5} ${i.tipo_scadenza}
`,a+=`   \u{1F4B6} ${i.importo} \u20AC
`,a+=`   \u{1F4CB} Scade il ${g} (tra ${s} giorni)
`,i.descrizione_altro&&(a+=`   \u{1F4DD} ${i.descrizione_altro}
`),a+=`
`})),a+=`
Per qualsiasi chiarimento o per prendere un appuntamento, restiamo a disposizione.

Cordiali saluti,
Il team di Promethea S.r.l.
\u{1F4DE} Telefono: [inserisci telefono]
\u{1F310} Sito: [inserisci sito]
    `,a}calcolaGiorniRimanenti(t){let e=new Date,o=new Date(t).getTime()-e.getTime();return Math.ceil(o/(1e3*60*60*24))}generateSottoTaskCompletionHtml(t,e,r){let o=r.map(s=>`
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0;">
        <div style="font-weight: 600; color: #32025f; margin-bottom: 4px;">${s.nome}</div>
        ${s.data?`<div style="font-size: 13px; color: #666;">Scadenza: ${s.data}</div>`:""}
      </td>
    </tr>
  `).join(""),a=t.referente||t.ragione_sociale||"Cliente",i=new Date().getFullYear();return`
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Promethea - Aggiornamento Attivit\xE0</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        body {
            font-family: 'Inter', Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
            color: #0F0F0F;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(159, 24, 147, 0.15);
        }
        
        .email-header {
            background: linear-gradient(135deg, #9F1893, #A50063, #EF0095);
            padding: 30px;
            text-align: center;
            color: #ffffff;
        }
        
        .email-logo {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 10px;
            letter-spacing: 0.5px;
        }
        
        .email-title {
            font-size: 20px;
            font-weight: 600;
            margin: 0;
            opacity: 0.95;
        }
        
        .email-body {
            padding: 30px;
            background: #ffffff;
        }
        
        .greeting {
            font-size: 16px;
            color: #0F0F0F;
            margin-bottom: 20px;
            line-height: 1.5;
        }
        
        .task-card {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 12px;
            padding: 20px;
            margin: 20px 0;
            border-left: 4px solid #9F1893;
        }
        
        .task-title {
            font-size: 18px;
            font-weight: 700;
            color: #32025f;
            margin: 0 0 15px 0;
        }
        
        .details-table {
            width: 100%;
            border-collapse: collapse;
        }
        
        .section-title {
            font-size: 16px;
            font-weight: 600;
            color: #0F0F0F;
            margin: 25px 0 15px 0;
            padding-left: 10px;
            border-left: 3px solid #EF0095;
        }
        
        .footer {
            background: linear-gradient(135deg, #EF0095, #f8f9fa 20%, #9F1893 100%);
            padding: 25px 30px;
            text-align: center;
            color: #ffffff;
            font-size: 14px;
        }
        
        .contact-info {
            margin: 15px 0;
            font-size: 13px;
            opacity: 0.9;
        }
        
        .signature {
            margin-top: 20px;
            font-weight: 600;
            font-size: 15px;
        }
        
        .automated-notice {
            font-size: 12px;
            opacity: 0.7;
            margin-top: 20px;
            padding-top: 15px;
            border-top: 1px solid rgba(255,255,255,0.3);
        }
        
        .badge {
            display: inline-block;
            padding: 6px 12px;
            background: rgba(159, 24, 147, 0.15);
            color: #9F1893;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 600;
            margin: 5px 5px 5px 0;
            border: 1px solid rgba(159, 24, 147, 0.3);
        }
        
        @media (max-width: 600px) {
            .email-body {
                padding: 20px;
            }
            
            .email-header {
                padding: 20px;
            }
            
            .task-card {
                padding: 15px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="email-header">
            <div class="email-logo">PROMETHEA S.R.L.</div>
            <h1 class="email-title">Aggiornamento Attivit\xE0 Completata</h1>
        </div>
        
        <!-- Body -->
        <div class="email-body">
            <div class="greeting">
                Gentile <strong>${a}</strong>,<br>
                la informiamo che la seguente attivit\xE0 \xE8 stata completata con successo dal nostro team.
            </div>
            
            <!-- Task Card -->
            <div class="task-card">
                <h2 class="task-title">${e}</h2>
                <div class="badge">STATO: COMPLETATO</div>
            </div>
            
            <!-- Dettagli Completati -->
            <h3 class="section-title">DETTAGLI COMPLETATI</h3>
            <table class="details-table">
                ${o}
            </table>
            
            <!-- Messaggio finale -->
            <div style="margin-top: 25px; padding: 15px; background: rgba(239, 0, 149, 0.05); border-radius: 8px; border-left: 3px solid #EF0095;">
                <p style="margin: 0; color: #0F0F0F; line-height: 1.5;">
                    <strong>Per qualsiasi chiarimento o necessit\xE0</strong>, restiamo a sua completa disposizione.<br>
                    Il nostro team \xE8 sempre pronto a supportarla nel raggiungimento dei suoi obiettivi.
                </p>
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="signature">Con i migliori saluti,<br>Il Team di <strong>Promethea S.r.l.</strong></div>
            
            <div class="contact-info">
                \u{1F4E7} commerciale@prometheasrl.it<br>
                \u{1F310} www.prometheasrl.it
            </div>
            
            <div class="automated-notice">
                Questo messaggio \xE8 stato generato automaticamente. Si prega di non rispondere a questa email.<br>
                &copy; ${i} Promethea S.r.l. - Tutti i diritti riservati.
            </div>
        </div>
    </div>
</body>
</html>
  `}static \u0275fac=function(e){return new(e||n)(p(d))};static \u0275prov=c({token:n,factory:n.\u0275fac,providedIn:"root"})};export{f as a};
