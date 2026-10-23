import {readFile,writeFile} from 'node:fs/promises';
const html=await readFile('dist/index.html','utf8');
const urls=[...new Set([...html.matchAll(/<a\b[^>]*href="(https:[^"]+)"/g)].map(x=>x[1].replaceAll('&amp;','&')))];
const results=await Promise.all(urls.map(async url=>{try{const r=await fetch(url,{signal:AbortSignal.timeout(25000)});const body=await r.text();return {url,status:r.status,finalUrl:r.url,title:body.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/\s+/g,' ').trim()||null}}catch(e){return {url,error:e.message}}}));
await writeFile('link-audit.json',JSON.stringify({checkedAt:'2026-10-22',results},null,2));
console.log(JSON.stringify(results,null,2));
