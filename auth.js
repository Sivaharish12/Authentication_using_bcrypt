const express=require('express')
const app=express()
const bcrypt=require('bcrypt')

app.use(express.json());

const users=[];
app.get('/users',(req,res)=>{
    res.json(users)
})

app.post('/users',async(req,res)=>{
    try{
        const hashedpassword=await bcrypt.hash(req.body.password,10);
        const user={name:req.body.name,password:hashedpassword}
        users.push(user);
        res.status(200).send();
    }
    catch{
        res.status(500).send();
    }
});

app.post('/login',async(req,res)=>{
    const user=users.find(user=>user.name===req.body.name)
    if(user==null){
        res.status(500).send();
    }
    try{
        if(await bcrypt.compare(req.body.password,user.password)){
            res.send("sucess!");
        }
        else{
            res.send("The password does not match");
        }
    }
    catch{
        res.status(500).send()
    }
});

app.listen(5000);
