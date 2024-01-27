from flask import Blueprint
from flask_restful import Api
from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from app.models import User, Farm, Task, WorkerTask  # Corrected imports

serializer_bp = Blueprint('serializer_blueprint', __name__)
ma = Marshmallow(serializer_bp)
api = Api(serializer_bp)

class WorkerSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = WorkerTask  # Corrected model reference

class FarmSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Farm

class TaskSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Task

class WorkerTaskSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = WorkerTask

class UserSchema(SQLAlchemyAutoSchema):
    farms = ma.Nested(FarmSchema, many=True)
    class Meta:
        model = User

worker_schema = WorkerSchema()
farm_schema = FarmSchema()
task_schema = TaskSchema()
worker_task_schema = WorkerTaskSchema()
user_schema = UserSchema()
