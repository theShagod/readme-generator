const inquirer = require('inquirer')
const process = require('process')
const fs = require("fs");

var c = false;
var questions = [
    {name:"project-title",message: "Define project title: "},
    {name:"project-desc",message: "Write a short project description: "},
    {name:"motivation",message: "What inspired you to make this project? "},
    {name:"tech",message: "What technologies did you use? "},
    {name:"features",message: "What are the features? What makes your project stand out? "},
    {name:"install",message: "How do I install this project? "},
    {name:"usage",message: "How do I use this project?  "},
    {name:"credits",message: "Resources that helped you make this?  "},
    {name:"license",message: "What is the license for this project?  "},
];
var newApp = "";
process.argv.forEach((val)=>{
    console.log(val)
    if (val === "create-default" || val === "c"){
        c = true;
    }
})
/*
//create a copy of app.js
function name(questions){
    //loop through questions
        //if answer for a question is not blank
            //then add to answers[questionNameHere]
            //delete from questions
        // 
    write a file that has has this parameters
}
*/
function open(callback){
    fs.open("./app.js", "r", (err, fd) => {
        if (err) console.error(err);
        let buf = Buffer.alloc(100000);
        fs.read(fd, buf, 0, buf.length, 0, (err, bytesRead, buf) => {
            if (err) console.error(err);
            console.log(`Your file is ${bytesRead} bytes.`)
            newApp = buf.toString();
            callback(myApp)
            fs.close(fd, err => {if (err) console.error(err);});
        });
    });
}

const askQuestions = inquirer.prompt(questions);

askQuestions.then(answers => {
    console.log("working...")
    if (answers["license"] == 'MIT' || answers["license"]=='mit'){
        answers["license"] = "Copyright JonInc\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the \"Software\"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE."
    }
    return `# ${answers["project-title"]}
${answers["project-desc"]}
## Motivation
${answers["motivation"]}
## Technologies Used
${answers["tech"]}
## Features
${answers["features"]}
## Install
${answers["install"]}
## Usage
${answers["usage"]}
## Credits
${answers["credits"]}
## License
${answers["license"]}`;
    })
    .then(write)
    .catch(err =>{
        console.log(err)
    })

//incomplete
function creatingDefaults () {
    
    askQuestions.then(answers => {
        console.log("Going through creating defaults")
        console.log(questions.length)
        for (let i = questions.length-1; i >= 0; i--){
            let answer = questions[i].name;
            if (!answer){
                //need to delete the line of code of the cooresponding question
                //need to create a new variable in file also...
            }
        }
    })
}



function write(fileContent){
    fs.writeFile("README.md", fileContent, err => {
        if (err) console.log(err);
    });
}


