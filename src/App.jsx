// src/App.jsx
import React, { useState } from "react";
import TelaLogin from "./components/TelaLogin";
import TelaBoasVindas from "./components/TelaBoasVindas";
import Quiz from "./components/Quiz";

function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [telaAtual, setTelaAtual] = useState("login"); // 'login', 'boasVindas', 'quiz'
  const [temaSelecionado, setTemaSelecionado] = useState("");

  const handleLogin = (usuario) => {
    setUsuarioLogado(usuario);
    setTelaAtual("boasVindas");
  };

  const handleLogout = () => {
    setUsuarioLogado(null);
    setTelaAtual("login");
    setTemaSelecionado("");
  };

  const handleSelecionarTema = (tema) => {
    setTemaSelecionado(tema);
  };

  const iniciarJogo = () => {
    setTelaAtual("quiz");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {telaAtual === "login" && <TelaLogin onLogin={handleLogin} />}
      {telaAtual === "boasVindas" && (
        <TelaBoasVindas
          nome={usuarioLogado?.nome}
          onTemaSelecionado={handleSelecionarTema}
          onIniciar={iniciarJogo}
        />
      )}
      {telaAtual === "quiz" && (
        <Quiz
          usuario={usuarioLogado}
          assuntoSelecionado={temaSelecionado}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;
