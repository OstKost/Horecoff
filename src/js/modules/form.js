// Генерация простой математической капчи
function generateCaptcha() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const result = num1 + num2;
  
  const questionEl = document.getElementById('captcha-question');
  const resultEl = document.getElementById('captcha-result');
  
  if (questionEl && resultEl) {
    questionEl.textContent = `Сколько будет ${num1} + ${num2}?`;
    resultEl.value = result;
  } else {
    console.warn('Captcha elements not found:', { questionEl, resultEl });
  }
  
  return result;
}

async function sendMail(e) {
  e.preventDefault();
  try {
    const form = document.querySelector('#form');
    const formData = new FormData();
    if (!form) throw new Error('No form element!');
    const nameEl = form.elements.name;
    const emailEl = form.elements.email;
    const commentEl = form.elements.comment;
    const captchaAnswer = form.elements.captcha_answer;
    const captchaResult = form.elements.captcha_result;
    
    // Проверка капчи на клиенте (дополнительная проверка)
    if (captchaAnswer && captchaResult) {
      if (parseInt(captchaAnswer.value) !== parseInt(captchaResult.value)) {
        alert('Неверный ответ на вопрос безопасности');
        generateCaptcha(); // Генерируем новую капчу
        captchaAnswer.value = '';
        return;
      }
    }
    
    formData.append('name', nameEl.value);
    formData.append('email', emailEl.value);
    formData.append('comment', commentEl.value);
    if (captchaAnswer && captchaResult) {
      formData.append('captcha_answer', captchaAnswer.value);
      formData.append('captcha_result', captchaResult.value);
    }
    
    const url = `sendMail_simple.php`;
    const response = await fetch(url, { method: 'POST', body: formData });
    
    // Проверяем, что ответ действительно JSON
    const contentType = response.headers.get('content-type');
    let json;
    
    try {
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Expected JSON but got:', contentType, text);
        throw new Error('Сервер вернул неверный формат ответа');
      }
      
      const text = await response.text();
      json = JSON.parse(text);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      alert('Ошибка при обработке ответа сервера. Попробуйте еще раз.');
      generateCaptcha();
      if (captchaAnswer) {
        captchaAnswer.value = '';
      }
      return;
    }
    
    if (json.success) {
      nameEl.value = '';
      emailEl.value = '';
      commentEl.value = '';
      if (captchaAnswer) {
        captchaAnswer.value = '';
      }
      generateCaptcha(); // Генерируем новую капчу после успешной отправки
      alert('Сообщение успешно отправлено!');
    } else {
      alert(json.message || 'Ошибка при отправке сообщения');
      generateCaptcha(); // Генерируем новую капчу при ошибке
      if (captchaAnswer) {
        captchaAnswer.value = '';
      }
    }
  } catch (e) {
    console.error(e);
    generateCaptcha(); // Генерируем новую капчу при ошибке
    const form = document.querySelector('#form');
    if (form && form.elements.captcha_answer) {
      form.elements.captcha_answer.value = '';
    }
  }
}

export function initForm() {
  const form = document.querySelector('#form');
  if (!form) {
    console.warn('Form #form not found');
    return;
  }
  
  // Генерируем капчу при загрузке (с небольшой задержкой для гарантии, что DOM готов)
  setTimeout(() => {
    generateCaptcha();
  }, 100);
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Валидация отключена пока что
    // formValidators.checkRequired(['username', 'email']);
    // formValidators.checkLength('username', 3, 40);
    // formValidators.checkEmail('email');
    sendMail(e);
  });
}

