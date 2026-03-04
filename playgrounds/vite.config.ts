// vite.config.ts
import { build, defineConfig } from 'vite'
import path from 'path'

const conf = (target: string) => ({
  root: `src/packages/${target}`,
  build: {
    outDir: path.resolve(__dirname, `dist/packages/${target}`),
    emptyOutDir: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 3
      },
      mangle: true,
      format: {
        comments: false
      }
    }
  }
} as const)

await build(conf("eager"))
await build(conf("lazy"))

export default defineConfig(conf("vanilla"))
