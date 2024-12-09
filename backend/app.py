from flask import Flask, jsonify, request
from db_setup import init_db, db
from flask_cors import CORS
from models import Task
import jwt
import datetime

app = Flask(__name__)

# Allow requests from http://localhost:3000, which is your frontend's origin
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

app.config['SECRET_KEY'] = 'your_jwt_secret'

init_db(app)

@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([task.to_dict() for task in tasks])

@app.route('/tasks/<int:task_id>', methods=['GET'])
def get_task(task_id):
    task = Task.query.get_or_404(task_id)
    return jsonify(task.to_dict())

@app.route('/tasks', methods=['POST'])
def create_task():
    data = request.json
    if not all(key in data for key in ('title', 'description', 'due_date')):
        return jsonify({'error': 'Missing fields'}), 400
    task = Task(
        title=data['title'],
        description=data['description'],
        due_date=datetime.datetime.strptime(data['due_date'], '%Y-%m-%d'),
        status=data.get('status', 'incomplete')
    )
    db.session.add(task)
    db.session.commit()
    return jsonify(task.to_dict()), 201

@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.json
    task = Task.query.get_or_404(task_id)
    if 'title' in data:
        task.title = data['title']
    if 'description' in data:
        task.description = data['description']
    if 'due_date' in data:
        task.due_date = datetime.datetime.strptime(data['due_date'], '%Y-%m-%d')
    if 'status' in data:
        task.status = data['status']
    db.session.commit()
    return jsonify(task.to_dict())

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({'message': 'Task deleted'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
