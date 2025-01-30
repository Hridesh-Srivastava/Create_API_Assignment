import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// data stored here in memory
const posts = [
    {
        id: 1,
        title: "The Rise of Decentralized Finance",
        content:
          "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
        author: "Alex Thompson",
        date: "2023-08-01T10:00:00Z",
      },
      {
        id: 2,
        title: "The Impact of Artificial Intelligence on Modern Businesses",
        content:
          "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
        author: "Mia Williams",
        date: "2023-08-05T14:30:00Z",
      },
      {
        id: 3,
        title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
        content:
          "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
        author: "Samuel Green",
        date: "2023-08-10T09:15:00Z",
      },
];

let lastId = 3;

//get all posts
app.get("/posts" , (req , res) => {
    res.json(posts);
});

//get post by specific id
app.get("/posts/:id" , (req , res) => {
    const post = posts.find((po) => {
        return po.id === parseInt(req.params.id);
    });
    if(!post){
       return res.status(404).json({
            message : "Post not found."
        });
    }
    res.status(201).json(post);
});

//create a new post
app.post("/posts" , (req , res) => {
    newId = lastId += 1;
    const post = {
        id : newId,
        title : req.body.title,
        content : req.body.content,
        author : req.body.author,
        date : new Date()
    };
    lastId = newId;
    posts.push(post);
    res.status(200).json({
        message : "Post created successfully."
    });
});

//using patch route update a specific post
app.patch("/posts/:id" , (req , res) => {
    const post = posts.find((po) => {
        return po.id === parseInt(req.params.id);
    });
    if(!post){
        return res.status(404).json({
            message : "Post not found"
        });
    }
    if(req.body.title){
        return post.title = req.body.title;
    }
    if(req.body.content){
        return post.content = req.body.content;
    }
    if(req.body.title){
        return post.author = req.body.author;
    }
    res.status(201).json(post);
});

//delete a specific post
app.delete("/posts/:id" , (req , res) => {
    const index = posts.findIndex((po) => {
        return po.id === parseInt(req.params.id);
    });
    if(index===-1){
        return res.status(500).json("Unable to delete post!");
    }
    posts.splice(index , 1);
    res.status(201).json("Post deleted successfully.");
});

app.listen(port , () => {
    console.log(`Listening on port ${port}`);
});

export default app;