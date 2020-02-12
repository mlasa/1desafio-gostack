const express = require ('express')
const app = express()
app.use(express.json())



const myProjects = []
let count = 0

const reqCounter  = (req,res,next)=>{
	count++
	console.log("Number of requests",count)
	return next()
}

const projectExists = (req,res,next)=>{
	const {id} = req.params
	
	if(findProject(myProjects,id)){
		return next()
	}
	return res.status(400).json({ error: "Project doesn't exists" })
}
// app.use(projectExists)//Middleware projectExists runs for each middleware
app.use(reqCounter)

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

app.put("/projects/:id",projectExists,(req,res)=>{
	const {title} = req.body
	const {id} = req.params

	const found = findProject(myProjects,id)
	found.title  = title
	 
	return res.status(200).json(found)
})

app.delete("/projects/:id",projectExists,(req,res)=>{
	const {id} = req.params

	const found = myProjects.findIndex(elem => elem.id === id);
	myProjects.splice(found, 1);
	return res.status(200).json(myProjects)
})

app.post("/projects/:id/tasks",projectExists,(req,res)=>{
	const {title} = req.body
	const {id} = req.params
	const found = findProject(myProjects,id)

	found.tasks.push(title)
	return res.status(200).json(myProjects)
})

const findProject = (arr,id)=>{	
	return arr.find(elem => elem.id == id)
}

app.listen(8081,()=>{
	console.log("linstening to 8081 port")
})
