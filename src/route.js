App.get('/products', (req, res) => {
    const products =[
        { id: 1, name: 'Laptop', price: 999.99 },
        { id: 2, name: 'Smartphone', price: 499.99 },
        { id: 3, name: 'Tablet', price: 299.99 }
    ]
    res.json(products)
}
)
App.get('/users/:id',(req,res)=>{
    const products = parseInt(req.params.id)
})

App.get('/users/:Id',(req,res)=>{
    const prodId = parseInt(req.params.Id)
    const getsingleprod = products.find(p=>p.id === prodId)
    if(getsingleprod){
        res.json(getsingleprod)
    }else{
        res.status(404).json({message:'Product not found'})
    }
})
    const middleware = (req,res,next)=>{
        console.log(this is blaa)
        next()
    }

    App.use(middleware)

    //now middleware will be executed for all routes below it

    App.get('/',(req,res)=>{
        res.send('Hello World')
    })
    App.get('/about',(req,res)=>{
        res.send('About World')
    })

    App.listen(3000,()=>{
        
    })


    const reqtimeStamPLogger = (req,res,next)=>{
        const timestamp = new Date().to ISOString()
        console.log(`${timestamp} from ${req.method} to ${req.url}`)
    }

    // npm init -y will create a package.json file with default values

    app.put('/prd/:id',(req,res)=>{
        const crb = req.params.id
        const book = books.find(b=>b.id === crb)

        

        if(book){
            book.title = req.body.title //have to update the title in the body
            res.status(200).json({
                data:book,
                message:'Book updated'
            })
        }
    })


    //at first config/cloudinary.js
    const cloudinary = require('cloudinary').v2
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET
    })
    module.exports = cloudinary

    //then in helper/cloudinaryHelper.js

    const uploadToCloudinary = async (filePath)=>{
        try{
            const result = await cloudinary.uploader.upload(filPath)

            return{
                url: result.secure_url,
                public_id: result.public_id
            }
        }


    }
    module.exports = uploadToCloudinary
    
    //then in controller/imageController.js
    const uploadToCloudinary = require('../helper/cloudinaryHelper')

    const uploadImage = async (req,res)=>{
        try{
            if(!req.file){
                return res.status(400).json({message:'No file uploaded'})
            }

            const {url,public_id} = await uploadToCloudinary(req.file.path)

            const newlyUploadedImage = new Image{
                url,
                public_id,
                uploadedby:req.userInfo.userId //from auth middleware where we we wrote userId in jwt.sign

            }

            await newlyUploadedImage.save()

            fs.unlinkSync(req.file.path) //to remove file from local storage after uploading to cloudinary

            res.status(200).json({
                message:'Image uploaded successfully',
                data: result
            })
        }catch(error){
            res.status(500).json({message:'Server error', error:error.message})
        }
    }
    module.exports = {uploadImage}


    //each subsequent middleware is able to access data from the previous middleware by attaching properties to the req object. This allows for a seamless flow of data and functionality through the middleware stack.
    //in upload-middleware.js

    
    const multer = require('multer')
    const path = require('path')

    const storage = multer.diskStorage({
        destination: (req,file,cb)=>{
            cb(null,'uploads/')
        },
        filename: (req,file,cb)=>{
            cb(null,file.fieldname+'-'+Date.now() + path.extname(file.originalname))
        }
    })

    const checkFileType = (req,file,cb)=>{
        if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null,true)
    }else{
        cb(new Error('Only jpeg and png files are allowed'))
    }
}

module.exports = multer({
    storage: storage,
    limits:{fileSize: 1024*1024*5}, //5MB limit
    fileFilter: checkFileType
})

 //then in route.js
const upload = require('./upload-middleware')
const {uploadImage} = require('./controller/imageController')
const { listenerCount } = require('process')
app.post('/upload', authMiddleware, upload.single('image'), uploadImage)

//pagination
const page = parseInt(req.query.page) || 1 //default to page 1 if not provided
const limit = parseInt(req.query.limit) || 10 //default to 10 items per page if not provided
const skip = (page - 1) * limit //calculate the number of items to skip

const sortBy = req.query.sortBy || 'createdAt' //default to sorting by createdAt if not provided
const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1 //default to ascending order if not provided
const totalImages = await Image.countDocuments() //get the total number of images
const totalPages = Math.ceil(totalImages / limit) //calculate the total number of pages

const sortObj = {}
sortObj[sortBy] = sortOrder
const images = await Image.find().sort(sortObj).skip(skip).limit(limit) //fetch images with pagination and sorting


//working with socket
<div class="user-list"> 
<ul id="users"></ul>
</div>
<div class="chat"></div>
     <form id = 'message-form'>
        <input type="text" id="message-input" placeholder="Type your message..." autocomplete="off" required />
        <button type="submit">Send</button>
     </form>
     <script src="/socket.io/socket.io.js"></script>
     <script >
        const socket = io()

        const chat = document.querySelector('.chat')
        const usersList = document.getElementById('users')
        const messageForm = document.getElementById('message-form')
        const messageInput = document.getElementById('message-input')

        const userName = prompt('Enter your name:')
        socket.emit('join', userName)

        socket.on('user-joined', (bro) => {
            addMessage(`${bro} joined the chat`)
        })

        socket.on('user-list', (users) => {
            usersList.innerHTML = users.map(user => `<li>${user}</li>`).join('')
        })

        //Listen for chat messages from server
        socket.on('chat-message', (data) => {
            addMessage(`${data.userName}: ${data.message}`)
        })

        //handle form submission
        messageForm.addEventListener('submit', (e) => {
            e.preventDefault()
            const message = messageInput.value
            addMessage(`You: ${message}`)
            socket.emit('chat-message', { userName, message })
            messageInput.value = ''
        })

        fucntion addMessage(input){
            const messageElement = document.createElement('div')
            messageElement.innerText = input
            chat.appendChild(messageElement)

            //scroll to the bottom
            chat.scrollTop = chat.scrollHeight
        }


     </script>


//in server.js

const http = require('http')
const express = require('express')
const socketIo = require('socket.io')

const app = express()

const server = http.createServer(app)

const io = socketIo(server)

app.use(express.static('public'))

const users = new Set()

io.on("connection", (socket) => {
    console.log('A user is now connected')

    //handle users when they will join the chat


    socket.on('join', (userName) => {
        users.add(userName)
        io.emit('user-joined', userName))

        io.emit('user-list', Array.from(users))
        console.log(`${userName} joined the chat`)
    })


    //handle incoming chat message

    socket.on('chat-message', (data) => {
        io.emit('chat-message', data) //broadcast message to all connected clients
    })



    //handle user disconnection
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})





