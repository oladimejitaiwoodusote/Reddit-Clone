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