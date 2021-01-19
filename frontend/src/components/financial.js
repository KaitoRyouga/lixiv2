export default function financial(x) {

    x = String(x).split(".").join("");

    if(!Number(x)){
        return null
    }

    let arrR = []
    let arrR2 = []
    let xCut = ''
    let xCut2 = ''
    let xCut3 = ''

    let times =  Math.floor(String(x).length / 3)
    if(Number(times)*3 === String(x).length){
        xCut3 = String(x).slice(0, String(x).length - (Number(times)-1)*3)
    }else{
        xCut3 = String(x).slice(0, String(x).length - (Number(times))*3)
    }
    

    while(true){
        if(String(x).length > 3){
            xCut = String(x).slice(String(x).length - 3, String(x).length)
    
            xCut2 = String(x).slice(0, String(x).length-3)
    
            x = String(x).slice(0, String(x).length-3)
    
            arrR.push(xCut)
            arrR2.push(xCut2)
        }else{
            break
        }
    }

    arrR2 = arrR2.reverse()
    arrR = arrR.reverse()

    if(arrR.length >= arrR2.length){
        arrR.forEach(item => {
            xCut3 = xCut3 + '.' + item
        });
    }else{
        arrR2.forEach(item => {
            xCut3 = xCut3 + '.' + item
        });
    }

    return xCut3

  }  