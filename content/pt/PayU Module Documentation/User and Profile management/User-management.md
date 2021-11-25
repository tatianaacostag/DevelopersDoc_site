---
title: "User Management"
linkTitle: "User Management"
date: 2021-08-27T08:43:01-05:00
type: docs
Description: > 
   Learn how to create, search, update e disable the users who can access your Módulo PayU according to their profile.
weight: 10
---

Before moving on, let's recap some key terms: 

* A _**user**_ is a person who has a profile to manage ou consult the information of an account. 
* A _**profile**_ is a set of permissions to access an account. 
* A user can have one ou multiple profiles, this means that a user can access multiple _**accounts**_ and multiple _**merchants**_.

For further information, read the [concepts behind the Módulo PayU]({{< ref"PayU Module Documentation#payu-module-concepts" >}}).

## Permission required
To have access to this module, you need to have a profile with the following permission enabled:

* _Review Users_<br>This permission allows you to search a specified user.	
* _Create, edit and delete users_

Consulte [Profiles and Permissions]({{< ref"Profile-and-permissions-management.md" >}}) para obter mais informações.

## User management
To manage users, open you PayU account and click _**Settings**_ menu at the top the screen e então selecione _**User management**_.

![PrintScreen](/assets/UserManagement/UserManagement_01.png)

The _**User management**_ module opens, here, you can find a list of the available users along with their status, the accounts they can access e their profile.

![PrintScreen](/assets/UserManagement/UserManagement_02.png)

{{% alert title="Observação" color="info"%}}
The users marked with a green star (<img src="/assets/UserManagement/UserManagement_03.png" width="2%"/>) are default users which cannot be deleted (deactivated).
{{% /alert %}}

### Add users
You can create a user using their e-mail address ou providing a username. Follow the steps below to create a new user.

1. In the _**User management**_ module, click _**Add user**_.

![PrintScreen](/assets/UserManagement/UserManagement_04.png)

2. The _**Add user**_ window appears. Here, you can provide the information of the person who will be allowed to collect payments over the internet and check information about your payments, according to the permission you provide.

![PrintScreen](/assets/UserManagement/UserManagement_05.png)

3. Provide the following user information:

* **E-mail**: E-mail address of the new user. PayU sends the login information to this e-mail address, make sure it is valid and the user has access to it.<br>Alternatively, you can create a user without using an e-mail address. This is useful specially when the user you want to create is attached to a role and not to a specific. To do this, click _**Don't have an e-mail?**_ and provide the following information:
   - _User_: username used to log in. This user name cannot have numbers nor special characters.
   - _E-mail (Admin)_: provide the e-mail of the admin user to which, PayU send the options to generate ou recover the password for this user.
* **Nome completo**: name of the user you want to create.
* **Status**: set if the user you want to create is _Active_ ou _Inactive_.

4. Configure the user preferences. You can configure any of the following:

* **Date format**: change the format in which you want to display the dates in your Módulo PayU,

<img src="/assets/UserPreferences/UserPreferences_05.png" alt="PrintScreen" width="40%"/><br>

You can use any of the following formats:

| Formato      | English Formato | Exemplo<br>_August 24, 2021_ |
|-------------|----------------|------------------------------|
| dd/mm/aaaa  | dd/mm/yyyy     | 24/08/2021                   |
| mm/dd/aaaa  | mm/dd/yyyy     | 08/24/2021                   |
| aaaa/mm/dd  | yyyy/mm/dd     | 2021/08/24                   |
| aaaa/mmm/dd | yyyy/mmm/dd    | 2021/Aug/24                  |
| dd-mm-aaaa  | dd-mm-yyyy     | 24-08-2021                   |
| mm-dd-aaaa  | mm-dd-yyyy     | 08-24-2021                   |
| aaaa-mm-dd  | yyyy-mm-dd     | 2021-08-24                   |
| aaaa-mmm-dd | yyyy-mmm-dd    | 2021-Aug-24                  |

* **Time Zone**: change the time zone of the country in which you want to display the transaction’s information.

<img src="/assets/UserPreferences/UserPreferences_06.png" alt="PrintScreen" width="40%"/><br>

* **Currency format**: change the display format of the currency values shown in your Módulo PayU.

<img src="/assets/UserPreferences/UserPreferences_07.png" alt="PrintScreen" width="40%"/><br>

* **Language**: change the language of your Módulo PayU.

<img src="/assets/UserPreferences/UserPreferences_08.png" alt="PrintScreen" width="40%"/><br>

5. At the bottom of the screen, all the profiles created (both default and custom) loads along with the accounts of the current merchant. Configure the access for each account setting a profile, if you don't want to enable access to an account, don't select a profile.

![PrintScreen](/assets/UserManagement/UserManagement_07.png)

{{% alert title="Observação" color="info"%}}
If you want to assign a custom profile, you must create it first.
{{% /alert %}}

6. Assim que terminar, clique em  _**Add user**_.

![PrintScreen](/assets/UserManagement/UserManagement_08.png)

7. At this point, you have added the new user! We sent an e-mail to user address so they can access the Módulo PayU.<br>The new user has to activate the account using the _**Activate your account**_ button in the e-mail.

<img src="/assets/UserManagement/UserManagement_09.png" alt="PrintScreen" width="40%"/>

{{% alert title="Observação" color="info"%}}
If the user was created without using e-mail, the instructions to activate the account are sent to the Admin e-mail you defined.
{{% /alert %}}

8. The new user needs to set a new password to access the account.

<img src="/assets/UserManagement/UserManagement_10.png" alt="PrintScreen" width="40%"/><br>

9. Once the user sets the new password, they can access to the selected accounts using their credentials.

### Search users
When you need to find a specific user, você pode usar the filter options to find one ou more users that meet given conditions.

In the _**User management**_ module, click the _**Search users**_ field to see the available filters.

![PrintScreen](/assets/UserManagement/UserManagement_11.png) 

Once you have selected the filters, click _**Search**_. All the users that meets the conditions selected are displayed in the table.

![PrintScreen](/assets/UserManagement/UserManagement_12.png) 

If you want to remove a filter, click the **x** icon next to it.

### Edit users
Through the _**User management**_ module, you can update some information of a user. To update a user, search and click them.

The _**Edit user**_ window appears.

![PrintScreen](/assets/UserManagement/UserManagement_13.png) 

You can update the following information:

* Nome completo of a user
* Request a password recovery.
* Update the user status (Active ou Inactive)
* Change ou remove the profile assigned to a given account.

{{% alert title="Observação" color="info"%}}
The information of the user preferences cannot be updated using this option, this information is updated by each user by their own.
{{% /alert %}}

Assim que terminar, clique em  _**Save setting**_ to apply the changes.

#### Edit multiple users
To edit multiple users, search them and use the checkbox at the left. Depois clique em _**Edit users (n)**_.

![PrintScreen](/assets/UserManagement/UserManagement_14.png) 

The _**Edit users (n)**_ window appears, where you can update the following information:

* Request a password recovery for all the users.
* Update their user status (Active ou Inactive)
* Assign a profile to a given account.

![PrintScreen](/assets/UserManagement/UserManagement_15.png) 

Take into account that using this option, all the users will have the same configuration you define here.

Assim que terminar, clique em  _**Save setting**_ to apply the changes.