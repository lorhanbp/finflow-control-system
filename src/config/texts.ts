
export const texts = {
  // Login Page
  login: {
    title: "Sistema Financeiro",
    subtitle: "Entre com suas credenciais",
    createAccountTitle: "Criar Conta",
    createAccountSubtitle: "Crie sua conta para começar",
    emailLabel: "Email",
    emailPlaceholder: "seu@email.com",
    passwordLabel: "Senha",
    passwordPlaceholder: "Sua senha",
    displayNameLabel: "Nome de Usuário",
    displayNamePlaceholder: "Seu nome completo",
    loginButton: "Entrar",
    createAccountButton: "Criar Conta",
    loadingText: "Aguarde...",
    switchToSignUp: "Não tem conta? Crie uma aqui",
    switchToLogin: "Já tem uma conta? Entre aqui",
    successLoginTitle: "Login realizado com sucesso!",
    successLoginDescription: "Bem-vindo ao sistema financeiro.",
    successSignUpTitle: "Conta criada com sucesso!",
    successSignUpDescription: "Você foi autenticado automaticamente.",
    errorTitle: "Erro na autenticação"
  },

  // Dashboard
  dashboard: {
    title: "Dashboard Financeiro",
    welcomeMessage: "Bem-vindo",
    profileButton: "Perfil",
    logoutButton: "Sair",
    updateProfileTitle: "Atualizar Perfil",
    updateProfileLabel: "Nome de Usuário",
    updateProfilePlaceholder: "Novo nome de usuário",
    updateButton: "Atualizar",
    cancelButton: "Cancelar",
    
    // Financial Summary
    incomeTitle: "Receitas",
    expensesTitle: "Despesas",
    balanceTitle: "Saldo",
    
    // Add Transaction
    addTransactionTitle: "Adicionar Transação",
    typeLabel: "Tipo",
    incomeOption: "Receita",
    expenseOption: "Despesa",
    amountLabel: "Valor",
    amountPlaceholder: "0.00",
    descriptionLabel: "Descrição",
    descriptionPlaceholder: "Descrição",
    categoryLabel: "Categoria",
    categoryPlaceholder: "Categoria",
    addButton: "Adicionar",
    
    // Charts
    cashFlowTitle: "Fluxo de Caixa",
    categoryExpensesTitle: "Gastos por Categoria",
    
    // Recent Transactions
    recentTransactionsTitle: "Transações Recentes",
    dateColumn: "Data",
    descriptionColumn: "Descrição",
    categoryColumn: "Categoria",
    typeColumn: "Tipo",
    amountColumn: "Valor",
    
    // Toast Messages
    logoutSuccessTitle: "Logout realizado com sucesso!",
    logoutSuccessDescription: "Até a próxima!",
    logoutErrorTitle: "Erro ao fazer logout",
    logoutErrorDescription: "Tente novamente.",
    profileUpdateSuccessTitle: "Perfil atualizado!",
    profileUpdateSuccessDescription: "Nome de usuário alterado com sucesso.",
    profileUpdateErrorTitle: "Erro ao atualizar perfil",
    profileUpdateErrorDescription: "Tente novamente.",
    transactionSuccessTitle: "Transação adicionada!",
    transactionSuccessDescription: "Nova transação registrada com sucesso.",
    transactionErrorTitle: "Preencha todos os campos",
    transactionErrorDescription: "Todos os campos são obrigatórios."
  },

  // 404 Page
  notFound: {
    title: "404",
    subtitle: "Oops! Página não encontrada",
    backToHome: "Voltar ao Início"
  },

  // Common
  common: {
    loading: "Carregando...",
    error: "Erro",
    success: "Sucesso",
    currency: "R$"
  }
};

export type TextKeys = typeof texts;
