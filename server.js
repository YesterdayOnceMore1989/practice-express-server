const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();
var port = process.env.PORT || 3000;
app.set('views engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
})
app.use(express.static(__dirname+'/public'));
app.use((req, res, next)=>{
  var now = `${new Date().toString()} : + ${req.method} + ${req.url}`;
  fs.appendFile('server.log', now+'\n', (err)=>{
    if(err){
      console.log('Unable to connect server.');
    }
  });
  console.log(now);
  next();
});
// app.use((req, res, next)=>{
//   res.render('maintenance.hbs',{
//     pageTitle: 'We\'ll comeback soon!',
//   });
// })


app.get('/', (req, res)=>{
  res.render('home.hbs', {
    pageTitle: 'Home Page',
  });
});
app.get('/about', (req, res)=>{
  res.render('about.hbs', {
    pageTitle: 'About page',
  })
})


app.listen(port, ()=>{
  console.log('Server is up on port 3000');
});
