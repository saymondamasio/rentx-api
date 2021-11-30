

## **Cadastro de carro**

### Requisitos funcionais

Deve ser possivel cadastrar um novo carro

### Requisitos não funcionais

### Regras de negocio

Quem cadastrar o carro deve ser um usuario administrador.
Não deve ser possivel cadastrar um carro com uma placa já existente
O carro deve estar disponivel ao cadastrar.

## **Listagem de carros**

### Requisitos funcionais

Deve ser possivel listar todos os carros disponiveis.
Deve ser possivel listar todos os carros disponiveis pelo nome da categoria.
Deve ser possivel listar todos os carros disponiveis pelo nome da marca.
Deve ser possivel listar todos os carros disponiveis pelo nome do carro.

### Requisitos não funcionais

### Regras de negocio

O usuario não precisa estar logado para listar os carros disponiveis.

## **Cadastro de especificação do carro**

### Requisitos funcionais

Deve ser possivel cadastrar uma especificação para um carro.

### Regras de negocio

Quem cadastrar o carro deve ser um usuario administrador.
Não deve ser possivel cadastrar uma especificação para um carro não cadastrado.
Não deve ser possivel cadastrar uma especificação para o mesmo carro.

## **Cadastro de imagens do carro**

### Requisitos funcionais

Deve ser possivel cadastrar a imagem do carro.

### Requisitos não funcionais

Utilizar o multer para upload das imagens.

### Regras de negocio

Quem cadastrar o carro deve ser um usuario administrador.
O usuario deve poder cadastrar mais de uma imagem para o mesmo carro.

## **Aluguel de carro**

### Requisitos funcionais

Deve ser possivel cadastrar uma aluguel

### Regras de negocio

O aluguel deve ter uma duração minima de 24 horas.
Ao realizar o aluguel, os status do carro deverá ser alterado para indisponivel.
Não deve ser possivel cadastrar um novo aluguel caso já exista um aberto para o mesmo usuario.
Não deve ser possivel cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
O usuario deve estar logado na aplicação.

## **Devolução do carro**

### Requisitos Funcionais

Deve ser possivel realizar a devolução de um carro

### Regras de Negocio

Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
Ao realizar a devolução, deverá ser calculado o total do aluguel.
Caso o horário de devolução seja superior ao horário previsto no de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
Caso haja multa, deverá ser somado ao total do aluguel.
O usuario deve estar logado na aplicação.

## **Listagem de alugueis para usuario**

### Requisitos Funcionais

Deve ser possivel realizar a busca de todos os aluguéis de um usuario.

### Regras de Negocio

O usuario deve estar logado na aplicação.

## **Recuperar senha**

### Requisitos Funcionais

Deve ser possivel recuperar a senha de um usuario informando o e-mail cadastrado.
O usuario deve receber um e-mail com o passo a passo para recuperar a senha.
O usuario deve conseguir inserir a nova senha.

### Regras de Negocio

O usuario precisa informar um nova senha.
O link enviado para a recuperação deve expirar após 3 horas.
