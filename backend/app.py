import os
from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
import pandas as pd
import pickle
app = Flask(__name__)
CORS(app)

@app.route('/movies')
def movies():
    try:
        base_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(base_dir, 'movies.csv')
        movies = pd.read_csv(file_path)
        movies_subset = movies[['id', 'title']]
        movies_json = movies_subset.to_json(orient='records')
        return app.response_class(response=movies_json, mimetype='application/json')
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/recommend/<string:movie>')
def recommend(movie):
    
    try:
        base_dir = os.path.dirname(os.path.abspath(__file__))
    
        # movie = request.args.get('movie_name').capitalize()
        movies_path = os.path.join(base_dir, 'movies.csv')
        movies = pd.read_csv(movies_path)

        movie_row = movies[movies['title'] == movie]
        if movie_row.size == 0:
            return jsonify({'message': 'Movie not found!'}), 404
        
        idx = movie_row.index[0]
        sim_path = os.path.join(base_dir, 'similarity.pkl')
        similarity_measures = pickle.load(open(sim_path, 'rb'))
        rec_idx = sorted(enumerate(similarity_measures[idx]), reverse=True, key=lambda x: x[1])[:20]

        recommendations = []
        for i in rec_idx:
            id = int(movies.loc[i[0]]['id'])
            title = movies.loc[i[0]]['title']
            recommendations.append({"id": id, "title": title})
    
        return jsonify(recommendations)

    except KeyError as e:
        return jsonify({'error': f'KeyError: {str(e)}'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/movies/page/<string:movie_name>')
def movie(movie_name):
    return render_template('movie.html', movie=movie_name)


if __name__ == "__main__":
    app.run(debug=True)