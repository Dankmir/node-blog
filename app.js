const express = require('express');
const morgan = require('morgan');

const app = express();

// Register view engine
app.set('view engine', 'ejs');
// Automatically express/ejs will look in views folder
// We can also set folder explicitly
// app.set('views', 'path');

app.listen(3000);

// Middleware examples
// app.use((req, res, next) => {
//     console.log('New request made:');
//     console.log('Host: ', req.hostname);
//     console.log('Path: ', req.path);
//     console.log('Method: ', req.method);
//     next(); // Move to next handler
// });

// app.use((req, res, next) => {
//     console.log('In the next middleware');
//     next();
// });

// 3rd party middleware
app.use(express.static('public'));
app.use(morgan('dev'));

// Static files


app.get('/', (req, res) => {
    
    const blogs = [
        { title: 'Yoshi finds eggs', snippet: 'Lorem Ipsum dolor sit amet consectetur' },
        { title: 'Mario finds stars', snippet: 'Lorem Ipsum dolor sit amet consectetur' },
        { title: 'How to defeat Bowser', snippet: 'Lorem Ipsum dolor sit amet consectetur' }
    ];

    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new Blog' });
});

// Redirect

app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

// 404 page middleware

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});