"""Comment votes model

Revision ID: 88460908a073
Revises: f7e2e7bf7bad
Create Date: 2025-03-10 11:32:37.106154

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '88460908a073'
down_revision = 'f7e2e7bf7bad'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('comment_votes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('is_upvote', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('comment_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['comment_id'], ['comments.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('comment_votes')
    # ### end Alembic commands ###
