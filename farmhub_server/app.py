from flask import Flask
from flask_jwt_extended import JWTManager
from farmhub_server.routes.auth import auth_bp
from farmhub_server.routes.profile import profile_bp
from farmhub_server.routes.farm_management import farm_management_bp
from farmhub_server.routes.task_assignment import task_assignment_bp
from farmhub_server.routes.task_progress import task_progress_bp
from flask_migrate import Migrate
from farmhub_server.models import db
import secrets
import os
from flask_cors import CORS

app = Flask(__name__)
jwt = JWTManager(app)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})


flask_secret_key = secrets.token_hex(16)
jwt_secret_key = secrets.token_urlsafe(32)
migrate = Migrate(app, db)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///app.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = flask_secret_key
app.config['JWT_SECRET_KEY'] = jwt_secret_key


db.init_app(app)



def register_blueprints(app):
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(profile_bp, url_prefix='/profile')
    app.register_blueprint(farm_management_bp, url_prefix='/farm_management')
    app.register_blueprint(task_assignment_bp, url_prefix='/task_assignment')
    app.register_blueprint(task_progress_bp, url_prefix='/task_progress') 

if __name__ == '__main__':
    register_blueprints(app)
    app.run(port = 5555,debug=True)
