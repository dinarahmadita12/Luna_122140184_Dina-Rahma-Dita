
import logging
from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import HTTPBadRequest, HTTPNotFound, HTTPForbidden
from marshmallow import ValidationError
from ..models import User
from ..schemas import UserSchema, LoginSchema

log = logging.getLogger(__name__)


@view_config(route_name='auth_register', request_method='POST', renderer='json')
def register_user(request):
    try:
        user_data = request.json_body
        schema = UserSchema()
        validated_data = schema.load(user_data)
        
        # Check if user already exists
        db = request.dbsession
        existing_user = db.query(User).filter(
            (User.username == validated_data['username']) | 
            (User.email == validated_data['email'])
        ).first()
        
        if existing_user:
            return HTTPForbidden(json_body={
                'status': 'error',
                'message': 'Username or email already exists'
            })
            
        # Create new user
        new_user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        new_user.set_password(validated_data['password'])
        
        db.add(new_user)
        db.flush()  # Flush to get the ID
        
        result = schema.dump(new_user)
        return {
            'status': 'success',
            'data': result
        }
    
    except ValidationError as e:
        return HTTPBadRequest(json_body={
            'status': 'error',
            'message': 'Validation error',
            'errors': e.messages
        })
    except Exception as e:
        log.error(f"Error in register_user: {str(e)}")
        return Response(json={'status': 'error', 'message': 'Server error'}, status=500)

import jwt
import datetime

SECRET_KEY = '@#_122140184_dina_#@'

@view_config(route_name='auth_login', request_method='POST', renderer='json')
def login_user(request):
    try:
        login_data = request.json_body
        schema = LoginSchema()
        validated_data = schema.load(login_data)
        
        db = request.dbsession
        user = db.query(User).filter(User.email == validated_data['email']).first()
        
        if not user or not user.check_password(validated_data['password']):
            return HTTPForbidden(json_body={
                'status': 'error',
                'message': 'Invalid email or password'
            })
        
        # Create JWT token manually using PyJWT
        payload = {
            'sub': user.id,
            'name': user.username,
            'email': user.email,
            'iat': datetime.datetime.utcnow(),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # token valid 1 hour
        }
        
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
        
        return {
            'status': 'success',
            'token': token,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        }
    
    except ValidationError as e:
        return HTTPBadRequest(json_body={
            'status': 'error',
            'message': 'Validation error',
            'errors': e.messages
        })
    except Exception as e:
        log.error(f"Error in login_user: {str(e)}")
        return Response(json={'status': 'error', 'message': 'Server error'}, status=500)
