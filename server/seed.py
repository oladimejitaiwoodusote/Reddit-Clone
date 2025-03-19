from reddit_clone import app, db
from reddit_clone.users.models import User
from reddit_clone.subreddits.models import Subreddit
from reddit_clone.subscriptions.models import Subscription
from reddit_clone.posts.models import Post
from reddit_clone.post_votes.models import PostVote
from reddit_clone.comments.models import Comment
from reddit_clone.comment_votes.models import CommentVote
from faker import Faker
from random import choice as rc
from sqlalchemy import text

fake = Faker()

def create_users():
    avatars = ["https://d7hftxdivxxvm.cloudfront.net/?height=800&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FqNzvYZT0RbuuyuSyrs6wWw%2Fnormalized.jpg&width=719",
     "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Elliott_Smith.jpg/440px-Elliott_Smith.jpg", 
     "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/MF_Doom_-_Hultsfred_2011_%28cropped%29.jpg/440px-MF_Doom_-_Hultsfred_2011_%28cropped%29.jpg",
     "https://pbs.twimg.com/media/DaT9nhjX4AAiKW-.jpg",
     "https://news.artnet.com/app/news-upload/2014/06/bjork-app-moma-acquisition.jpg",
     "https://pbs.twimg.com/media/EmO-CcJXEAEOrV5.jpg"
     ]
     
    users = []
    for _ in range(10):
        u = User.create_user({
            "email": fake.email(),
            "full_name": fake.name(),
            "username": fake.user_name(),
            "password": "password",
            "avatar": rc(avatars) #might need to do this outside the method call
        })
        users.append(u)
    
    return users

def create_subreddits():
    subreddits = []
    for _ in range(5):
        s = Subreddit.create_subreddit({
            "name": fake.user_name(),
            "description": fake.sentence(nb_words =3)
        })
        subreddits.append(s)

    return subreddits

def create_subscriptions(users, subreddits):
    subscriptions = []
    for _ in range(30):
        s = Subscription.create_subscription(
            user_id = rc([user.id for user in users]),
            subreddit_id= rc([subreddit.id for subreddit in subreddits])
        )
        subscriptions.append(s)

    return subscriptions

def create_posts(users, subreddits):
    posts = []
    for _ in range(50):
        p = Post.create_post({
            "title": fake.sentence(),
            "content": fake.text(max_nb_chars=200)
        },
            user_id = rc([user.id for user in users]),
            subreddit_id= rc([subreddit.id for subreddit in subreddits])
        )
        posts.append(p)

    return posts

def create_post_votes(users, posts):
    post_votes = []
    for _ in range(200):
        p = PostVote.create_post_vote({
            "is_upvote": rc([True, False])
        },
            user_id = rc([user.id for user in users]),
            post_id = rc([post.id for post in posts])
        )
        post_votes.append(p)
    
    return post_votes

def create_comments(users, posts):
    comments = []
    for _ in range(100):
        c = Comment.create_comment({
            "comment": fake.paragraph(nb_sentences = 2)
        },
            user_id = rc([users.id for user in users]),
            post_id = rc([posts.id for post in posts])
        )

    return comments

def create_comment_votes(users, comments):
    comment_votes = []
    for _ in range(200):
        c = CommentVote.create_comment_vote({
            "is_upvote": rc([True, False])
        },
            user_id = rc([user.id for user in users]),
            comment_id= rc([comment.id for comment in comments])
        )

    return comment_votes

# def reset_sequence(table_name):
#     seq_name = f"{table_name}_id_seq"
#     with db.engine.connect() as conn:
#         conn.execute(text(f"ALTER SEQUENCE {seq_name} RESTART WITH 1"))
#         conn.execute(text("COMMIT;"))

if __name__ == "__main__":
    with app.app_context():
        User.query.delete()
        Subreddit.query.delete()
        Subscription.query.delete()
        Post.query.delete()
        PostVote.query.delete()
        Comment.query.delete()
        CommentVote.query.delete()

        # reset_sequence('users')
        # reset_sequence('subreddits')
        # reset_sequence('subscriptions')
        # reset_sequence('posts')
        # reset_sequence('post_votes')
        # reset_sequence('comments')
        # reset_sequence('comment_votes')

        # db.session.commit()

        users = create_users()
        subreddits = create_subreddits()
        subscriptions = create_subscriptions(users, subreddits)
        posts =create_posts(users, subreddits)
        post_votes = create_post_votes(users, posts)
        comments = create_comments(users, posts)
        comment_votes = create_comment_votes(users, comments)


