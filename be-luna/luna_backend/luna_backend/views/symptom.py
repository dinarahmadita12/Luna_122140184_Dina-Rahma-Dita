
import logging
from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import HTTPBadRequest, HTTPNotFound
from pyramid.security import Authenticated
from marshmallow import ValidationError
from sqlalchemy import and_
from ..models import Symptom
from ..schemas import SymptomSchema

log = logging.getLogger(__name__)


@view_config(route_name='symptoms_collection', request_method='GET', 
             renderer='json', permission=Authenticated)
def get_symptoms(request):
    try:
        user_id = request.authenticated_userid
        db = request.dbsession
        
        symptoms = db.query(Symptom).filter(Symptom.user_id == user_id).all()
        
        schema = SymptomSchema(many=True)
        result = schema.dump(symptoms)
        
        return {
            'status': 'success',
            'data': result
        }
    except Exception as e:
        log.error(f"Error in get_symptoms: {str(e)}")
        return Response(json={'status': 'error', 'message': 'Server error'}, status=500)


@view_config(route_name='symptoms_collection', request_method='POST', 
             renderer='json', permission=Authenticated)
def create_symptom(request):
    try:
        user_id = request.authenticated_userid
        symptom_data = request.json_body
        
        schema = SymptomSchema()
        validated_data = schema.load(symptom_data)
        
        db = request.dbsession
        new_symptom = Symptom(
            user_id=user_id,
            **validated_data
        )
        
        db.add(new_symptom)
        db.flush()
        
        result = schema.dump(new_symptom)
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
        log.error(f"Error in create_symptom: {str(e)}")
        return Response(json={'status': 'error', 'message': 'Server error'}, status=500)


@view_config(route_name='symptom_item', request_method='GET', 
             renderer='json', permission=Authenticated)
def get_symptom(request):
    try:
        user_id = request.authenticated_userid
        symptom_id = int(request.matchdict['id'])
        
        db = request.dbsession
        symptom = db.query(Symptom).filter(
            and_(Symptom.id == symptom_id, Symptom.user_id == user_id)
        ).first()
        
        if not symptom:
            return HTTPNotFound(json_body={
                'status': 'error',
                'message': 'Symptom not found'
            })
        
        schema = SymptomSchema()
        result = schema.dump(symptom)
        
        return {
            'status': 'success',
            'data': result
        }
    except Exception as e:
        log.error(f"Error in get_symptom: {str(e)}")
        return Response(json={'status': 'error', 'message': 'Server error'}, status=500)


@view_config(route_name='symptom_item', request_method='PUT', 
             renderer='json', permission=Authenticated)
def update_symptom(request):
    try:
        user_id = request.authenticated_userid
        symptom_id = int(request.matchdict['id'])
        symptom_data = request.json_body
        
        schema = SymptomSchema()
        validated_data = schema.load(symptom_data, partial=True)
        
        db = request.dbsession
        symptom = db.query(Symptom).filter(
            and_(Symptom.id == symptom_id, Symptom.user_id == user_id)
        ).first()
        
        if not symptom:
            return HTTPNotFound(json_body={
                'status': 'error',
                'message': 'Symptom not found'
            })
        
        # Update fields
        for key, value in validated_data.items():
            setattr(symptom, key, value)
        
        db.flush()
        result = schema.dump(symptom)
        
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
        log.error(f"Error in update_symptom: {str(e)}")
        return Response(json={'status': 'error', 'message': 'Server error'}, status=500)


@view_config(route_name='symptom_item', request_method='DELETE', 
             renderer='json', permission=Authenticated)
def delete_symptom(request):
    try:
        user_id = request.authenticated_userid
        symptom_id = int(request.matchdict['id'])
        
        db = request.dbsession
        symptom = db.query(Symptom).filter(
            and_(Symptom.id == symptom_id, Symptom.user_id == user_id)
        ).first()
        
        if not symptom:
            return HTTPNotFound(json_body={
                'status': 'error',
                'message': 'Symptom not found'
            })
        
        db.delete(symptom)
        
        return {
            'status': 'success',
            'message': 'Symptom deleted successfully'
        }
    except Exception as e:
        log.error(f"Error in delete_symptom: {str(e)}")
        return Response(json={'status': 'error', 'message': 'Server error'}, status=500)
