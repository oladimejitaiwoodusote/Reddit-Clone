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
    if not comment_vote:
        # return jsonify(comment_vote.to_dict())
        return jsonify({"message": "vote already cast!"}), 400
    elif comment_vote:
        return jsonify(comment_vote.to_dict())

    return jsonify({"message": "Comment vote not created succesfully"}), 400

#Delete CommentVote
@comment_votes.delete("/comment_vote/delete/<int:id>")
@login_required
def delete_comment_vote(id):
    comment_vote = CommentVote.query.get(id)
    if not comment_vote:
        return jsonify({"message": "Comment vote not found"}), 404

    if comment_vote.user_id != current_user.id:
        return jsonify({"message": "Unauthorized: You can only unvote your own vote"}), 403

    comment_vote.delete_comment_vote()
    return jsonify({"message": "Comment vote deleted"}), 200

#Patch Comment vote
@comment_votes.patch("/comment_vote/edit/<int:id>")
@login_required
def patch_comment_vote(id):
    comment_vote = CommentVote.query.get(id)
    if not comment_vote:
        return jsonify({"message": "Comment vote not found"}), 404
    
    if comment_vote.user_id != current_user.id:
        return jsonify({"message": "Unauthorized: You can only unvote your own vote"}), 403

    comment_vote.patch_comment_vote()
    return jsonify(comment_vote.to_dict()), 200