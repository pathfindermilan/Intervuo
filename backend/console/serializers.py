from rest_framework import serializers
from console.models import Agent, Behaviour, Customer, Identity, \
                            Knowledge, KnowledgeFileItem, KnowledgeFiles, Order
from django.db import transaction

class IdentitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Identity
        fields = ['agent_name', 'language', 'voice', 'avatar']

    def create(self, validated_data):
        identity_instance = Identity.objects.create(**validated_data)
        return identity_instance

class BehaviourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Behaviour
        fields = ['agent_greeting', 'agent_prompt']

    def create(self, validated_data):
        behaviour_instance = Behaviour.objects.create(**validated_data)
        return behaviour_instance

class KnowlegdeFileItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = KnowledgeFileItem
        fields = ['file_item']

class KnowledgeFilesSerializer(serializers.ModelSerializer):
    knowledge_files_set = KnowlegdeFileItemSerializer(many=True)
    class Meta:
        model = KnowledgeFiles
        fields = ['knowledge_files_set']

    def create(self, validated_data):
        knowledge_file_items_data = validated_data.pop('knowledge_files_set')
        instance = KnowledgeFiles.objects.create(**validated_data)
        for file in knowledge_file_items_data:
            knowledge_file_item_serializer = KnowlegdeFileItemSerializer(data=file)
            if knowledge_file_item_serializer.is_valid(raise_exception=True):
                knowledge_file_item_serializer.save(knowlegde_files=instance)
        return instance

class KnowledgeSerializer(serializers.ModelSerializer):
    knowledge_set = KnowledgeFilesSerializer(required=False)
    class Meta:
        model = Knowledge
        fields = ['agent_llm', 'custom_knowledge', 'knowledge_set']

    def create(self, validated_data):
        knowledge_files_data = validated_data.pop('knowledge_set', None)
        if knowledge_files_data:
            knowledge_files_serializer = KnowledgeFilesSerializer(data=knowledge_files_data)

            if knowledge_files_serializer.is_valid():
                files_instance = knowledge_files_serializer.save(knowledge = knowledge_instance)
            else:
                pass

        knowledge_instance = Knowledge.objects.create(**validated_data)
        return knowledge_instance

class AgentSerializer(serializers.ModelSerializer):
    identity = IdentitySerializer()
    behaviour = BehaviourSerializer()
    knowledge = KnowledgeSerializer()
    class Meta:
        model = Agent
        fields = ['identity', 'behaviour', 'knowledge']

    def create(self, validated_data):
        identity_data = validated_data.pop('identity')
        behaviour_data = validated_data.pop('behaviour')
        knowledge_data = validated_data.pop('knowledge')

        identity_serializer = IdentitySerializer(data=identity_data)
        behaviour_serializer = BehaviourSerializer(data=behaviour_data)
        knowledge_serializer = KnowledgeSerializer(data=knowledge_data)

        if identity_serializer.is_valid():
            identity_instance = identity_serializer.save()
        else:
            raise serializers.ValidationError(identity_serializer.errors)

        if behaviour_serializer.is_valid():
            behaviour_instance = behaviour_serializer.save()
        else:
            raise serializers.ValidationError(behaviour_serializer.errors)

        if knowledge_serializer.is_valid():
            knowledge_instance = knowledge_serializer.save()
        else:
            raise serializers.ValidationError(knowledge_serializer.errors)

        agent = Agent.objects.create(
            identity = identity_instance,
            behaviour = behaviour_instance,
            knowledge = knowledge_instance
        )

        self.instance = agent
        return self.instance

class OrderSerializer(serializers.ModelSerializer):
    with transaction.atomic():
        agent = AgentSerializer()

        class Meta:
            model = Order
            fields = ['agent']

        def create(self, validated_data):
            agent_data = validated_data.pop('agent')
            agent_serializer = AgentSerializer(data=agent_data)
            if agent_serializer.is_valid():
                agent_instance = agent_serializer.save()
            else:
                raise serializers.ValidationError(agent_serializer.errors)
            user = self.context['request'].user
            if not user.is_authenticated:
                raise serializers.ValidationError("User is not valid")
            customer_instance, _ = Customer.objects.get_or_create(user_id=user.id)

            order = Order.objects.create(
                agent=agent_instance,
                customer = customer_instance,
            )
            self.instance = order

            return self.instance
