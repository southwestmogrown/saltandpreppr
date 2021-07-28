"""create recipe model

Revision ID: f2bb525aefcd
Revises: c61217b09ed5
Create Date: 2021-07-27 20:12:25.321430

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f2bb525aefcd'
down_revision = 'c61217b09ed5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Recipes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userId', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('type', sa.String(length=10), nullable=True),
    sa.Column('instructions', sa.Text(), nullable=False),
    sa.ForeignKeyConstraint(['userId'], ['Users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('Recipes')
    # ### end Alembic commands ###
