import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Final-Project-Recipe-Finder/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        favorites: 'favorites.html'
      }
    }
  }
});