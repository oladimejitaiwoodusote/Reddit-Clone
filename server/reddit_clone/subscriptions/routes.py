from reddit_clone.subscriptions.models import Subscription
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user

subscriptions = Blueprint("subscriptions", __name__)

#Create Subscription
@subscriptions.post("/subscription/create")
@login_required
def subscribe():
    json = request.json
    subreddit_id = json.get("subreddit_id")

    if not subreddit_id:
        return jsonify({"message": "subreddit id is required"}), 400

    existing_subscription = Subscription.query.filter_by(
        user_id = current_user.id, subreddit_id = subreddit_id
    ).first()

    if existing_subscription:
        return jsonify({"message": "Already subscribed"}), 400

    new_subcription = Subscription.create_subscription(subreddit_id=subreddit_id, user_id=current_user.id)
    return jsonify(new_subcription.to_dict()), 201

#Delete Subscription
@subscriptions.delete("/subscription/delete/<int:id>")
@login_required
def unsubscribe(id):
    subscription = Subscription.query.get(id)
    if not subscription:
        return jsonify({"message": "Subscription not found!"}), 404

    if subscription.user_id != current_user.id:
        return jsonify({"message": "Not authorized to unsubscribe"}), 403

    subscription.delete_subscription() 
    return jsonify({"message": "Unsubscribed!"})

#Get subscription for current user & subreddit
@subscriptions.get("/subscription/check/<int:subreddit_id>")
@login_required
def check_subscription(subreddit_id):
    subscription = Subscription.query.filter_by(
        user_id = current_user.id,
        subreddit_id = subreddit_id
    ).first()
    return jsonify({
        "subscribed": subscription is not None, 
        "subscription_id": subscription.id if subscription else None
    })

#Get all subreddit_ids the current user is subscribed to
@subscriptions.get("/subscription/my_subreddits")
@login_required
def my_subreddits():
    subs = Subscription.query.filter_by(user_id=current_user.id).all()
    subreddit_ids = [sub.subreddit_id for sub in subs]
    return jsonify(subreddit_ids)