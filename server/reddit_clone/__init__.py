from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

from reddit_clone.config import DATABASE_URI

app = Flask(__name__)
CORS (app, supports_credentials=True)
db = SQLAlchemy()
db.init_app(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI

@app.route('/')
def test_route():
    return "Hello World!"