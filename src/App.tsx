import './App.css';
import { ContaBancaria } from './models/ContaBancaria';
import { useState, useEffect } from 'react';

function App() {
  const [conta, setConta] = useState<ContaBancaria | null>(null);
  const [saldo, setSaldo] = useState(0);
  const [valor, setValor] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  useEffect(() => {
    const novaConta = new ContaBancaria();
    const saldoSalvo = localStorage.getItem('saldo');

    if (saldoSalvo) {
      novaConta.depositar(Number(saldoSalvo));
    }

    setConta(novaConta);
    setSaldo(novaConta.verSaldo());
  }, []);

  useEffect(() => {
    if (conta) {
      localStorage.setItem('saldo', String(conta.verSaldo()));
      setSaldo(conta.verSaldo());
    }
  }, [conta]);

  const handleDepositar = () => {
  const valorNumerico = Number(valor);

  if (conta) {
    if (valorNumerico <= 0) {
      setMensagemErro('Digite um valor positivo para depositar 🧐');
      return;
    }

    conta.depositar(valorNumerico);
    setSaldo(conta.verSaldo());
    setValor('');
    setMensagemErro('');
  }
};

const handleSacar = () => {
  const valorNumerico = Number(valor);

  if (conta) {
    if (valorNumerico <= 0) {
      setMensagemErro('Digite um valor positivo para sacar 🧐');
      return;
    }

    if (valorNumerico > conta.verSaldo()) {
      setMensagemErro('Saldo insuficiente 😢');
    } else {
      conta.sacar(valorNumerico);
      setSaldo(conta.verSaldo());
      setValor('');
      setMensagemErro('');
    }
  }
};


  return (
    <div className="container">
      <h2>Saldo: R$ {saldo.toFixed(2)}</h2>

      {mensagemErro && <p className="mensagem-erro">{mensagemErro}</p>}

      <input
        type="number"
        placeholder="Digite o valor"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />

      <div className="buttons-container">
        <button onClick={handleDepositar}>Depositar</button>
        <button onClick={handleSacar}>Sacar</button>
      </div>
    </div>
  );
}

export default App;
