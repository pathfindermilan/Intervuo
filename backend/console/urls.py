from django.urls import path, include
from console.views import AgentViewSet, ManageAgentViewSet, \
                    GetAgentsViewSet, GetAgentViewSet, \
                    interview_session, SecureFileAccessView

agent_create = AgentViewSet.as_view({
    'post': 'create'
})

agent_list = GetAgentsViewSet.as_view({
    'get': 'list'
})

single_agent = GetAgentViewSet.as_view({
    'get': 'retrieve'
})

agent_update = ManageAgentViewSet.as_view({
    'post': 'update',
    'delete': 'destroy'
})

urlpatterns = [
    path('create/', agent_create, name='create-agent'),
    path('list/', agent_list, name='list-agents'),
    path('list/<uuid:order_id>/', single_agent, name='single-agent'),
    path('update/', agent_update, name='update-agent'),
    path('sync/<uuid:agent_id>/', interview_session, name='sync-agent'),
    path('api/media/files/<str:order_id>__<str:filename>', SecureFileAccessView.as_view(), name='secure-file-access'),
]
