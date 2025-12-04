"use client"

import { useEffect, useState } from 'react';
import Cabecalho from '../cabecalho';
import Rodape from '../rodape';
import './styles.css';

export default function Sobre_Nos() {

    const [ready, setReady] = useState(false);

    useEffect(() => {
        setReady(true);
    }, []);

    if (!ready) {
        return <div style={{ padding: "40px", textAlign: "center" }}>Carregando...</div>;
    }

    return (
        <> <Cabecalho />
            <br></br>
            <br></br>
            <h1> Sobre Nós</h1>
            <br></br>
            <br></br>
            <br></br>
            <article className="sobre-nos">
                <div className='texto'>
                    <p> A Speed Pro Autoparts, foi fundada no início dos anos 2000, quando dois amigos apaixonados por carros, velocidade e mecânica decidiram transformar sua paixão em um negócio. tudo começou em uma pequena garagem, onde preparavam motores e faziam melhorias em carros de rua para amigos e conhecidos. com o tempo, a reputação de qualidade e compromisso com a performance cresceu, e a pequena oficina se transformou em uma marca reconhecida no meio automotivo. </p>
                    <br></br>
                    <p> Ao longo dos anos, a speed pro autoparts expandiu suas operações, passando de uma oficina local para uma loja especializada em componentes de alta performance. hoje, trabalhamos com as melhores marcas do mercado e fornecemos peças para entusiastas, mecânicos e preparadores de todo o país. nossa missão é oferecer soluções que elevem o desempenho e a experiência de dirigir, sempre com foco em qualidade, tecnologia e confiança. </p>
                    <br></br>
                    <p> Acreditamos que cada carro conta uma história, e cada cliente é parte da nossa. por isso, buscamos não apenas vender peças, mas também compartilhar conhecimento, incentivar a personalização e apoiar a cultura automotiva brasileira. da garagem às pistas, seguimos evoluindo sem perder nossas origens — paixão por carros e dedicação à performance. </p>
                </div>
                <img src={"/assets/speedprologo.png"} alt="Banner" />
            </article>
            <Rodape />
        </>
    );
}
