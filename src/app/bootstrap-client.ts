'use client';

import { useEffect } from 'react';

export default function BootstrapClient() {
  useEffect(() => {
    // Carrega o JS do Bootstrap só no cliente
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
      .then(() => {
      })
      .catch((err) => {
        console.error("Erro ao carregar Bootstrap JS:", err);
      });
  }, []);

  return null;
}

