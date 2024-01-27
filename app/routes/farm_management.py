from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Api, Resource, reqparse
from app.models import User, Farm, db

farm_management_bp = Blueprint('farm_management', __name__)
api = Api(farm_management_bp)

class FarmListResource(Resource):
    @jwt_required()
    def get(self):
        current_user_id = get_jwt_identity()
        farms = Farm.query.filter_by(user_id=current_user_id).all()

        farm_list = []
        for farm in farms:
            farm_list.append({
                "farm_id": farm.farm_id,
                "name": farm.name,
                "location": farm.city  
            })

        return jsonify({"farms": farm_list}), 200

api.add_resource(FarmListResource, '/farms')

class AddFarmResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('name', type=str, required=True, help='Name cannot be blank')
    parser.add_argument('location', type=str, required=True, help='Location cannot be blank')

    @jwt_required()
    def post(self):
        current_user_id = get_jwt_identity()
        data = AddFarmResource.parser.parse_args()

        new_farm = Farm(
            user_id=current_user_id,
            name=data['name'],
            city=data['location'] 
        )

        db.session.add(new_farm)
        db.session.commit()

        return jsonify({"message": "Farm added successfully"}), 201

api.add_resource(AddFarmResource, '/add_farm')
