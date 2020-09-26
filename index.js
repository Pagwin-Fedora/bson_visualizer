const bson = require('bson');
const fs = require('fs');
let file = "default.bson";
let base64 = false;
let outfile = process.stdout;
let flag = "";
for(let arg of process.argv){
	if(arg === "--base64"){
		base64 = true;
	}
	else if(arg[0] === "-"){
		flag = arg[1];	
	}
	else if(flag === "o"){
		outfile = arg;
		flag === "";
	}
	else{
		file = arg[0];
	}
}
fs.readFile(file,(err,data)=>{
	if(err) console.error(err);
	let intermediate = data;
	console.log(data);
	if(base64) intermediate = Buffer.from(data, 'base64');
	
	outfile.write(JSON.stringify(bson.deserialize(intermediate))+"\n");
});
