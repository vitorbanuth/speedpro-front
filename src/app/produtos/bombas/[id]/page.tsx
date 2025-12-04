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


export default function BombaPage() {
    const { addToCart } = useCart();
    const { id } = useParams();  // <-- Agora funciona sem warnings
    const [bomba, setBomba] = useState<Bomba | null>(null);

    const [ready, setReady] = useState(false);


    useEffect(() => {
        async function fetchBomba() {
            if (!id) return;

            const res = await fetch(`${API_HOST}/getPumpById/${id}`);
            const data = await res.json();
            setBomba(data);
        }

        fetchBomba();
    }, [id]);


    useEffect(() => {
        setReady(true);
    }, []);

    if (!bomba) return <p>Carregando...</p>;

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
        let model = "bomba";
        addToCart({
            key: `${model}-${id}`,
            id: bomba.id,
            name: bomba.name,
            itemPrice: bomba.price,
            image: bomba.image
        });
    };



    return (
        <>
            <Cabecalho />
            <div style={{ padding: 20 }}>
                <h1 className="header">{bomba.name}</h1>
                <div className="product-container">
                    <img src={`${API_HOST}${bomba.image}`} width={500} height={500} alt={bomba.name} />

                    <div className="product-info">
                        <p className="product-description">{bomba.description}</p>
                        <p>Unidades em Estoque: {bomba.quantity}</p>
                        <p>Pressão Máxima: {bomba.MaxPressure}</p>
                        <p className="p-price"> <strong>R$ {Number(bomba.price).toFixed(3)}</strong></p>
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
