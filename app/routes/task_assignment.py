from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Api, Resource, reqparse
from app.models import User, Worker, Task, db, Farm

task_assignment_bp = Blueprint('task_assignment', __name__)
api = Api(task_assignment_bp)

class TaskListResource(Resource):
    @jwt_required()
    def get(self):
        current_user_id = get_jwt_identity()
        tasks = Task.query.join(Farm).join(User).filter(User.user_id == current_user_id).all()

        task_list = []
        for task in tasks:
            task_list.append({
                "task_id": task.task_id,
                "task_name": task.task_name,
                "task_status": task.task_status
            })

        return jsonify({"tasks": task_list}), 200

api.add_resource(TaskListResource, '/tasks')

class AssignTaskResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('worker_id', type=int, required=True, help='Worker ID cannot be blank')
    parser.add_argument('task_name', type=str, required=True, help='Task name cannot be blank')

    @jwt_required()
    def post(self):
        current_user_id = get_jwt_identity()
        data = AssignTaskResource.parser.parse_args()

        # Check if the provided worker_id belongs to the authenticated user
        worker = Worker.query.filter_by(worker_id=data['worker_id'], user_id=current_user_id).first()
        if not worker:
            return jsonify({"error": "Invalid worker ID"}), 400

        new_task = Task(
            worker_id=data['worker_id'],
            task_name=data['task_name'],
            task_status='Pending'  # Assuming a default status
        )

        db.session.add(new_task)
        db.session.commit()

        return jsonify({"message": "Task assigned successfully"}), 201

api.add_resource(AssignTaskResource, '/assign_task')
