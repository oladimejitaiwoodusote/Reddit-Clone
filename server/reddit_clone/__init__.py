from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from sqlalchemy import MetaData

from reddit_clone.config import DATABASE_URI, SECRET_KEY

app = Flask(__name__)
CORS (app, supports_credentials=True)

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = SECRET_KEY

# app.config["SESSION_TYPE"] = "filesystem"

# #Configuring session cookies for cross-origin requests
app.config.update(
  SESSION_COOKIE_SAMESITE = "None",
  SESSION_COOKIE_SECURE=True,
)

convention = {
  "ix": "ix_%(column_0_label)s",
  "uq": "uq_%(table_name)s_%(column_0_name)s",
  "ck": "ck_%(table_name)s_%(constraint_name)s",
  "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
  "pk": "pk_%(table_name)s"
}

metadata = MetaData(naming_convention=convention)

db = SQLAlchemy(app, metadata=metadata)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)

from reddit_clone.users.models import User
from reddit_clone.posts.models import Post
from reddit_clone.comments.models import Comment
from reddit_clone.comment_votes.models import CommentVote
from reddit_clone.post_votes.models import PostVote
from reddit_clone.subreddits.models import Subreddit
from reddit_clone.subscriptions.models import Subscription

@app.route('/')
def test_route():
    return "Hello World!"

from reddit_clone.users.routes import users
from reddit_clone.posts.routes import posts
from reddit_clone.comments.routes import comments
from reddit_clone.comment_votes.routes import comment_votes
from reddit_clone.post_votes.routes import post_votes
from reddit_clone.subreddits.routes import subreddits
from reddit_clone.subscriptions.routes import subscriptions

app.register_blueprint(users)
app.register_blueprint(posts)
app.register_blueprint(comments)
app.register_blueprint(comment_votes)
app.register_blueprint(post_votes)
app.register_blueprint(subreddits)
app.register_blueprint(subscriptions)
