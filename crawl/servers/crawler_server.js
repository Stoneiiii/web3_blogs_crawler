const { protocol_main,ethereum_main,coinbase_main } = require('../main');

const Seneca=require('seneca-await');
const seneca = Seneca();
seneca
  .listen({port: 7788, pin: {role: 'protocol'}})
  .ready(function(){
    console.log("微服务启动")
  });
 
seneca.add({
role:"protocol",      
cmd:"crawler_server",
   },async function(msg) {
    protocol_main();
    return  {res:"protocol is running"};
})

seneca.add({
  role: "ethereum",
  cmd:"crawler_server",
},async function(msg) {
  ethereum_main();
 return  {res:"ethereum is running"};
})

seneca.add({
  role: "coinbase",
  cmd:"crawler_server",
},async function(msg) {
  coinbase_main();
 return  {res:"coinbase is running"};
})