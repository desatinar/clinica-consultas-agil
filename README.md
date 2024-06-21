# Exercício - Clínica de Consulta Ágil

### Visão Geral
Este exercício representa uma fase do processo seletivo da Aceleradora Ágil. Consiste no desenvolvimento de um sistema de clínica de consultas.

### Funcionalidades
**Cadastrar um paciente:** Permite o registro de novos pacientes no sistema. 

**Marcações de consultas:** Permite agendar consultas para pacientes já cadastrados.

**Cancelamento de consultas:** Permite cancelar consultas anteriormente agendadas.

**Armazenamento:** A simulação do 'banco de dados' foi feita utilizando arquivos JSON.

### Implementação
O sistema foi desenvolvido utilizando [Node.js](https://nodejs.org/en) e a biblioteca [Inquirer](https://github.com/SBoudrias/Inquirer.js) para a criação de uma interface de linha de comando interativa.

### Pré-requisito de Instalação
É necessário possuir o Node.js instalado em sua máquina. O download pode ser feito através desse link [Node.js](https://nodejs.org/en/download/package-manager).

### Instruções de Uso
1. **Instalação:**

```js
npm install
```

2. **Execução:**

```js
npm run start
```

### Explicação do Projeto

#### Estrutura de Arquivos

A organização das pastas e arquivos principais do projeto segue uma separação de responsabilidades:

- **controller/**: Contém a lógica de controle da aplicação.
  - `userController.js`: Lida com as operação relacionada aos pacientes (cadastro).
  - `appointmentController.js`: Lida com as operações relacionadas às consultas (agendamento e cancelamento).

- **model/**: Contém a lógica de dados da aplicação, incluindo leitura e escrita nos arquivos JSON que simulam o banco de dados.
  - `userModel.js`: Define as funções para registrar pacientes e verificar se um paciente está registrado.
  - `userDatabaseModel.js`: Manipula diretamente o arquivo JSON que armazena os dados dos pacientes.
  - `appointmentModel.js`: Define a função para cadastrar uma consulta.
  - `userDatabaseModel.js`: Manipula diretamente o arquivos JSON que armazenam os dados das consultas.

- **utils/**: Contém funções utilitárias para validação dos dados.
  - `userValidationUtil.js`: Funções para validar dados dos pacientes, como verificação de números de telefone, IDs e se possui algum paciente no banco de dados.
  - `appointmentValidationUtil.js`: Funções para validar dados das consultas, como verificação de datas e horários válidos.

#### Exemplo de fluxo:

- Quando uma pessoa usuária solicita o cadastro de um novo paciente, o `userController` recebe os dados, valida-os utilizando funções em `userValidationUtil.js`, e então chama as funções contidas em `userModel` para armazenar os dados.
- Para agendar uma consulta, o `appointmentController` valida a data e o horário utilizando funções em `appointmentValidationUtil.js`, verifica se o paciente e a consulta existem e então chama os métodos em `appointmentModel` para registrar a consulta.

#### Validações Específicas

1. **Validações de Pacientes (em `userValidationUtil.js`)**:
   - **Número de telefone repetido**: Garante que não existam números de telefone duplicados no sistema.
   - **Formato numérico do telefone**: Verifica se o número de telefone fornecido é numérico.
   - **Existência do ID do usuário**: Verifica se o ID do usuário existe no banco de dados.
   - **Existência de usuários**: Verifica se o banco de dados possui pessoas cadastradas.

2. **Validações de Consultas (em `appointmentValidation.js`)**:
   - **Formato de data**: Verifica se a data fornecida está no formato correto (DD/MM/AAAA).
   - **Data anterior à data atual**: Garante que a data da consulta não é anterior à data atual.
   - **Formato de hora inserido**: Verifica se a hora fornecida está no formato correto (HH:MM).
   - **Existência de consulta no mesmo dia e horário**: Garante que não haja consultas duplicadas para o mesmo paciente no mesmo dia e horário.
   - **Validação do ID da consulta**: Verifica se o ID fornecido para a consulta é válido e existente.
   - **Existência de consultas**: Verifica se o banco de dados possui consultas cadastradas.

Essas validações são chamadas nos controllers antes que os dados sejam passados para os models para garantir que apenas dados válidos sejam persistidos no banco de dados simulado.
