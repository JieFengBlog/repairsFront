function r_get(method,url,data) {
    let _response = '' ;
    this.$axios({
        method:method,
        url:url,
        param:data
    }).then(response=>{
        _response = response.data;
    })

    return _response;
}

function r_post(url,data) {
    let _response = '' ;
    this.$axios({
        method:'post',
        url:url,
        data:data
    }).then(response=>{
        _response = response.data;
    })

    return _response;
}

export{
    r_get,
    r_post
}
