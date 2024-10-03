from django.urls import path, include
from console.views import AgentViewSet, ManageAgentViewSet, \
                    GetAgentsViewSet, interview_session

agent_create = AgentViewSet.as_view({
    'post': 'create'
})

agent_list = GetAgentsViewSet.as_view({
    'get': 'list'
})

agent_update = ManageAgentViewSet.as_view({
    'get': 'retrieve',
    'post': 'update',
    'delete': 'destroy'
})

urlpatterns = [
    path('create', agent_create, name='create-agent'),
    path('list', agent_list, name='list-agents'),
    path('update', agent_update, name='update-agent'),
    path('sync/<uuid:agent_id>/', interview_session, name='sync-agent'),

]
