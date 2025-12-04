'use client'
import { useEffect, useState } from "react";
import '../style.css';
import Link from 'next/link';
import Cabecalho from "@/app/cabecalho";
import Rodape from "@/app/rodape";
import { FaShoppingCart, FaEye } from 'react-icons/fa';
import { useCart } from '../../carrinho/cart_context';
import { motion } from "framer-motion";


const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3000'

interface Turbo {
    id: number;
    name: string;
    quantity: number;
    inStock: boolean;
    Type: string;
    Application: string;
    MaxPower: string;
    description: string;
    image: string;
    price: number;
}

export default function Turbinas() {

    const [turbos, setTurbos] = useState<Turbo[]>([]);



    useEffect(() => {
        async function fetchCursos() {
            try {
                const response = await fetch(`${API_HOST}/getTurbos`); // rota certa aqui
                const data = await response.json();
                setTurbos(data);
            } catch (error) {
                console.error("Erro ao buscar turbos:", error);
            }
        }

        fetchCursos();
    }, []);

    const { addToCart } = useCart();

    const handleAddToCart = (id: number) => {
        let model = "turbo";
        const turbo = turbos.find(t => t.id === id);

        if (turbo) {
            addToCart({
                key: `${model}-${id}`,
                id: turbo.id,
                name: turbo.name,
                itemPrice: turbo.price,
                image: `${API_HOST}${turbo.image}`
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
                <h1 className="texto-de-produtos">Turbinas Disponíveis</h1>
                <br></br>
                <br></br>
                <ul className="lista-produtos">
                    {turbos.map(turbo => (
                        <li key={turbo.id}>
                            <div className="produto-card">
                                <img src={`${API_HOST}${turbo.image}`} alt={turbo.name} />
                                <div className="produto-info">
                                    <h2>{turbo.name}</h2>
                                    <br></br>
                                    <p>Unidades disponíveis: {turbo.quantity}</p>
                                    <br></br>
                                    <p>Tipo: {turbo.Type}</p>
                                    <br></br>
                                    <p>Aplicação: {turbo.Application}</p>
                                    <br></br>
                                    <p>Regime de Potência Máxima: {turbo.MaxPower}</p>
                                    <br></br>
                                    <p className="card-price"><strong>R$ {Number(turbo.price).toFixed(3)}</strong></p>
                                    <br></br>

                                    <Link href={"#"}>
                                        <button className="botao-add-carrinho" onClick={() => handleAddToCart(turbo.id)}>
                                            <FaShoppingCart style={{ marginRight: "8px" }} />
                                            Adicionar ao carrinho
                                        </button>
                                    </Link>

                                    <br />

                                    <Link href={`/produtos/turbina/${turbo.id}`}>
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