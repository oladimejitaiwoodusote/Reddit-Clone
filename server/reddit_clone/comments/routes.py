from reddit_clone.comments.models import Comment
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user

comments = Blueprint("comments", __name__)

#Create Comment
#Finish Later
@comments.post("/comment/create")
@login_required
def create_comment():
    json = request.json
    post_id = json.get("post_id")
    if not post_id:
        return jsonify({"message": "post_id is required"}), 400

    comment = Comment.create_comment(json, current_user.id, post_id)
    if comment:
        return jsonify(comment.to_dict()), 201

    return jsonify({"message": "Comment not created succesfully"}), 400

#Delete Comment
@comments.delete("/comment/delete/<int:id>")
@login_required
def delete_comment(id):
    comment = Comment.query.get(id)
    if not comment:
        return jsonify({"message": "Comment not found"}), 404

    if comment.user_id != current_user.id:
        return jsonify({"message": "Unauthorized: You can only delete your own comments"})
    
    comment.delete_comment()
    return jsonify({"message": "Comment deleted!"})

#Patch Comment
@comments.patch("/comment/edit/<int:id>")
@login_required
def patch_comment(id):
    comment = Comment.query.get(id)
    if not comment:
        return jsonify({"message": "Comment not found"}), 404

    if comment.user_id != current_user.id:
        return jsonify({"message": "Unauthorized: You can only delete your own comments"})

    json = request.json
    comment.patch_comment(json)
    return jsonify(comment.to_dict()), 200