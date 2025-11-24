import { spawn } from 'child_process';
import { readdirSync, existsSync } from 'fs';
import { join } from 'path';

const exerciseNum = process.argv[2];

if (!exerciseNum) {
  console.log('\n📚 Ejercicios disponibles para build:\n');

  const dirs = readdirSync('.').filter(dir => {
    return /^\d{2}-/.test(dir) && existsSync(join(dir, 'vite.config.js'));
  }).sort();

  dirs.forEach(dir => {
    const num = dir.match(/^(\d{2})/)[1];
    console.log(`  npm run build ${num}  →  ${dir}`);
  });

  console.log('\n');
  process.exit(0);
}

// Buscar carpeta que coincida con el número
const dirs = readdirSync('.');
const exerciseDir = dirs.find(dir => dir.startsWith(`${exerciseNum.padStart(2, '0')}-`));

if (!exerciseDir) {
  console.error(`❌ No se encontró ejercicio ${exerciseNum}`);
  process.exit(1);
}

if (!existsSync(join(exerciseDir, 'vite.config.js'))) {
  console.error(`❌ El ejercicio ${exerciseDir} no tiene vite.config.js`);
  process.exit(1);
}

console.log(`\n🔨 Building: ${exerciseDir}\n`);

const vite = spawn('npx', ['vite', 'build', '--config', `${exerciseDir}/vite.config.js`, exerciseDir], {
  stdio: 'inherit',
  shell: true
});

vite.on('close', (code) => {
  process.exit(code);
});
