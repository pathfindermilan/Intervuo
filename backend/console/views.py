from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.viewsets import ModelViewSet
# Create your views here.
#

class AgentViewSet(ModelViewSet):
    pass

class GetAgentsViewSet(ModelViewSet):
    pass

class ManageAgentViewSet(ModelViewSet):
    pass

@api_view(['POST'])
def interview_session(request, agent_id):
    pass
