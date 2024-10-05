from django.db import models
from django.contrib.auth import get_user_model
from django.conf import settings
from uuid import uuid4
# Create your models here.

User = get_user_model()

class Identity(models.Model):
    agent_name = models.CharField(max_length=25)

    LANGUAGE_EN = 'english'
    LANGUAGE_ES = 'spanish'
    LANGUAGE_FR = 'french'
    LANGUAGE_GER = 'german'

    LANGUAGE_CHOICES = [
        (LANGUAGE_EN, 'English'),
        (LANGUAGE_ES, 'Spanish'),
        (LANGUAGE_EN, 'English'),
        (LANGUAGE_ES, 'Spanish'),
    ]
    language = models.CharField(max_length=7, choices=LANGUAGE_CHOICES, default=LANGUAGE_EN)


    VOICE_ADAM = 'adam'
    VOICE_ALICE = 'alice'

    VOICE_CHOICES = [
        (VOICE_ADAM, 'Adam'),
        (VOICE_ALICE, 'Alice'),
    ]
    voice = models.CharField(max_length=5, choices=VOICE_CHOICES, default=VOICE_ADAM)

    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)

class Behaviour(models.Model):
    agent_greeting = models.CharField(max_length=250)
    agent_prompt = models.TextField(default='')

class Knowledge(models.Model):
    LLM_GPT4o_mini = "gpt-4o-mini"
    LLM_GPT4o = "gtp-4o"

    LLM_CHOICES = [
        (LLM_GPT4o_mini, 'GPT-4o mini'),
        (LLM_GPT4o, 'GPT-4o'),
    ]

    agent_llm = models.CharField(max_length=11, choices=LLM_CHOICES, default=LLM_GPT4o_mini)
    custom_knowledge = models.TextField(default = '')

class KnowledgeFiles(models.Model):
    knowledge = models.OneToOneField(Knowledge, on_delete=models.CASCADE)

class KnowledgeFileItem(models.Model):
    file_item = models.FileField(upload_to='knowledge_files/', null=True, blank=True)
    knowledge_files = models.ForeignKey(KnowledgeFiles, on_delete=models.CASCADE)

    STATUS_INDEX = 'Indexed'
    STATUS_ACTIVE = 'Active'
    STATUS_ERROR = 'Errored'

    STATUS_CHOICES = [
        (STATUS_INDEX, 'Index'),
        (STATUS_ACTIVE, 'Active'),
        (STATUS_ERROR, 'Error')
    ]
    status_url = models.CharField(
        max_length=7, choices=STATUS_CHOICES, default=STATUS_INDEX)

class Customer(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

class Agent(models.Model):
    identity = models.OneToOneField(Identity, on_delete=models.CASCADE)
    behaviour = models.OneToOneField(Behaviour, on_delete=models.CASCADE)
    knowledge = models.OneToOneField(Knowledge, on_delete=models.CASCADE)

class Order(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    agent = models.OneToOneField(Agent, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='+', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField(default=False)
