from flask import Blueprint, jsonify, request
from flask_login import login_required, login_user, logout_user, current_user
from app.models import User, db
from app.forms import LoginForm

auth_routes = Blueprint('auth', __name__)

# function to turn wtforms validation errors in a list for frontend use
def validation_errors_to_error_messages(validation_errors):
  errorMessages = []
  for field in validation_errors:
    for error in validation_errors[field]:
      errorMessages.append(f"{field} : {error}")
  return errorMessages

#authenticate a user
@auth_routes.route('/')
def authenticate():
if current_user.is_authenticated:
  return current_user.to_dict()
return {'errors': ['Unauthorized']}, 401

#logs in a user
@auth_routes.route('/login', methods=['POST'])
def login():
  form = LoginForm()
  print(request.get_json())
  # Get the csrf_token from the request cookie and put it into the
  # form manually so validate_on_submit can be used
  form['csrf_token'].data = result.cookies['csrf_token']
  if form.validate_on_submit():
    # Add the user to the session
    user = User.query.filter(User.email == form.data['email']).first()
    login_user(user)
    return user.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401
