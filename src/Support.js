import axios from 'axios';

export var Support = {
    
    isValidURL(str){
        var pattern = new RegExp('^((https?:)?\\/\\/)?'+ // protocol
            '(?:\\S+(?::\\S*)?@)?' + // authentication
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locater
        if (!pattern.test(str)) {
            return false;
        } else {
            return true;
        }
    },

    generateKey(){
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    },

    parseObjectFormFile(path){   
        var rootUrl =  window.location.protocol  +'//'+  window.location.hostname +(window.location.port ? ':'+ window.location.port: '');    
        return axios(rootUrl + '/' + path) // JSON File Path
        //return path;
    },

    temirnalNotices : [
        "Pass sai rồi, thử lại nhé! hihi",
        "Sai nữa rồi!!!",
        "Nhập lại lần nữa đi",
        "4 lần rồi đó ヽ(｀Д´)ﾉ",
        "hihi vui ghê",
        "(｡◕‿◕｡)",
        "✌♫♪˙❤‿❤˙♫♪✌",
        "Hello",
        "it's me",
        "I was wondering if after all these years you'd like to meet",
        "To go over everything",
        "They say that time's supposed to heal ya",
        "But I ain't done much healing",
        "Hello",
        "can you hear me???",
        "Hello from the other side",
        "щ（ﾟДﾟщ）",
        "≧◡≦ nhập tiếp đến khi thấy điều bất ngờ nhé",
    ],
    getParamFromURL(name){
        if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(window.location.search))
            return decodeURIComponent(name[1]);
    },

    isRequirePermissionLink(path, menu){       
        if(!path || !menu) {return false;}
        for(let i = 0; i < menu.length ; i++){
            if(menu[i].link == path){                
                if(menu[i].isPrivate) {                   
                    return true;
                }else{
                    return false;
                }             
            }
        }

        return false;
    }

}