import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carga las variables de entorno basadas en el modo (desarrollo/producción)
  // El tercer parámetro '' permite cargar todas las variables, no solo las que empiezan por VITE_
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Esto permite usar process.env.API_KEY en el código del cliente (navegador)
      // Busca primero API_KEY (configuración en Vercel) o VITE_API_KEY (configuración local)
      'process.env.API_KEY': JSON.stringify(env.API_KEY || env.VITE_API_KEY),
    }
  }
})