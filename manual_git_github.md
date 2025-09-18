# Manual configurar github por ssh

#### Deberemos tener creado el respectivo repositorio.

#### Verificar tener git con: git --version.

#### Verificar tener node con: node --version.

#### Verificar tener npm con: npm --version.

#### A su vez, deberemos asegurarnos de que hemos hecho el git init correspondiente.

## Instalación de la clave en Github

### Requisitos previos:

## Comprobar si tenemos clave

- Escribir:

```bash
$ ls -la ~/.ssh/
```

para comprobar si tenemos clave, si no, debemos ir a powershell.

> Para establecer el servicio en automatico

```powershell
Get-Service ssh-agent | Set-Service -StartupType Automatic
```

> Comenzar servicio agent

```powershell
Start-Service ssh-agent
```

### Al tenerla creada

- Tener una clave SSH, si no la tenemos, crearla con: ssh-keygen -t ed25519 -C "correo".
  ![imagen ssh](/img/keygen.png)

```bash
Usuario@DESKTOP-9P3D1AN MINGW64 ~/Documents/Curso_25_26_m (main)
$ ssh-keygen -t ed25519 -C "sergiothd50@gmail.com"
Generating public/private ed25519 key pair.
Enter file in which to save the key (/c/Users/Usuario/.ssh/id_ed25519):
Created directory '/c/Users/Usuario/.ssh'.
Enter passphrase for "/c/Users/Usuario/.ssh/id_ed25519" (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /c/Users/Usuario/.ssh/id_ed25519
Your public key has been saved in /c/Users/Usuario/.ssh/id_ed25519.pub
The key fingerprint is:
"clave" "correo"
The key's randomart image is:
+--[ED25519 256]--+
|              .o=|
|             . o.|
|         .    o .|
|          o. . . |
|        SEo*.o.  |
|   .   .o.oo=.+ .|
|    o..  Bo.+..+.|
|   ...o.o.O= +oo+|
|    .+. .=++o .=+|
+----[SHA256]-----+

```

### Realización:

- Debemos ir a

```bash
cat ~/.ssh/id_ed25519.pub para poder obtener nuestra clave con nuestro correo.
```

- Vamos a Github > Settings > SSH and GPG keys > New SSH Key.
- Le ponemos un título personalizado y pegamos la clave que nos devolvió el comando anterior.

![imagen ssh](/img/keygit.png)

## Añadir la clave a Agent

- Evaluamos si tenemos el comando funcionando.

```bash
eval "$(ssh-agent -s)".
```

> En caso de que no funcione, deberemos ir a la terminal de powershell.

- Terminamos con el siguiente comando:

```bash
ssh-add ~/.ssh/id_ed25519
```

el cual nos añade la identidad si no hubo ningún error.

## Verificar la clave

- Verificamos la clave con el siguiente comando:

```bash
 ssh -T git@github.com.
```

> En caso de que nos diga Hi <usuario>, estará correctamente conectado. En caso contrario, no estará correctamente conectado.

- Con el siguiente comando:

```bash
git remote add origin git@github.com:sergioramirezmoron/Curso_25_26_m.git
```

> origin es el ssh

con este comando, estaremos conectados con nuestro Github en la nube.

## Realización de commits

- En primer lugar añadimos el archivo.

```bash
git add <archivo>
```

- Realizamos un primer commit (recomendado/obligatorio en inglés)

```bash
git commit -m "nombre del commit"
```

- Subir commit

```bash
git push origin main
```
