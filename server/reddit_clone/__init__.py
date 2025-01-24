from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

from reddit_clone.config import DATABASE_URI

app = Flask(__name__)
db = SQLAlchemy()

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
CORS (app, supports_credentials=True)
db.init_app(app)
migrate = Migrate(app, db)

@app.route('/')
def test_route():
    return "Hello World!"