# SignUp

> ## Success:
1. ✅ Recebe uma requisição do tipo **POST** na rota **/api/signup**
1. ✅ Valida dados obrigatórios **name**, **email**, **password** e **passwordConfirmation**
1. ✅ Valida que **password** e **passwordConfirmation** são iguais
1. ✅ Valida que o campo **email** é um e-email válido
1. ⛔️ Valida que já existe um usuário com o e-email fornecido
1. ✅ Gera uma senha criptógrafada (essa senha não pode ser descriptografaga)
1. ✅ Cria uma conta para o usuário com os dados informados, substituindo a senha pela senha criptografada
1. ⛔️ Gera um token de acesso a partir do ID do usuário
1. ⛔️ Atualiza os dados do usuário com o token de acesso
1. ⛔️ Retorna 200 com o token de acesso

> ## Exceptions
1. ✅ Retorna erro 404 se a API não existir
1. ✅ Retorna erro 400 se **name**, **email**, **password** ou **passwordConfirmation** não forem fornecidos pelo cliente
1. ✅ Retorna erro 400 se **password** ou **passwordConfirmation** não forem iguais
1. ✅ Retorna erro 400 se o campo **email** for um e-email inválido
1. ⛔️ Retorna erro 403 se o email fornecido já estiver em uso
1. ✅ Retorna erro 500 se der erro ao tentar criar uma senha criptografada
1. ✅ Retorna erro 500 se der erro ao tentar gerar o token de acesso
1. ⛔️ Retorna erro 500 se der erro ao tentar gerar token de acesso
1. ⛔️ Retorna erro 500 se der erro ao tentar atualizar o usuário com o token de acesso