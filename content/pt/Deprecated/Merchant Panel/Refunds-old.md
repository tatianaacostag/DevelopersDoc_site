---
title: "Reembolsos"
linkTitle: "Reembolsos"
date: 2021-11-18T13:40:06-05:00
type: docs
Description: >
   Informação do módulo de Reembolsos no Módulo Administrativo.
weight: 25
---

{{% alert title="Observação" color="warning"%}}
Este tópico foi descontinuado e não está sendo oferecido a novos comerciantes.
{{% /alert %}}

## O que é um reembolso?
Acontece reembolso quando o estabelecimento decide voluntariamente reintegrar o dinheiro ao titular de cartão de crédito, por motivos como:  
* O cliente não gostou do produto e devolve;
* O estabelecimento não tem estoque e não pode entregar o produto ou serviço a seu cliente.
 
## Como fazer o reembolso de uma transação?
Para fazer a petição do reembolso de uma transação você deve fazer as seguintes ações. Lembre-se que a transação deve estar em estado _**Aprovada**_ e não deve ter pendente um processo de disputa.

1. **Consultar a transação que você deseja reembolsar**:<br>
Para consultar uma transação você deve ir a seu tu módulo administrativo ao menu _**Relatórios**_ clicando na opção _**Transações**_ e buscar a transação específica da qual deseja pedir o reembolso do dinheiro correspondente ao valor da transação.

![PrintScreen](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales-pt/reembolsos/reportes.png)
 
2. **Fazer petição de reembolso**:<br>
quando você tenha identificado a transação, deve selecioná-la para ver o detalhe da mesma e se tem certeza de fazer a petição de reembolso, deve clicar no botão _**Reembolsar**_ que está na seção _**Detalhe da transação**_.

![PrintScreen](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales-pt/reembolsos/reembolso_clic.png)
 
3. **Inserir informação da petição de reembolso**:<br>
Quando tenha indicado que deseja fazer uma petição de reembolso de uma transação, o sistema pedirá uma informação adicional para poder processá-la; a informação requerida é a seguinte: Código de reversão, Tipo de transação (Reembolso ou Reversão parcial), Montante de reversão<sup>\*</sup> e Comentário.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales-pt/reembolsos/reembolso_dialog.png)
 
{{% alert title="Levar em conta" color="info"%}}
<sup>\*</sup> _Reversões parciais_: Se o valor da reversão parcial solicitada supera o valor total atual da transação pai não lhe será permitido processar uma petição de reembolso parcial associada a essa transação. Você deve levar em conta que o valor atual da transação pai pode ter sido afetado por outras petições de reversões parciais.

as Reversões parciais somente aplicam para Brasil, Peru e Argentina.
{{% /alert %}}

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales-pt/reembolsos/reembolso_validacion1.png)

4. **Confirmar solicitud de reembolso**: 
Antes de registrar tu solicitud de reembolso se te mostrará la información de la transacción que seleccionaste junto con la información ingresada y se te solicitará que confirmes la radicación de tu solicitud a través de la opción _**Enviar**_. En caso contrario puedes desistir de la operación a través de la acción _**Cancelar**_.

![Concepts](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales-pt/reembolsos/reembolso_confirmar.png)
 
## Quais os possíveis resultados quando cadastrada sua petição de reembolso?
Quando confirmado o processamento da sua petição de reembolso o sistema, segundo o caso, pode emitir qualquer uma destas respostas:

### Petição de Reembolso aprovada:
Se sua petição de reembolso cumprir com as condições exigidas, você verá a seguinte mensagem de confirmação.

![PrintScreen](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales/reembolsos/reembolso_aprobado.png)

### Petição de Reembolso pendente de aprovação por parte da área encarregada
Nesse caso, a petição de reembolso deve ser revisada e aprovada pela área encarregada da gestão deste tipo de petições, portanto fica em estado pendente e deve aguardar que seja atendida ou gerenciada. Você pode consultar o estado da sua petição de reembolso desde seu Secure através do módulo de _**Relatórios**_ e através da opção _**Reembolsos**_.

![PrintScreen](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales-pt/reembolsos/reembolso_aprobado.png)

{{% alert title="Levar em conta" color="info"%}}
* Se o tipo de transação for _**Reversão Parcial**_ estas petições ficarão em todos os casos em estado Pendente.
* As Reversões parciais somente aplicam o Brasil, Peru e a Argentina
* O tempo de resposta estimado para a gestão da petição de reembolso por parte da área encarregada é de dois (2) dias uteis para todos os países (Argentina, Brasil, Chile, Colômbia, México, Peru, Panamá).
* Os tempos de reintegro do dinheiro aos compradores variam segundo cada país.
{{% /alert %}}

### Petição de Reembolso Declinada
Uma petição de reembolso pode ser declinada por qualquer um dos seguintes motivos:

* **Existe já uma petição de reembolso**:<br>
Se a transação já tem associada uma petição de reembolso que esteja em estado pendente, o sistema indicará que sua petição foi declinada por esse motivo.

![PrintScreen](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales-pt/reembolsos/reembolso_existente.png)

* **Não tem saldo disponível na sua conta**:<br>
Se você não tiver saldo disponível na sua conta o montante equivalente ao valor da transação ou ao valor da petição de reembolso (Em caso de reversões parciais<sup>\*</sup>) você não terá permitido cadastrar uma petição de reembolso associada a transações dessa conta e, portanto, sua petição será declinada.

![PrintScreen](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales-pt/reembolsos/saldo_insuficiente.png)

* **A transação tem pendente uma petição de disputa**:<br>
Se a transação tiver pendente uma Disputa, o sistema indicará que sua petição foi declinada e não irá cadastrar sua petição de reembolso, neste caso você pode consultar seu estado através do módulo de disputas.

![PrintScreen](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales-pt/reembolsos/disputa_pendiente.png)
 
## Onde você pode consultar o estado da sua petição de reembolso?
Para conhecer o estado de suas petições de reembolso você pode entrar a seu Secure no módulo de _**Relatórios**_ e através da opção _**Reembolsos**_ consultar o estado de todas suas petições de reembolso. Se quiser conhecer o estado de uma petição ou petições determinadas, pode aplicar os critérios ou filtros de busca para você fazer buscas específicas. 

![PrintScreen](https://raw.githubusercontent.com/developers-payu-latam/developers-payu-latam.github.io/master/images/soluciones-adicionales-pt/reembolsos/reembolso_consulta.png)