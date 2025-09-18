# Manual configurar github por ssh

## INDICE

### Requisitos previos

- 1.1 Verificar dependencias (Git, Node y NPM)
- 1.2 Inicializar repositorio con git init

### Configuración de la clave SSH en GitHub

- 2.1 Comprobar si existe una clave SSH
- 2.2 Crear nueva clave SSH (si no existe)
- 2.3 Añadir clave pública a GitHub

### Añadir la clave al agente SSH

- 3.1 Iniciar el servicio ssh-agent
- 3.2 Agregar la clave al agente

### Verificar conexión con GitHub

- 4.1 Probar autenticación SSH
- 4.2 Configurar el repositorio remoto

### Uso básico de Git

- 5.1 Añadir archivos al staging area
- 5.2 Crear commits
- 5.3 Subir cambios al repositorio remoto

#### Deberemos tener creado el respectivo repositorio.

## 1. Verificar dependencias (Git, Node y NPM)

#### Verificar tener git con: git --version.

#### Verificar tener node con: node --version.

#### Verificar tener npm con: npm --version.

#### A su vez, deberemos asegurarnos de que hemos hecho el git init correspondiente.

## 2. Instalación de la clave en Github

### 2.1 Requisitos previos:

#### Comprobar si tenemos clave

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

### 2.2 Crear clave SSH (si no existe)

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

### 2.3 Realización:

- Debemos ir a

```bash
cat ~/.ssh/id_ed25519.pub
```

> Para poder obtener nuestra clave con nuestro correo.

- Vamos a Github > Settings > SSH and GPG keys > New SSH Key.
- Le ponemos un título personalizado y pegamos la clave que nos devolvió el comando anterior.

![imagen ssh](/img/keygit.png)

## 3. Añadir la clave a Agent

### 3.1 Iniciar el servicio ssh-agent

- Evaluamos si tenemos el comando funcionando.

```bash
eval "$(ssh-agent -s)"
```

> En caso de que no funcione, deberemos ir a la terminal de powershell.

### 3.2 Agregar la clave al agente

- Terminamos con el siguiente comando:

```bash
ssh-add ~/.ssh/id_ed25519
```

el cual nos añade la identidad si no hubo ningún error.

## 4. Verificar la clave

### 4.1 Probar autenticación SSH

- Verificamos la clave con el siguiente comando:

```bash
 ssh -T git@github.com
```

> En caso de que nos diga Hi <usuario>, estará correctamente conectado. En caso contrario, no lo estará.

### 4.2 Configurar el repositorio remoto

- Con el siguiente comando:

```bash
git remote add origin git@github.com:sergioramirezmoron/Curso_25_26_m.git
```

> origin es el ssh

con este comando, estaremos conectados con nuestro Github en la nube.

## 5. Realización de commits

### 5.1 Añadir archivos al staging area

- En primer lugar añadimos el archivo al staging area.

```bash
git add <archivo>
```

### 5.2 Crear commits

- Realizamos un primer commit (recomendado/obligatorio en inglés)

```bash
git commit -m "nombre del commit"
```

### 5.3 Subir cambios al repositorio remoto

- Subir commit

```bash
git push origin main
```
