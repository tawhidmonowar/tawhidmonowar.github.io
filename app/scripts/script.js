const open_certificate_01 = document.getElementById('open-certificate-01');
const close_certificate_01 = document.getElementById('close-certificate-01');
const certificate_01 = document.getElementById('certificate-01');

open_certificate_01.addEventListener('click', function (event) {
    event.preventDefault();
    certificate_01.classList.remove('hidden');
});

close_certificate_01.addEventListener('click', function (event) {
    event.preventDefault();
    certificate_01.classList.add('hidden');
});
