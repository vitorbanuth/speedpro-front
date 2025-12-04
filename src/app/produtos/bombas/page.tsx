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

interface Bomba {
    id: number;
    name: string;
    quantity: number;
    inStock: boolean;
    description: string;
    image: string;
    price: number;
    Type: string;
    MaxPressure: string;
    Application: string;
}

export default function BicosInjetores() {

    const [bombas, setBombas] = useState<Bomba[]>([]);

    useEffect(() => {
        async function fetchBicos() {
            try {
                const response = await fetch(`${API_HOST}/getBombas`); // rota certa aqui
                const data = await response.json();
                setBombas(data);
            } catch (error) {
                console.error("Erro ao buscar bombas de combustivel:", error);
            }
        }

        fetchBicos();
    }, []);

    const { addToCart } = useCart();

    const handleAddToCart = (id: number) => {
        let model = "bomba";
        const bomba = bombas.find(t => t.id === id);

        if (bomba) {
            addToCart({
                key: `${model}-${id}`,
                id: bomba.id,
                name: bomba.name,
                itemPrice: bomba.price,
                image: `${API_HOST}${bomba.image}`
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
                <h1 className="texto-de-produtos">Bombas de Combustível Disponíveis</h1>
                <br></br>
                <br></br>
                <ul className="lista-produtos">
                    {bombas.map(bomba => (
                        <li key={bomba.id}>
                            <div className="produto-card">
                                <img src={`${API_HOST}${bomba.image}`} alt={bomba.name} />
                                <div className="produto-info">
                                    <h2>{bomba.name}</h2>
                                    <br></br>
                                    <p>Unidades disponíveis: {bomba.quantity}</p>
                                    <br></br>
                                    <p>Aplicação: {bomba.Application}</p>
                                    <br></br>
                                    <p>Pressão Máxima: {bomba.MaxPressure}</p>
                                    <br></br>
                                    <p className="card-price"><strong>R$ {Number(bomba.price).toFixed(3)}</strong></p>
                                    <br></br>

                                    <Link href={"#"}>
                                        <button className="botao-add-carrinho" onClick={() => handleAddToCart(bomba.id)}>
                                            <FaShoppingCart style={{ marginRight: "8px" }} />
                                            Adicionar ao carrinho
                                        </button>
                                    </Link>

                                    <br />

                                    <Link href={`/produtos/bombas/${bomba.id}`}>
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