
import logging
from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import HTTPBadRequest, HTTPNotFound
from pyramid.security import Authenticated
from marshmallow import ValidationError
from sqlalchemy import and_
from ..models import Medication
from ..schemas import MedicationSchema

log = logging.getLogger(__name__)


@view_config(route_name='medications_collection', request_method='GET', 
             renderer='json', permission=Authenticated)
def get_medications(request):
    try:
        user_id = request.authenticated_userid
        db = request.dbsession
        
        medications = db.query(Medication).filter(Medication.user_id == user_id).all()
        
        schema = MedicationSchema(many=True)
        result = schema.dump(medications)
        
        return {
            'status': 'success',
            'data': result
        }
    except Exception as e:
        log.error(f"Error in get_medications: {str(e)}")
        return Response(json={'status': 'error', 'message': 'Server error'}, status=500)


@view_config(route_name='medications_collection', request_method='POST', 
             renderer='json', permission=Authenticated)
def create_medication(request):
    try:
        user_id = request.authenticated_userid
        medication_data = request.json_body
        
        schema = MedicationSchema()
        validated_data = schema.load(medication_data)
        
        db = request.dbsession
        new_medication = Medication(
            user_id=user_id,
            **validated_data
        )
        
        db.add(new_medication)
        db.flush()
        
        result = schema.dump(new_medication)
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
        log.error(f"Error in create_medication: {str(e)}")
        return Response(json={'status': 'error', 'message': 'Server error'}, status=500)


@view_config(route_name='medication_item', request_method='GET', 
             renderer='json', permission=Authenticated)
def get_medication(request):
    try:
        user_id = request.authenticated_userid
        medication_id = int(request.matchdict['id'])
        
        db = request.dbsession
        medication = db.query(Medication).filter(
            and_(Medication.id == medication_id, Medication.user_id == user_id)
        ).first()
        
        if not medication:
            return HTTPNotFound(json_body={
                'status': 'error',
                'message': 'Medication not found'
            })
        
        schema = MedicationSchema()
        result = schema.dump(medication)
        
        return {
            'status': 'success',
            'data': result
        }
    except Exception as e:
        log.error(f"Error in get_medication: {str(e)}")
        return Response(json={'status': 'error', 'message': 'Server error'}, status=500)


@view_config(route_name='medication_item', request_method='PUT', 
             renderer='json', permission=Authenticated)
def update_medication(request):
    try:
        user_id = request.authenticated_userid
        medication_id = int(request.matchdict['id'])
        medication_data = request.json_body
        
        schema = MedicationSchema()
        validated_data = schema.load(medication_data, partial=True)
        
        db = request.dbsession
        medication = db.query(Medication).filter(
            and_(Medication.id == medication_id, Medication.user_id == user_id)
        ).first()
        
        if not medication:
            return HTTPNotFound(json_body={
                'status': 'error',
                'message': 'Medication not found'
            })
        
        # Update fields
        for key, value in validated_data.items():
            setattr(medication, key, value)
        
        db.flush()
        result = schema.dump(medication)
        
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
        log.error(f"Error in update_medication: {str(e)}")
        return Response(json={'status': 'error', 'message': 'Server error'}, status=500)


@view_config(route_name='medication_item', request_method='DELETE', 
             renderer='json', permission=Authenticated)
def delete_medication(request):
    try:
        user_id = request.authenticated_userid
        medication_id = int(request.matchdict['id'])
        
        db = request.dbsession
        medication = db.query(Medication).filter(
            and_(Medication.id == medication_id, Medication.user_id == user_id)
        ).first()
        
        if not medication:
            return HTTPNotFound(json_body={
                'status': 'error',
                'message': 'Medication not found'
            })
        
        db.delete(medication)
        
        return {
            'status': 'success',
            'message': 'Medication deleted successfully'
        }
    except Exception as e:
        log.error(f"Error in delete_medication: {str(e)}")
        return Response(json={'status': 'error', 'message': 'Server error'}, status=500)
