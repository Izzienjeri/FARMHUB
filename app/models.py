from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
ma = Marshmallow()
bcrypt = Bcrypt()

class User(db.Model):
    __tablename__ = 'users'
    user_id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(255), nullable=False)
    lastname = db.Column(db.String(255), nullable=False)
    username = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=True, default=None)

    def __init__(self, **kwargs):
        super(User, self).__init__(**kwargs)
        self.password = bcrypt.generate_password_hash(kwargs.get('password')).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

    def __repr__(self):
        return f"<User {self.username}>"
    
class Worker(db.Model):
    __tablename__ = 'workers'
    worker_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(255), nullable=False)
    contact_info = db.Column(db.String, nullable=False)
    city = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f"<Worker(worker_id={self.worker_id}, name={self.name}, role={self.role})>"

class Farm(db.Model):
    __tablename__ = 'farms'
    farm_id = db.Column(db.Integer, primary_key=True)
    worker_id = db.Column(db.Integer, db.ForeignKey('workers.worker_id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)

    worker = db.relationship('Worker', backref=db.backref('farms', lazy='dynamic'))
    user = db.relationship('User', backref=db.backref('farms', lazy='dynamic'))

    def __repr__(self):
        return f"<Farm(farm_id={self.farm_id}, name={self.name}, city={self.city})>"

class Task(db.Model):
    __tablename__ = 'tasks'
    task_id = db.Column(db.Integer, primary_key=True)
    worker_id = db.Column(db.Integer, db.ForeignKey('workers.worker_id'), nullable=False)
    farm_id = db.Column(db.Integer, db.ForeignKey('farms.farm_id'), nullable=False)
    task_name = db.Column(db.String(255), nullable=False)
    task_status = db.Column(db.String(255), nullable=False)

    worker = db.relationship('Worker', backref=db.backref('tasks', lazy='dynamic'))
    farm = db.relationship('Farm', backref=db.backref('tasks', lazy='dynamic'))

    def __repr__(self):
        return f"<Task(task_id={self.task_id}, task_name={self.task_name}, task_status={self.task_status})>"

class WorkerTask(db.Model):
    __tablename__ = 'worker_tasks'
    worker_id = db.Column(db.Integer, db.ForeignKey('workers.worker_id'), primary_key=True)
    task_id = db.Column(db.Integer, db.ForeignKey('tasks.task_id'), primary_key=True)

    worker = db.relationship('Worker', backref=db.backref('worker_tasks', lazy='dynamic'))
    task = db.relationship('Task', backref=db.backref('worker_tasks', lazy='dynamic'))

    def __repr__(self):
        return f"<WorkerTask(worker_id={self.worker_id}, task_id={self.task_id})>"

class TokenBlocklist(db.Model):
    __tablename__='tokenblocklist'
    id = db.Column(db.Integer, primary_key=True)
    jti= db.Column(db.String(36),nullable=False, index=True)
    created_at=db.Column(db.DateTime,nullable=False)