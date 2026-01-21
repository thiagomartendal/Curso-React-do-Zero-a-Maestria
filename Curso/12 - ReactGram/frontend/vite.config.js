import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configura uma porta fixa para executar a aplicação
  server: {
    port: 3000
  }
})
