# MobileListAnswers

Este repositório é usado para **armazenar respostas de atividades** relacionadas a cursos ou estudos de desenvolvimento mobile.

---

## 📂 Estrutura

- Cada atividade possui sua própria pasta ou arquivo com as respostas correspondentes.
- O repositório é apenas para **consulta pessoal**, sem fins comerciais.

## 📂 Respostas

# 1. Questão

## Expo Router
- **Conceito:** Sistema de navegação do Expo baseado em rotas de arquivos, parecido com Next.js.  
- **Comportamento:** Cada arquivo dentro da pasta `app/` representa automaticamente uma tela ou rota, sem necessidade de configurar manualmente.  
- **Aplicação:** Facilita a navegação em projetos Expo sem precisar configurar navigators manualmente.  

## React Navigation
- **Conceito:** Biblioteca padrão de navegação para React Native.  
- **Comportamento:** Permite criar e gerenciar rotas de forma declarativa, controlando pilhas de telas, abas, menus laterais, etc.  
- **Aplicação:** Usada quando se deseja controle total da navegação.  

## Drawer Navigation
- **Conceito:** Um menu lateral deslizante.  
- **Comportamento:** O usuário pode abrir o menu deslizando da lateral ou tocando em um ícone.  
- **Aplicação:** Usado em apps com múltiplas seções, onde o usuário precisa navegar entre áreas principais (ex: configurações, perfil, ajuda).  

## Bottom Tab
- **Conceito:** Navegação por abas na parte inferior da tela.  
- **Comportamento:** Cada aba representa uma tela principal; o usuário alterna entre elas tocando nos ícones.  
- **Aplicação:** Comum em apps que têm poucas seções principais.  

## Stack Navigator
- **Conceito:** Baseia-se em uma pilha de telas, cada nova tela é empilhada sobre a anterior.  
- **Comportamento:** Funciona como um histórico: você pode “empilhar” (navegar) e “desempilhar” (voltar) telas.  
- **Aplicação:** Ideal para fluxos lineares, como login → home → detalhes.  

---

# 2. Questão

## useState
- Armazena e atualiza valores dentro de um componente funcional.  
- Sempre que o valor muda, o componente re-renderiza.  
- **Exemplo:** Guardar o valor de um input, contador, etc.  

## useEffect
- Executa efeitos colaterais em componentes, como chamadas de API, timers ou manipulação do DOM.  
- Roda sempre que o componente renderiza, apenas uma vez (com array vazio `[]`) ou quando variáveis específicas mudam.  

## useMemo
- Memoriza o resultado de um cálculo para evitar recomputações desnecessárias.  
- Útil para cálculos pesados ou filtragem de listas que só devem ser refeitos quando certas dependências mudam.  

## useCallback
- Memoriza uma função para que ela não seja recriada a cada renderização.  
- **Exemplo:** Útil quando a função é passada como prop para componentes filhos e queremos evitar renders desnecessários.  

### Conceitos Relacionados
- **Cleanup:** Processo de limpar efeitos anteriores feitos pelo `useEffect`.  
- **Rerenderização:** Ocorre quando há mudança de estado ou props, fazendo o React reexecutar o componente para atualizar a interface.  
- **Contexto:** Permite compartilhar dados entre componentes sem precisar passar props manualmente em cada nível.  

---

# 3. Questão

## justify-content
Define como os itens dentro do contêiner flex serão alinhados ao longo do eixo principal.

- **space-between:** Primeiro item encostado no início, último no fim, espaços iguais entre os itens intermediários.  
- **space-around:** Espaços iguais ao redor de cada item, com bordas internas maiores.  
- **space-evenly:** Espaços exatamente iguais entre todos os itens e nas bordas.  

## flex-direction
Controla a direção do eixo principal do contêiner.  

## Alinhamento de itens
- **flex-start:** Alinha os itens no início do eixo principal.  
- **flex-end:** Alinha os itens no final do eixo principal.  
- **center:** Centraliza os itens no eixo principal, deixando espaço igual em ambos os lados.  

---

# 4. Questão

## Axios e Fetch API
- Ambos suportam `async/await`.  
- **Axios:** Facilita parse de JSON, interceptors, timeout e tratamento de erros consistente.  
- **Fetch:** Nativo, sem dependência extra, mas precisa checar manualmente `res.status`.  

## CORS (Web x Mobile)
- **Web:** Navegador aplica CORS, bloqueando respostas sem cabeçalhos adequados.  
- **Mobile:** Apps nativos normalmente não sofrem restrição CORS (exceto WebViews).  

## GraphQL
- Linguagem de consulta para APIs, permite buscar apenas os campos necessários, evitando over/under-fetching.  
- Útil em Marketplaces: produto ↔ vendedor ↔ avaliações ↔ estoque, reduz múltiplas requisições REST.  

## Apollo Client
- Cache inteligente e normalização de dados.  
- Hooks declarativos (`useQuery`, `useMutation`).  
- Suporte a subscriptions e DevTools, facilita manutenção do estado remoto/local.  

## Exemplo de acesso a API (JSONPlaceholder)
- Use `try/catch` para tratar erros de rede e status HTTP:  
  - `200` → sucesso  
  - `404` → recurso não encontrado  
  - `500` → erro no servidor  

---

# 5. Questão

## Melhorias de usabilidade em app de farmácia

- **Navegação intuitiva e fluida:**  
  Expo Router e React Navigation estruturam a navegação clara, acessando Início, Carrinho e Perfil rapidamente.  

- **Menu inferior (Bottom Tab):**  
  Mantém opções principais sempre visíveis, facilitando acesso e reduzindo cliques.  

- **Assistente com Inteligência Artificial:**  
  IA conversacional sugere medicamentos com base nos sintomas, aumentando eficácia e satisfação.  

- **Design limpo e acessível:**  
  Layout com foco em legibilidade, contraste adequado e botões bem posicionados.  

- **Fluxo de compra otimizado:**  
  Processo simplificado de adicionar produtos ao carrinho e finalizar compra, exibindo informações de forma clara.  

---

# 6. Questão

## UI Thread

- **Conceito:** Thread onde o sistema renderiza a interface e processa eventos de interação.  
- **Responsável por:** Inicializar componentes visuais, gerenciar loop de eventos e atualizar o estado visual.  

## Sequência de carregamento
1. **Inicialização da aplicação:** Sistema cria o processo e thread principal.  
2. **Carregamento do layout:** Interface desenhada e montada.  
3. **Execução do loop de eventos:** UI Thread entra em ciclo contínuo aguardando ações do usuário.  
4. **Interações e atualizações:** Clique, toque ou mudança visual processada na thread.  
5. **Encerramento:** Thread principal finalizada quando app é fechado.  

---

# 8. Questão

## AsyncStorage
- **Descrição:** Armazenamento simples de pares chave–valor (semelhante ao localStorage).  
- **Pontos positivos:** Fácil de usar, ideal para dados leves, API nativa, funciona em Android/iOS.  
- **Pontos negativos:** Desempenho ruim com grandes volumes, não suporta consultas complexas, sem criptografia nativa.  

## expo-sqlite
- **Descrição:** Banco de dados SQLite dentro de apps Expo.  
- **Pontos positivos:** Suporta queries complexas, estruturado, dados persistem entre sessões, integrado ao Expo.  
- **Pontos negativos:** Requer SQL manual, menos intuitivo que AsyncStorage, desempenho limitado em grandes bancos.  

## SQLite
- **Descrição:** Implementação nativa SQLite fora do Expo.  
- **Pontos positivos:** Banco relacional completo, alta performance, compatibilidade Android/iOS, ideal para offline robusto.  
- **Pontos negativos:** Configuração nativa complexa, manutenção de schema manual.  

## react-native-keychain
- **Descrição:** Armazena credenciais de forma segura (Keychain iOS / Keystore Android).  
- **Pontos positivos:** Criptografado, ideal para dados sensíveis, integração nativa, suporte a biometria.  
- **Pontos negativos:** Não para dados gerais, configuração nativa detalhada, estrutura limitada.  

---

# 9. Questão

## Notifee
- Biblioteca para gerenciar notificações locais e push.  
- Suporta estilos, agendamento, canais/categorias (Android).  

## Notificações locais vs remotas
- **Locais:** Criadas e exibidas diretamente no dispositivo.  
- **Remotas (push):** Enviadas por servidor via Firebase Cloud Messaging (FCM).  

## Notificações em background
- Recebidas mesmo com app fechado.  
- FCM envia ao sistema, Notifee exibe visualmente.  
- Lógicas personalizadas exigem handlers de background.  

## Firebase Cloud Messaging (FCM)
- Serviço da Google para mensagens e notificações push.  
- Suporta Android, iOS e Web; mensagens via painel ou API REST.  
- Funciona com Notifee para exibir notificações.  

## Permissões necessárias
- **Android:** POST_NOTIFICATIONS (API 33+), configuração de canais obrigatória.  
- **iOS:** Autorizar notificações (`requestPermissions()`), registrar app no APNs.  

## React Native Push Notification
- Biblioteca alternativa para notificações locais e push.  
- Pode ser usada junto com FCM.  



---

## 🚀 Como usar

1. Clone o repositório:
   ```bash
   git clone https://github.com/LucasTesche1/MobileListAnswers.git
