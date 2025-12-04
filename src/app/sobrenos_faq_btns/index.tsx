import './styles.css'
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SobrenosEquipe() {
    return (
        <nav>
            <ul className="grid-botoes">
                <li>
                    <Link className="equipe-sobrenos-link" href="/sobre_nos">
                        <img src="/assets/icon_questionmark.svg" alt="Sobre Nós" />
                        Sobre Nós
                    </Link>
                </li>
                <li>
                    <Link className="equipe-sobrenos-link" href="/perguntas_respostas">
                        <img src="/assets/icon_questionmark.svg" alt="Perguntas Frequentes" />
                        Perguntas Frequentes
                    </Link>
                </li>
            </ul>
        </nav>

    )
}