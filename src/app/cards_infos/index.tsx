'use client'
import { useEffect, useState } from 'react';
import './styles.css';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3000'

interface Card {
    id: number;
    title: string;
    description: string;
}

export default function Cards() {
  const [cards, setCards] = useState<Card[]>([]);
          useEffect(() => {
              async function fetchCards() {
                  try {
                      const response = await fetch(`${API_HOST}/getCards`); // rota certa aqui
                      const data = await response.json();
                      setCards(data);
                  } catch (error) {
                      console.error("Erro ao buscar cursos:", error);
                  }
              }
      
              fetchCards();
          }, []);
  const [abertos, setAbertos] = useState([false]);

  const alternarCard = (index: number) => {
    const novos = [...abertos];
    novos[index] = !novos[index];
    setAbertos(novos);
  };

  


  return (
    

      <div className='lista-cards'>
        <div className="row g-4 justify-content center">
        {cards.map((card, index) => (
          <div className="col-lg-3 col-md-6 col-sm-12" key={index}>
            <div className={`card card-custom ${abertos[index] ? 'aberto' : ''}`}>
              <h5 className='titulo-card'>{card.title}</h5>
              {/* <p>{card.descricao}</p> */}
              <div className="detalhes">
                <p>{card.description}</p>
              </div>
              <button className="botao-imagem" onClick={() => alternarCard(index)}>
                <img src='/assets/seta_baixo.svg' alt="Expandir card" />
              </button>
            </div>
          </div>
        ))}
        </div>
      </div>
  );
}
