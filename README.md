# SOK! BAM! POW! DATABASE

## Description

This is a no bullshit comic book database. You can add, edit, delete and view all the comics in the database. The front-end is built with React, Vanilla Javascript & SASS and the back-end is built with Node.js and Express. The database consists of a simple JSON file in order to store the data.

## Installation

1. Clone the repository

```bash
git clone
```

2. Install the dependencies

Please install the dependencies for both the front-end and the back-end by running the following command in the main folder and the comics-api folder.

```bash
npm install
```

3. Start the server

```bash
cd api
npm run dev
```

4. Start the front-end

```bash
cd client
npm run dev
```

## Usage

### Back-end

Start the server by accessing the folder comics-api and start it by running nodemon as npm run dev. The server will start on port 5000. You can access the API by using Postman or any other API testing tool by going to http://localhost:5000/comics.

#### Endpoints

##### GET /comics

This endpoint returns all the comics in the database.

##### GET /comics/:id

This endpoint returns a single comic by its id.

##### POST /comics

This endpoint allows you to add a new comic to the database.

##### PUT /comics/:id

This endpoint allows you to update a comic by its id.

##### DELETE /comics/:id

This endpoint allows you to delete a comic by its id.

### Front-end

After you have started the mock backend server, you can head to the main folder and enter npm run dev in your terminal in order to start the front-end which will be running on port 3000. You can access the front-end by going to http://localhost:3000.

#### Starting the app with Docker

You can also start the app with Docker by running the following command in the main folder.

```bash
docker-compose up --build
```
