import os
from typing import List
import openai
# import argparse for command line options, arguments and subcommands
import argparse
# import regex
import re

# Max input length
MAX_INPUT_LENGTH = 32

# entry point for application
def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", "-i", type=str, required=True)
    args = parser.parse_args()
    user_input= args.input

    print(f"User input: {user_input}")
    
    if validate_length(user_input):
    
        # branding snippet
        generate_branding_snippet(user_input)
        
        # keywords
        generate_keywords(user_input)
        
    else:
        raise ValueError(f"Input length is too long. Must be under {MAX_INPUT_LENGTH}. Submitted input is {user_input}")

# Validate the length of prompt for sanity in our application
def validate_length(prompt: str) -> bool:
    return len(prompt) <= 12

def generate_keywords(prompt: str) -> List[str]:
    # Load your API key from an environment variable or secret management service
    openai.api_key = os.getenv("OPENAI_API_KEY")
    
    # Variable for prompts
    enriched_prompt = f"Generate related keywords for {prompt}:"
    print(enriched_prompt)

    response = openai.Completion.create(model="text-davinci-002", prompt=enriched_prompt, temperature=0, max_tokens=32)

    # extract words
    keywords_text: str = response["choices"][0]["text"]
    
    # strip whitespace
    keywords_text = keywords_text.strip()
    
    # split string by the occurrences of the following pattern
    keywords_array = re.split(",|\n|:|-", keywords_text)
    # list comprehensions to eliminate whitespaces and empty string
    keywords_array = [k.lower().strip() for k in keywords_array]
    keywords_array = [k for k in keywords_array if len(k) > 0]
    
    print(f"Keywords: {keywords_array}")
    
    return keywords_array

# Generate branding snippet
def generate_branding_snippet(prompt: str):
    # Load your API key from an environment variable or secret management service
    openai.api_key = os.getenv("OPENAI_API_KEY")
    
    # Variable for prompts
    enriched_prompt = f"Generate upbeat branding snippet for {prompt}:"
    print(enriched_prompt)

    response = openai.Completion.create(model="text-davinci-002", prompt=enriched_prompt, temperature=0, max_tokens=32)

    # extract text 
    branding_text: str = response["choices"][0]["text"]
    
    # strip whitespace
    branding_text = branding_text.strip()
    
    last_char = branding_text[-1]
    
    # Add "..." totruncate statement
    if last_char not in {".", "!", "?"}:
        branding_text += "..."
        
    print(f"Snippet: {branding_text}")
    
    return branding_text

if __name__ == "__main__":
    main()