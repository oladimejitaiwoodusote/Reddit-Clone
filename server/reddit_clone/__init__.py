from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager

from reddit_clone.config import DATABASE_URI, SECRET_KEY

app = Flask(__name__)
CORS (app, supports_credentials=True)

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = SECRET_KEY

db = SQLAlchemy(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)

from reddit_clone.users.models import User
from reddit_clone.posts.models import Post

@app.route('/')
def test_route():
    return "Hello World!"

from reddit_clone.users.routes import user

app.register_blueprint(user)