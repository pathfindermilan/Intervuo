from django.shortcuts import render
from django.db import transaction
from django.http import FileResponse
from django.conf import settings

from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound

from console.serializers import GetOrdersSerializer, OrderSerializer, \
                                GetOrderSerializer, ManageOrderSerializer
from console.models import Customer, Order

import os

class AgentViewSet(ModelViewSet):
    http_method_names = ['post']
    queryset = Order.objects.all()
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    serializer_class = OrderSerializer

    def get_serializer_context(self):
        return {'request': self.request}

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            order = serializer.save()

            return Response({"agent_id": f"{serializer.instance.id}"}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetAgentsViewSet(ModelViewSet):
    http_method_names = ['get']
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        return GetOrdersSerializer

    def get_queryset(self):
        customer_id = Customer.objects.only('id').get(user_id=self.request.user.id)
        return Order.objects.filter(customer_id = customer_id)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class GetAgentViewSet(ModelViewSet):
    http_method_names = ['get']
    permission_classes = [IsAuthenticated]
    lookup_field = 'order_id'

    def get_serializer_class(self):
        return GetOrderSerializer

    def get_queryset(self):
        customer_id = Customer.objects.only('id').get(user_id=self.request.user.id)
        return Order.objects.filter(customer_id = customer_id)

    def retrieve(self, request, *args, **kwargs):
        order_id = self.kwargs.get(self.lookup_field)
        order = self.get_queryset().filter(id=order_id).first()

        if order is None:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ManageAgentViewSet(ModelViewSet):
    http_method_names = ['get', 'patch', 'delete']
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return GetOrderSerializer
        return ManageOrderSerializer

    def get_queryset(self):
        customer_id = Customer.objects.only('id').get(user_id=self.request.user.id)
        return Order.objects.filter(customer_id = customer_id)

    def perform_destroy(self, instance):
        instance.delete()

class SecureFileAccessView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, order_id, filename):
        try:
            order = Order.objects.get(id=order_id, customer__user_id=request.user.id)
        except Order.DoesNotExist:
            return Response({"detail": "You don't have permission to access this file"}, status=status.HTTP_403_FORBIDDEN)

        file_path = os.path.join(settings.MEDIA_ROOT, 'files', f"{order_id}__{filename}")
        if not os.path.exists(file_path):
            return Response({"detail": "File Not found"}, status=status.HTTP_404_NOT_FOUND)

        return FileResponse(open(file_path, 'rb'))

class SecureAvatarAccessView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, order_id, filename):
        try:
            order = Order.objects.get(id=order_id, customer__user_id=request.user.id)
        except Order.DoesNotExist:
            return Response({"detail": "You don't have permission to access this file"}, status=status.HTTP_403_FORBIDDEN)

        file_path = os.path.join(settings.MEDIA_ROOT, 'avatars', f"{order_id}__{filename}")
        if not os.path.exists(file_path):
            return Response({"detail": "File Not found"}, status=status.HTTP_404_NOT_FOUND)

        return FileResponse(open(file_path, 'rb'))

@api_view(['POST'])
def interview_session(request, agent_id):
    pass
