# tinyBlog
A tiny mongo based blog

## Dependencies
- Download and install [npm](https://www.npmjs.com/get-npm)
- Download and install [mongodb](https://www.mongodb.com/download-center)

## Database
Ideally you can just download [Compass](https://www.mongodb.com/download-center#compass) to get an easy GUI for the database. You'll need to install mongo and then in Compass you'll probably connect to `http://localhost:27017`
- Create a database called `tinyBlog`
- From project directory run `node dbReset` to update collections with sample data

## Environment
- Where ever you want the code to live, from the terminal you can git clone the project with `git clone https://github.com/Robo-House/tinyBlog`
- Once the project has been cloned run `npm i` to install the dependencies
- Run `grunt` from the terminal to start the server
- Navigate to `localhost:3000` to hit the site
