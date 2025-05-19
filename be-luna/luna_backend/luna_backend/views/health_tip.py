
import logging
from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import HTTPNotFound
from pyramid.security import Authenticated

log = logging.getLogger(__name__)

# Hardcoded tips for demonstration
HEALTH_TIPS = [
    {
        "id": "1",
        "title": "Stay Hydrated",
        "content": "Drink at least 8 glasses of water daily to maintain energy levels and support your body's functions.",
        "category": "nutrition"
    },
    {
        "id": "2",
        "title": "Mindful Breathing",
        "content": "Practice deep breathing for 5 minutes when feeling stressed - inhale for 4 counts, hold for 2, exhale for 6.",
        "category": "mental"
    },
    {
        "id": "3",
        "title": "Cycle Nutrition",
        "content": "During menstruation, iron-rich foods like leafy greens and beans can help replenish what's lost.",
        "category": "cycle"
    },
    {
        "id": "4",
        "title": "Gentle Movement",
        "content": "Even a 10-minute walk can boost your mood and energy levels when feeling low.",
        "category": "exercise"
    },
    {
        "id": "5",
        "title": "Seed Cycling",
        "content": "Consider consuming pumpkin and flax seeds during the first half of your cycle, and sunflower and sesame seeds during the second half to support hormone balance.",
        "category": "cycle"
    },
    {
        "id": "6",
        "title": "Screen-Free Wind Down",
        "content": "Try avoiding screens for 30-60 minutes before bedtime to improve sleep quality.",
        "category": "general"
    },
    {
        "id": "7",
        "title": "Cycle Tracking Benefit",
        "content": "Consistent tracking can help identify patterns that might indicate hormonal imbalances or health issues.",
        "category": "cycle"
    },
]


@view_config(route_name='tips_collection', request_method='GET', 
             renderer='json', permission=Authenticated)
def get_tips(request):
    try:
        return {
            'status': 'success',
            'data': HEALTH_TIPS
        }
    except Exception as e:
        log.error(f"Error in get_tips: {str(e)}")
        return Response(json={'status': 'error', 'message': 'Server error'}, status=500)


@view_config(route_name='tips_category', request_method='GET', 
             renderer='json', permission=Authenticated)
def get_tips_by_category(request):
    try:
        category = request.matchdict['category']
        
        filtered_tips = [tip for tip in HEALTH_TIPS if tip['category'] == category]
        
        if not filtered_tips:
            return HTTPNotFound(json_body={
                'status': 'error',
                'message': f'No tips found for category: {category}'
            })
        
        return {
            'status': 'success',
            'data': filtered_tips
        }
    except Exception as e:
        log.error(f"Error in get_tips_by_category: {str(e)}")
        return Response(json={'status': 'error', 'message': 'Server error'}, status=500)
