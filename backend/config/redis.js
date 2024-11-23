/*  const Redis=require("ioredis") 

async function connectRedis(){
    const redis=new Redis()
    redis.on("connect",()=>{
        console.log("Redis connected");
    })
    redis.on("error",(error)=>{
        console.log("Error in redis connection",error);
    })

    return redis
}
const redis=connectRedis()

module.exports=redis
 */