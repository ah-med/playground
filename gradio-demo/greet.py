import gradio as gr

def greet(name, intensity):
    return "Hello, " + name + "!" * int(intensity)

demo = gr.Interface(
    fn=greet,
    inputs=["text", "slider"], # number of components should match the number of arguments in your function.
    outputs=["text"], # number of components should match the number of return values from your function.
)

demo.launch()
