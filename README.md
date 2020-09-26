# bsic Text Editor

### Description
A simple text editor using Draft.js, React, Flask, and MongoDB Atlas.

### Building
To build this text editor locally, run `yarn build` to build the front-end and `yarn start-backend` to start the backend server locally at `http://localhost:5000`.

### Running the App
Set up your environment for this project as follows:
- `NO_SQL_USER = <your mongodb cluster username>`
- `NO_SQL_PASS = <your mongodb cluster password>`
- `NO_SQL_CLUSTER_URL = <your mongodb cluster url>`

You can do this by setting up a script (bash, pshell, etc.) depending on your system to set the environment variables.
You also might need to modify the script `yarn start-backend` to how Flask is set up on your system. Currently, this supports `venv` for Windows.

### Plugins Used
- axios
- boostrap
- uuid
- node-sass
- reactstrap

### Preview
![Home](https://raw.githubusercontent.com/steve1998/text-editor/master/screenshots/bsic.png)
