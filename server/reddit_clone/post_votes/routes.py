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
    
    if post_vote is None:
        #Vote Removed
        return jsonify({"message": "Vote Removed"}), 200
    
    #Vote created or toggled
    return jsonify(post_vote.to_dict()), 200
