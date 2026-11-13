(() => {
  const WHATSAPP_NUMBER = '2349022658730'; // International format, without + or spaces
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const form = document.getElementById('enquiryForm');
  const error = document.getElementById('formError');
  const year = document.getElementById('year');

  if (year) year.textContent = new Date().getFullYear();

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });
    mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      error.textContent = '';
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const value = key => String(data.get(key) || '').trim();
      const phone = value('phone');
      if (phone.replace(/\D/g, '').length < 10) {
        error.textContent = 'Please enter a valid WhatsApp phone number.';
        form.elements.phone.focus();
        return;
      }
      const message = [
        'Hello Bukola, I would like to make an E-XIN Capital car collateral loan enquiry.',
        '',
        `Full name: ${value('name')}`,
        `My WhatsApp number: ${phone}`,
        `State: ${value('state')}`,
        `Area / town: ${value('area')}`,
        `Vehicle: ${value('make')} ${value('model')}`,
        `Vehicle year: ${value('year')}`,
        `Requested loan amount: ₦${Number(value('amount')).toLocaleString('en-NG')}`,
        `Preferred timeline: ${value('timeline')}`,
        `Can the vehicle remain in E-XIN's custody during the loan?: ${value('custody')}`,
        '',
        'I understand that this is an enquiry only and that any loan offer is subject to assessment and agreement.'
      ].join('\n');
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      if (!newWindow) window.location.href = whatsappUrl;
    });
  }
})();
