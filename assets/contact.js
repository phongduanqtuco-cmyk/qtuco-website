document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (toggle && header) {
    toggle.addEventListener('click', function () {
      const isOpen = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  const yearNode = document.getElementById('year');
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  if (form && status) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();

      if (!name) {
        status.textContent = 'Vui lòng nhập đầy đủ thông tin bắt buộc.';
        return;
      }

      status.textContent = 'Yêu cầu của bạn đã được ghi nhận. Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.';
      form.reset();
    });
  }
});
