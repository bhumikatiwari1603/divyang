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
    userid = request.form['userid']
    id_user =int(userid)
    df = get_job_id(getrecommendations(id_user))
    print(df.head())

def getrecommendations(userid):
    sim_scores = list(enumerate(cosine_sim[userid]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    user_indices = [i[0] for i in sim_scores]
    return user_indices[0:20]
    
def get_job_id(usrid_list):
    jobs_userwise = apps['UserID'].isin(usrid_list) #
    df1 = pd.DataFrame(data = apps[jobs_userwise], columns=['JobID'])
    joblist = df1['JobID'].tolist()
    Job_list = jobs['JobID'].isin(joblist)
    df = pd.DataFrame(data = jobs[Job_list], columns=['JobID','Title','Description','City','State'])
    return df

if __name__ == '__main__':
    app.run(debug=True)
