import './App.css';
import { ContaBancaria } from './models/ContaBancaria';
import { useState, useEffect } from 'react';

function App() {
  const [conta, setConta] = useState<ContaBancaria | null>(null);
  const [saldo, setSaldo] = useState(0);
  const [valor, setValor] = useState('');

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
  }, [conta, saldo]);

  function handleDepositar() {
    if (!conta) return;
    const v = Number(valor);
    if (v > 0) {
      conta.depositar(v);
      setSaldo(conta.verSaldo());
      setValor('');
    }
  }

  function handleSacar() {
    if (!conta) return;
    const v = Number(valor);
    if (v > 0 && v <= saldo) {
      conta.sacar(v);
      setSaldo(conta.verSaldo());
      setValor('');
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Saldo: R$ {saldo.toFixed(2)}</h2>

      <input
        type="number"
        placeholder="Digite o valor"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />

      <br /><br />
      <div className="buttons-container">
      <button onClick={handleDepositar}>Depositar</button>
      <button onClick={handleSacar} style={{ marginLeft: 10 }}>
        Sacar
      </button>
      </div>
    </div>
  );
}

export default App;
