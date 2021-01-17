from flask.cli import AppGroup
from .users import seed_users, undo_users
from .letter_boards import seed_letter_boards, undo_letter_boards
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_letter_boards()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_letter_boards()
    undo_users()
    # Add other undo functions here
