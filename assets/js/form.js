$(".form_1").submit(function (e) {
  e.preventDefault();

  const form = this;

  const nome = $(form).find('[name="nome"]').val().trim();
  const email = $(form).find('[name="email"]').val().trim();
  const tel = $(form).find('[name="tel"]').val().trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (nome === "" || email === "" || tel === "") {
    Swal.fire({
      icon: "warning",
      title: "Preencha todos os campos obrigatórios",
      showConfirmButton: false,
      timer: 2000,
    });
    return;
  }

  if (!emailRegex.test(email)) {
    Swal.fire({
      icon: "warning",
      title: "E-mail inválido",
      showConfirmButton: false,
      timer: 2000,
    });
    return;
  }

  if (tel.length < 8) {
    Swal.fire({
      icon: "warning",
      title: "Telefone inválido",
      showConfirmButton: false,
      timer: 2000,
    });
    return;
  }

  $.ajax({
    type: "POST",
    url: "actions/form1.php",
    data: $(form).serialize(),
    beforeSend: function () {
      let timerInterval;
      Swal.fire({
        html: "<h3>Encaminhando E-mail...</h3>",
        width: 300,
        heightAuto: true,
        timerProgressBar: false,
        didOpen: () => {
          Swal.showLoading();
          timerInterval = setInterval(() => {}, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      });
    },
    success: function (response) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "E-mail enviado com sucesso",
        showConfirmButton: false,
        timer: 1500,
      });
      $(form).find("input, textarea").val("");
      location.href = "formulario_enviado";
    },
    error: function (xhr, status, error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title:
          "Verificar se os dados já foram enviados ou verificar os campos preenchidos",
        showConfirmButton: false,
        timer: 2500,
      });
    },
  });
});

$(".form_2").submit(function (e) {
  e.preventDefault();

  const form = this;

  const nome = $(form).find('[name="nome"]').val().trim();
  const email = $(form).find('[name="email"]').val().trim();
  const tel = $(form).find('[name="telefone"]').val().trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (nome === "" || email === "" || tel === "") {
    Swal.fire({
      icon: "warning",
      title: "Preencha todos os campos obrigatórios",
      showConfirmButton: false,
      timer: 2000,
    });
    return;
  }

  if (!emailRegex.test(email)) {
    Swal.fire({
      icon: "warning",
      title: "E-mail inválido",
      showConfirmButton: false,
      timer: 2000,
    });
    return;
  }

  if (tel.length < 8) {
    Swal.fire({
      icon: "warning",
      title: "Telefone inválido",
      showConfirmButton: false,
      timer: 2000,
    });
    return;
  }

  $.ajax({
    type: "POST",
    url: "actions/form2.php",
    data: $(form).serialize(),
    beforeSend: function () {
      let timerInterval;
      Swal.fire({
        html: "<h3>Encaminhando E-mail...</h3>",
        width: 300,
        heightAuto: true,
        timerProgressBar: false,
        didOpen: () => {
          Swal.showLoading();
          timerInterval = setInterval(() => {}, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      });
    },
    success: function (response) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "E-mail enviado com sucesso",
        showConfirmButton: false,
        timer: 1500,
      });
      $(form).find("input, textarea").val("");
      location.href = "formulario_enviado";

    },
    error: function (xhr, status, error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title:
          "Verificar se os dados já foram enviados ou verificar os campos preenchidos",
        showConfirmButton: false,
        timer: 2500,
      });
    },
  });
});
