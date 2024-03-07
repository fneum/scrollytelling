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

    url = "https://raw.githubusercontent.com/PyPSA/powerplantmatching/master/powerplants.csv"
    df = pd.read_csv(url, index_col=0)
    fig = px.scatter_mapbox(
        df,
        lat="lat",
        lon="lon",
        mapbox_style="carto-positron",
        color="DateIn",
        size="Capacity",
        height=900,
        range_color=(1900, 2022),
    )
    mapJSON = json.dumps(fig, cls=plotly.utils.PlotlyJSONEncoder)

    return render_template('index.html', graphJSON=graphJSON)

if __name__ == '__main__':
    app.run(debug=True)
