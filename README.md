🚀 Como Rodar o Sistema

Este projeto consiste em um backend desenvolvido com FastAPI. Siga o passo a passo abaixo para executar o sistema em sua máquina local.

📋 Pré-requisitos

Antes de iniciar, certifique-se de que possui instalado:

Python 3.10 ou superior

pip (gerenciador de pacotes do Python)

Git (opcional, caso vá clonar o repositório)

Verifique sua versão do Python com:

python --version 📥 1. Clonar o Repositório

Caso o projeto esteja no GitHub:

git clone URL_DO_REPOSITORIO cd NOME_DO_PROJETO

Se você já possui o projeto em sua máquina, apenas navegue até a pasta raiz dele.

🧱 2. Criar um Ambiente Virtual

É recomendado utilizar um ambiente virtual para isolar as dependências do projeto:

python -m venv venv

Isso criará uma pasta chamada venv no projeto.

▶️ 3. Ativar o Ambiente Virtual No Windows: venv\Scripts\activate No Mac/Linux: source venv/bin/activate

Após ativar, o terminal exibirá (venv) antes da linha de comando.

📦 4. Instalar as Dependências

Com o ambiente virtual ativo, instale as dependências do projeto:

pip install -r requirements.txt 🚀 5. Iniciar o Servidor

Para rodar o sistema, execute:

uvicorn main:app --reload

O parâmetro --reload faz com que o servidor reinicie automaticamente sempre que houver alterações no código.


Para rodar o front-end 

Basta entrar na pasta front end e rodar npm + i e após isso npm run dev

Se tudo estiver correto, aparecerá no terminal:

Application startup complete.
