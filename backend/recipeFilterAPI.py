from flask import Flask, request, jsonify
import requests
import csv
from io import StringIO
import spacy

# Load the spaCy English model
nlp = spacy.load('en_core_web_sm')

app = Flask(__name__)

def extract_ingredients_from_text(text):
    # Process the text with spaCy
    doc = nlp(text)

    # Extract entities that are likely to be ingredients (e.g., nouns)
    ingredients = [token.text.lower() for token in doc if token.pos_ == 'NOUN']

    return ingredients

# Endpoint for processing images and asking a predefined question to identify ingredients
@app.route('/identify_ingredients', methods=['POST'])
def identify_ingredients():
    # Assuming the picture is sent as form-data with key 'picture'
    picture = request.files['picture']

    # hugging_face api endpoint
    hugging_face_api_endpoint = 'https://huggingface.co/spaces/lykeven/CogVLM/resolve/main/'

    # Prepare the data to send to the Hugging Face API
    data = {'question': 'what ingredients are in this image'}
    files = {'file': picture}

    # Send a POST request to the Hugging Face API
    response = requests.post(hugging_face_api_endpoint, data=data, files=files)

    # Process the response from Hugging Face API to extract identified ingredients
    result = response.json()

    # Extract ingredients from the response text
    ingredient_list = extract_ingredients_from_text(result.get('answer', ''))

    return jsonify({'identified_ingredients': ingredient_list})

# Assuming the CSV file has a structure like:
# Recipe,Ingredient1,Ingredient2,Ingredient3
# Recipe1,IngredientA,IngredientB,IngredientC
# Recipe2,IngredientA,IngredientD,IngredientE
# ...

def find_highest_matching_recipe(ingredients_list, csv_content):
    # Convert CSV content to a dictionary
    csv_reader = csv.DictReader(StringIO(csv_content))
    
    highest_matching_recipe = None
    highest_matching_percentage = 0

    # Iterate through each row (recipe) in the CSV
    for row in csv_reader:
        recipe_name = row.get('Recipe', '')
        recipe_ingredients = [ingredient.lower() for key, ingredient in row.items() if key != 'Recipe']

        # Calculate matching percentage
        matching_percentage = calculate_matching_percentage(ingredients_list, recipe_ingredients)

        # Update if the current recipe has a higher matching percentage
        if matching_percentage > highest_matching_percentage:
            highest_matching_recipe = {'name': recipe_name, 'matching_percentage': matching_percentage}
            highest_matching_percentage = matching_percentage

    return highest_matching_recipe

def calculate_matching_percentage(list1, list2):
    common_elements = set(list1) & set(list2)
    total_elements = len(set(list1 + list2))
    
    matching_percentage = len(common_elements) / total_elements * 100 if total_elements > 0 else 0
    
    return matching_percentage

# Endpoint for handling CSV of ingredients and finding the highest matching recipe
@app.route('/get_recipe', methods=['POST'])
def get_recipe():
    # Assuming ingredients are sent as a CSV file with key 'ingredients'
    recipe_csv = request.files['recipes']
    
    # Assuming ingredients_list is sent as a CSV file with key 'ingredients_list'
    ingredients_list_csv = request.files['ingredients_list']

    # Parse CSV content
    recipe_data = recipe_csv.read().decode('utf-8')
    ingredients_list_data = ingredients_list_csv.read().decode('utf-8')

    # Convert ingredients_list CSV content to a list
    ingredients_list = [ingredient.strip().lower() for ingredient in ingredients_list_data.split(',')]

    # Your logic to find the recipe with the highest matching percentage
    highest_matching_recipe = find_highest_matching_recipe(ingredients_list, recipe_data)

    return jsonify({'recipe': highest_matching_recipe})

# Example usage:
# curl -X POST -F "ingredients=@path/to/ingredients.csv" http://127.0.0.1:5000/get_recipe

if __name__ == '__main__':
    app.run(debug=True)