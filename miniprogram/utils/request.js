const util = require('./util');
const projectDetail=(id,that)=>{
  util.requests('/project/'+id).then(res=>{
    if(res.data.code==0){
      let json=res.data.data
      json.logo=res.data.data.name.slice(0,1)
      that.setData({
        item:json
      })
    }
  })
}
module.exports = {
  projectDetail:projectDetail
}