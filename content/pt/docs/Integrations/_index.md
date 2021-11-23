---
title: "Integrações"
linkTitle: "Integrações"
date: 2021-04-07T10:01:55-05:00
Description: >
  De acordo com as necessidades do seu negócio, selecione como integrar sua loja com os serviços e ferramentas PayU.
weight: 40
---

Implemente o PayU com o modelo agregador ou portal, usando os acordos financeiros do PayU ou os seus. Selecione a integração que melhor se adapta às suas necessidades:

{{< overview/navblocks_pt >}}

## Como obter variáveis para integração {#how-to-get-variables-for-integration}
Seja qual for a integração selecionada, você pode exigir qualquer uma das seguintes variáveis na solicitação dos métodos

### API key e API Login {#api-key-and-api-login}
1. Faça login em [PayU.com](payu.com) e clique na opção de login localizada na parte superior da página. Se preferir, você pode fazer login https://merchants.payulatam.com/.

2. Clique _**Configuração**_ e selecione _**Configuração técnica**_.

![PrintScreen](/assets/IntegrationVariables_01_pt.png)

3. Nesta janela, você encontra a API key e a API, que permitem autenticar sua loja durante o procedimento de integração.

![PrintScreen](/assets/IntegrationVariables_02_pt.png)

{{% alert title="Aviso" color="warning"%}}

Ambas as chaves são exclusivas de cada loja no PayU, portanto, você deve manter essas informações protegidas. Seu uso ou divulgação são de sua responsabilidade.

{{% /alert %}}  

### Assinatura de autenticação {#authentication-signature}
A variável `signature` é utilizada para validar os pagamentos realizados por meio da plataforma, garantindo sua autenticidade. Esta variável é um valor de string criptografado usando algoritmos MD5 ou SHA e segue esta estrutura.

```
ApiKey~merchantId~referenceCode~tx_value~currency
```

Vamos criar uma `signature` usando os seguintes valores de teste:

* **ApiKey**: `4Vj8eK4rloUd272L48hsrarnUA`
* **merchantId**: `508029`
* **referenceCode**: `TestPayU`
* **tx_value**: `3`
* **currency**: `USD`

String são esses valores concatenados com o caractere til (~):

```
4Vj8eK4rloUd272L48hsrarnUA~508029~TestPayU~3~USD
```

Depois de aplicar o algoritmo MD5, o valor da `signature` é:

```
ba9ffa71559580175585e45ce70b6c37
```

### _deviceSessionId_ variável {#_devicesessionid_-variable}
O _deviceSessionId_ é um código com as informações do dispositivo onde a transação foi gerada e fornece um identificador exclusivo para o dispositivo. Essa variável nos permite identificar invasores.

1. Para realizar a integração de API ou SDK, você precisa incluir o seguinte script em seu formulário de pagamento:

```` HTML
<script type="text/javascript" src="https://maf.pagosonline.net/ws/fp/tags.js?id=${deviceSessionId}80200"></script>
<noscript>
   <iframe style="width: 100px; height: 100px; border: 0; position: absolute; top: -5000px;" src="https://maf.pagosonline.net/ws/fp/tags.js?id=${deviceSessionId}80200"></iframe>
</noscript>
````
<br>

2. É importante gerar o `deviceSessionId` por cada transação. Para gerar o `deviceSessionId` pegue o `session_id` do cookie e concatene-o com o carimbo de data/hora atual incluindo os milissegundos. Em seguida, criptografe o resultado usando MD5.

Exemplo em PHP

```` PHP
$deviceSessionId = md5(session_id().microtime())
````
<br>

Por exemplo, se o `$deviceSessionId` é `d66f949f19b33e88c202b579cfc549b3`, o script é o seguinte:

```` HTML
<script type="text/javascript" src="https://maf.pagosonline.net/ws/fp/tags.js?id=d66f949f19b33e88c202b579cfc549b380200"></script>
<noscript>
	<iframe style="width: 100px; height: 100px; border: 0; position: absolute; top: -5000px;" src="https://maf.pagosonline.net/ws/fp/tags.js?id=d66f949f19b33e88c202b579cfc549b380200"></iframe>
</noscript>
````
<br>

3. Finalmente, você deve enviar o `$deviceSessionId` na variável de acordo com a integração selecionada

* Para **API**: `transaction.deviceSessionId`
* Para **SDK JAVA**: `PayU.PARAMETERS.DEVICE_SESSION_ID`
* Para **SDK PHP**: `PayUParameters::DEVICE_SESSION_ID`