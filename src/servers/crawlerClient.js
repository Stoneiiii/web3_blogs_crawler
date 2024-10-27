function crawler(whichblog) { 
    const Seneca=require('seneca-await');
    const seneca=Seneca();
    seneca.client({port:7788,host:"localhost",pin:{role:`${whichblog}`}})   
     
    const response= seneca.act({
         role:`${whichblog}`,
         cmd:"crawler_server",
         res:""
    }); 
    response.then(function(a){  
        console.log(a)
    })
}

module.exports = {
    crawler
}
