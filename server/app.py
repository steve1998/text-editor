from flask import Flask, render_template, jsonify, request
from os import environ
import pymongo

app = Flask(__name__, static_folder='../build', static_url_path='/')

# Intialize DB
db_username = environ.get('NO_SQL_USER')
db_password = environ.get('NO_SQL_PASS')
db_cluster_url = environ.get('NO_SQL_CLUSTER_URL')

if not all([db_username, db_password, db_cluster_url]):
    print(db_cluster_url)
    print(db_password)
    print(db_username)
    raise Exception('Missing Database Environment Variables')
    
client_string = 'mongodb+srv://' + db_username + ':' + db_password + '@' + db_cluster_url + '/test?retryWrites=true&w=majority'
client = pymongo.MongoClient(client_string)

db = client['text-editor']
length_of_files = 0

@app.route("/")
def home():
    return app.send_static_file('index.html')

# Routes
@app.route('/files', methods=['GET'])
def get_files():
    files_collection = db['files']
    output = []
    global length_of_files

    for document in files_collection.find():
        output.append({'id': document['id'], 'fileName': document['fileName'], 'text': document['text']})

    length_of_files = len(output)

    return jsonify(output)

@app.route('/files', methods=['POST'])
def update_files(): 
    data = request.json
    global length_of_files

    files_collection = db['files']

    if data['id'] > length_of_files - 1:
        files_collection.insert(
            {
                'id': data['id'],
                'fileName': data['fileName'],
                'text': data['text']
            }
        )
    else:
        files_collection.update_one(
            {'id': data['id']},
            {'$set': {
                'fileName': data['fileName'],
                'text': data['text']
            }}
        )
        
    return "Database Updated"

if __name__ == "__main__":
    app.run()