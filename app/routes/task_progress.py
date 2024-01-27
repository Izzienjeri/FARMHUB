from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Api, Resource, reqparse
from app.models import User, Task, db, Farm

task_progress_bp = Blueprint('task_progress', __name__)
api = Api(task_progress_bp)

class TaskProgressResource(Resource):
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

class MarkTaskCompleteResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('task_id', type=int, required=True, help='Task ID cannot be blank')

    @jwt_required()
    def post(self):
        data = MarkTaskCompleteResource.parser.parse_args()
        task_id = data['task_id']

        task = Task.query.get(task_id)
        if not task:
            return jsonify({"error": "Task not found"}), 404

       
        current_user_id = get_jwt_identity()
        if task.farm.user_id != current_user_id:
            return jsonify({"error": "Unauthorized to mark this task as complete"}), 403

       
        task.task_status = 'Completed'
        db.session.commit()

        return jsonify({"message": "Task marked as complete"}), 200

api.add_resource(TaskProgressResource, '/tasks')
api.add_resource(MarkTaskCompleteResource, '/mark_task_complete')
