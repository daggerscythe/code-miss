import openai
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"]
)
client = openai.Client(base_url="http://172.30.80.17:50001/v1",api_key="KqV9ZvFghHnafzvMM7Gr18cnCHT0kPoo")
model_name = client.models.list().data[0].id
@app.post("/llm_input/{name}/{message}")
def test(name,message):
    testing_output = client.chat.completions.create(
    model = model_name,
    messages = [
        {
            "role" :'user',
            "content": f"""
You are a college student named {name} and this is your personality: {message}. You are approached by a student
who is in the University of Mississippi's Coding Club and that student is trying to convince you to join the Coding Club as well.
Answer to the person according to your personality, meaning you can say no, you can hesitate, or you can outright agree
, it all depends on what your personality is. While answering, think about your motivations, long-term goals, and
personality. 1)You are limited to 2 sentence, short responses. You are DEADLY afraid of saying more 
than 2 sentences at a time because you feel like you will EXPLODE if you say anything more than 
2 sentences. 2) However, at the end of each 2 sentences, after you're done talking, say STRICTLY
a '1' or '0' based on whether you want to join or not - 1 being yes and 0 being no. You abide by those two
rules religiously and you never omit them.


"""
        }
    ],
    temperature = 0.6,
    top_p = .95,
    stream=True
)
    content = ""
    for i in testing_output:
        if not i.choices[0].delta.reasoning_content and not None:
            content += str(i.choices[0].delta.content)
    content = content.replace("None","")
    print(content)
    print(f"Name:{name}")
    print(f"message:{message}")
    print(f"LLM_Response:{content}")
    return {"llm_response":content}
    
    

