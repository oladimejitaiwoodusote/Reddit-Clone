"""Made Subreddit names unique

Revision ID: a87ee5c6c999
Revises: 9d035bf223bd
Create Date: 2025-07-07 17:03:34.587066

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a87ee5c6c999'
down_revision = '9d035bf223bd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('subreddits', schema=None) as batch_op:
        batch_op.create_unique_constraint(batch_op.f('uq_subreddits_name'), ['name'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('subreddits', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('uq_subreddits_name'), type_='unique')

    # ### end Alembic commands ###
