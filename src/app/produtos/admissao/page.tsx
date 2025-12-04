'use client'
import { useEffect, useState } from "react";
import '../style.css';
import Link from 'next/link';
import Cabecalho from "@/app/cabecalho";
import Rodape from "@/app/rodape";
import { useCart } from "@/app/carrinho/cart_context";
import { FaEye, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3000'

interface Admissao {
    id: number;
    name: string;
    quantity: number;
    inStock: boolean;
    description: string;
    image: string;
    price: number;
    Type: string;
    Application: string;
}

export default function ColetoresAdmissao() {

    const [admissoes, setAdmissoes] = useState<Admissao[]>([]);

    useEffect(() => {
        async function fetchAdmissao() {
            try {
                const response = await fetch(`${API_HOST}/getAdmissao`); // rota certa aqui
                const data = await response.json();
                setAdmissoes(data);
            } catch (error) {
                console.error("Erro ao buscar coletores de admissao:", error);
            }
        }

        fetchAdmissao();
    }, []);

    const { addToCart } = useCart();

    const handleAddToCart = (id: number) => {
        let model = "admissao";
        const admissao = admissoes.find(t => t.id === id);

        if (admissao) {
            addToCart({
                key: `${model}-${id}`,
                id: admissao.id,
                name: admissao.name,
                itemPrice: admissao.price,
                image: `${API_HOST}${admissao.image}`
            });
        }
    };

    const [ready, setReady] = useState(false);

    useEffect(() => {
        setReady(true);
    }, []);

    if (!ready) {
        return (
            <div className="min-h-screen flex flex-col bg-black text-white">
                <Cabecalho />


                <div className="flex-1 flex flex-col items-center justify-center gap-6">


                    <motion.div
                        className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    />

                    <motion.p
                        className="text-lg tracking-wide text-gray-300"
                        initial={{ opacity: 0.2 }}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        Carregando...
                    </motion.p>
                </div>

                <Rodape />
            </div>
        )
    }

    return (
        <> <Cabecalho />
            <div className="pagina-produtos">
                <br></br>
                <br></br>
                <h1 className="texto-de-produtos">Coletores de Admissão Disponíveis</h1>
                <br></br>
                <br></br>
                <ul className="lista-produtos">
                    {admissoes.map(admissao => (
                        <li key={admissao.id}>
                            <div className="produto-card">
                                <img src={`${API_HOST}${admissao.image}`} alt={admissao.name} />
                                <div className="produto-info">
                                    <h2>{admissao.name}</h2>
                                    <br></br>
                                    <p>Unidades disponíveis: {admissao.quantity}</p>
                                    <br></br>
                                    <p>Aplicação: {admissao.Application}</p>
                                    <br></br>
                                    <p className="card-price"><strong>R$ {Number(admissao.price).toFixed(3)}</strong></p>
                                    <br></br>

                                    <Link href={"#"}>
                                        <button className="botao-add-carrinho" onClick={() => handleAddToCart(admissao.id)}>
                                            <FaShoppingCart style={{ marginRight: "8px" }} />
                                            Adicionar ao carrinho
                                        </button>
                                    </Link>

                                    <br />

                                    <Link href={`/produtos/admissao/${admissao.id}`}>
                                        <button className="botao-see-details">
                                            <FaEye style={{ marginRight: "8px" }} />
                                            Ver mais
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>
            <Rodape />
        </>
    )

}