from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Api, Resource
from app.models import User

profile_bp = Blueprint('profile', __name__)
api = Api(profile_bp)

class UserProfileResource(Resource):
    @jwt_required()
    def get(self):
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)

        if not user:
            return jsonify({"error": "User not found"}), 404

        profile_data = {
            "username": user.username,
            "user_id": user.id,
            "firstname": user.firstname,
            "lastname": user.lastname,
            "email": user.email,
            # Add more profile information as needed
        }

        return jsonify(profile_data), 200

api.add_resource(UserProfileResource, '/profile')
