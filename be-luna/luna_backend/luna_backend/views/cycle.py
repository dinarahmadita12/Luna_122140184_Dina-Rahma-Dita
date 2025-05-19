
import logging
from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import HTTPBadRequest, HTTPNotFound, HTTPForbidden
from pyramid.security import Authenticated
from marshmallow import ValidationError
from sqlalchemy import and_
from ..models import Cycle
from ..schemas import CycleSchema

log = logging.getLogger(__name__)


@view_config(route_name='cycles_collection', request_method='GET', 
             renderer='json', permission=Authenticated)
def get_cycles(request):
    try:
        user_id = request.authenticated_userid
        db = request.dbsession
        
        cycles = db.query(Cycle).filter(Cycle.user_id == user_id).all()
        
        schema = CycleSchema(many=True)
        result = schema.dump(cycles)
        
        return {
            'status': 'success',
            'data': result
        }
    except Exception as e:
        log.error(f"Error in get_cycles: {str(e)}")
        return Response(json={'status': 'error', 'message': 'Server error'}, status=500)


@view_config(route_name='cycles_collection', request_method='POST', 
             renderer='json', permission=Authenticated)
def create_cycle(request):
    try:
        user_id = request.authenticated_userid
        cycle_data = request.json_body
        
        schema = CycleSchema()
        validated_data = schema.load(cycle_data)
        
        db = request.dbsession
        new_cycle = Cycle(
            user_id=user_id,
            **validated_data
        )
        
        db.add(new_cycle)
        db.flush()
        
        result = schema.dump(new_cycle)
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
        log.error(f"Error in create_cycle: {str(e)}")
        return Response(json={'status': 'error', 'message': 'Server error'}, status=500)


@view_config(route_name='cycle_item', request_method='GET', 
             renderer='json', permission=Authenticated)
def get_cycle(request):
    try:
        user_id = request.authenticated_userid
        cycle_id = int(request.matchdict['id'])
        
        db = request.dbsession
        cycle = db.query(Cycle).filter(
            and_(Cycle.id == cycle_id, Cycle.user_id == user_id)
        ).first()
        
        if not cycle:
            return HTTPNotFound(json_body={
                'status': 'error',
                'message': 'Cycle not found'
            })
        
        schema = CycleSchema()
        result = schema.dump(cycle)
        
        return {
            'status': 'success',
            'data': result
        }
    except Exception as e:
        log.error(f"Error in get_cycle: {str(e)}")
        return Response(json={'status': 'error', 'message': 'Server error'}, status=500)


@view_config(route_name='cycle_item', request_method='PUT', 
             renderer='json', permission=Authenticated)
def update_cycle(request):
    try:
        user_id = request.authenticated_userid
        cycle_id = int(request.matchdict['id'])
        cycle_data = request.json_body
        
        schema = CycleSchema()
        validated_data = schema.load(cycle_data, partial=True)
        
        db = request.dbsession
        cycle = db.query(Cycle).filter(
            and_(Cycle.id == cycle_id, Cycle.user_id == user_id)
        ).first()
        
        if not cycle:
            return HTTPNotFound(json_body={
                'status': 'error',
                'message': 'Cycle not found'
            })
        
        # Update fields
        for key, value in validated_data.items():
            setattr(cycle, key, value)
        
        db.flush()
        result = schema.dump(cycle)
        
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
        log.error(f"Error in update_cycle: {str(e)}")
        return Response(json={'status': 'error', 'message': 'Server error'}, status=500)


@view_config(route_name='cycle_item', request_method='DELETE', 
             renderer='json', permission=Authenticated)
def delete_cycle(request):
    try:
        user_id = request.authenticated_userid
        cycle_id = int(request.matchdict['id'])
        
        db = request.dbsession
        cycle = db.query(Cycle).filter(
            and_(Cycle.id == cycle_id, Cycle.user_id == user_id)
        ).first()
        
        if not cycle:
            return HTTPNotFound(json_body={
                'status': 'error',
                'message': 'Cycle not found'
            })
        
        db.delete(cycle)
        
        return {
            'status': 'success',
            'message': 'Cycle deleted successfully'
        }
    except Exception as e:
        log.error(f"Error in delete_cycle: {str(e)}")
        return Response(json={'status': 'error', 'message': 'Server error'}, status=500)
