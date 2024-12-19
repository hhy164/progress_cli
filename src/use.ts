import https from 'node:https';
import fs from 'node:fs';
import { ProgressBar } from './index.js';

const downLoadURLs = {
  linux: 'https://storage.googleapis.com/chromium-browser-snapshots/Linux_x64/970501/chrome-linux.zip',
  darwin: 'https://storage.googleapis.com/chromium-browser-snapshots/Mac/970501/chrome-mac.zip',
  win32: 'https://storage.googleapis.com/chromium-browser-snapshots/Win/970501/chrome-win32.zip',
  win64: 'https://storage.googleapis.com/chromium-browser-snapshots/Win_x64/970501/chrome-win32.zip',
}

let bar = new ProgressBar();
let value = 0;

https.get(downLoadURLs.darwin, response=>{
  const file = fs.createWriteStream('./chromium.zip');
  response.pipe(file)
  const totalBytes = parseInt(response.headers['content-length']!,10);
  bar.start(totalBytes,0)
  response.on('data',function(chunk){
    value+=chunk.length;
    bar.update(value);
    if(value > bar.getTotalSize()){
      bar.stop()
    }
    console.log(totalBytes,chunk.length)
  })
})
