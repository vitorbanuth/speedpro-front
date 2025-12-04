'use client';

import Cabecalho from "@/app/cabecalho";
import Rodape from "@/app/rodape";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "./style.css"
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from '../../../carrinho/cart_context';
import { motion } from "framer-motion";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3000';


interface Bico {
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


export default function BicoPage() {
    const { addToCart } = useCart();
    const { id } = useParams();  // <-- Agora funciona sem warnings
    const [bico, setBico] = useState<Bico | null>(null);

    const [ready, setReady] = useState(false);


    useEffect(() => {
        async function fetchBico() {
            if (!id) return;

            const res = await fetch(`${API_HOST}/getInjectorById/${id}`);
            const data = await res.json();
            setBico(data);
        }

        fetchBico();
    }, [id]);


    useEffect(() => {
        setReady(true);
    }, []);

    if (!bico) return <p>Carregando...</p>;

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
    );
    }




    

    const handleAddToCart = () => {
        let model = "admissao";
        addToCart({
            key: `${model}-${id}`,
            id: bico.id,
            name: bico.name,
            itemPrice: bico.price,
            image: bico.image
        });
    };



    return (
        <>
            <Cabecalho />
            <div style={{ padding: 20 }}>
                <h1 className="header">{bico.name}</h1>
                <div className="product-container">
                    <img src={`${API_HOST}${bico.image}`} width={500} height={500} alt={bico.name} />

                    <div className="product-info">
                        <p className="product-description">{bico.description}</p>
                        <p>Unidades em Estoque: {bico.quantity}</p>
                        <p>Pressão Máxima: {bico.MaxPressure}</p>
                        <p className="p-price"> <strong>R$ {Number(bico.price).toFixed(3)}</strong></p>
                        <button className="botao-add-carrinho" onClick={handleAddToCart}>
                            <FaShoppingCart style={{ marginRight: "8px" }} />
                            Adicionar ao carrinho
                        </button>
                    </div>
                </div>

            </div>

            <Rodape />
        </>
    );
}
