const https = require('https');

const playlistId = 'PLU1YUp7gM9-6S68rczur1oolqArO0nyVF';
const apiKey = 'AIzaSyCMTH4G-zdrpfAUocbrvA_zJuntcNThZzw';
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`;

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const json = JSON.parse(data);
    if (json.items) {
      json.items.forEach(item => {
        console.log(item.snippet.title);
      });
    } else {
      console.log(json);
    }
  });
});
