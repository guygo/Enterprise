
function JsonParser(jsondata) {
    this.json =  jsondata;
  }
//input list of keys. use for validate json  
JsonParser.prototype.getValues=function(keys){
    if(!Array.isArray(keys))
    {
        return [];
    }
    
    var values=[];
    for(var i=0;i<keys.length;i++)
    {
        if(this.json[keys[i]==undefined ||this.json[keys[i]]==''])
        {
            return [];
        }
        values.push(this.json[keys[i]]);
    }
    
    return values;
}
module.exports = JsonParser;