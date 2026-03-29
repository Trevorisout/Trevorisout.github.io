import fs from 'fs';

const data = fs.readFileSync('public/car_engine_fixed.gltf', 'utf8');
const names = data.match(/"name":\s*"[^"]*"/g);
console.log(names ? names.slice(0, 20) : 'none');
