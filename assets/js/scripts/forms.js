const forms = document.querySelectorAll('.form-footer, .form-hero');

forms.forEach((form) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // não envia direto
    let isValid = true;

    // Nome
    const nome = form.querySelector("input[name='nome']");
    if (nome && nome.value.trim().length < 3) {
      isValid = false;
      Swal.fire({
        icon: 'warning',
        title: 'Campo obrigatório',
        text: 'Informe um nome válido (mínimo 3 caracteres).',
      });
      return;
    }

    // E-mail
    const email = form.querySelector("input[type='email']");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email.value.trim())) {
      isValid = false;
      Swal.fire({
        icon: 'warning',
        title: 'E-mail inválido',
        text: 'Digite um e-mail válido.',
      });
      return;
    }

    // Telefone
    const tel = form.querySelector("input[type='tel']");
    const telRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    if (tel && !telRegex.test(tel.value.trim())) {
      isValid = false;
      Swal.fire({
        icon: 'warning',
        title: 'Telefone inválido',
        text: 'Digite um número de telefone válido.',
      });
      return;
    }

    // Mensagem (só no footer)
    const msg = form.querySelector("textarea[name='mensagem']");
    if (msg && msg.value.trim().length < 5) {
      isValid = false;
      Swal.fire({
        icon: 'warning',
        title: 'Mensagem inválida',
        text: 'Escreva uma mensagem maior (mínimo 5 caracteres).',
      });
      return;
    }

    if (isValid) {
      // Simula carregamento
      Swal.fire({
        html: '<h3>Encaminhando E-mail...</h3>',
        width: 300,
        didOpen: () => {
          Swal.showLoading();
        },
        timer: 1500,
        timerProgressBar: true,
      }).then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'E-mail enviado com sucesso!',
          showConfirmButton: false,
          timer: 2000,
        });
        form.reset();
      });
    }
  });

  // Máscara de telefone
  const telInput = form.querySelector("input[type='tel']");
  if (telInput) {
    telInput.addEventListener('input', () => {
      let v = telInput.value.replace(/\D/g, '');
      if (v.length > 10) {
        telInput.value = v.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
      } else if (v.length > 6) {
        telInput.value = v.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
      } else if (v.length > 2) {
        telInput.value = v.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
      } else {
        telInput.value = v;
      }
    });
  }
});
