
import logging
from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import HTTPBadRequest, HTTPNotFound
from pyramid.security import Authenticated
from marshmallow import ValidationError
from sqlalchemy import and_
from ..models import Mood
from ..schemas import MoodSchema

log = logging.getLogger(__name__)


@view_config(route_name='moods_collection', request_method='GET', 
             renderer='json', permission=Authenticated)
def get_moods(request):
    try:
        user_id = request.authenticated_userid
        db = request.dbsession
        
        moods = db.query(Mood).filter(Mood.user_id == user_id).all()
        
        schema = MoodSchema(many=True)
        result = schema.dump(moods)
        
        return {
            'status': 'success',
            'data': result
        }
    except Exception as e:
        log.error(f"Error in get_moods: {str(e)}")
        return Response(json={'status': 'error', 'message': 'Server error'}, status=500)


@view_config(route_name='moods_collection', request_method='POST', 
             renderer='json', permission=Authenticated)
def create_mood(request):
    try:
        user_id = request.authenticated_userid
        mood_data = request.json_body
        
        schema = MoodSchema()
        validated_data = schema.load(mood_data)
        
        db = request.dbsession
        new_mood = Mood(
            user_id=user_id,
            **validated_data
        )
        
        db.add(new_mood)
        db.flush()
        
        result = schema.dump(new_mood)
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
        log.error(f"Error in create_mood: {str(e)}")
        return Response(json={'status': 'error', 'message': 'Server error'}, status=500)


@view_config(route_name='mood_item', request_method='GET', 
             renderer='json', permission=Authenticated)
def get_mood(request):
    try:
        user_id = request.authenticated_userid
        mood_id = int(request.matchdict['id'])
        
        db = request.dbsession
        mood = db.query(Mood).filter(
            and_(Mood.id == mood_id, Mood.user_id == user_id)
        ).first()
        
        if not mood:
            return HTTPNotFound(json_body={
                'status': 'error',
                'message': 'Mood not found'
            })
        
        schema = MoodSchema()
        result = schema.dump(mood)
        
        return {
            'status': 'success',
            'data': result
        }
    except Exception as e:
        log.error(f"Error in get_mood: {str(e)}")
        return Response(json={'status': 'error', 'message': 'Server error'}, status=500)


@view_config(route_name='mood_item', request_method='PUT', 
             renderer='json', permission=Authenticated)
def update_mood(request):
    try:
        user_id = request.authenticated_userid
        mood_id = int(request.matchdict['id'])
        mood_data = request.json_body
        
        schema = MoodSchema()
        validated_data = schema.load(mood_data, partial=True)
        
        db = request.dbsession
        mood = db.query(Mood).filter(
            and_(Mood.id == mood_id, Mood.user_id == user_id)
        ).first()
        
        if not mood:
            return HTTPNotFound(json_body={
                'status': 'error',
                'message': 'Mood not found'
            })
        
        # Update fields
        for key, value in validated_data.items():
            setattr(mood, key, value)
        
        db.flush()
        result = schema.dump(mood)
        
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
        log.error(f"Error in update_mood: {str(e)}")
        return Response(json={'status': 'error', 'message': 'Server error'}, status=500)


@view_config(route_name='mood_item', request_method='DELETE', 
             renderer='json', permission=Authenticated)
def delete_mood(request):
    try:
        user_id = request.authenticated_userid
        mood_id = int(request.matchdict['id'])
        
        db = request.dbsession
        mood = db.query(Mood).filter(
            and_(Mood.id == mood_id, Mood.user_id == user_id)
        ).first()
        
        if not mood:
            return HTTPNotFound(json_body={
                'status': 'error',
                'message': 'Mood not found'
            })
        
        db.delete(mood)
        
        return {
            'status': 'success',
            'message': 'Mood deleted successfully'
        }
    except Exception as e:
        log.error(f"Error in delete_mood: {str(e)}")
        return Response(json={'status': 'error', 'message': 'Server error'}, status=500)
