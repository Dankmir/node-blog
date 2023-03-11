const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);


    let path = './views/';
    switch (req.url) 
    {
        case '/':
            path += 'index.html';
            break;

        case '/about':
            path += 'about.html';
            break;

        default:
            path += '404.html';
            break;
    }


    // Set header contet type
    res.setHeader('Contet-Type', 'text/html');

    // Send an html file
    fs.readFile(path, (err, data) => {
        // if (err)
        //     console.log(err);
        // else
        //     res.write(data);

        // res.end();

        if (err)
        {
            console.log(err);
            res.end();
        }
        else
            res.end(data);
    });
});

server.listen(3000, 'localhost', () => {
    console.log('Listening for request on port 3000...');
});

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

// Mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'New Blog 2',
//         snippet: 'About my new blog.',
//         body: 'More about my new blog.'
//     });

//     blog.save()
//         .then((result) => res.send(result))
//         .catch((err) => console.log(err));
// });

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//         .then((result) => res.send(result))
//         .catch((err) => console.log(err));
// });

// app.get('/single-blog', (req, res) => {
//     Blog.findById('640639fac73c1036265acc7e')
//         .then((result) => res.send(result))
//         .catch((err) => console.log(err));
// });