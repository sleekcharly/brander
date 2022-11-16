from fastapi import FastAPI, HTTPException
# Import brander app
from brander import generate_branding_snippet, generate_keywords
# Import Mangum
from mangum import Mangum
# import cors middleware from fastapi
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# handle function for lambda it invoke
handler = Mangum(app)

# Max input length
MAX_INPUT_LENGTH = 32

# apply middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Generate the branding snippet
@app.get("/generate_snippet")
async def generate_snippet_api(prompt: str):
    validate_input_length(prompt)
    # get branded snippet
    snippet = generate_branding_snippet(prompt)
    return {"snippet": snippet, "keywords": []}

#  Generate the keyword
@app.get("/generate_keywords")
async def generate_keywords_api(prompt: str):
    validate_input_length(prompt)
    # get branded snippet
    keywords = generate_keywords(prompt)
    return {"snippet": None, "keywords": keywords}

# Generate both snippets and keywords
@app.get("/generate_snippet_and_keywords")
async def generate_keywords_api(prompt: str):
    validate_input_length(prompt)
    snippet = generate_branding_snippet(prompt)
    keywords = generate_keywords(prompt)
    return {"snippet": snippet, "keywords": keywords}

# validate user input
def validate_input_length(prompt: str):
    if len(prompt) >= MAX_INPUT_LENGTH:
        raise HTTPException(
            status_code=400, 
            detail=f"Input length is too long. Must be under {MAX_INPUT_LENGTH} characters."
        )
 