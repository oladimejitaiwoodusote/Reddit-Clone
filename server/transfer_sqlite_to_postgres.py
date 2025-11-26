from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker
from dotenv import dotenv_values

from reddit_clone import app
from reddit_clone.users.models import User
from reddit_clone.subreddits.models import Subreddit
from reddit_clone.posts.models import Post
from reddit_clone.comments.models import Comment
from reddit_clone.subscriptions.models import Subscription
from reddit_clone.post_votes.models import PostVote
from reddit_clone.comment_votes.models import CommentVote

config = dotenv_values()

sqlite_engine = create_engine("sqlite:///instance/app.db")
postgres_engine = create_engine(config["DATABASE_URI"])

SQLiteSession = sessionmaker(bind=sqlite_engine)
PostgresSession = sessionmaker(bind=postgres_engine)

sqlite_session = SQLiteSession()
postgres_session = PostgresSession()

def transfer_table(model):
    rows = sqlite_session.query(model).all()
    for row in rows:
        postgres_session.merge(row)   # merge keeps IDs
    postgres_session.commit()

if __name__ == "__main__":
    with app.app_context():        
        print("Transferring Users...")
        transfer_table(User)

        print("Transferring Subreddits...")
        transfer_table(Subreddit)

        print("Transferring Posts...")
        transfer_table(Post)

        print("Transferring Comments...")
        transfer_table(Comment)

        print("Transferring Subscriptions...")
        transfer_table(Subscription)

        print("Transferring PostVotes...")
        transfer_table(PostVote)

        print("Transferring CommentVotes...")
        transfer_table(CommentVote)

        print("DONE.")
