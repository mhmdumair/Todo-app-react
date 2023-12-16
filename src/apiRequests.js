const apiRequests=async (url='',optionsObj=null,errMsg=null)=>{

    try{
        const response = await fetch(url,optionsObj)
        if(!response.ok){
            throw Error("Please reload the app")
        }
        console.log(response)
    }
    catch(err){
        errMsg=err.message
    }finally{
        return errMsg
    }
}

export default apiRequests