const express = require('express')
const app = express()
 
app.get('/api/test', (req, res) => {
    res.send('Asami the sexuality bender')
})
 
app.listen(3000, () => console.log('blog server running on port 3000!'))