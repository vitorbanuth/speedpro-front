"use client";

import { useCart } from '../carrinho/cart_context';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';
import "./styles.css"
import Cabecalho from '../cabecalho';
import Rodape from '../rodape';
import { useEffect, useState } from 'react';
import { FaArrowLeft,  } from "react-icons/fa";
const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3000'

export default function CarrinhoPage() {
    const { cart, removeFromCart, getTotalPrice, getTotalItems } = useCart();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setReady(true);
    }, []);

    if (!ready) {
        return <div style={{ padding: "40px", textAlign: "center" }}>Carregando...</div>;
    }

    if (cart.length === 0) {
        return (
            <>
                <Cabecalho />
                <div style={{ padding: '40px', textAlign: 'center' }}>
                    <FaShoppingCart size={80} color="#ccc" />
                    <h2>Seu carrinho está vazio</h2>
                    <p>Adicione produtos para continuar comprando</p>
                    <br></br>
                    <Link href="/">
                        <button className="btn btn-danger d-flex align-items-center gap-2 mx-auto">
                            <FaArrowLeft />
                            Voltar para a loja
                        </button>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                    </Link>
                </div>
                <Rodape />
            </>
        );
    }

    console.log(cart);

    return (

        <>
            <Cabecalho />
            <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
                <h1>Meu Carrinho</h1>
                <p className="text-muted">Você tem {getTotalItems()} itens no carrinho</p>

                <div className='cart-container'>
                    <div className="cart-items">
                        {cart.map(item => (
                            <div key={`${item.key}-${item.id}`} className="cart-item">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="cart-item-image"
                                />

                                <div className="cart-item-info">
                                    <h4>{item.name}</h4>
                                    <p className="text-muted">Quantidade: {item.quantity}</p>
                                    <p className="cart-item-price">
                                        R$ {(item.itemPrice * item.quantity).toFixed(3)}
                                    </p>
                                </div>

                                <button
                                    className="btn-remove-cart-page"
                                    onClick={() => removeFromCart(item.key, item.id)}
                                    title="Remover do carrinho"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h3>Resumo do Pedido</h3>
                        <div className="summary-line">
                            <span>Subtotal:</span>
                            <span>R$ {getTotalPrice().toFixed(3)}</span>
                        </div>
                        <div className="summary-line">
                            <span>Frete:</span>
                            <span className="text-success">Grátis</span>
                        </div>
                        <hr />
                        <div className="summary-line total">
                            <strong>Total:</strong>
                            <strong>R$ {getTotalPrice().toFixed(3)}</strong>
                        </div>

                        <button className="btn btn-success w-100 mt-3" style={{ padding: '12px' }}>
                            Finalizar Compra
                        </button>

                        <Link href="/">
                            <button className="btn btn-outline-secondary w-100 mt-2">
                                Continuar Comprando
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <Rodape />
        </>
    );
}