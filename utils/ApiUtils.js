class ApiUtils{
    constructor(apicontext,payloaddata){
        this.apicontext=apicontext;
        this.payloaddata=payloaddata;

    }

    async  token(){
   const response= await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{data:this.payloaddata})
   const repsonejson=await response.json()
  const tokent=repsonejson.token
 const  userId= repsonejson.userId
   console.log("token:",tokent)
   return [tokent,userId]
    }

    async createorder(orderplayload){
         const orderresponse=await  this.apicontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
            data:orderplayload,
            headers:{
                'authorization':(await this.token()).at(0),
                'content-type':'application/json'
            },
        })
   console.log("STATUS:", orderresponse.status());

    const responsejsondata = await orderresponse.json();

    console.log(responsejsondata);

    const orderid = responsejsondata.orders[0];

    console.log("ORDER ID:", orderid);
    return orderid;
    }

}
module.exports={ApiUtils};