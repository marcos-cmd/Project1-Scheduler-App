const token = z0_8LZtVy6P7sLQ93VZrFQ;

function init(){
var body = {
    token: "z0_8LZtVy6P7sLQ93VZrFQ",
    data: {
      nameFirst: "nameFirst",
      nameLast: "nameLast",
      nameMiddle: "nameMiddle",
      name: "name",
      namePrefix: "namePrefix",
      nameSuffix: "nameSuffix"
      }};
   
  $.ajax({
    method: "GET",
    url: "https://app.fakejson.com/q",
    data: body
    }).done(function(msg) {
      console.log(msg);
  });
}
init();