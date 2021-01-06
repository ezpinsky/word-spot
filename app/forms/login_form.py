from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

def user_exists(form, field):
  print ('Checking if user exits', field.data)
  email = field.data
  user = User.query.filter(User.email == email).first()
  if not user:
    raise ValidationError("Email not found.")

def password_matches(form, field):
  print('Checking if password matches')
  password = field.data['password']
  email = field.data['email']
  user = User.query(User.email == email).first()
  if not user:
    raise ValidationError("Email not found.")
  if not User.check_password(password):
    raise ValidationError('Incorrect password.')

class LoginForm(FlaskForm):
  email = StringField('email', validators=[DataRequired(), user_exists])
  password = StringField('password', validators=[DataRequired(), password_matches])
