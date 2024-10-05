from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status

from console.serializers import OrderSerializer
from console.models import Order

# Create your views here.
#

class AgentViewSet(ModelViewSet):
    http_method_names = ['post']
    queryset = Order.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        return OrderSerializer

    def get_serializer_context(self):
        return {'request': self.request}

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            order = serializer.save()

            return Response({"agent_id": f"{serializer.instance.id}"}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetAgentsViewSet(ModelViewSet):
    pass

class ManageAgentViewSet(ModelViewSet):
    pass

@api_view(['POST'])
def interview_session(request, agent_id):
    pass
