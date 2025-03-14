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
from reddit_clone.comments.models import Comment
from reddit_clone.comment_votes.models import CommentVote
from reddit_clone.post_votes.models import PostVote
from reddit_clone.subreddits.models import Subreddit

@app.route('/')
def test_route():
    return "Hello World!"

from reddit_clone.users.routes import user
from reddit_clone.posts.routes import posts
from reddit_clone.comments.routes import comments
from reddit_clone.comment_votes.routes import comment_votes
from reddit_clone.post_votes.routes import post_votes
from reddit_clone.subreddits.routes import subreddit

app.register_blueprint(user)
app.register_blueprint(posts)
app.register_blueprint(comments)
app.register_blueprint(comment_votes)
app.register_blueprint(post_votes)
app.register_blueprint(subreddit)
