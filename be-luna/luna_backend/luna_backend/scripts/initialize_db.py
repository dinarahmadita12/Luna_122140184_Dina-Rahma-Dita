import argparse
import sys
import transaction
from pyramid.paster import bootstrap, setup_logging
from ..models import get_session_factory, get_tm_session
from ..models.meta import Base
from ..models.user import User
from alembic.config import Config
from alembic import command
import os


def setup_models(dbsession):
    """
    Add or update models / fixtures in the database.
    
    For initial setup, this will create database tables.
    """
    # Create tables
    Base.metadata.create_all(dbsession.bind)
    
    # Add initial admin user if it doesn't exist
    admin = dbsession.query(User).filter_by(username='admin').first()
    if admin is None:
        print('Creating admin user...')
        admin = User(username='admin', email='admin@example.com')
        admin.set_password('adminpassword')
        dbsession.add(admin)


def parse_args(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument(
        'config_uri',
        help='Configuration file, e.g., development.ini',
    )
    parser.add_argument(
        '--alembic',
        action='store_true',
        help='Run Alembic migrations instead of directly creating tables'
    )
    return parser.parse_args(argv[1:])


def main(argv=None):
    if argv is None:
        argv = sys.argv
    
    args = parse_args(argv)
    setup_logging(args.config_uri)
    
    # Get the database URL
    env = bootstrap(args.config_uri)
    
    if args.alembic:
        # Run Alembic migrations
        print('Running Alembic migrations...')
        alembic_cfg = Config("alembic.ini")
        command.upgrade(alembic_cfg, "head")
        
        # Add default data in a transaction
        with transaction.manager:
            dbsession = get_tm_session(
                get_session_factory(env['registry']),
                transaction.manager,
            )
            # Add default data without recreating tables
            admin = dbsession.query(User).filter_by(username='admin').first()
            if admin is None:
                print('Creating admin user...')
                admin = User(username='admin', email='admin@example.com')
                admin.set_password('adminpassword')
                dbsession.add(admin)
    else:
        # Traditional table creation
        with transaction.manager:
            dbsession = get_tm_session(
                get_session_factory(env['registry']),
                transaction.manager,
            )
            setup_models(dbsession)
    
    print('Database initialization completed successfully')


if __name__ == '__main__':
    main()
