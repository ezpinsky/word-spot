from flask import flask, session
import os
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from flask_cors import CORS

app = Flask(__name__)

# Sets up login manager
login_manager = LoginManager(app)
login_manager.login_view = 'auth.unauthorized'  # sets response for unauthorized user trying to access login_required page

@login_manager.user_loader
def load_user(userId):
    return User.get(userId)
