const app = require('./app');

async function main() {
  window.lt = new app.LocationTracker(window.navigator);
  console.log(await window.lt.get_data());
  document.querySelector('#start').addEventListener('click', ()=>window.lt.start());
  document.querySelector('#stop').addEventListener('click', ()=>window.lt.stop());
  document.querySelector('#sync').addEventListener('click', ()=>window.lt.sync());
  document.querySelector('#show').addEventListener('click', async ()=>{
    document.querySelector('#output').innerHTML = JSON.stringify(await window.lt.get_data());
  });
}

main();