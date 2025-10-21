import{a as n}from"./chunk-7VD3EVFT.js";import{N as u}from"./chunk-QS6MTI54.js";import{i as m}from"./chunk-ODN5LVDJ.js";var g=class s{defaultFromEmail=n.defaultFromEmail||"commerciale@prometheasrl.it";functionsUrl=`${n.supabase.url.replace(".supabase.co",".functions.supabase.co")}/send-email-smtp`;sendEmail(a){return m(this,null,function*(){console.log("\u{1F504} Invio email via Edge Function:",this.functionsUrl,"->",a.to),console.log("\u{1F4E7} Dettagli email:",{to:a.to,subject:a.subject,messageLength:a.message.length});try{let t=new AbortController,r=setTimeout(()=>t.abort(),25e3),o=yield fetch(this.functionsUrl,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n.supabase.key}`,apikey:n.supabase.key},body:JSON.stringify({to:a.to,subject:a.subject,text:a.message,replyTo:a.reply_to||this.defaultFromEmail}),signal:t.signal,mode:"cors"});clearTimeout(r),console.log("\u{1F4E8} Risposta HTTP:",o.status,o.statusText);let i=yield o.text();if(!o.ok)return console.error("\u274C Errore HTTP:",o.status,i),{success:!1,error:`HTTP ${o.status}: ${i}`};let e=i?JSON.parse(i):{};return console.log("\u{1F4EC} Risposta Edge Function:",e),e.success?{success:!0}:{success:!1,error:e.error||"Invio fallito"}}catch(t){return t?.name==="AbortError"?(console.error("\u23F0 Timeout funzione email"),{success:!1,error:"Timeout funzione email"}):(console.error("\u{1F4A5} Errore generico:",t),{success:!1,error:t?.message||String(t)})}})}generateSingolaScadenzaMessage(a,t){let r=this.calcolaGiorniRimanenti(t.data_scadenza),o=new Date(t.data_scadenza).toLocaleDateString("it-IT");return`
Gentile ${a.referente||a.ragione_sociale},

le ricordiamo che il ${o} scade il seguente pagamento:

\u{1F4C5} ${t.tipo_scadenza}
\u{1F4B6} Importo: ${t.importo} \u20AC
\u{1F4CB} Scadenza: ${o}
\u23F3 Giorni rimanenti: ${r}

Per qualsiasi chiarimento, restiamo a disposizione.

Cordiali saluti,
Il team di Promethea S.r.l.
\u{1F4DE} Telefono: [inserisci telefono]
\u{1F310} Sito: [inserisci sito]
    `}generateTutteScadenzeMessage(a,t){let r=t.filter(e=>this.calcolaGiorniRimanenti(e.data_scadenza)<=e.giorni_avviso),o=t.filter(e=>this.calcolaGiorniRimanenti(e.data_scadenza)>e.giorni_avviso),i=`
Gentile ${a.referente||a.ragione_sociale},

ecco il riepilogo delle sue prossime scadenze fiscali:

`;return r.length>0&&(i+=`
\u26A0\uFE0F SCADENZE IMMINENTI:

`,r.forEach(e=>{let c=this.calcolaGiorniRimanenti(e.data_scadenza),l=new Date(e.data_scadenza).toLocaleDateString("it-IT");i+=`\u{1F4C5} ${e.tipo_scadenza}
`,i+=`   \u{1F4B6} ${e.importo} \u20AC
`,i+=`   \u{1F4CB} Scade il ${l} (tra ${c} giorni)
`,e.descrizione_altro&&(i+=`   \u{1F4DD} ${e.descrizione_altro}
`),i+=`
`})),o.length>0&&(i+=`
\u{1F4C5} PROSSIME SCADENZE:

`,o.forEach(e=>{let c=this.calcolaGiorniRimanenti(e.data_scadenza),l=new Date(e.data_scadenza).toLocaleDateString("it-IT");i+=`\u{1F4C5} ${e.tipo_scadenza}
`,i+=`   \u{1F4B6} ${e.importo} \u20AC
`,i+=`   \u{1F4CB} Scade il ${l} (tra ${c} giorni)
`,e.descrizione_altro&&(i+=`   \u{1F4DD} ${e.descrizione_altro}
`),i+=`
`})),i+=`
Per qualsiasi chiarimento o per prendere un appuntamento, restiamo a disposizione.

Cordiali saluti,
Il team di Promethea S.r.l.
\u{1F4DE} Telefono: [inserisci telefono]
\u{1F310} Sito: [inserisci sito]
    `,i}calcolaGiorniRimanenti(a){let t=new Date,o=new Date(a).getTime()-t.getTime();return Math.ceil(o/(1e3*60*60*24))}static \u0275fac=function(t){return new(t||s)};static \u0275prov=u({token:s,factory:s.\u0275fac,providedIn:"root"})};export{g as a};
