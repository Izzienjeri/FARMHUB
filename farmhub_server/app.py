from flask import Flask
from flask_jwt_extended import JWTManager
from farmhub_server.routes.auth import auth_bp, jwt,bcrypt
from farmhub_server.routes.profile import profile_bp
from farmhub_server.routes.farm_management import farm_management_bp
from farmhub_server.routes.task_assignment import task_assignment_bp
from farmhub_server.routes.task_progress import task_progress_bp
from flask_migrate import Migrate
from farmhub_server.models import db

import secrets
import os
from flask_cors import CORS,cross_origin


def create_app():
    app = Flask(__name__)
    flask_secret_key = secrets.token_urlsafe(16)
    jwt_secret_key = secrets.token_urlsafe(32)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///app.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = flask_secret_key
    app.config['JWT_SECRET_KEY'] = jwt_secret_key

    db.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)   
    migrate = Migrate(app, db)

    app.register_blueprint(auth_bp)
    app.register_blueprint(profile_bp)
    app.register_blueprint(farm_management_bp)
    app.register_blueprint(task_assignment_bp)
    app.register_blueprint(task_progress_bp) 


    CORS(app)


    return app

app=create_app()
    

