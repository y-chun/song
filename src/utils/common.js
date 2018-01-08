export function messageInfo(message,type){
    console.log(this)
    this.$message({
        message:message,
        type: type
      });
    
}