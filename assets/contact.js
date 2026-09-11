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

  const FORM_ENDPOINT = 'https://formsubmit.co/phongduanqtuco@gmail.com';

  if (form && status) {
    form.action = FORM_ENDPOINT;
    form.method = 'POST';

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();

      if (!name || !email) {
        status.textContent = 'Vui lòng nhập đầy đủ thông tin bắt buộc.';
        return;
      }

      status.textContent = 'Đang gửi thông tin...';

      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error('Send failed');
          }
          status.textContent = 'Yêu cầu của bạn đã được gửi thành công. Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.';
          form.reset();
        })
        .catch(function () {
          status.textContent = 'Đã xảy ra lỗi khi gửi thông tin. Vui lòng thử lại sau.';
        });
    });
  }
});
