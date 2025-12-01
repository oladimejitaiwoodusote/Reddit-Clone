from reddit_clone.comment_votes.models import CommentVote
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user

comment_votes = Blueprint("comment_votes", __name__)

#Create CommentVote
@comment_votes.post("/comment_vote/create")
@login_required
def create_comment_vote():
    json = request.json
    comment_id = json.get("comment_id")
    if not comment_id:
        return jsonify({"message": "comment_id is required"}), 400

    comment_vote = CommentVote.create_comment_vote(json, current_user.id, comment_id)

    if comment_vote is None:
        #Vote Removed
        return jsonify({"message": "Vote Removed"}), 200
    
    #Vote created or toggled
    return jsonify(comment_vote.to_dict()), 200