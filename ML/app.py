import pandas as pd
from flask import Flask, request, g, redirect, url_for, render_template,jsonify
from joblib import load

model_nn = load('model_nn.joblib') 
users =pd.read_csv('users.csv', encoding ='utf-8')
apps =pd.read_csv('application.csv', encoding ='utf-8')
jobs =pd.read_csv('jobs.csv', encoding ='utf-8')
users = users.reset_index()
userid = users['UserID']
indices_id = pd.Series(users.index, index=users['UserID'])
app = Flask(__name__)   # create the application instance
print("In app")
 
@app.route('/index', methods=['GET'])
def login():
    
    userid = request.args.get('user_id')
    id_user =int(userid)
    df = get_job_id(getrecommendations(id_user))

    return df.to_dict(orient='index')
    #print(df.head())

def getrecommendations(userid):
    idx = indices_id[userid]
    return model_nn[idx][1:]
    #print(user_indices)
    
def get_job_id(usrid_list):
    jobs_userwise = apps.loc[apps['UserID'].isin(usrid_list)]
    a = jobs.loc[jobs['JobID'].isin(jobs_userwise['JobID'])]
   
    return a

if __name__ == '__main__':
    app.run(debug=True)
