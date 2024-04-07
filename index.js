import express from "express";
const app = express();
const PORT = process.env.PORT || 8080;


app.get("/",(req,res) => {
    res.send({'hi':'I am Abhishek Verma'});
});

app.listen(PORT,()=>{
    console.log(`App is listening on port:${PORT}`);
})