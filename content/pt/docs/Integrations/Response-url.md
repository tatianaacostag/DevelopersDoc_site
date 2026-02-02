---
title: "URL de Resposta"
linkTitle: "URL de Resposta"
date: 2026-01-28T12:15:39-05:00
description: >  
  Você pode utilizar uma URL de Resposta para redirecionar o pagador de volta ao seu site e exibir o resultado da transação. Isso melhora a experiência do usuário ao concluir a jornada de pagamento.
weight: 40
---

A URL de Resposta serve como uma ponte para retornar o pagador à sua plataforma após ele ter concluído (ou tentado) um pagamento. Embora a integração redirecione o cliente por meio de uma requisição GET a nível de navegador, os dados enviados permitem que você exiba resumos de transações ou status personalizados, como *Aprovado*, *Rejeitado*, *Em validação* ou *Pagamento pendente* (para transações em dinheiro). Lembre-se, porém, que o pagador pode fechar o checkout antes de chegar à página de resultado.

## Métodos de Integração

O nome do parâmetro e a localização da URL de Resposta variam dependendo do tipo de integração que você está usando.

| Tipo de Integração | Nome do Parâmetro / Caminho | Exemplo de Implementação |
| :--- | :--- | :--- |
| **WebCheckout** | `responseUrl` | `<input name="responseUrl" type="hidden" value="http://www.minhaloja.com.br/resposta.php">` |
| **Integração via API** | `transaction.extraParameters.RESPONSE_URL` | `"extraParameters": { "RESPONSE_URL": "http://www.payu.com/resposta" }` |

## Considerações

* **Não utilize para Lógica de Backend:** Evite depender da URL de Resposta para atualizar seu banco de dados ou liberar pedidos. Os usuários podem fechar o navegador antes que o redirecionamento ocorra. **Sempre use a URL de Confirmação (Webhook) para processos de backend**.

* **Restrições de Hospedagem:** Certifique-se de que seu provedor de hospedagem não bloqueie URLs enviadas como valores de parâmetros (ex: `&merchant_url=...`).

* **Recomendações de Exibição:** Recomendamos mostrar ao cliente, no mínimo: status, referência, valor, moeda e data.

* **Comportamento Padrão:** Se você não fornecer uma URL de Resposta (seja na requisição ou no Painel de Gestão PayU), o processo termina na página de checkout web da PayU.

{{% alert title="Importante" color="warning"%}}

Se você deixar a URL de Resposta em branco, a PayU exibirá as informações da transação em sua própria página, mas o comprador não terá a opção de retornar ao seu site.

{{% /alert %}}

## Parâmetros Enviados para a URL de Resposta

Independentemente do método de integração, a PayU envia os seguintes parâmetros para sua URL via uma requisição HTTP GET.

<details>

<summary><b>Parâmetros</b></summary>

<br>

<div class="variables"></div>

| Campo | Tipo | Tamanho | Descrição |
|:---|:---|:---|:---|
| `merchantId` | Numérico | 12 | Número de identificação único do vendedor no sistema PayU, fornecido no e-mail de criação da conta. |
| `transactionState` | Numérico | 2 | Status da transação. [Veja Status de Transação]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-response-page" >}}). |
| `risk` | Decimal | — | Pontuação de risco associada à transação (valores entre 0 e 1). Um valor maior indica maior risco. Formato: `###.00`. |
| `polResponseCode` | Alfanumérico | 64 | Código de resposta interno da PayU. [Veja Códigos de Resposta]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-response-page" >}}). |
| `polTransactionState` | Numérico | 2 | Estado interno da transação na PayU. [Veja Códigos de Resposta]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-response-page" >}}). |
| `referenceCode` | Alfanumérico | 255 | Código de referência único para a venda ou pedido. Deve ser exclusivo para cada transação enviada ao sistema. |
| `reference_pol` | Alfanumérico | 255 | Número de transação único gerado pela PayU. |
| `signature` | Alfanumérico | 255 | Assinatura digital usada para validar a integridade dos dados de cada transação. |
| `polPaymentMethod` | Alfanumérico | 255 | Identificador interno do método de pagamento utilizado. |
| `polPaymentMethodType` | Numérico | 2 | Tipo de método de pagamento utilizado. [Veja Códigos de Métodos de Pago]({{< ref "response-codes-and-variables.html#payment-methods-codes" >}}). |
| `installmentsNumber` | Numérico | 2 | Número de parcelas solicitadas para pagamentos com cartão de crédito. |
| `TX_VALUE` | Numérico | 14.2 | O valor total da transação. Suporta até duas casas decimais (ex: `100.00` ou `100`). |
| `TX_TAX` | Numérico | 14.2 | Valor do IVA/Imposto. Suporta até duas casas decimais. Se não houver imposto, envie `0`. <br>**Nota:** Para a Colômbia, se este campo for omitido, um IVA de 19% é aplicado automaticamente. |
| `buyerEmail` | Alfanumérico | 255 | E-mail do comprador usado para notificações de transação. Recomendamos validar este campo no momento da entrada de dados. |
| `processingDate` | Data | — | Data e hora em que a transação foi processada. Formato: `YYYY-MM-DD HH:mm:ss`. |
| `currency` | Alfanumérico | 3 | Código de moeda ISO para o pagamento. Transações na Colômbia são liquidadas em COP à taxa representativa do mercado diária. |
| `cus` | Alfanumérico | 255 | Código Único de Rastreamento (*Código Único de Seguimiento*). Referência específica de pagamento usada por bancos para transações PSE na Colômbia. |
| `pseBank` | Alfanumérico | 255 | Nome do banco usado para pagamentos PSE (apenas Colômbia). |
| `lng` | Alfanumérico | 2 | Código de idioma usado para exibir o gateway de pagamento. |
| `description` | Alfanumérico | 255 | Breve descrição da venda. |
| `lapResponseCode` | Alfanumérico | 64 | Código de resposta entregue pela PayU. [Veja Códigos de Resposta]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-response-page" >}}). |
| `lapPaymentMethod` | Alfanumérico | 255 | Método de pagamento específico utilizado (ex: `VISA`). |
| `lapPaymentMethodType` | Alfanumérico | 255 | Categoria do método de pagamento (ex: `CREDIT_CARD`). |
| `lapTransactionState` | Alfanumérico | 32 | Status da transação em alto nível. [Veja Status da Transação]({{< ref "response-codes-and-variables.html#response-codes-sent-to-the-response-page" >}}). |
| `message` | Alfanumérico | 255 | Mensagem descritiva explicando o status da transação. |
| `extra1` | Alfanumérico | 255 | Campo personalizado para informações adicionais da compra. |
| `extra2` | Alfanumérico | 255 | Campo personalizado para informações adicionais da compra. |
| `extra3` | Alfanumérico | 255 | Campo personalizado para informações adicionais da compra. |
| `authorizationCode` | Alfanumérico | 12 | Código de autorização fornecido pela instituição financeira para a venda. |
| `merchant_address` | Alfanumérico | 255 | Endereço registrado do vendedor. |
| `merchant_name` | Alfanumérico | 255 | Nome registrado do vendedor. |
| `merchant_url` | Alfanumérico | 255 | URL do site do vendedor. |
| `orderLanguage` | Alfanumérico | 2 | Idioma do pedido. Formato: `ISO-639-1`. |
| `pseCycle` | Numérico | — | Identificador do ciclo da transação gerado pelo PSE (apenas Colômbia). |
| `pseReference1` | Alfanumérico | 255 | Campo de referência personalizado 1 para pagamentos PSE (apenas Colômbia). |
| `pseReference2` | Alfanumérico | 255 | Campo de referência personalizado 2 para pagamentos PSE (apenas Colômbia). |
| `pseReference3` | Alfanumérico | 255 | Campo de referência personalizado 3 para pagamentos PSE (apenas Colômbia). |
| `telephone` | Alfanumérico | 20 | Telefone de contato do vendedor. |
| `transactionId` | Alfanumérico | 36 | Identificador interno único para a transação. |
| `trazabilityCode` | Alfanumérico | 64 | Código de rastreabilidade da venda conforme registrado no site do vendedor. |
| `TX_ADMINISTRATIVE_FEE` | Decimal | — | Valor da taxa administrativa aplicada. |
| `TX_TAX_ADMINISTRATIVE_FEE` | Decimal | — | Valor do imposto aplicado sobre a taxa administrativa. |
| `TX_TAX_ADMINISTRATIVE_FEE_RETURN_BASE` | Decimal | — | Valor base da taxa administrativa usado para restituição de impostos. |
| `action_code_description` | Alfanumérico | 255 | Descrição do código de ação de resposta (Específico para certos adquirentes como VISANET Peru). |
| `cc_holder` | Alfanumérico | 150 | Nome do titular do cartão conforme aparece no cartão de crédito. |
| `cc_number` | Alfanumérico | — | Número do cartão de crédito mascarado usado para a transação (ex: `************0004`). |
| `processing_date_time` | Data | — | Data de processamento da venda. Formato: `YYYY-MM-DD`. |
| `request_number` | Alfanumérico | 9 | Combinação do Número do Pedido e o identificador da transação. |

</details>

## Exemplo de Implementação (PHP)

A lógica é essencialmente a mesma para ambas as integrações assim que o sistema redireciona o usuário para o seu script:

```PHP
<?php
$apiKey = "4Vj8eK4rloUd272L48hsrarnUA";
$merchant_id = $_GET['merchantId'];
$referenceCode = $_GET['referenceCode'];
$TX_VALUE = (float) $_GET['TX_VALUE'];
$currency = $_GET['currency'];
$transactionState = $_GET['transactionState'];

// Apply rounding for signature validation
$new_value = round($TX_VALUE, 1, PHP_ROUND_HALF_EVEN);

$signature_string = "$apiKey~$merchant_id~$referenceCode~$new_value~$currency~$transactionState";
$calculated_signature = md5($signature_string);
$received_signature = $_GET['signature'];

if (hash_equals(strtolower($received_signature), strtolower($calculated_signature))) {
    echo "<h2>Transaction Verified Successfully</h2>";
    // Display summary to user
} else {
    echo "<h2>Invalid Signature - Data Integrity Compromised</h2>";
}
?>
```

<br>

**Exemplo de Requisição GET:**

O exemplo a seguir mostra a query string que a PayU anexa à sua URL de Resposta. Você pode usar isso para testar a capacidade do seu script de capturar variáveis e validar a assinatura.

```HTML
http://mytestsite.com/response.php?merchantId=508029&transactionState=6&referenceCode=2015-05-27+13%3A04%3A37&reference_pol=7069375&transactionId=f5e668f1-7ecc-4b83-a4d1-0aaa68260862&signature=e1b0939bbdc99ea84387bee9b90e4f5c&TX_VALUE=100.00&currency=USD&buyerEmail=test%40payulatam.com&lapPaymentMethod=VISA&lapTransactionState=DECLINED&message=Declined
```

## Validação de Assinatura

Para garantir que os dados recebidos na URL de Resposta não tenham sido alterados, você deve regenerar a assinatura e compará-la com o parâmetro `signature`.

### Regra de Arredondamento para URL de Resposta

* Para calcular o `new_value` da assinatura, arredonde o `TX_VALUE` para **uma casa decimal** usando o método **round half to even** (arredondamento ao par mais próximo):
  - Se a primeira casa decimal for par e a segunda for `5` → arredonde para baixo (ex: `150.25` torna-se `150.2`).
  - Se a primeira casa decimal for ímpar e a segunda for `5` → arredonde para cima (ex: `150.35` torna-se `150.4`).
  - Caso contrário, arredonde normalmente para o decimal mais próximo.

### Formato da Assinatura

Sempre use os valores vindos da URL de Resposta (`merchantId`, `referenceCode`, `TX_VALUE`, `currency` e `transactionState`) para gerar a assinatura. **Não** utilize os valores do seu banco de dados. 

A string para o hash é:
<p>

    apiKey~merchantId~referenceCode~new_value~currency~transactionState

### Exemplos de Assinatura

Os exemplos a seguir ilustram como gerar uma assinatura, neste caso, usando HMAC-SHA256.

#### Primeira casa decimal é um número par e a segunda é 5

| **Item** | **Valor** |
|----------|-----------|
| Parâmetros da String | `apiKey: 4Vj8eK4rloUd272L48hsrarnUA` <br> `merchantId: 508029` <br> `referenceCode: PayUTest01` <br> `TX_VALUE: 150.25` <br> `currency: USD` <br> `transactionState: 6` |
| String de Entrada (formatada) | `4Vj8eK4rloUd272L48hsrarnUA~508029~PayUTest01~150.2~USD~6` |
| Chave Secreta (aplicável apenas para HMAC-SHA256) | `test123` |
| `signature` Gerada | `5ac639cc57ea3ceccef66243f7a20412ea4ae0c86b5121ca6aa67597266057d1` |

#### Primeira casa decimal é um número ímpar e a segunda é 5

| **Item** | **Valor** |
|----------|-----------|
| Parâmetros da String | `apiKey: 4Vj8eK4rloUd272L48hsrarnUA` <br> `merchantId: 508029` <br> `referenceCode: PayUTest01` <br> `TX_VALUE: 150.35` <br> `currency: USD` <br> `transactionState: 6` |
| String de Entrada (formatada) | `4Vj8eK4rloUd272L48hsrarnUA~508029~PayUTest01~150.4~USD~6` |
| Chave Secreta (aplicável apenas para HMAC-SHA256) | `test123` |
| `signature` Gerada | `7bbb5dd21b3c668bbfec8455c4f4fd3887dff1caa9c5da3895ddd914065b4905` |

#### Outros Casos

| **Item** | **Valor** |
|----------|-----------|
| Parâmetros da String | `apiKey: 4Vj8eK4rloUd272L48hsrarnUA` <br> `merchantId: 508029` <br> `referenceCode: PayUTest01` <br> `TX_VALUE: 150.34` <br> `currency: USD` <br> `transactionState: 6` |
| String de Entrada (formatada) | `4Vj8eK4rloUd272L48hsrarnUA~508029~PayUTest01~150.3~USD~6` |
| Chave Secreta (aplicável apenas para HMAC-SHA256) | `test123` |
| `signature` Gerada | `50c8aae35caf923fbdbd791d7842b916ab7d6597b7c4032dd92ab67b7bb43e8a` |

### Valide sua Assinatura

Use este gerador para criar uma assinatura com qualquer um dos métodos de criptografia disponíveis. Esta funcionalidade auxilia você na verificação do valor da `signature` que a PayU envia para sua URL de Resposta.

<div>
{{< responsepage/signaturegen_resp_en >}}
</div>
