'use client'

import { useEffect, useState } from 'react';
import './styles.css';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3000'

export default function Rodape() {
  const [footerData, setFooterData] = useState({
    siteLink: '',
    youtubeLink: '',
    instagramLink: '',
    facebookLink: '',
    whatsappLink: '',
    phone: '',
    email: ''
  });
  useEffect(() => {
    async function fetchFooterData() {
      try {
        const response = await fetch(`${API_HOST}/getFooterData`);  // método GET
        const data = await response.json();

        setFooterData(data);
      } catch (error) {
        console.error("Erro ao buscar título do formulário:", error);
      }
    }

    fetchFooterData();
  }, []);

  return (
    <footer>
      <div className="footer-container row">
        <div className="col-lg-6">
          <ul className="links-rodape">
            <h2>Speed Pro Autoparts</h2>
            <li>
              <img src={'/assets/icon_site.svg'} alt="Site oficial" />
              <a href={footerData.siteLink} target="_blank" rel="noopener noreferrer">
                Site
              </a>
            </li>
            <li>
              <img src={'/assets/icon_telefone.svg'} alt="Telefone de contato" />
              <a href={'tel:' + footerData.phone} target="_blank" rel="noopener noreferrer">
                {footerData.phone}
              </a>
            </li>
            <li>
              <img src='/assets/icon_email.svg' alt="E-mail de contato" />
              <a href={'mailto:' + footerData.email} target="_blank" rel="noopener noreferrer">
                {footerData.email}
              </a>
            </li>
          </ul>
        </div>
        <div className="col-lg-6 d-flex justify-content-end">
          <ul className="redes-sociais">

            <li>
              <a href={footerData.facebookLink} target="_blank" rel="noopener noreferrer">
                <img src={'/assets/icon_facebook.svg'} alt="Facebook oficial" />
              </a>
            </li>
            <li>
              <a href={footerData.instagramLink} target="_blank" rel="noopener noreferrer">
                <img src={'/assets/icon_instagram.svg'} alt="Instagram oficial" />
              </a>
            </li>
            <li>
              <a href={footerData.whatsappLink} target="_blank" rel="noopener noreferrer">
                <img src={'/assets/icon_whats.svg'} alt="WhatsApp" />
              </a>
            </li>
            <li>
              <a href={footerData.youtubeLink} target="_blank" rel="noopener noreferrer">
                <img src={'/assets/icon_youtube.svg'} alt="Canal no YouTube" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
