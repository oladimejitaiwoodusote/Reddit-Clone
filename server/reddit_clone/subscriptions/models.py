from reddit_clone import db

class Subscription(db.Model):
    __tablename__ = "subscriptions"

    id = db.Column(db.Integer, primary_key = True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    subreddit_id = db.Column(db.Integer, db.ForeignKey("subreddits.id"))

    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, server_default = db.func.now(), onupdate = db.func.now())

    user = db.relationship("User", back_populates = "subscriptions")
    subreddit = db.relationship("Subreddit", back_populates = "subscriptions")

    #init method
    def __init__(self, user_id, subreddit_id):
        self.user_id = user_id
        self.subreddit_id = subreddit_id

    #to dict method
    def to_dict(self):
        return ({
            "id": self.id,
            "user_id": self.user_id,
            "subreddit_id": self.subreddit_id,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        })  

    #Create subscription
    @classmethod
    def create_subscription(cls, user_id, subreddit_id):
        subscription = Subscription(
            user_id=user_id,
            subreddit_id=subreddit_id
        )

        db.session.add(subscription)
        db.session.commit()
        return subscription

    #Delete subscription
    def delete_subscription(self):
        db.session.delete(self)
        db.session.commit()

    #Edit subscription - can't edit one