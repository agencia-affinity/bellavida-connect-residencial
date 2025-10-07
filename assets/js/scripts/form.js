var forms = document.querySelectorAll(".form-footer, .form-hero");

forms.forEach(function (formElement) {
  var telInput = formElement.querySelector("input[type='tel']");
  if (telInput) {
    telInput.addEventListener("input", function () {
      var e = telInput.value.replace(/\D/g, "");
      if (e.length > 10) {
        telInput.value = e.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
      } else if (e.length > 6) {
        telInput.value = e.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
      } else if (e.length > 2) {
        telInput.value = e.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
      } else {
        telInput.value = e;
      }
    });
  }

  formElement.addEventListener("submit", function (e) {
    e.preventDefault();

    const form = formElement;
    const nome = form.querySelector('[name="nome"]')?.value.trim() || "";
    const email = form.querySelector('[name="email"]')?.value.trim() || "";
    const tel = form.querySelector('[name="telefone"]')?.value.trim() || "";
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
      url: "actions/form.php",
      data: $(form).serialize(),
      dataType: "json",
      beforeSend: function () {
        Swal.fire({
          html: "<h3>Encaminhando E-mail...</h3>",
          width: 300,
          didOpen: () => Swal.showLoading(),
        });
      },
      success: function (response) {
        if (response.status === "success") {
          Swal.fire({
            position: "center",
            icon: "success",
            title: response.mensagem,
            showConfirmButton: false,
            timer: 1500,
          });
          $(form).find("input, textarea").val("");
          location.href = "inc/page/formulario_enviado";
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: response.mensagem,
            showConfirmButton: false,
            timer: 2500,
          });
        }
      },
      error: function (xhr, status, error) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Erro ao enviar o formulário!",
          text: error,
          showConfirmButton: false,
          timer: 2500,
        });
      },
    });
  });
});
