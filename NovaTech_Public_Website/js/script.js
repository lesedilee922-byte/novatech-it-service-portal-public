(function(){
  const menuToggle=document.querySelector('.menu-toggle');
  const nav=document.querySelector('.nav');
  if(menuToggle&&nav){menuToggle.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');menuToggle.setAttribute('aria-expanded',String(open));});}

  const helpFab=document.querySelector('.help-fab');
  const helpPanel=document.querySelector('.help-panel');
  const helpClose=document.querySelector('.help-close');
  function setHelp(open){if(!helpPanel||!helpFab)return;helpPanel.hidden=!open;helpFab.setAttribute('aria-expanded',String(open));}
  if(helpFab&&helpPanel){helpFab.addEventListener('click',()=>setHelp(helpPanel.hidden));}
  if(helpClose)helpClose.addEventListener('click',()=>setHelp(false));
  document.querySelectorAll('[data-open-help]').forEach(b=>b.addEventListener('click',()=>setHelp(true)));
  const helpText={wifi:'Check that Wi-Fi is on, airplane mode is off, and you are connecting to the correct network. Test another device if possible. If it still fails, submit a ticket.',printer:'Check the power, paper, ink or toner, error display, selected printer, and print queue. Follow the printer’s safe jam-removal steps. If it still fails, submit a ticket.',slow:'Save your work, close unused applications, check available storage, and restart only if safe. Note when the slowdown occurs and submit a ticket if it continues.'};
  document.querySelectorAll('[data-help-topic]').forEach(b=>b.addEventListener('click',()=>{const target=document.getElementById('help-answer');if(target)target.textContent=helpText[b.dataset.helpTopic]||'Please submit a support ticket.';}));

  const ticketForm=document.getElementById('ticket-form');
  if(ticketForm){ticketForm.addEventListener('submit',function(event){event.preventDefault();if(!ticketForm.reportValidity())return;const data=Object.fromEntries(new FormData(ticketForm).entries());const ticketId='NT-DEMO-'+Math.random().toString(36).slice(2,7).toUpperCase();const record={ticketId,createdAt:new Date().toISOString(),...data};try{const key='novatech-demo-tickets';const existing=JSON.parse(localStorage.getItem(key)||'[]');existing.push(record);localStorage.setItem(key,JSON.stringify(existing));}catch(e){/* Browser storage may be disabled; the demo confirmation still works. */}const success=document.getElementById('ticket-success');if(success){success.hidden=false;success.innerHTML='<strong>Demonstration ticket created: '+ticketId+'</strong><br>Thank you, '+escapeHtml(data.employee)+'. This is a local prototype only. Your request has not been sent to an IT team or saved to a central database.';success.scrollIntoView({behavior:'smooth',block:'nearest'});}ticketForm.reset();});}
  function escapeHtml(value){return String(value||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}


  // Connect the live Google Form (configured in js/google-form-config.js).
  const formConfig = window.NOVATECH_GOOGLE_FORM || {};
  const formNotice = document.getElementById('google-form-setup-note');
  const formConnected = document.getElementById('google-form-connected');
  const formFrame = document.getElementById('google-form-frame');
  const formOpenLink = document.getElementById('google-form-open-link');
  function isGoogleFormsUrl(value) {
    try {
      const url = new URL(value);
      return url.protocol === 'https:' && url.hostname === 'docs.google.com' && url.pathname.includes('/forms/');
    } catch (error) { return false; }
  }
  if (formConnected && formFrame && formNotice) {
    const embedUrl = String(formConfig.embedUrl || '').trim();
    const responderUrl = String(formConfig.responderUrl || '').trim();
    if (isGoogleFormsUrl(embedUrl)) {
      formFrame.src = embedUrl;
      formConnected.hidden = false;
      formNotice.hidden = true;
      if (formOpenLink && responderUrl) {
        formOpenLink.href = responderUrl;
        formOpenLink.hidden = false;
      } else if (formOpenLink) {
        formOpenLink.hidden = true;
      }
    } else if (formOpenLink && /^https:\/\/(forms\.gle|docs\.google\.com)\//.test(responderUrl)) {
      formNotice.innerHTML = '<strong>Your Google Form link is set, but its embed link is missing.</strong><br>Open the form in a new tab using the link below, or add the embed URL in js/google-form-config.js.';
      formOpenLink.href = responderUrl;
      formOpenLink.hidden = false;
      formConnected.hidden = false;
      formNotice.hidden = false;
      formFrame.hidden = true;
    }
  }

  const search=document.getElementById('kb-search');
  if(search){const cards=[...document.querySelectorAll('.article-card[data-search]')];const noResults=document.getElementById('no-results');search.addEventListener('input',()=>{const query=search.value.trim().toLowerCase();let visible=0;cards.forEach(card=>{const match=(card.dataset.search+' '+card.textContent).toLowerCase().includes(query);card.hidden=!match;if(match)visible++;});if(noResults)noResults.hidden=visible!==0;});}
})();
