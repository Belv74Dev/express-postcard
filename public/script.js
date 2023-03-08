
(function () {
	const form = document.querySelector('form');

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		form.submit();
		form.reset();
	})

	form.querySelector('input[name="name"]').value = '';
})()

const genders = document.querySelectorAll('.form-check-input');
const selects = document.querySelectorAll('select');

genders.forEach((item) => {
	item.addEventListener('change', (e) => {
		selects.forEach((item) => {
			if (item.classList.contains('invisible')) {
				item.classList.remove('invisible');
				item.setAttribute('required', "true");
			} else {
				item.classList.add('invisible');
				item.removeAttribute('required');
			}
		});
	});
});