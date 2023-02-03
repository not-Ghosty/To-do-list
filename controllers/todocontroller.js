var data=[{item:"milk"},{item:"boss"},{item:"kitkat"}]
var bodyParser=require('body-parser')

var urlencoded=bodyParser.urlencoded({extended:false})
module.exports=(app)=>{
    app.get('/todo',(req,res)=>{
        res.render('todo',{td:data})
    })
    app.post('/todo',urlencoded,(req,res)=>{
        data.push(req.body)
        res.json(data)
    })
    app.delete('/todo/:item',(req,res)=>{
        data=data.filter((todo)=>{
            return todo.item.replace(/ /g, '-') !== req.params.item;
        })
        res.json(data);
    })
}