

'use client'

import './styles.css';
import { useEffect, useState } from 'react';
const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3000'
import { FaQuestionCircle, FaShoppingCart, FaBoxes, FaUserShield, FaTrash } from "react-icons/fa";
import { useCart, CartProvider } from '../carrinho/cart_context';
import { FaArrowRight } from "react-icons/fa";

export default function Cabecalho() {

    

    const { cart, getTotalItems, removeFromCart,clearCart } = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);


    return (
        <>
            <nav className="navbar navbar-expand-lg bg-menu">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img
                            src={'/assets/spdpr.png'}
                            alt="Logo SpeedPro"
                            className="speedpro-logo"
                            style={{ width: '200px' }}
                        />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item me-3">
                                <a className="nav-link" aria-current="page" href={`${API_HOST}/admin/login`}>
                                    <FaUserShield style={{ marginRight: "8px" }} />
                                    Área Administrativa
                                </a>
                            </li>
                    
                            <li className="nav-item dropdown me-3">
                                <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <FaBoxes style={{ marginRight: "8px" }} />
                                    Produtos
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="/produtos/turbina">Turbinas</a></li>
                                    <li><a className="dropdown-item" href="/produtos/admissao">Coletores de Admissão</a></li>
                                    <li><a className="dropdown-item" href="/produtos/escapamento">Coletores de Escapamento</a></li>
                                    <li><a className="dropdown-item" href="/produtos/bombas">Bombas de combustível</a></li>
                                    <li><a className="dropdown-item" href="/produtos/bicos">Bicos Injetores</a></li>
                                </ul>
                            </li>

                            <li className="nav-item dropdown me-3">
                                <a className="nav-link" href="/perguntas_respostas">
                                    <FaQuestionCircle style={{ marginRight: "8px" }} />
                                    Perguntas e Respostas
                                </a>
                            </li>

                            <li className="nav-item dropdown me-3">
                                <a className="nav-link dropdown-toggle nav-item-custom" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <FaShoppingCart style={{ marginRight: "8px" }} />
                                    Carrinho ({mounted ? getTotalItems() : 0})
                                </a>
                                <ul className="dropdown-menu">
                                    {cart.length === 0 ? (
                                        <li><span className="dropdown-item">Carrinho vazio</span></li>
                                    ) : (
                                        <>
                                            {cart.map(item => (
                                                <li key={`${item.key}-${item.id}`}>

                                                
                                                    <div className="dropdown-item d-flex justify-content-between">
                                                        <span>{item.name} ({item.quantity}x)</span>
                                                        <button className="btn-remove-cart" onClick={() => removeFromCart(item.key, item.id)}>X</button>
                                                    </div>
                                                </li>
                                            ))}
                                            <li><hr className="dropdown-divider" /></li>
                                            <li>
                                                <button className="dropdown-item" onClick={() => clearCart()}>
                                                <FaTrash style={{marginRight:"8px"}}></FaTrash>
                                                     Limpar carrinho
                                                </button>
                                            </li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li>
                                                <a className="dropdown-item" href="/carrinho">
                                                <FaArrowRight style={{marginRight:"8px"}}></FaArrowRight>
                                                    Ir para o checkout
                                                </a>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
