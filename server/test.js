fetch("http://localhost:5052/api/admissions/chat", {
  method: "POST",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({message: "hello", language: "en"})
}).then(async r => {
  console.log(r.status);
  console.log(await r.text());
}).catch(console.error);
