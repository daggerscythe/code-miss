import openai
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
app = FastAPI()
client = openai.Client(base_url="http://172.30.80.17:50001/v1",api_key="KqV9ZvFghHnafzvMM7Gr18cnCHT0kPoo")
model_name = client.models.list().data[0].id
@app.post("/llm_input/{name}/{message}")
def test(name,message):
    testing_output = client.chat.completions.create(
    model = model_name,
    messages = [
        {
            "role" :'user',
            "content": f"""{message}"""
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
    return f"""
    <html>
    <h1>{name}</h1>
    <p>{message}</p>
    </html>
    """
    

