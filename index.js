const express = require ('express')
const app = express()
app.use(express.json())



const myProjects = []

app.get('/', function (req, res) {
  return res.send(myProjects)
});
app.post('/projects', function(req, res) {
	const {id,title} = req.body
	const project = {
		id,
		title,
		tasks: []
	}	
	myProjects.push(project)

	return res.status(200).json(project)
});

app.put("/projects/:id",(req,res)=>{
	const {title} = req.body
	const {id} = req.params

	const found = myProjects.find(elem => elem.id == id)

	found.title  = title
	 
	return res.status(200).json(found)
})

app.delete("/projects/:id",(req,res)=>{
	const {id} = req.params

	const found = myProjects.findIndex(elem => elem.id === id);
	myProjects.splice(found, 1);
	return res.status(200).json(myProjects)
})

app.post("/projects/:id/tasks",(req,res)=>{
	const {title} = req.body
	const {id} = req.params

	console.log(title)
	const found = myProjects.find(elem => elem.id === id);

	found.tasks.push(title)
	return res.status(200).json(myProjects)
})



app.listen(8081,()=>{
	console.log("linstening to 8081 port")
})