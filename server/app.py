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

@app.route("/")
def home():
    return app.send_static_file('index.html')

# Routes
@app.route('/files', methods=['GET'])
def get_files():
    files_collection = db['files']
    output = []

    for document in files_collection.find():
        output.append({'id': document['id'], 'fileName': document['fileName'], 'text': document['text']})

    return jsonify(output)

@app.route('/files', methods=['POST'])
def update_files(): 
    data = request.json
    id = data['id']

    files_collection = db['files']

    if files_collection.find({'id': id}).limit(1).count() > 0:
        files_collection.update_one(
            {'id': data['id']},
            {'$set': {
                'fileName': data['fileName'],
                'text': data['text']
            }}
        )
    else:
        files_collection.insert_one(
            {
                'id': data['id'],
                'fileName': data['fileName'],
                'text': data['text']
            }
        )
        
    return "Item successfully updated"

@app.route('/files', methods=['DELETE'])
def delete_files():
    data = request.json

    files_collection = db['files']
    files_collection.delete_one({'id': data['id'] })

    return "Item sucessfully deleted"

if __name__ == "__main__":
    app.run()