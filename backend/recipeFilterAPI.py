from flask import Flask, request, jsonify
import requests
import csv
from io import StringIO
import spacy
from gradio_client import Client
from PIL import Image
from langchain.schema.messages import HumanMessage
from langchain.chat_models import ChatOpenAI
import base64

from dotenv import load_dotenv
load_dotenv(override=True)

INGREDIENTS = [
    ["Cucumber", "🥒",
     "Pasta", "🍝",
     "Canned olives", "🫒",
     "Bell peppers", "🫑",
     "Tomatoes", "🍅",
     "Tomato sauce", "🍅",
     "Olive oil", "🫒",
     "Garlic", "🧄",
     "Salt", "🧂",
     "Pepper", "🧂",
     "Chicken", "🍗",
     "Chicken broth", "🍗",
     "Cumin", "🧂",
     "Lentils", "🫐",
        "Onions", "🧅",
        "Eggs", "🥚",
        "Flour", "🌾",
        "Sugar", "🧂",
        "Milk", "🥛",
        "Baking powder", "🧂",
        "Butter", "🧈",
        "Cinnamon", "🧂",
        "Oats", "🌾",
        "Apple sauce", "🍎",
        "Chocolate chips", "🍫",
        "Dried herbs", "🌿",
        "Rice", "🍚",
        "Canned beans", "🫐",
        "Salmon", "🐟",
        "Honey", "🍯",
        "Soy sauce", "🧂",
        "Balsamic vinegar", "🧂",
        "Peanut butter", "🥜",
        "Jelly", "🍇",
        "Bananas", "🍌",
        "Bread", "🍞",
        "Mustard", "🧂",
        "Mayonnaise", "🧂",
        "Ketchup", "🧂",
        "Pickles", "🧂",
        "Cheese", "🧀",
        "Potatoes", "🥔",
        "Coffee", "☕",
        "Steak", "🥩",
        "Pork", "🥩",
        "Bacon", "🥓",
        "Sausage", "🥓",
        "Crackers", "🧂",
        "Coffee", "☕",
        "Tea", "🍵",
        "Tofu", "🥬",
        "Cereal", "🌾",
        "Yogurt", "🥛",
        "Sweet potatoes", "🥔",
     ]
]

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
    # conver the picture to base64
    picture = request.files['picture']
    picture = picture.read()
    picture = base64.b64encode(picture)
    picture = picture.decode('utf-8')

    def image_summarize(img_base64, prompt):
        """Get the list of ingredients in the image."""
        chat = ChatOpenAI(model="gpt-4-vision-preview", max_tokens=1024)

        msg = chat.invoke(
            [
                HumanMessage(
                    content=[
                        {"type": "text", "text": prompt},
                        {
                            "type": "image_url",
                            "image_url": {"url": f"data:image/jpeg;base64,{img_base64}"},
                        },
                    ]
                )
            ]
        )
        return msg.content

 # Prompt
    prompt = f"""# SnapChef
Output an array containing a list of the unique ingredients in this picture. For example, a valid output would be ["Orange", "Apple"].
 You are allowed to choose from the following list of ingredients: {INGREDIENTS}.
 """

    # Process the image with OpenAI's API
    response = image_summarize(picture, prompt)
    return response

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