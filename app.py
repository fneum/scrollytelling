import json
import plotly
import plotly.express as px
import pandas as pd
from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def home():
    df = px.data.iris()
    fig = px.scatter(df, x='sepal_width', y='sepal_length', color='species')
    graphJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)

    return render_template('index.html', graphJSON=graphJSON)

if __name__ == '__main__':
    app.run(debug=True)
