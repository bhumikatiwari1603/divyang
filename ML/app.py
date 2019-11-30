from __future__ import print_function  # In python 2.
import pandas as pd
from flask import Flask, request, g, redirect, url_for, render_template,jsonify
from joblib import load

cosine_sim = load('model_clf.joblib') 
user_based_approach =pd.read_csv('user_based_approach.csv', encoding ='utf-8')
apps =pd.read_csv('application.csv', encoding ='utf-8')
jobs =pd.read_csv('jobs.csv', encoding ='utf-8')
user_based_approach = user_based_approach.reset_index()
app = Flask(__name__)   # create the application instance
print("In app")
 
@app.route('/index', methods=['POST'])
def login():
    print(request.form)
    userid = request.form['userid']
    id_user =int(userid)
    df = get_job_id(getrecommendations(id_user))
    
    return df.to_dict(orient='index')
    #print(df.head())

def getrecommendations(userid):
    sim_scores = list(enumerate(cosine_sim[userid]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    user_indices = [i[0] for i in sim_scores]
    #print(user_indices)
    return user_indices[0:20]
    
def get_job_id(usrid_list):
    jobs_userwise = apps.loc[apps['UserID'].isin(usrid_list)]
    a = jobs.loc[jobs['JobID'].isin(jobs_userwise['JobID'])]
   
    return a

if __name__ == '__main__':
    app.run(debug=True)
