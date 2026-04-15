import React from "react";
import { TrendingUp, Receipt, FileText } from "lucide-react";
import ProgressBar from "./ProgressBar";
import CardResumo from "./CardResumo";

export default function Dashboard() {
  // Exemplo de dados (substitua pelos dados reais do seu backend)
  const receitas = 454.56;
  const saida = 85.0;
  const lucro = receitas - saida;
  const meta = 15000;
  const percentual = Math.round((receitas / meta) * 100);
  const restante = meta - receitas;

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>
      <p className="dashboard-subtitle">Visão geral de Abril 2026</p>
      <div className="dashboard-alert">Lembrete de vencimentos: mantenha-se em dia com as despesas próximas.</div>
      <div className="dashboard-cards">
        <CardResumo label="Receitas" value={receitas} color="green" icon={<Receipt />} />
        <CardResumo label="Saída" value={saida} color="red" icon={<FileText />} />
        <CardResumo label="Lucro" value={lucro} color="blue" icon={<TrendingUp />} />
      </div>
      <div className="dashboard-meta">
        <div className="meta-info">
          <div>Recebido <span className="meta-value">R$ {receitas.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span></div>
          <div>Meta <span className="meta-value">R$ {meta.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span></div>
          <div>Restante <span className="meta-value">R$ {restante.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span></div>
        </div>
        <ProgressBar percent={percentual} />
        <div className="meta-percent">{percentual}% Alcançado</div>
      </div>
      <div className="dashboard-resumo">
        <h3>Resumo do Mês</h3>
        <div className="resumo-cards">
          <CardResumo label="Receitas" value={receitas} color="green" />
          <CardResumo label="Lucro" value={lucro} color="blue" />
          <CardResumo label="Uber" value={144.56} color="green" />
          <CardResumo label="99" value={0} color="green" />
          <CardResumo label="Combustível" value={saida} color="red" />
          <CardResumo label="Alimentação" value={0} color="red" />
          <CardResumo label="Troca de Óleo" value={0} color="red" />
          <CardResumo label="Lavagem" value={0} color="red" />
          <CardResumo label="Outros" value={0} color="red" />
        </div>
      </div>
    </div>
  );
}
