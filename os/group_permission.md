# Week 4 - Theory - Linux User Accounts

* * *

## Objectives

-   User and Group permissions
-   Add, modify, and remove users and groups
-   Suspend and change user Accounts
-   Manage user and group information in the password and group database
-   Create and Manage limited and special-purpose Accounts

## What are User and Group Permissions

Linux/Unix operating systems have the ability to multitask in a manner similar to other operating systems. However, Linux’s major difference from other operating systems is its ability to have multiple users. Linux was designed to allow more than one user to have access to the system at the same time. In order for this multiuser design to work properly, there needs to be a method to protect users from each other. This is where permissions come in to play.

## Read, Write & Execute Permissions

Permissions are the “rights” to act on a file or directory. The basic rights are read, write, and execute.

-   _Read_ - a readable permission allows the contents of the file to be viewed. A read permission on a directory allows you to list the contents of a directory.
-   _Write_ - a write permission on a file allows you to modify the contents of that file. For a directory, the write permission allows you to edit the contents of a directory (e.g. add/delete files).
-   _Execute_ - for a file, the executable permission allows you to run the file and execute a program or script. For a directory, the execute permission allows you to change to a different directory and make it your current working directory. Users usually have a default group, but they may belong to several additional groups.

## Viewing File permissions

To view the permissions on a file or directory, issue the command `ls -l <directory/file>`. Remember to replace the information in the `< >` with the actual file or directory name. Below is sample output for the ls command:

`-rw-r--r-- 1 root root 1031 Nov 18 09:22 /etc/passwd`

The first ten characters show the access permissions. The first dash **(-)** indicates the type of file (d for directory, s for special file, and - for a regular file). The next three characters **(rw-**) define the owner’s permission to the file. In this example, the file owner has read and write permissions only. The next three characters **(r–)** are the permissions for the members of the same group as the file owner (which in this example is read only). The last three characters **(r–)** show the permissions for all other users and in this example it is read only.

## Creating and Deleting User Accounts

You can add a user to a Linux system with the `useradd` command ([Manual page](http://man.he.net/?topic=useradd§ion=all)), or the `adduser` command ([Manual page](http://man.he.net/?topic=adduser§ion=all)).

`useradd` is native binary compiled with the system. But, `adduser` is a perl script which uses `useradd` binary in back-end. `adduser` is more user friendly and interactive than its back-end `useradd` . There's no difference in features provided. It is advised until you are more familiar with user accounts that you use the `adduser` since it does walk you through basic options and has sensible defaults, including.

| Option          | Description                                                         | Example                                 |
| --------------- | ------------------------------------------------------------------- | --------------------------------------- |
| _no options_    | Create a user with all defaults set                                 | `useradd <name>`                        |
| `-d <home_dir>` | `home_dir` will be used as the value for the user's login directory | `useradd <name> -d /home/<user's home>` |
| `-e <date>`     | the date when the account will expire                               | `useradd <name>** -e <YYYY-MM-DD>`      |
| `-f <inactive>` | the number of days before the account expires                       | `useradd <name> -f <0 or -1>`           |
| `-s <shell>`    | sets the default shell type                                         | `useradd <name> -s /bin/<shell>`        |

`adduser <username>` will produce a set of prompts roughtly representing:

    root@localhost:~# adduser cjones
      Adding user `cjones' ...
      Adding new group `cjones' (1001) ...
      Adding new user `cjones' (1001) with group `cjones' ...
      Creating home directory `/home/cjones' ...
      Copying files from `/etc/skel' ...
      Enter new UNIX password:
      Retype new UNIX password:
      passwd: password updated successfully
      Changing the user information for cjones
      Enter the new value, or press ENTER for the default
          Full Name []: Chuck Jones
          Room Number []: 213
          Work Phone []: 856-555-1212
          Home Phone []:
          Other []:
      Is the information correct? [Y/n] Y

When using `adduser` you will be prompted to give the new user a password, if running `useradd`, unless specified the user is created with no password. You can set the password for any user while operating as _root_ using `sudo`.

    sudo useradd <username>
    sudo passwd <username>

Which produces:

    Changing password for <username>.
    (current) UNIX password:
    Enter new UNIX password:
    Retype new UNIX password:
    passwd: password updated successfully

> It is important to note that security should always be taken very seriously. Therefore, it is strongly recommended to use unique passwords for each account. Never share or give your password to other users.

To _remove_ a user account, again there are two options. `userdel` (low level) and `deluser` (scripted), you can check the corrosponding manual pages `man <command>` for more information:

    deluser <username>

> Issuing the command above will only delete the user’s account. Their files and home directory will not be deleted.

To remove the user, their home folder, and their files, use this command: _(Be careful)_:  

    deluser --remove-home <username>

## Understanding `sudo`

Root is the super user and has the ability to do anything on a system. Therefore, in order to have protection against potential damage `sudo` is used in place of root. `Sudo` allows users and groups access to commands they normally would not be able to use.`Sudo` will allow a user to have administration privileges without logging in as root. A sample of the sudo command is as follows:

In order to provide a user with `sudo` ability, their name will need to be added to the sudoers file. This file is very important and should not be edited directly with a text editor. If the sudoers file is edited incorrectly it could result in preventing access to the system.

Therefore the `visudo` command should be used to edit the sudoers file. At a command line, log into your system as root and enter the command `visudo`.

Below is the portion of the sudoers file that shows the users with `sudo` access.

    # User privilege specification
    root    ALL=(ALL:ALL) ALL
    cjones  ALL=(ALL:ALL) ALL
    kbrown  ALL=(ALL:ALL) ALL
    lmartin ALL=(ALL:ALL) ALL

After you have given your user account `sudo` privileges, save the sudoers file and log out as root. Now log in as your user and test the privileges as your user with `sudo` access. When a new user needs `sudo` access, you will now be able to edit the sudoers file with your own login using the following command:

    sudo visudo

## Working with Groups

Linux uses groups as a way to organize users. Groups organize collections of accounts, primarily as a security measure. Control of group membership is administered through the _/etc/group_ file, which shows a list of groups and its members. Every user has a default or primary group. When a user logs in, the group membership is set for their primary group. This means that when a user launches a program or creates a file, both the file and the running program will be associated with the user’s current group membership. A user may access other files in other groups, as long as they are also a member of that group and the access permissions are set. To run programs or create a file in a different group, the user must run the `newgrp` command to switch their current group. A sample of the `newgrp` command is as follows:

    $ newgrp <groupname>

To make a directory and set permissions at the same time, you can use the following flag on the `mkdir` to do it in one step (create directory, set permissions on directory)

    mkdir -m a=rwx <directory name>

The `-m` option is short for mode, and `a=rwx` means that all users have read, write, and execute permissions on the directory. To see a complete list of all options for the `mkdir` command enter `man mkdir` at a command prompt.

## Changing Directory and File Permissions

To view file permissions and ownership on files and directories, use the ls -al command. The a option is to show hidden files or all files, and the l option is for the long listing. The output will be similar to the following:

    drwxr-xr-x 2 user user 4096 Jan  9 10:11 documents
    -rw-r--r-- 1 user user  675 Jan  7 12:05 .profile
    drwxr-xr-x 4 user user 4096 Jan  7 14:55 public

The first column with the ten letters and dashes shows the permissions of the file or directory. The second column (with the single number) indicates the number of files or directories contained in the directory. The next column indicates the owner, followed by the group name, the size, date, and time of last access, and finally the name of the file . For example, using the first line from the output above, the details are as follows:

    `drwxr-xr-x` are the permissions
    `2` is the number of files or directories
    `user` is the owner
    `user` is the group
    `4096` is the size
    `Jan  9 10:11` is the date/time of last access
    `documents` is the directory

> Since a directory itself is a file, any directory will always show 4096 as it’s size. This does not reflect the size of the contents of the directory.

## `chmod` Command

The command `chmod` is short for change mode. `chmod` is used to change permissions on files and directories. The command `chmod` may be used with either letters or numbers (also known as _octal_) to set the permissions. The letters used with `chmod` are in the table below:

| Letter | Permission                                                       |
| ------ | ---------------------------------------------------------------- |
| r      | Read                                                             |
| w      | Write                                                            |
| x      | Execute                                                          |
| X      | Execute (only if file is a directory)                            |
| s      | Set user or group ID on execution                                |
| t      | Save program text on swap device                                 |
| u      | Current Permissions the file has for owner                       |
| g      | Current Persmissions the file has for users in the same group    |
| o      | Current Permissions the file has for the others not in the group |

It is important to remember that the first character of the first column of a file listing denotes whether it is a directory or a file. The other nine characters are the permissions for the file/directory. The first three characters are for the user, the next three are for the group, and the last three are for others. The example drwxrw-r– is broken down as follows:

-   **d** - is a Directory
-   **rwx** - the user has read, write, and execute Permissions
-   **rw-** - the group has read and write Permissions
-   \*_r-_ - all others have read only Permissions

Note that the dash (-) denotes permissions are removed. Therefore, with the “all others” group, r– translates to read permission only, the write and execute permissions were removed.

Conversely, the plus sign (+) is equivalent to granting permissions: `chmod u+r,g+x <filename>`

The example above translates as follows:

    u is for user
    r is for read
    g is for group
    x is for execute

In other words, the user was given read permission and the group was given execute permission for the file. Note, when setting multiple permissions for a set, a comma is required between sets.

## `chmod` Octal Format

To use the octal format, you have to calculate the permissions for each portion of the file or directory. The first ten characters mentioned above will correspond to a four digit numbers in octal. The execute permission is equal to the number one (1), the write permission is equal to the number two (2), and the read permission is equal to the number four (4). Therefore, when you use the octal format, you will need to calculate a number between 0 and 7 for each portion of the permission. A table has been provided below for clarification.

| Octal Value | Read | Write | Execute |
| ----------- | ---- | ----- | ------- |
| 7           | r    | w     | x       |
| 6           | r    | w     | -       |
| 5           | r    | -     | x       |
| 4           | r    | -     | -       |
| 3           | -    | w     | x       |
| 2           | -    | w     | -       |
| 1           | -    | -     | x       |
| 0           | -    | -     | -       |

Although octal format may seem difficult to understand, it is easy to use once you get the gist of it. However, setting permissions with r, w, and x may be easier. Below are examples of how to use both letters and octal format to set permissions on a file or directory.

> Sample syntax: `chmod <octal or letters> <file/directory name>`
>
> Letter format: `chmod go-rwx` Work (Deny rwx permission for the group and others)

The output of ls -al after the chmod command above would looks as follows:

    dr-------- 2 user user 4096 Dec 17 14:38 Work

Octal format: `chmod 444 Work`

The output of ls -al after the chmod command above would look as follows:

    dr--r--r-- 2 user user 4096 Dec 17 14:38 Work

An octal table showing the numeric equivalent for permissions is provided below.

![Numeric Permissions](https://cdn.irony.online/class/numeric-permissions.png)

## Additional File Permissions

In addition to the most common read/write/execute file permissions, there are some additional modes that you might find useful, specifically the **+t** mode (_sticky bit_) and the **+s** mode (_setuid bit_). These functions describe the behavior of files and executables in multi-user situations.

When set on a file or directory, the _sticky bit_, or **+t** mode, means that only the owner (or root) can delete the file, regardless of which users have write access to this file/directory by way of group membership or ownership. This is useful when a file or directory is owned by a group through which a number of users share write access to a given set of files.

To set the sticky bit on a file named `/home/pi/sticky.txt`, issue the following command:

    chmod +t /root/sticky.txt

To remove the _sticky bit_ from a file, use the `chmod -t` command. Note, to change the _sticky bit_, you need to be either root or the file owner. The root user will be able to delete files regardless of the status of the sticky bit.

The _setuid bit_, or **+s**, when set on files allows users with permissions to execute a given file the ability to run that file with the permissions of file owner. For instance, if the file work was owned by the root user and the marketing group, members of the marketing group could run the work program as if they were the root user. This may pose potential security risks in some cases and executables should be properly evaluated before receiving the **+s** flag. To set the **+s** bit on a file named `/usr/bin/work`, issue the following command:

    chmod g+s /usr/bin/work

In contrast to the **+s** mode for the ownership of a file, the effect of the +s mode on a directory is somewhat different. Files created in +s directories receive the ownership of that directory’s user and group, rather than the ownership of the user that created the file and their default group. To set the _setguid_ (group id) option on a directory, use the following command:

    chmod g+s /var/doc-store/

To set the _setuid_ (user id) for a directory named `/var/doc-store`, issue the following command:

    chmod u+s /var/doc-store/

## Changing File Ownership

By default, all files are “owned” by the user who creates them and by that user’s default group. To change the ownership of a file, use the `chown` command in the `chown user:group /path/to/file` format. In the following example, the ownership of the “list.html” file will be changed to the “cjones” user in the “marketing” group:

    chown cjones:marketing list.html

To change the ownership of a directory and all the files contained inside, use the recursive option with the **-R** flag. In the following example, change the ownership of `/srv/smb/leadership/` to the “cjones” user in the “marketing” group:

    chown -R cjones:marketing /srv/smb/leadership/

## Leveraging Users and Groups

In many cases, user permissions are used to provide your system with greater security without any direct interaction. Many operating systems create specific system user accounts for different packages during the installation process.

The best practice is to give each user their own login to your system. This protects each user’s files from all other users. Furthermore, using specific accounts for users allows more accurate system logging, particularly when combined with tools like `sudo`. We recommend avoiding situations where more than one individual knows the password for a user account for maximum security.

In contrast, groups are useful for allowing multiple independent user accounts to collaborate and share files. If you create groups on a machine for common tasks on a per-task basis (e.g. web editors, contributors, content submitters, support) and add relevant users to the relevant groups, these users can all edit and run the same set of files without sharing these files with the world. Use of the `chown` command with file permissions of 770 and 740 would help accomplish this goal.

## More Information

You may wish to consult the following resources for additional information on this topic. While these are provided in the hope that they will be useful, please note that we cannot vouch for the accuracy or timeliness of externally hosted materials.

-   [User Account and Group Management @ UWISC’s Center for Computer Aided Engineering](http://www.cae.wisc.edu/linaccounts)
-   [Users and Groups Administration in Linux @ DebianAdmin](http://www.debianadmin.com/users-and-groups-administration-in-linux.html)
-   [Online `chmod` Calculator](http://www.onlineconversion.com/html_chmod_calculator.htm)

## Source

-   This document is based on the [Linux Users and Groups
    ](https://www.linode.com/docs/tools-reference/linux-users-and-groups/) by Linode (last revised March 23, 2017).
-   It has been adapated for class, and translated to Markdown by Dave Richer (last revised January 27, 2017 )
