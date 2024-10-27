const Seneca=require('seneca-await');
const seneca=Seneca();
seneca.client({port:7788,host:"localhost",pin:{role:'ethereum'}})   
 
const response= seneca.act({
     role:"ethereum",
     cmd:"crawler_server"
}); 
response.then(function(a){  
    console.log(a)
})