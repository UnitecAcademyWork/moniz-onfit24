# Upload

> ## Success:
1. ✅ Recebe uma requisição do tipo **POST** na rota **/api/upload**
2. ✅ Valida dados obrigatórios **name**, **mimeType**, **size** e **tempFilePath**
3. ✅ Valida se a requisição foi com um token valido
4. ✅ Faz upload para cloudinary
5. ✅ Retorna 200 com o link do ficheiro
5. ✅ Valida se o tipo de ficheiro enviado é o tipo esperado

> ## Exceptions
1. ✅ Retorna erro 404 se a API não existir
2. ✅ Retorna erro 400 se **name**, **mimeType**, **size** e **tempFilePath** não forem fornecidos
3. ✅ Retorna erro 403 se não tiver um token
4. ✅ Retorna erro 500 se der erro ao tentar Fazer upload para cloudinary