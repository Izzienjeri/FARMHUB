from flask import Blueprint,request,make_response, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import current_user
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity,get_jwt
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_restful import Api, Resource, reqparse, abort
from farmhub_server.models import User, db, TokenBlocklist
from flask_cors import CORS
import datetime

auth_bp = Blueprint('auth', __name__)
bcrypt = Bcrypt()
jwt = JWTManager()
api = Api(auth_bp)

register_args = reqparse.RequestParser()
register_args.add_argument("username", type=str, required=True)
register_args.add_argument('firstname',type=str,required=True, help='First Name cannot be blank')
register_args.add_argument('lastname',type=str,required=True, help='Last Name cannot be blank')
register_args.add_argument("email", type=str, required=True)
register_args.add_argument("password", type=str, required=True)
register_args.add_argument("confirmPassword", type=str, required=True)

login_args = reqparse.RequestParser()
login_args.add_argument("username", type=str, required=True)
login_args.add_argument("password", type=str, required=True)




@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).first()

@jwt.token_in_blocklist_loader
def check_if_token_is_revoked(jwt_header, jwt_payload: dict):
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlocklist).filter_by(jti=jti).first()
    return token is not None

class UserLogin(Resource):
   
   
    def get(self):
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        if not user:
            return abort(404, detail="User not found")
        response_body = {"username": user.username, "user_id": user.id}
        return make_response(jsonify(response_body), 200)

    def post(self):
        data = login_args.parse_args()
        user = User.query.filter_by(username=data.username).first()

        if not user:
            return abort(404, detail="User does not exist")

        if not bcrypt.check_password_hash(user.password, data.password):
            return abort(403, detail="Wrong password")

        token = create_access_token(identity=user.id)
        response_body = {"access_token": token, "username": user.username, "user_id":user.id,"firstname":user.firstname,"lastname":user.lastname,"email":user.email}
        return make_response(jsonify(response_body), 200)
    
class UserRegister(Resource):
    def get(self):
        users = User.query.all()
        return make_response(jsonify([user.to_dict() for user in users]))

    def post(self):
        data = register_args.parse_args()
        if data["password"] != data["confirmPassword"]:
            return abort(422, detail="Passwords do not match")
        new_user = User(username=data.username, firstname=data.firstname, lastname=data.lastname, email=data.email, password=bcrypt.generate_password_hash(data.password).decode('utf-8'))
        db.session.add(new_user)
        db.session.commit()
        response_body = {'detail': f'User {data.username} has been created successfully'}
        return make_response(jsonify(response_body), 200)




class UserLogout(Resource):
    @jwt_required()
    def get(self):
        token = get_jwt()
        blocked_token = TokenBlocklist(jti=token['jti'], created_at=datetime.datetime.utcnow())
        db.session.add(blocked_token)
        db.session.commit()
        response_body = {'detail': "Token logged out"}
        return make_response(jsonify(response_body), 200)



 

class CheckEmail(Resource):
    def options(self):
        response_headers = {
            "Access-Control-Allow-Origin": "http://localhost:5173",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Credentials": "true",
        }
        return make_response("", 200, response_headers)

    def post(self):
        print("Received request to check email")
        data = request.get_json()
        email = data.get('email')
        print("Email:", email)
        user = User.query.filter(User.email == email).first()
        response_body = {"exists": user is not None}
        return make_response(jsonify(response_body), 200)




api.add_resource(UserLogin, "/auth/login", endpoint='login')
api.add_resource(UserRegister, "/auth/register", endpoint='register')
api.add_resource(UserLogout, "/auth/logout", endpoint='logout')
api.add_resource(CheckEmail, '/auth/check-email', endpoint='check_email')
