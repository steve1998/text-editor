from flask import Flask, render_template
from os import environ
import pymongo

app = Flask(__name__, static_folder='../build', static_url_path='/')

# Intialize DB
test = environ.get('TEST_VAR_1')

username = environ.get('NO_SQL_USER')
password = environ.get('NO_SQL_PASSWORD')
cluster_url = environ.get('CLUSTER_URL')

# client = pymongo.MongoClient("mongodb+srv://<username>:<password>@<cluster-url>/test?retryWrites=true&w=majority")

@app.route("/")
def home():
    return app.send_static_file('index.html')

# Routes

if __name__ == "__main__":
    app.run()