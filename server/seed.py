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

avatars = ["https://d7hftxdivxxvm.cloudfront.net/?height=800&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FqNzvYZT0RbuuyuSyrs6wWw%2Fnormalized.jpg&width=719",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Elliott_Smith.jpg/440px-Elliott_Smith.jpg", 
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/MF_Doom_-_Hultsfred_2011_%28cropped%29.jpg/440px-MF_Doom_-_Hultsfred_2011_%28cropped%29.jpg",
    "https://pbs.twimg.com/media/DaT9nhjX4AAiKW-.jpg",
    "https://news.artnet.com/app/news-upload/2014/06/bjork-app-moma-acquisition.jpg",
    "https://pbs.twimg.com/media/EmO-CcJXEAEOrV5.jpg"
    ]
    
def create_users():
     
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
    subreddit_data = [
        {
        "name": "javascript",
        "description": "Subreddit for all things Javascript!",
        "avatar": "https://ui-avatars.com/api/?name=JS&background=ff9900&color=ffffff&size=64",
        "wallpaper": "https://www.tutorialrepublic.com/lib/images/javascript-illustration.png"
        },
        {
        "name": "reactjs",
        "description": "Subreddit for all things React!",
        "avatar": "https://ui-avatars.com/api/?name=React&background=61dafb&color=000000&size=64",
        "wallpaper": "https://goodworklabs.com/wp-content/uploads/2016/10/reactjs.png"
        },
        {
        "name": "python",
        "description": "Subreddit for all things Python!",
        "avatar": "https://ui-avatars.com/api/?name=Py&background=306998&color=ffffff&size=64",
        "wallpaper": "https://afrihub.com/assets/img/pc/python.png"
        },
        {
        "name": "golang",
        "description": "Subreddit for all things Go!",
        "avatar": "https://ui-avatars.com/api/?name=Go&background=00ADD8&color=ffffff&size=64",
        "wallpaper": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Go_Logo_Blue.svg/1200px-Go_Logo_Blue.svg.png"
        },
        {
        "name": "flask",
        "description": "Subreddit for all things Flask!",
        "avatar": "https://ui-avatars.com/api/?name=Flask&background=000000&color=ffffff&size=64",
        "wallpaper": "https://miro.medium.com/v2/resize:fit:980/1*cWuvkF15QKOsTHtgyIaqOA.png"
        }
    ]
       
    return [Subreddit.create_subreddit(data) for data in subreddit_data]

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
    media = [
        "https://upload.wikimedia.org/wikipedia/en/b/ba/Radioheadokcomputer.png",
        "https://upload.wikimedia.org/wikipedia/en/4/4b/My_Bloody_Valentine_-_Loveless.png",
        "https://upload.wikimedia.org/wikipedia/en/4/42/ATribeCalledQuestTheLowEndtheory.jpg",
        "https://upload.wikimedia.org/wikipedia/en/6/64/Pavement_Crooked_Rain.jpg",
        "https://upload.wikimedia.org/wikipedia/en/f/fd/Elliottsmitheitheror55.jpg",
    ]
    for _ in range(50):
        p = Post.create_post({
            "title": fake.sentence(),
            "media": rc(media),
            "content": fake.text(max_nb_chars=640)
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
            "text": fake.paragraph(nb_sentences = 2)
        },
            user_id = rc([user.id for user in users]),
            post_id = rc([post.id for post in posts])
        )
        comments.append(c)

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
        comment_votes.append(c)

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