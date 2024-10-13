from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.chains import LLMChain


def ai_interviewer(text, session):

    agent = session.order.agent

    agent_greeting = agent['behaviour']['agent_greeting']
    agent_prompt = agent['behaviour']['agent_prompt']
    custom_knowledge = agent['knowledge']['custom_knowledge']
    model_name = agent['knowledge']['agent_llm']

    # Create ChatOpenAI instance
    llm = ChatOpenAI(model_name=model_name, temperature=0.4)

    interview_template = ChatPromptTemplate.from_template(
        f"{agent_prompt}\n\n"
        f"Custom Knowledge: {custom_knowledge}\n\n"
        "Interview progress: {progress}\n"
        "User's previous message: {user_message}\n\n"
        "Based on the interview progress, provide the appropriate response or question. "
        "If this is the final response, include an evaluation of the candidate."
    )



    return "AI default ", 0, 1,  "100%"
