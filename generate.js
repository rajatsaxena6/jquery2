module.exports=function(){
var faker = require("faker");
var _ = require("lodash");

return{
people: _.times(40000, function(n) {
return{
id: n,
name: faker.name.findName(),

email: faker.internet.email(),
phonenumber: faker.phone.phoneNumber(),

accountname: faker.finance.accountName()


}
})
}
}
