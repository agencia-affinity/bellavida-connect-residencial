<?php
header('Content-Type: application/json');
ini_set('display_errors', 0);
error_reporting(E_ALL);


class ApiResponse
{
    public static function send($status, $mensagem)
    {
        echo json_encode([
            'status' => $status,
            'mensagem' => $mensagem
        ]);
        exit;
    }
}


class FormValidator
{
    public static function validarCamposObrigatorios(array $dados, array $obrigatorios)
    {
        foreach ($obrigatorios as $campo) {
            if (empty($dados[$campo])) {
                ApiResponse::send('error', "O campo '$campo' é obrigatório.");
            }
        }
    }
}


class APISender
{
    private string $url;
    private array $data;

    public function __construct(string $url, array $data)
    {
        $this->url = $url;
        $this->data = $data;
    }

    public function enviar(): void
    {
        $dataJson = json_encode($this->data);

        $ch = curl_init();

        curl_setopt_array($ch, [
            CURLOPT_URL => $this->url,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $dataJson,
            CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_TIMEOUT => 10,
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        curl_close($ch);

        if ($response === false) {
            ApiResponse::send('error', 'Erro na requisição cURL: ' . $error);
        }

        if ($httpCode !== 200) {
            ApiResponse::send('error', 'Erro ao enviar o e-mail. Código HTTP: ' . $httpCode);
        }

        $respostaApi = json_decode($response, true);
        $mensagem = $respostaApi['mensagem'] ?? 'E-mail enviado com sucesso! Entraremos em contato em breve.';

        ApiResponse::send('success', $mensagem);
    }
}


class FormHandler
{
    public function processar()
    {
        $dados = [
            'nome' => trim($_POST['nome'] ?? ''),
            'email' => trim($_POST['email'] ?? ''),
            'telefone' => trim($_POST['telefone'] ?? ''),
            'site' => 'Bela Vista Residencial',
            'mensagem' => 'Mensagem do site Bela Vista Residencial',
            'id_cliente_primario' => 93,
            'id_empreendimento' => 3712
        ];

        $camposObrigatorios = ['nome', 'email', 'telefone'];
        FormValidator::validarCamposObrigatorios($dados, $camposObrigatorios);

        $url = 'https://www.brokertecnologia.com.br/api/inserirEmail';
        $sender = new APISender($url, $dados);
        $sender->enviar();
    }
}


$form = new FormHandler();
$form->processar();
