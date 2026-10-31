import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {dirname,join} from 'node:path';
const cwd=dirname(fileURLToPath(import.meta.url)),url='http://127.0.0.1:4173/';
async function ready(){try{const r=await fetch(url+'api/status',{signal:AbortSignal.timeout(1000)});return (await r.json()).mode==='server';}catch{return false;}}
if(!await ready()){const child=spawn(process.execPath,[join(cwd,'server/index.mjs')],{cwd,detached:true,stdio:'ignore',windowsHide:true});child.unref();}
for(let i=0;i<30;i++){if(await ready()){spawn('cmd.exe',['/c','start','',url],{windowsHide:true,stdio:'ignore'}).unref();console.log('NOVA PLAY: '+url);process.exit(0);}await new Promise(r=>setTimeout(r,300));}
console.error('Could not start NOVA PLAY. Run node server/index.mjs to see the error.');process.exit(1);
