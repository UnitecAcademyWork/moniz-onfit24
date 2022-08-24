# Objective

> ## Success:
1. ✅ Recebe uma requisição do tipo **POST** na rota **/api/objective**
2. ✅ Valida dados obrigatórios **name**, **description** e **icon**
3. ✅ Valida se a requisição foi feita por um administrador
4. ✅ Cria um objectivo com dados fornecidos
5. ✅ Retorna 200 com os objectivos

> ## Exceptions
1. ✅ Retorna erro 404 se a API não existir
2. ✅ Retorna erro 400 se **name**, **description** e **icon** não forem fornecidos
3. ✅ Retorna erro 403 se não for administrador
3. ✅ Retorna erro 403 se o objectivo inserido já existe
4. ✅ Retorna erro 500 se der erro ao tentar criar um objectivo