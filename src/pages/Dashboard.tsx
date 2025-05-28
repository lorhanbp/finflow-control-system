
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { LogOut, ChartBar, ChartLine } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  date: string;
  category: string;
}

const Dashboard = () => {
  const { user, logout, updateUserProfile } = useAuth();
  const { toast } = useToast();
  const [showProfile, setShowProfile] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(user?.displayName || '');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [newTransaction, setNewTransaction] = useState({
    type: 'income' as 'income' | 'expense',
    amount: '',
    description: '',
    category: ''
  });

  useEffect(() => {
    // Dados de exemplo para demonstração
    const exampleData: Transaction[] = [
      { id: '1', type: 'income', amount: 5000, description: 'Salário', date: '2024-01-01', category: 'Trabalho' },
      { id: '2', type: 'expense', amount: 1200, description: 'Aluguel', date: '2024-01-02', category: 'Moradia' },
      { id: '3', type: 'expense', amount: 300, description: 'Supermercado', date: '2024-01-03', category: 'Alimentação' },
      { id: '4', type: 'income', amount: 800, description: 'Freelance', date: '2024-01-04', category: 'Extra' },
      { id: '5', type: 'expense', amount: 150, description: 'Combustível', date: '2024-01-05', category: 'Transporte' },
    ];
    setTransactions(exampleData);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logout realizado com sucesso!",
        description: "Até a próxima!",
      });
    } catch (error) {
      toast({
        title: "Erro ao fazer logout",
        description: "Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await updateUserProfile(newDisplayName);
      setShowProfile(false);
      toast({
        title: "Perfil atualizado!",
        description: "Nome de usuário alterado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar perfil",
        description: "Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const addTransaction = () => {
    if (!newTransaction.amount || !newTransaction.description || !newTransaction.category) {
      toast({
        title: "Preencha todos os campos",
        description: "Todos os campos são obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const transaction: Transaction = {
      id: Date.now().toString(),
      type: newTransaction.type,
      amount: parseFloat(newTransaction.amount),
      description: newTransaction.description,
      date: new Date().toISOString().split('T')[0],
      category: newTransaction.category
    };

    setTransactions([...transactions, transaction]);
    setNewTransaction({ type: 'income', amount: '', description: '', category: '' });
    
    toast({
      title: "Transação adicionada!",
      description: "Nova transação registrada com sucesso.",
    });
  };

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  const chartData = transactions.map(t => ({
    date: t.date,
    receitas: t.type === 'income' ? t.amount : 0,
    despesas: t.type === 'expense' ? t.amount : 0,
  }));

  const categoryData = transactions.reduce((acc: any[], t) => {
    const existing = acc.find(item => item.category === t.category);
    if (existing) {
      existing.value += t.amount;
    } else {
      acc.push({ category: t.category, value: t.amount });
    }
    return acc;
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Financeiro</h1>
              <p className="text-gray-600">Bem-vindo, {user?.displayName || user?.email}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowProfile(!showProfile)}
              >
                Perfil
              </Button>
              <Button
                variant="destructive"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>

        {/* Profile Update */}
        {showProfile && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Atualizar Perfil</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <Label htmlFor="displayName">Nome de Usuário</Label>
                  <Input
                    id="displayName"
                    value={newDisplayName}
                    onChange={(e) => setNewDisplayName(e.target.value)}
                    placeholder="Novo nome de usuário"
                  />
                </div>
                <Button onClick={handleUpdateProfile}>Atualizar</Button>
                <Button variant="outline" onClick={() => setShowProfile(false)}>Cancelar</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Financial Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">Receitas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">R$ {totalIncome.toLocaleString('pt-BR')}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Despesas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">R$ {totalExpenses.toLocaleString('pt-BR')}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className={balance >= 0 ? "text-green-600" : "text-red-600"}>Saldo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">R$ {balance.toLocaleString('pt-BR')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Transaction */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Adicionar Transação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <Label>Tipo</Label>
                <select
                  value={newTransaction.type}
                  onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value as 'income' | 'expense'})}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="income">Receita</option>
                  <option value="expense">Despesa</option>
                </select>
              </div>
              <div>
                <Label>Valor</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                />
              </div>
              <div>
                <Label>Descrição</Label>
                <Input
                  placeholder="Descrição"
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
                />
              </div>
              <div>
                <Label>Categoria</Label>
                <Input
                  placeholder="Categoria"
                  value={newTransaction.category}
                  onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={addTransaction} className="w-full">Adicionar</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartLine className="h-5 w-5" />
                Fluxo de Caixa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, '']} />
                  <Legend />
                  <Line type="monotone" dataKey="receitas" stroke="#22c55e" strokeWidth={2} />
                  <Line type="monotone" dataKey="despesas" stroke="#ef4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartBar className="h-5 w-5" />
                Gastos por Categoria
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, 'Valor']} />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Transações Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Data</th>
                    <th className="text-left p-2">Descrição</th>
                    <th className="text-left p-2">Categoria</th>
                    <th className="text-left p-2">Tipo</th>
                    <th className="text-right p-2">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.slice(-5).map(transaction => (
                    <tr key={transaction.id} className="border-b">
                      <td className="p-2">{new Date(transaction.date).toLocaleDateString('pt-BR')}</td>
                      <td className="p-2">{transaction.description}</td>
                      <td className="p-2">{transaction.category}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded text-sm ${
                          transaction.type === 'income' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {transaction.type === 'income' ? 'Receita' : 'Despesa'}
                        </span>
                      </td>
                      <td className={`p-2 text-right font-semibold ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}R$ {transaction.amount.toLocaleString('pt-BR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
