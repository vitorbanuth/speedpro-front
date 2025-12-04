"use client"

import Cabecalho from "./cabecalho";
import SobrenosFaq from "./sobrenos_faq_btns";
import Cards from "./cards_infos";
import Informacoes from "./informacoes";
import Rodape from "./rodape";
import Head from 'next/head';
import { useEffect, useState } from "react";

export default function Home() {
  const [ready, setReady] = useState(false);

    useEffect(() => {
        setReady(true);
    }, []);

    if (!ready) {
        return <div style={{ padding: "40px", textAlign: "center" }}>Carregando...</div>;
    }
  return (

      <div>
        <Cabecalho />
        <Informacoes />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Cards />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <SobrenosFaq />
        <Rodape />
      </div>
    // </>
  );
}
