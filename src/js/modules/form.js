async function sendMail(e) {
  e.preventDefault();
  try {
    const form = document.querySelector('#form');
    const formData = new FormData();
    if (!form) throw new Error('No form element!');
    const nameEl = form.elements.name;
    const emailEl = form.elements.email;
    const commentEl = form.elements.comment;
    formData.append('name', nameEl.value);
    formData.append('email', emailEl.value);
    formData.append('comment', commentEl.value);
    const url = `sendMail_simple.php`;
    const response = await fetch(url, { method: 'POST', body: formData });
    const json = await response.json(); // { success: Boolean, message: String }
    if (json.success) {
      nameEl.value = '';
      emailEl.value = '';
      commentEl.value = '';
    }
  } catch (e) {
    console.error(e);
  }
}

export function initForm() {
  const form = document.querySelector('#form');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Валидация отключена пока что
    // formValidators.checkRequired(['username', 'email']);
    // formValidators.checkLength('username', 3, 40);
    // formValidators.checkEmail('email');
    sendMail(e);
  });
}

