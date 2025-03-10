from reddit_clone.post_votes.models import PostVote
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user

post_votes = Blueprint("post_votes", __name__)

#Create PostVote
@post_votes.post("/post_vote/create")
@login_required
def create_post_vote():
    json = request.json
    post_id = json.get("post_id")
    if not post_id:
        return jsonify({"message": "post_id is required"}), 400

    post_vote = PostVote.create_post_vote(json, current_user.id, post_id)
    if not post_vote:
        return jsonify({"message": "vote already cast!"}), 400
    elif post_vote:
        return jsonify(post_vote.to_dict())

#Delete PostVote
@post_votes.delete("/post_vote/delete/<int:id>")
@login_required
def delete_post_vote(id):
    post_vote = PostVote.query.get(id)
    if not post_vote:
        return jsonify({"message": "Post vote not found"}), 404

    if post_vote.user_id != current_user.id:
        return jsonify({"message": "Unauthorized: You can only unvote your own vote"}), 403

    post_vote.delete_post_vote()
    return jsonify({"message": "Post vote deleted"}), 200

#Patch Post vote
@login_required
@post_votes.patch("/post_vote/edit/<int:id>")
def patch_post_vote(id):
    post_vote = PostVote.query.get(id)
    if not post_vote:
        return jsonify({"message": "Post vote not found"})

    if post_vote.user_id != current_user.id:
        return jsonify({"message": "Unauthorized: You can only unvote your own vote"}), 403

    post_vote.patch_post_vote()
    return jsonify(post_vote.to_dict()), 200