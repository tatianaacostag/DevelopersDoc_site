---
title: "Gestão de usuários"
linkTitle: "Gestão de usuários"
date: 2021-08-27T08:43:01-05:00
type: docs
Description: > 
   Aprenda a gerenciar usuários, perfis e permissões para acessar as contas em seus comércios.
weight: 10
---

Antes de prosseguir, vamos recapitular alguns termos-chave:

* Um _**usuário**_ é uma pessoa que tem um perfil para administrar ou consultar as informações de uma conta.
* Um  _**perfil**_ é um conjunto de permissões para acessar uma conta.
* Um usuário pode ter um ou vários perfis, o que significa que um usuário pode acessar várias _**contas**_ e múltiplos **comércios**.

Para obter mais informações, leia [conceitos do Módulo PayU]({{< ref"PayU Module Documentation#payu-module-concepts" >}}).

## Permissão necessária {#permission-required}
Para ter acesso a este módulo, você precisa ter um perfil com a seguinte permissão habilitada:

* _Listar Usuários_<br>Esta permissão permite que você pesquise um usuário específico.	
* _Gerenciar Usuários_

Consulte [Perfis e permissões]({{< ref"Profile-and-permissions-management.md" >}}) para obter mais informações.

## Gestão de usuários {##user-management}
Para gerenciar usuários, abra sua conta PayU e clique no menu _**Configuração**_ na parte superior da tela. Em seguida, selecione _**Gestão de usuários**_.

![PrintScreen](/assets/UserManagement/UserManagement_01_pt.png)

O módulo _**Gerenciar usuários**_ abre aqui. Você pode encontrar uma lista dos usuários disponíveis, assim como seus status, as contas que eles podem acessar e seus perfis.

![PrintScreen](/assets/UserManagement/UserManagement_02_pt.png)

{{% alert title="Observação" color="info"%}}
Os usuários marcados com uma estrela verde (<img src="/assets/UserManagement/UserManagement_03.png" width="2%"/>) são usuários padrão que não podem ser excluídos (desativados).
{{% /alert %}}

### Adicionar usuários {#add-users}
Você pode criar um usuário usando seu endereço de e-mail ou fornecendo um nome de usuário. Siga as etapas abaixo para criar um usuário.

1. No módulo _**Gerenciar usuários**_, clique em _**Adicionar usuário**_.

![PrintScreen](/assets/UserManagement/UserManagement_04_pt.png)

2. A janela _**Adicionar usuário**_ aparece. Aqui, você pode fornecer os dados da pessoa que terá permissão para cobrar pagamentos pela internet e verificar os dados dos seus pagamentos, de acordo com a permissão que você fornecer.

![PrintScreen](/assets/UserManagement/UserManagement_05_pt.png)

3. Forneça as seguintes informações do usuário:

* **Email**: Endereço de e-mail do novo usuário. PayU envia a informação de login para este endereço de e-mail. Certifique-se de que é válido e de que o usuário tem acesso a ele.<br>Como alternativa, você pode criar um usuário sem usar um endereço de e-mail. Isso é útil especialmente quando o usuário que você deseja criar está vinculado a uma função e não a uma pessoa específica. Para fazer isso, clique em _**Não possui email?**_ e forneça as seguintes informações:
   - _Usuário_: nome de usuário usado para fazer o login. Este nome de usuário não pode conter números nem caracteres especiais.
   - _Email (Admin)_: forneça o e-mail do usuário administrador para o qual PayU enviará as opções para gerar ou recuperar a senha deste usuário.
* **Nome completo**: nome do usuário que você deseja criar.
* **Status**: defina se o usuário que você deseja criar é _Ativo_ ou _Inativo_.

4. Configure as preferências do usuário. Você pode configurar qualquer um dos seguintes:

* **Formato de data**: altere o formato em que deseja exibir as datas em seu Módulo PayU,

<img src="/assets/UserPreferences/UserPreferences_05_pt.png" alt="PrintScreen" width="40%"/><br>

Você pode usar qualquer um dos seguintes formatos:

| Formato     | Exemplo<br>_24 de agosto de 2021_ |
|-------------|-----------------------------------|
| dd/mm/aaaa  | 24/08/2021                        |
| mm/dd/aaaa  | 08/24/2021                        |
| aaaa/mm/dd  | 2021/08/24                        |
| aaaa/mmm/dd | 2021/Ago/24                       |
| dd-mm-aaaa  | 24-08-2021                        |
| mm-dd-aaaa  | 08-24-2021                        |
| aaaa-mm-dd  | 2021-08-24                        |
| aaaa-mmm-dd | 2021-Ago-24                       |

* **Fuso horário**: altera o fuso horário do país no qual deseja exibir as informações da transação.

<img src="/assets/UserPreferences/UserPreferences_06_pt.png" alt="PrintScreen" width="40%"/><br>

* **Formato de moeda**: altere o formato de exibição dos valores monetários mostrados em seu módulo PayU.

<img src="/assets/UserPreferences/UserPreferences_07_pt.png" alt="PrintScreen" width="40%"/><br>

* **Idioma**: altere o idioma do seu módulo PayU.

<img src="/assets/UserPreferences/UserPreferences_08_pt.png" alt="PrintScreen" width="40%"/><br>

5. Na parte inferior da tela, todos os perfis criados (padrão e personalizados) são carregados junto com as contas do comércio atual. Configure o acesso para cada conta definindo um perfil. Se você não quiser habilitar o acesso a uma conta, não selecione um perfil.

![PrintScreen](/assets/UserManagement/UserManagement_07_pt.png)

{{% alert title="Observação" color="info"%}}
Se quiser atribuir um perfil personalizado, você deve criá-lo primeiro.
{{% /alert %}}

6. Assim que terminar, clique em _**Adicionar usuário**_.

![PrintScreen](/assets/UserManagement/UserManagement_08_pt.png)

7. Agora você adicionou o novo usuário! Enviamos um e-mail para o endereço do usuário para que ele possa acessar o módulo PayU.<br>TO novo usuário deve ativar a conta usando o botão _**Ativar minha conta**_ no e-mail.

![PrintScreen](/assets/UserManagement/UserManagement_09_pt.png)

{{% alert title="Observação" color="info"%}}
Se o usuário foi criado sem de e-mail, as instruções para ativar a conta são enviadas para o e-mail Admin que você definiu.
{{% /alert %}}

8. O novo usuário precisa definir uma nova senha para acessar a conta

<img src="/assets/UserManagement/UserManagement_10_pt.png" alt="PrintScreen" width="40%"/><br>

9. Depois que o usuário define a nova senha, ele pode acessar as contas selecionadas usando suas credenciais.

### Buscar usuários {#search-users}
Quando você precisa encontrar um usuário específico, pode usar as opções de filtro para encontrar um ou mais usuários que atendam a determinadas condições.

No módulo _**Gerenciar usuários**_, clique no campo _**Buscar usuários**_ para ver os filtros disponíveis

![PrintScreen](/assets/UserManagement/UserManagement_11_pt.png) 

Depois de selecionar os filtros, clique em _**Buscar**_. Todos os usuários que atendem às condições selecionadas são exibidos na tabela.

![PrintScreen](/assets/UserManagement/UserManagement_12_pt.png) 

Se você deseja remover um filtro, clique no ícone **x** próximo a ele.

### Editar usuários {#edit-users}
No módulo _**Gerenciar usuários**_, você pode atualizar algumas informações de um usuário. Para atualizar um usuário, pesquise e clique nele.

A janela _**Editar usuário**_ aparece.

![PrintScreen](/assets/UserManagement/UserManagement_13_pt.png) 

Você pode atualizar as seguintes informações:

* Nome completo de um usuário
* Solicitar uma recuperação de senha.
* Atualizar o status do usuário (ativo ou inativo)
* Alterar ou remover o perfil atribuído a uma determinada conta.

{{% alert title="Observação" color="info"%}}
A informação das preferências do usuário não pode ser atualizada com esta opção, esta informação é atualizada por cada usuário individualmente.
{{% /alert %}}

Assim que terminar, clique em _**Salvar configuração**_ para confirmar as alterações.

#### Editar vários usuários {#edit-multiple-users}
Para editar vários usuários, pesquise-os e use a caixa de seleção à esquerda. Clique em _**Editar usuários (n)**_.

![PrintScreen](/assets/UserManagement/UserManagement_14_pt.png) 

A janela _**Editar usuários (n)**_ aparece, onde você pode atualizar as seguintes informações:

* Solicitar uma recuperação de senha para todos os usuários.
* Atualizar o status dos usuários (ativo ou inativo)
* Atribuir um perfil a uma determinada conta.

![PrintScreen](/assets/UserManagement/UserManagement_15_pt.png) 

Leve em conta que usando esta opção, todos os usuários terão a mesma configuração que você definir aqui.

Assim que terminar, clique em _**Salvar configuração**_ para confirmar as alterações.