const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const app = express();

// Connect to MongoDB
const dbURI = 'mongodb+srv://Dankmir:PfDhGUxz8SYNXB67@nodeblog.tlkqgbu.mongodb.net/node-blog?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) =>
    {
        console.log('Connected to DB.');
        app.listen(3000);
    }).catch((err) => console.log(err));

// Register view engine
app.set('view engine', 'ejs');
// Automatically express/ejs will look in views folder
// We can also set folder explicitly
// app.set('views', 'path');


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
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'New Blog 2',
        snippet: 'About my new blog.',
        body: 'More about my new blog.'
    });

    blog.save()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
});

app.get('/single-blog', (req, res) => {
    Blog.findById('640639fac73c1036265acc7e')
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
});

app.get('/', (req, res) => {
    // res.render('index', { title: 'Home', blogs });
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// Blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 }) // -1 - descending
        .then((result) => res.render('index', { title: 'All Blogs', blogs: result }))
        .catch((err) => console.log(err));
});

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    const blog = Blog.findById(id)
        .then((result) => res.render('details', { title: 'Blog Details', blog: result }))
        .catch((err) => console.log(err));
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new Blog' });
});

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => res.redirect('/blogs'))
        .catch((err) => console.log(err));
});

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => res.json({ redirect: '/blogs' }))
        .catch((err) => console.log(err));
});


// Redirect

app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

// 404 page middleware (always at the end)

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});