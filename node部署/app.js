const express = require('express')
const app = express()
const path = require('path')

app.use('/public', express.static('./public/'))

//配置模板引擎
//模板默认渲染后缀名
app.engine('html', require("express-art-template"))
//模板默认路径
app.set('/views', path.join(__dirname, './views/'))

app.get('/', (req,res) => {
  res.render('index.html')
})

app.listen(3000, () => {
  console.log('server is running...')
})