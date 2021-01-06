from flask import Flask, session
import os
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from flask_cors import CORS  # for cross-origin resource sharing

from .models import db, User

from .config import Config


app = Flask(__name__)

# Sets up login manager
login_manager = LoginManager(app)
login_manager.login_view = 'auth.unauthorized'  # sets response for unauthorized user trying to access login_required page


@login_manager.user_loader
def load_user(userId):
    return User.get(userId)


# app.cli.add_command(seed_commands)  # Tell flask about our seed commands

app.config.from_object(Config)  # sets configuration for our app
db.init_app(app)
Migrate(app, db) # Allows flask app using alembic to handle databse SQLAlchemy migrations
