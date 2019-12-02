from __future__ import print_function  # In python 2.
from random import shuffle
import pandas as pd
import random
users =pd.read_csv('user_based_approach.csv', encoding ='utf-8')

a = ["Autism Spectrum","Blind or Low Vision","Deaf or Hard of Hearing","Physical Disability","Diabatics Disability","Vision Loss"]
shuffle(a)
i = 0
#print(users)
disability=[]
for i in range(0,10000):
    num = random.choice(a)
    disability.append(num)
    

users['disability'] = disability
users.to_csv('user1.csv')
