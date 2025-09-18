# Manual para configurar GitHub por ssh

## ÍNDICE

### Requisitos previos

- 1.1 Verificar dependencias (Git, Node y NPM)
- 1.2 Inicializar un repositorio con git init

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

- Verificar tener git con: git --version.

- Verificar tener node con: node --version.

- Verificar tener npm con: npm --version.

## 1.2 Inicializar un repositorio con git init

Debemos asegurarnos de que hemos hecho el git init correspondiente.

## 2. Instalación de la clave en GitHub

### 2.1 Comprobar si existe una clave SSH:

Si aparece algún archivo como id_ed25519, ya tienes una clave generada.
Si no, deberás crear una nueva.
Comprobar con:

```bash
ls -la ~/.ssh/
```

En windows, para asegurarnos de que ssh-agent está activo debemos usar en powershell los siguientes comandos:

```powershell
Get-Service ssh-agent | Set-Service -StartupType Automatic
```

> Para establecer el servicio en automatico

```powershell
Start-Service ssh-agent
```

> Comenzar servicio agent

### 2.2 Crear clave SSH (si no existe)

Debemos tener una clave SSH, si no la tenemos, crearla con:

```bash
ssh-keygen -t ed25519 -C "correo"
```

![imagen ssh](/img/keygen.png)

### 2.3 Añadir clave pública a GitHub:

Debemos ir a

```bash
cat ~/.ssh/id_ed25519.pub
```

> Para poder obtener nuestra clave con nuestro correo.

- Vamos a Github > Settings > SSH and GPG keys > New SSH Key.
- Le ponemos un título personalizado y pegamos la clave que nos devolvió el comando anterior.

![imagen ssh](/img/keygit.png)

## 3. Añadir la clave a Agent

### 3.1 Iniciar el servicio ssh-agent

Evaluamos si tenemos el comando funcionando.

```bash
eval "$(ssh-agent -s)"
```

![imagen ssh](/img/eval.png)

> En caso de que no funcione, deberemos ir a la terminal de powershell y usar los comandos anteriormente comentados.

### 3.2 Agregar la clave al agente

Terminamos con el siguiente comando el cual nos añade la identidad si no hubo ningún error:

```bash
ssh-add ~/.ssh/id_ed25519
```

## 4. Verificar la clave

### 4.1 Probar autenticación SSH

Verificamos la clave con el siguiente comando:

```bash
 ssh -T git@github.com
```

> En caso de que nos diga Hi "usuario", estará correctamente conectado. En caso contrario, no lo estará.

![imagen ssh](/img/githubT.png)

### 4.2 Configurar el repositorio remoto

Con el siguiente comando conectaremos nuestro repositorio local con nuestro Github en la nube:

```bash
git remote add origin git@github.com:sergioramirezmoron/Curso_25_26_m.git
```

> origin es el ssh

## 5. Realización de commits

### 5.1 Añadir archivos al staging area

En primer lugar añadimos el archivo al staging area.

```bash
git add <archivo>
```

### 5.2 Crear commits

Realizamos un primer commit (recomendado/obligatorio en inglés)

```bash
git commit -m "nombre del commit"
```

### 5.3 Subir cambios al repositorio remoto

Subir commit

```bash
git push origin main
```
