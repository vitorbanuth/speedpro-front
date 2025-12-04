'use client'
import { useEffect, useState } from "react";

import "./styles.css"
import Cabecalho from "../cabecalho";
import Rodape from "../rodape";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3000'

interface Faq {
  id: number;
  question: string;
  answer: string;
}

export default function PerguntasRespostas() {
  const [abertos, setAbertos] = useState([false]);

  

  const alternacard = (index: number) => {
    const novos = [...abertos];
    novos[index] = !novos[index];
    setAbertos(novos);
  };

  const [faqs, setFaqs] = useState<Faq[]>([]);
  useEffect(() => {
    async function fetchFaqs() {
      try {
        const response = await fetch(`${API_HOST}/getFaqs`);
        const data = await response.json();
        setFaqs(data);
      } catch (error) {
        console.error("Erro ao buscar cursos:", error);
      }
    }

    fetchFaqs();
  }, []);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return <div style={{ padding: "40px", textAlign: "center" }}>Carregando...</div>;
  }

  return (
    <> <Cabecalho />
      <section className="perguntas-respostas">
        <h2>Perguntas e Respostas</h2>
        <ul className="lista-perguntas">
          {faqs.map((item, index) => (
            <li key={index}>
              <div className={`pergunta ${abertos[index] ? 'aberto' : ''}`}>
                <h2>{item.question}</h2>
                <p>{item.answer}</p>
              </div>
              <button className="botao-imagem" onClick={() => alternacard(index)}>
                <img src="/assets/seta_pergunta.svg" alt="Expandir pergunta" />
              </button>
            </li>
          ))}
        </ul>
      </section>
      <Rodape />
    </>
  );
}
