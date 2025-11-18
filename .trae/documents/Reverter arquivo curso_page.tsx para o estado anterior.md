## Contexto
- O arquivo `mapear-next/src/app/curso/page.tsx` está modificado localmente e contém trechos corrompidos (ex.: `import { use"` em `mapear-next/src/app/curso/page.tsx:2` e `const matrixData = mposiçn pie...` em `mapear-next/src/app/curso/page.tsx:245`).
- O `git status` indica apenas este arquivo alterado, sem commits pendentes. O objetivo é voltar ao estado anterior às alterações desta sessão.

## Plano de Reversão
1. Restaurar a versão do arquivo igual à última commitada (HEAD):
   - Comando: `git restore mapear-next/src/app/curso/page.tsx`
   - Resultado esperado: remover todas as alterações locais deste arquivo e voltar ao estado íntegro anterior.
2. Caso você queira voltar para antes de um "update" específico já commitado:
   - Listar histórico do arquivo: `git log -- mapear-next/src/app/curso/page.tsx`
   - Escolher o commit anterior à atualização desejada.
   - Restaurar desde esse commit: `git restore --source <COMMIT_SHA> mapear-next/src/app/curso/page.tsx`

## Verificação
- Rodar o projeto e abrir a página `/curso` para validar renderização:
  - `npm run dev`
  - Conferir se componentes e dados (accordion, matriz, links de PDFs) aparecem sem erros.
- Validar rapidamente acessibilidade/estilos básicos e ausência de erros no console.

## Observações
- Não criarei novos arquivos; apenas vou reverter o existente.
- Manterei o restante do repositório inalterado.

Confirma que deseja que eu execute a reversão para a última versão commitada (HEAD)?