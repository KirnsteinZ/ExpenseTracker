const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.listen(port,()=>{console.log('Server is up')})

app.get('/',(req,res) => res.send('Hallo, Selamat datang ke website ku'));
