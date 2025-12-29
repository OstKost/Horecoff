export const formValidators = {
  showError: (input, message) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
  },

  showSuccess: (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
  },

  checkEmail: (id) => {
    const email = document.getElementById(id);
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email.value.trim())) {
      this.showSuccess(email);
    } else {
      this.showError(email, 'Email is not valid');
    }
  },

  checkRequired: (ids = []) => {
    ids.forEach((id) => {
      const input = document.getElementById(id);
      if (!input) return;
      if (input.value.trim() === '') {
        this.showError(input, `${this.getFieldName(input)} is required`);
      } else {
        this.showSuccess(input);
      }
    });
  },

  checkLength: (id, min, max) => {
    const input = document.getElementById(id);
    if (!input) return;
    if (input.value.length < min) {
      this.showError(input, `${this.getFieldName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
      this.showError(input, `${this.getFieldName(input)} must be less than ${max} characters`);
    } else {
      this.showSuccess(input);
    }
  },

  getFieldName: (input) => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
  }
};

