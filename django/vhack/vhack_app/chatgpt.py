import os
import sys
import json
from datetime import datetime, timedelta
import re
from openai import OpenAI
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.prompts import MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage
from langchain.agents import create_openai_functions_agent
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain.agents import AgentExecutor
from langchain.chains import LLMMathChain 
from langchain.agents import Tool
from system_prompts import AUTOMATED_EXPENSE_RECORDING_SP, DATA_ANALYSIS_SP, EXPENSE_PREDICTION_SP, REGULAR_CHAT_SP, SUMMARIZE_CHAT_SP, \
                           PERSONA_GUARDIAN_SP, PERSONA_TEACHER_SP, PERSONA_ADVISOR_SP, \
                           MODEL_POWERS_SP
from func_call_template import MANDATORY_FUNCTION_CALL_TEMPLATE, FUNCTION_CALL_TEMPLATE
from model_config import __MODEL__, __MAX_TOKENS__, __TEMPERATURE__, __VERBOSE__, __USER_DATA_PATH__, __MAX_DATE_RANGE__, \
                         __DEBUGGING__, __MAX_ERROR_TRIAL__, \
                         __PERSONA_TEACHER_AGE__, __PERSONA_GUARDIAN_AGE__, __PERSONA_ADVISOR_AGE__
from utils import get_csv_given_date
from flask import Flask, render_template, request, jsonify, redirect, session, url_for
from flask_cors import CORS, cross_origin
import torch
import re
from PIL import Image
from transformers import DonutProcessor, VisionEncoderDecoderModel


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://192.168.1.127:5000", "*"]}})

def action_layer(client: OpenAI, user_input):
    #     functions = function_call_template,   # <========add this parameter
    #     function_call = 'auto',     # <========add this parameter
    function_choice = client.chat.completions.create(
        model = __MODEL__,
        messages = [{"role": "user", "content": user_input}],
        tools = FUNCTION_CALL_TEMPLATE,
        tool_choice = 'auto',
        max_tokens = __MAX_TOKENS__,
        temperature = __TEMPERATURE__
    )
    return function_choice


def get_start_end_date_for_history(client: OpenAI, user_input):
    formatted_input = "The current datetime is " + datetime.now().strftime("%A, %B %d, %Y %H:%M:%S") + ". " + user_input
    completion = client.chat.completions.create(
        model = __MODEL__,
        messages = [{"role": "user", "content": formatted_input}],
        tools = MANDATORY_FUNCTION_CALL_TEMPLATE,
        tool_choice = {"type": "function", "function": {"name": "acquire_history_data"}},     # force model to call this tool // mandatory
        max_tokens = __MAX_TOKENS__,
        temperature = __TEMPERATURE__
    )
    
    # if no date specified
    if not completion.choices[0].message.tool_calls[0].function.name and not completion.choices[0].message.tool_calls[0].function.arguments:
        current_date = datetime.now()
        one_month_ago = current_date - timedelta(days=__MAX_DATE_RANGE__)
        formatted_current_date = current_date.strftime("%d-%m-%Y")
        formatted_one_month_ago = one_month_ago.strftime("%d-%m-%Y")
        print("--- calculating date") if __DEBUGGING__ else None
        return {
                    "start_date": formatted_one_month_ago, 
                    "end_date": formatted_current_date
               }
    else:
        print("--- model return date") if __DEBUGGING__ else None
        return json.loads(completion.choices[0].message.tool_calls[0].function.arguments)



def init_record_user_expense_income_model():
    llm_record = ChatOpenAI(openai_api_key=os.getenv("OPENAI_API_KEY"), model=__MODEL__)
    prompt_template = ChatPromptTemplate.from_messages(
        [
            ("system", AUTOMATED_EXPENSE_RECORDING_SP),
            MessagesPlaceholder("chat_history", optional=True),
            ("human", "{input}"),
            MessagesPlaceholder("agent_scratchpad"),
        ]
    )

    os.environ["TAVILY_API_KEY"] = os.getenv("TAVILY_API_KEY")
    search = TavilySearchResults()
    
    problem_chain = LLMMathChain.from_llm(llm=llm_record)
    math_tool = Tool.from_function(name="Calculator",
                    func=problem_chain.run,
                    description="Useful for when you need to answer questions about math. This tool is only for math questions and nothing else. Only input math expressions. Must use this tool whenever end user prompts anythign related to math.")
    
    tools = [search, math_tool]      # must at least has a tool for agent. solution: dont use agent?
    agent = create_openai_functions_agent(llm_record, tools, prompt_template)
    agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=__VERBOSE__)
    return agent_executor

def init_summarize_text_model():
    llm_record = ChatOpenAI(openai_api_key=os.getenv("OPENAI_API_KEY"), model=__MODEL__)
    prompt_template = ChatPromptTemplate.from_messages(
        [
            ("system", AUTOMATED_EXPENSE_RECORDING_SP),
            MessagesPlaceholder("chat_history", optional=True),
            ("human", "{input}"),
            MessagesPlaceholder("agent_scratchpad"),
        ]
    )

    os.environ["TAVILY_API_KEY"] = os.getenv("TAVILY_API_KEY")
    search = TavilySearchResults()
    
    problem_chain = LLMMathChain.from_llm(llm=llm_record)
    math_tool = Tool.from_function(name="Calculator",
                    func=problem_chain.run,
                    description="Useful for when you need to answer questions about math. This tool is only for math questions and nothing else. Only input math expressions. Must use this tool whenever end user prompts anythign related to math.")
    
    tools = [search, math_tool]      # must at least has a tool for agent. solution: dont use agent?
    agent = create_openai_functions_agent(llm_record, tools, prompt_template)
    agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=__VERBOSE__)
    return agent_executor

def record_user_expenses_income(agent_executor:AgentExecutor, user_input):
    formatted_input = "The current datetime is " + datetime.now().strftime("%A, %B %d, %Y %H:%M:%S") + ". " + user_input
    chat_history = []  # not required here
    try:
        response = agent_executor.invoke({
            "chat_history": chat_history,
            "input": formatted_input
        })
        output = response['output']
        return output
    except:
        return None


def init_functional_model(system_prompt):
    llm = ChatOpenAI(openai_api_key=os.getenv("OPENAI_API_KEY"), model=__MODEL__)
    prompt_template = ChatPromptTemplate.from_messages(
        [
            ("system", system_prompt),
            MessagesPlaceholder("chat_history", optional=True),
            ("human", "{input}"),
            MessagesPlaceholder("agent_scratchpad"),
        ]
    )

    os.environ["TAVILY_API_KEY"] = os.getenv("TAVILY_API_KEY")
    search = TavilySearchResults()
    
    problem_chain = LLMMathChain.from_llm(llm=llm)
    math_tool = Tool.from_function(name="Calculator",
                    func=problem_chain.run,
                    description="Useful for when you need to answer questions about math. This tool is only for math questions and nothing else. Only input math expressions. Must use this tool whenever end user prompts anythign related to math.")

    tools = [search, math_tool]      # must at least has a tool for agent. solution: dont use agent?
    agent = create_openai_functions_agent(llm, tools, prompt_template)
    agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=__VERBOSE__)
    return agent_executor

def regular_chat(agent_executor: AgentExecutor, chat_history, user_input):
    formatted_input = "The current datetime is " + datetime.now().strftime("%A, %B %d, %Y %H:%M:%S") + ". " + user_input
    try:
        response = agent_executor.invoke({
            "chat_history": chat_history,
            "input": formatted_input
        })
        output = response['output']
        return output
    except:
        return None

def summarize_text(client: OpenAI, agent_executor: AgentExecutor, chat_history, user_input):
    formatted_input = "Just assume you are talking to me but not any user, hence any other persona should not be appeared." + "Please summarize the content after this sentence and just reply with the summarization without any other content or responses." + user_input
    try:
        response = agent_executor.invoke({
            "chat_history": chat_history,
            "input": formatted_input
        })
        output = response['output']
        return output
    except:
        return None

def data_analysis(client: OpenAI, agent_executor: AgentExecutor, chat_history, user_input):
    # call acquire history data
    date_dict = get_start_end_date_for_history(client=client, user_input=user_input)
    print("--- selected date", date_dict) if __DEBUGGING__ else None
    # Check if end date is too far away from start date to avoid crashing
    if not date_dict:
        start_date = datetime.strptime(date_dict['start_date'], '%d-%m-%Y')
        end_date = datetime.strptime(date_dict['end_date'], '%d-%m-%Y')
        difference = (end_date - start_date).days
        if difference > 30:
            end_date = start_date + timedelta(days=20)
            date_dict['end_date'] = end_date.strftime('%d-%m-%Y')
    data_csv = get_csv_given_date(csv_path=__USER_DATA_PATH__, start_date=date_dict['start_date'], end_date=date_dict['end_date'])
    print("--- data_csv\n", data_csv) if __DEBUGGING__ else None
    
    contexted_input = "The current datetime is " + datetime.now().strftime("%A, %B %d, %Y %H:%M:%S") + ". " \
                      + user_input + "User's past expense data are as follows: " + data_csv
    try:
        response = agent_executor.invoke({
            "chat_history": chat_history,
            "input": contexted_input
        })
        output = response['output']
        return output
    except:
        return None



def expenses_prediction(client: OpenAI, agent_executor: AgentExecutor, chat_history, user_input):
    # call acquire history data
    date_dict = get_start_end_date_for_history(client=client, user_input=user_input)
    print("--- selected date", date_dict) if __DEBUGGING__ else None
    data_csv = get_csv_given_date(csv_path=__USER_DATA_PATH__, start_date=date_dict['start_date'], end_date=date_dict['end_date'])
    print("--- data_csv\n", data_csv) if __DEBUGGING__ else None
    
    contexted_input = "The current datetime is " + datetime.now().strftime("%A, %B %d, %Y %H:%M:%S") + ". " \
                      + user_input + "User's past expense data are as follows: " + data_csv
    try:
        response = agent_executor.invoke({
            "chat_history": chat_history,
            "input": contexted_input
        })
        output = response['output']
        return output
    except:
        return None

def is_user(history):
    if history['id'] == 1:
        return False
    else:
        return True
    
def convert_json(prompt):
    pattern = r"'(\w+)'\s*:\s*(\d+)"
    matches = re.findall(pattern, prompt)
    kv_pairs = {key: int(value) for key, value in matches}
    json_data = json.dumps(kv_pairs, indent=2)
    return json_data
    
def use_model(prompt, chat_history):
    new_chat_history = []

    chat_history = [history for history in chat_history if history['id'] != 0]

    if chat_history != []:
        for history in chat_history:
            if is_user(history):
                new_chat_history.append(HumanMessage(content=history['text']))
            else:
                new_chat_history.append(AIMessage(content=history['text']))

    # user_name = user_details['username']
    # user_age = user_details['age']
    # user_mbti = user_details['mbti']
    # user_gender = user_details['gender']
    # user_address = user_details['address']
    # user_set_model_name = user_details['model_name']

    user_name = "Ter Qin"
    user_age = 22
    user_mbti = "ENTJ"
    user_gender = "male"
    user_address = "Kelantan"
    user_set_model_name = "Lily"
    
    # preset persona
    if user_age in range(*__PERSONA_TEACHER_AGE__):
        persona = PERSONA_TEACHER_SP
    elif user_age in range(*__PERSONA_GUARDIAN_AGE__):
        persona = PERSONA_GUARDIAN_SP
    else:
        persona = PERSONA_ADVISOR_SP
    
    persona = f"Your name is {user_set_model_name}. " + persona + \
        f" The end user's personal info is as below. Name {user_name}, Age {user_age}, MBTI {user_mbti}, \
        Gender {user_gender} and is currently living at {user_address}. \
        Please customise and personalise your responses for the end user based on those."
    
    # init required models
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    model_record_user_expense = init_record_user_expense_income_model()
    model_regular_chat = init_functional_model(REGULAR_CHAT_SP + " " + MODEL_POWERS_SP + " " + persona)
    model_data_analysis = init_functional_model(DATA_ANALYSIS_SP + " " + MODEL_POWERS_SP + " " + persona)
    model_expenses_prediction = init_functional_model(EXPENSE_PREDICTION_SP + " " + MODEL_POWERS_SP + " " + persona)
    model_summarize_result = init_functional_model(SUMMARIZE_CHAT_SP + " " + MODEL_POWERS_SP + " " + persona)
        
    # append to chat history
    new_chat_history.append(HumanMessage(content=prompt))
    
    # action layer
    completion = action_layer(client=client, user_input=prompt)
    # print(completion)
    
    funcs_to_call = {}
    if completion.choices[0].message.tool_calls is not None:
        for i in completion.choices[0].message.tool_calls:
            funcs_to_call[i.function.name] = i.function.arguments
            # funcs_to_call[i.message.function_call.name] = i.message.function_call.arguments
                # funcs_to_call[i.message.tool_calls]
    else:
        funcs_to_call['regular_chat'] = ""
        
    # debugging
    if __DEBUGGING__:
        for k,v in funcs_to_call.items():
            print(k, "-> ", end='', flush=True)
        print()

    response_type = ''
    data = ''
    # function calls must be in order
    # if 'record_user_expenses' in funcs_to_call.keys():
    #     output = None
    #     c = 0
    #     while (output is None) and (c < __MAX_ERROR_TRIAL__):
    #         output = record_user_expenses_income(agent_executor=model_record_user_expense, user_input=prompt)
    #         c += 1
    #     print("\n--- record_user_expenses()") if __DEBUGGING__ else None
    #     print(output)
    #     if output is not None:
    #         formatted_output = "I recorded your expense/income as follows: " + output
    #     else:
    #         formatted_output = ''
    #     new_chat_history.append(AIMessage(content=formatted_output))
    #     final_output = formatted_output
    #     response_type = 'record_expenses'
    #     data = convert_json(output)
        
    if 'expense_prediction' in funcs_to_call.keys():
        output = None
        c = 0
        while (output is None) and (c < __MAX_ERROR_TRIAL__):
            output = expenses_prediction(client=client, agent_executor=model_expenses_prediction, chat_history=new_chat_history, user_input=prompt)
            c += 1
        print("\n--- expenses_prediction()") if __DEBUGGING__ else None
        print(output)
        if output is not None:
            new_chat_history.append(AIMessage(content=output))
        else:
            new_chat_history.append(AIMessage(content=''))
        final_output = output
        response_type = 'regular_answer'

    if 'data_analysis' in funcs_to_call.keys():
        output = None
        c = 0
        while (output is None) and (c < __MAX_ERROR_TRIAL__):
            output = data_analysis(client=client, agent_executor=model_data_analysis, chat_history=new_chat_history, user_input=prompt)
            c += 1
        print("\n--- data_analysis()") if __DEBUGGING__ else None
        print(output)
        if output is not None:
            new_chat_history.append(AIMessage(content=output))
        else:
            new_chat_history.append(AIMessage(content=''))
        final_output = output
        response_type = 'regular_answer'

    # final revert
    if 'regular_chat' in funcs_to_call.keys():
        output = None
        c = 0
        while (output is None) and (c < __MAX_ERROR_TRIAL__):
            output = regular_chat(agent_executor=model_regular_chat, chat_history=new_chat_history, user_input=prompt)
            c += 1
        print("\n--- regular_chat()") if __DEBUGGING__ else None
        print(output)
        if output is not None:
            new_chat_history.append(AIMessage(content=output))
        else:
            new_chat_history.append(AIMessage(content=''))
        final_output = output
        response_type = 'regular_answer'

    # Summarize text
    if final_output is not None:
        summarization = summarize_text(client=client, agent_executor=model_summarize_result, chat_history=new_chat_history, user_input=final_output)
    else:
        summarization = ''

    return {'response_type': response_type, 'data': data, 'content': final_output, 'summarized_content': summarization}

@app.route('/')
def home():
    return 'Hello World'

@app.route('/get_user_response', methods=['POST'])
def get_user_response():
    user_input = request.form.get('message_to_gpt')
    chat_history = json.loads(request.form.get('conversation_history'))
    print("DATAAAA: ",user_input)
    print(chat_history)
    updated_result = use_model(user_input, chat_history)
    return jsonify(updated_result)

device = torch.device('cuda:0' if torch.cuda.is_available() else 'cpu')
processor = DonutProcessor.from_pretrained("AdamCodd/donut-receipts-extract")
model = VisionEncoderDecoderModel.from_pretrained("AdamCodd/donut-receipts-extract")
model.to(device)

def load_and_preprocess_image(image_path: str, processor):
    
    image = Image.open(image_path).convert("RGB")
    pixel_values = processor(image, return_tensors="pt").pixel_values
    return pixel_values

def generate_text_from_image(model, image_path: str, processor, device):

    pixel_values = load_and_preprocess_image(image_path, processor)
    pixel_values = pixel_values.to(device)

    model.eval()
    with torch.no_grad():
        task_prompt = "<s_receipt>"
        decoder_input_ids = processor.tokenizer(task_prompt, add_special_tokens=False, return_tensors="pt").input_ids
        decoder_input_ids = decoder_input_ids.to(device)
        generated_outputs = model.generate(
            pixel_values,
            decoder_input_ids=decoder_input_ids,
            max_length=model.decoder.config.max_position_embeddings, 
            pad_token_id=processor.tokenizer.pad_token_id,
            eos_token_id=processor.tokenizer.eos_token_id,
            # early_stopping=True,
            bad_words_ids=[[processor.tokenizer.unk_token_id]],
            return_dict_in_generate=True
        )

    decoded_text = processor.batch_decode(generated_outputs.sequences)[0]
    decoded_text = decoded_text.replace(processor.tokenizer.eos_token, "").replace(processor.tokenizer.pad_token, "")
    decoded_text = re.sub(r"<.*?>", "", decoded_text, count=1).strip()  
    decoded_text = processor.token2json(decoded_text)
    return decoded_text

@app.route('/process_receipt', methods=['POST'])
def extract_text():

    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        image_path = "temp_image.jpg"
        file.save(image_path)

        extracted_text = generate_text_from_image(model, image_path, processor, device)

        return jsonify({'extracted_text': extracted_text})
    
    
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

# if __name__ == "__main__":
    
#     user_name = "Zhi En"
#     user_age = 21
#     user_mbti = "INTJ"
#     user_gender = "female"
#     user_address = "Ipoh"
#     user_set_model_name = "Lily"
    
#     # preset persona
#     if user_age in range(*__PERSONA_TEACHER_AGE__):
#         persona = PERSONA_TEACHER_SP
#     elif user_age in range(*__PERSONA_GUARDIAN_AGE__):
#         persona = PERSONA_GUARDIAN_SP
#     else:
#         persona = PERSONA_ADVISOR_SP
    
#     persona = f"Your name is {user_set_model_name}. " + persona + \
#         f" The end user's personal info is as below. Name {user_name}, Age {user_age}, MBTI {user_mbti}, \
#         Gender {user_gender} and is currently living at {user_address}. \
#         Please customise and personalise your responses for the end user based on those."
    
#     # init required models
#     client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
#     model_record_user_expense = init_record_user_expense_income_model()
#     model_regular_chat = init_functional_model(REGULAR_CHAT_SP + " " + MODEL_POWERS_SP + " " + persona)
#     model_data_analysis = init_functional_model(DATA_ANALYSIS_SP + " " + MODEL_POWERS_SP + " " + persona)
#     model_expenses_prediction = init_functional_model(EXPENSE_PREDICTION_SP + " " + MODEL_POWERS_SP + " " + persona)
    
#     chat_history = []
#     while True:
#         prompt = input(">>> Prompt: ")
#         if prompt in ['quit', 'q', 'exit']:
#             sys.exit()
        
#         # append to chat history
#         chat_history.append(HumanMessage(content=prompt))
        
#         # action layer
#         completion = action_layer(client=client, user_input=prompt)
#         # print(completion)
        
#         funcs_to_call = {}
#         if completion.choices[0].message.tool_calls is not None:
#             for i in completion.choices[0].message.tool_calls:
#                 funcs_to_call[i.function.name] = i.function.arguments
#                 # funcs_to_call[i.message.function_call.name] = i.message.function_call.arguments
#                     # funcs_to_call[i.message.tool_calls]
#         else:
#             funcs_to_call['regular_chat'] = ""
            
#         # debugging
#         if __DEBUGGING__:
#             for k,v in funcs_to_call.items():
#                 print(k, "-> ", end='', flush=True)
#             print()


#         # function calls must be in order
#         if 'record_user_expenses' in funcs_to_call.keys():
#             output = None
#             c = 0
#             while (output is None) and (c < __MAX_ERROR_TRIAL__):
#                 output = record_user_expenses_income(agent_executor=model_record_user_expense, user_input=prompt)
#                 c += 1
#             print("\n--- record_user_expenses()") if __DEBUGGING__ else None
#             print(output)
#             formatted_output = "I recorded your expense/income as follows: " + output
#             chat_history.append(AIMessage(content=formatted_output)) if formatted_output is not None else None
#             # must let model know that it recorded the expense
            
#         if 'expense_prediction' in funcs_to_call.keys():
#             output = None
#             c = 0
#             while (output is None) and (c < __MAX_ERROR_TRIAL__):
#                 output = expenses_prediction(client=client, agent_executor=model_expenses_prediction, chat_history=chat_history, user_input=prompt)
#                 c += 1
#             print("\n--- expenses_prediction()") if __DEBUGGING__ else None
#             print(output)
#             chat_history.append(AIMessage(content=output)) if output is not None else None
    
#         if 'data_analysis' in funcs_to_call.keys():
#             output = None
#             c = 0
#             while (output is None) and (c < __MAX_ERROR_TRIAL__):
#                 output = data_analysis(client=client, agent_executor=model_data_analysis, chat_history=chat_history, user_input=prompt)
#                 c += 1
#             print("\n--- data_analysis()") if __DEBUGGING__ else None
#             print(output)
#             chat_history.append(AIMessage(content=output)) if output is not None else None
    
#         # final revert
#         if 'regular_chat' in funcs_to_call.keys():
#             output = None
#             c = 0
#             while (output is None) and (c < __MAX_ERROR_TRIAL__):
#                 output = regular_chat(agent_executor=model_regular_chat, chat_history=chat_history, user_input=prompt)
#                 c += 1
#             print("\n--- regular_chat()") if __DEBUGGING__ else None
#             print(output)
#             chat_history.append(AIMessage(content=output)) if output is not None else None
