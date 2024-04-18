from pdb import run
from pdb import run
from django.shortcuts import render
from django.http import HttpResponse
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from . import assistants 
from . import assistants 
import os
from datetime import datetime
import psycopg2

# Create your views here.
@csrf_exempt
def test(request):
    # if request.method == "POST":
    #     try:
    #         # Call the initialize_new_query function to create a new query document
    #         query_id = initialize_new_query()

    #         # Return the query ID as a JSON response
    #         response_data = {"query_id": query_id}
    #         return JsonResponse(response_data)
    #     except Exception as e:
    #         return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"sucess": "this endpoint is localhost:8000/umhack_app/test"}, status=200)


@csrf_exempt
def welcome(request):
    return JsonResponse({"sucess": "Django Endpoint Hit!"}, status=200)

@csrf_exempt
# what i will get from frontend: {thread_id, message}
def send_message(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        
        manager = assistants.AssistantManager(data.get('thread_id'))
        
        # Add message to thread
        manager.add_message_to_thread('user', data.get('message'))
        manager.run_assistant("")
        response = manager.wait_for_completion()
        # manager.run_steps() # print run steps for debugging
        
        return JsonResponse({"success": "Message sent successfully", "responded_message": response['last_message'], "data_visualisation_response": response["data_visualisation_response"], "forecast_visualisation_response": response["forecast_visualisation_response"], "thread_id": response["thread_id"]}, status=200)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=400)
    
def retrieve_message(request):
    if request.method == 'GET':
        data = json.loads(request.body)
        
        manager = assistants.AssistantManager(data.get('thread_id'))
        
        messages = manager.retrieve_messages()
        
        return JsonResponse({"success": "Message retrieved successfully", "messages": messages}, status=200)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=400)
    
@csrf_exempt
def get_data(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            # Assuming you receive a SQL query in the request data
            sql_query = data.get("sql_query")
            if not sql_query:
                return JsonResponse({"error": "SQL query is missing in the request data"}, status=400)
            
            # Execute the SQL query
            query_result = execute_query(sql_query)
            
            # Return the query result in the JSON response
            return JsonResponse({"success": "Query executed successfully", "result": query_result}, status=200)
        
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data in the request body"}, status=400)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=400)

def execute_query(sql_query: str = None):
    try:
        conn = psycopg2.connect(os.environ.get("DIRECT_URL"))
        cur = conn.cursor()
        cur.execute(sql_query)
        result = cur.fetchall()
        cur.close()
        conn.close()
        
        # Check if the result is not None and if it contains a datetime object.
        if result is not None:
            # Convert all elements of the tuple to string.
            final_result = [
                tuple(element.strftime('%Y-%m-%d %H:%M:%S') if isinstance(element, datetime) else str(element))
                for element in result
            ]
        else:
            final_result = [("Query did not return any results.",)]
    
        return final_result
    
    except Exception as e:
        # Return error message if query execution fails
        return str(e), " Try another query"