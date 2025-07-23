// src/components/TelaBoasVindas.jsx
import React, { useState } from "react";

export default function TelaBoasVindas({ nome, onTemaSelecionado, onIniciar }) {
  const [tema, setTema] = useState("");

  const temasDisponiveis = ["geografia", "historia", "ciencias"];

  const handleSelecionarTema = (e) => {
    const temaEscolhido = e.target.value;
    setTema(temaEscolhido);
    onTemaSelecionado(temaEscolhido);
  };

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold mb-4">Bem-vindo, {nome}!</h1>

      <p className="mb-4">Escolha o assunto das perguntas:</p>

      <select
        className="p-2 border rounded mb-4"
        value={tema}
        onChange={handleSelecionarTema}
      >
        <option value="">-- Selecione um tema --</option>
        {temasDisponiveis.map((t) => (
          <option key={t} value={t}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </option>
        ))}
      </select>

      <div>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={onIniciar}
          disabled={!tema}
        >
          Iniciar Jogo
        </button>
      </div>
    </div>
  );
}
