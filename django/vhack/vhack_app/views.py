from pdb import run
from django.shortcuts import render
from django.http import HttpResponse
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from . import assistants 

# Create your views here.
@csrf_exempt
def test(request):

    return JsonResponse({"success": "this endpoint is localhost:8000/umhack_app/test"}, status=200)


@csrf_exempt
def welcome(request):
    return JsonResponse({"success": "Django Endpoint Hit!"}, status=200)

# endpoint to retrieve conversation for that thread
@csrf_exempt
def retrieve_message(request):
    if request.method == 'GET':
        data = json.loads(request.body)
        
        manager = assistants.AssistantManager(data.get('thread_id'))
        
        messages = manager.retrieve_messages()
        
        return JsonResponse({"success": "Message retrieved successfully", "messages": messages}, status=200)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=400)

# endpoint to send message to assistant and generate response
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
    