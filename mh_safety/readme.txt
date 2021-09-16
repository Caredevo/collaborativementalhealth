Backend Guidelines
docker build -t caredevo/mentalhealth .
docker run -p 3030:5030 -d --rm --name mentalhealth caredevo/mentalhealth

To create new model : 
1. Add model file in models folder. Format [model name].model.js
2. Add Routes and routes folder. Format [model name].js. Use boilerplate, change fields on section A, B, C
3. Add routes in server.js files. 
   example with todo model   
   const todoRouter = require('./routes/todo');
   app.use('/todo', todoRouter);
   
4. Add API in Postman : GET and POST API
5. Add sync Function in uploads folder
6. Add funciton in localData.js


Node Port List : 
5000 : Biodata
5010 : Summary
5020 : Chronic diseaes
5030 : Mental Health
5040 : Pain
5050 : Health Assessment
5060 : Substance use
5070 : Skin cancer
5080 : Palliative

ClusterIP for Mental Health : 
5031 : event-bus
5032 : database
5033 : client
5034 :