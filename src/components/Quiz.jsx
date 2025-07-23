// src/components/Quiz.jsx
import { useEffect, useState } from "react";

export default function Quiz({ usuario, assuntoSelecionado, onLogout }) {
  const [perguntas, setPerguntas] = useState([]);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [respostaConfirmada, setRespostaConfirmada] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [quizFinalizado, setQuizFinalizado] = useState(false);

  // Função auxiliar para embaralhar array
  function embaralharArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  // Carrega as perguntas do tema escolhido
  useEffect(() => {
    async function carregarPerguntas() {
      try {
        const response = await fetch(`/data/${assuntoSelecionado}.json`);
        const data = await response.json();

        const perguntasSorteadas = embaralharArray(data)
          .slice(0, 10)
          .map((pergunta) => ({
            ...pergunta,
            respostas: embaralharArray(pergunta.respostas),
          }));

        setPerguntas(perguntasSorteadas);
      } catch (error) {
        console.error("Erro ao carregar perguntas:", error);
      }
    }

    carregarPerguntas();
  }, [assuntoSelecionado]);

  if (perguntas.length === 0) {
    return <p style={{ padding: "1rem" }}>Carregando perguntas...</p>;
  }

  const perguntaAtual = perguntas[indiceAtual];

  function selecionarResposta(resposta) {
    if (!respostaConfirmada) {
      setRespostaSelecionada(resposta);
    }
  }

  function confirmarResposta() {
    if (!respostaSelecionada) return;

    setRespostaConfirmada(true);

    if (respostaSelecionada.correta) {
      setAcertos((prev) => prev + 1);
    }
  }

  function proximaPergunta() {
    if (indiceAtual + 1 < perguntas.length) {
      setIndiceAtual((prev) => prev + 1);
      setRespostaSelecionada(null);
      setRespostaConfirmada(false);
    } else {
      setQuizFinalizado(true);
    }
  }

  if (perguntas.length === 0) {
    return <p style={{ textAlign: "center" }}>Carregando perguntas...</p>;
  }

  if (quizFinalizado) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h2>Parabéns, {usuario.nome}!</h2>
        <p>
          Você concluiu o quiz de <strong>{assuntoSelecionado}</strong>.
        </p>
        <p>
          Acertos: <strong>{acertos}</strong> de{" "}
          <strong>{perguntas.length}</strong>
        </p>
        <button onClick={onLogout}>Sair</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2>
        Pergunta {indiceAtual + 1} de {perguntas.length}
      </h2>
      <p>{perguntaAtual.pergunta}</p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          marginTop: "1rem",
        }}
      >
        {perguntaAtual.respostas.map((resposta, index) => {
          const selecionada = resposta === respostaSelecionada;
          let cor = "#eee";
          if (respostaConfirmada && selecionada) {
            cor = resposta.correta ? "lightgreen" : "lightcoral";
          } else if (selecionada) {
            cor = "#ccc";
          }

          return (
            <button
              key={index}
              onClick={() => selecionarResposta(resposta)}
              disabled={respostaConfirmada}
              style={{
                padding: "0.75rem",
                backgroundColor: cor,
                border: "1px solid #999",
                borderRadius: "5px",
                cursor: respostaConfirmada ? "default" : "pointer",
              }}
            >
              {resposta.texto}
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        {!respostaConfirmada ? (
          <button
            onClick={confirmarResposta}
            disabled={!respostaSelecionada}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: respostaSelecionada ? "pointer" : "not-allowed",
            }}
          >
            Confirmar sua escolha
          </button>
        ) : (
          <button
            onClick={proximaPergunta}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Próxima pergunta
          </button>
        )}
      </div>
    </div>
  );
}
