const express = require('express')
const app = express()
const userModel = require('./Models/user.js')
const conection = require('./Config/db.js')
var cors = require('cors');
app.use(cors())

app.get('/', (req,res) =>{
    userModel.find({}).then((users)=>{
        const apiKey = process.env
        console.log(apiKey)
        res.send(users)
    })
})


app.use(express.json())
app.use(express.urlencoded({extended : true}))


const findUserName = async (name , email)=>{
   let val = await userModel.find({
    username : name
    })
    console.log(val)
    if(val.length == 0){
        let val2 =  await userModel.find({
            email : email
            })
        if (val2.length == 0){
            return "false"
        }
        else {
            return "true"
        }
        
    }
    else{
        return "true"
    }
    
}

app.get(`/checkuserName`, async (req,res)=>{
    
   const {username} = req.query

       const checkName = await userModel.find({
        username : username
    })
    if (checkName.length == 0){
        return res.send("false")
    }
    else {
        return res.send("true")
    }


})


app.get(`/checkuseremail`, async (req,res)=>{
    
    const {email} = req.query
 
        const checkName = await userModel.find({
         email : email
     })
     if (checkName.length == 0){
         return res.send("false")
     }
     else {
         return res.send("true")
     }
 
 
 })
 


app.post('/adduser', async (req,res)=>{
    const {username,email,password,image} = req.body
    
    const namei = await findUserName(username, email)

    console.log(namei)


if (namei == "false"){
    console.log("object")
    await userModel.create({
        username : username,
        email : email,
        password: password,
        profile: image

    })
res.send("data Update")
}
else{
    console.log("rejects")
    res.status(403).end("userName all Ready Rejester");
}
    
})

app.get("/login", async (req,res)=>{
    const {login, password} = req.query
    const checkuserByemail = await userModel.find({
        email : login,
        password : password

    })
    console.log(checkuserByemail)

    if(checkuserByemail.length == 0){
        const checkuserByName = await userModel.find({
            username : login,
            password : password
        })
        console.log(checkuserByName)

        if(checkuserByName.length == 0){
            return res.send("false")
        }
        else{
               const userRes =  await userModel.findOneAndUpdate({
                    username : login,
            password : password
                },
                {
                    login : true
                })
                return res.send(userRes._id)
            }
    }
    else{
        return res.send("true")
    }
})

app.get("/Checklogin", async (req,res)=>{
    const {id} = req.query
    console.log(id)
if(id.length < 5 ){
    return res.send("false")
}
else{


     const check =await userModel.findById({
         _id : id
     })

 res.send(check.login)
    }
})

app.listen(5000)