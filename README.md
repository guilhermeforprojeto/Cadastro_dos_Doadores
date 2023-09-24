# Cadastro_dos_Doadores

Cadastro dos Doadores - Sacolinhas Happy Day 2022

IDEAL *SONHO*


# DOAÇÃO SACOLINHA
- Dados que devem estar previamente presentes no banco de dados 

- - Sacolinhas | Nome Frente Assistida | Nome Assitido | Nome da Celula(n requerido)




Sacolinhas com QR CODE/ Código de Barras.

Formulário WEB  com leitura de QR CODE/ Código de Barras, que buscasse os dados cadastrados da sacolinhas previamente cadastrados.

Formulário WEB com campos (nome, celular, célula, líderes e etc.) para doação de mais de uma sacolinha.

Consulta para acompanhamento da sacolinhas doadas, com os dados dos doadores e a respectiva sacolinha
Exportar um relatório para acompanhamento, uma  planilha Excel atenderia.

 

	• RECEBIMENTO SACOLINHA

		-- Formulário WEB, onde o recebedor da sacolinha faria a leitura do QR CODE/ Código de Barras.

		-- Daria baixa na (s) sacolinha (s) entregue.

		-- Consulta para acompanhamento da quantidade de sacolinhas devolvidas. 

Exportar um relatório para acompanhamento, uma  planilha Excel atenderia.


regras de negocio

NOME DO ASSISTENTE SOCIAL

- id
- Nome
- Cel

Frete Assistida

- id
- nome
- Sacolinhas

SACOLINHA

- id
- ID Assistido (backend)
- codigo Sacolinha
- conteudo Sacolinha
- Nome Assistido
- codigo Frente Assistida
- codigo Doador (backend)
- Assistente respondesavel (backend)
- status (sistema vai preencher - livre) (backend)

DOADOR = DOAÇÃO

- id
- nome
- contato (WHATSAPP)
- Sacolinhas

CÉLULA QUE FREQUENTA

- id
- nome

OBSERVAÇÕES

- id
___

Tabela doação 
 - que junta todas informações 

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
