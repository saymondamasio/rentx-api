## **Cadastro de carro**

### Requisitos funcionais

Deve ser possivel cadastrar um novo carro
Deve ser possivel listar todas as categorias

### Requisitos não funcionais

### Regras de negocio

Quem cadastrar o carro deve ser um usuario administrador.
Não deve ser possivel cadastrar um carro com uma placa já existente
Não deve ser possivel alterar a placa de um carro já existente.
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
Deve ser possivel listar todas as especificações

### Regras de negocio

Quem cadastrar o carro deve ser um usuario administrador.
Não deve ser possivel cadastrar uma especificação para um carro não cadastrado.
Não deve ser possivel cadastrar uma especificação para o mesmo carro.

## **Cadastro de imagens do carro**

### Requisitos funcionais

Deve ser possivel cadastrar a imagem do carro.
Deve ser possivel listar todos os carros.

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
Não deve ser possivel cadastrar um novo aluguel caso já exista um aberto para o mesmo usuario.
Não deve ser possivel cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
