var Jimp = require("jimp");

async function getMostFrequentColor(imgUrl) {
    let temp;
    let colors = {};

    let image = await Jimp.read(imgUrl);

    let w = image.bitmap.width;
    let h = image.bitmap.height;
    let max = 0;
    let maxIndex = 0;

    for (let i = 0; i < w; i++) {
        for(let j = 0; j < h; j++){
            temp = Jimp.intToRGBA(image.getPixelColor(i, j));

            // if you want to consider white remove the !isWhite condition.
            if(temp.a > 0 && !isWhite(temp)){
                temp = temp.r+","+temp.g+","+temp.b+","+temp.a;

                if(colors[temp] == undefined){
                    colors[temp] = 0;
                }else{
                    colors[temp]++;
                }
            }
        }
    }

    function isWhite(color){
        if(color.r >= 240 && color.r <= 255 && color.g >= 240 && color.g <= 255 && color.b >= 240 && color.b <= 255){
            return true;
        }else{
            return false;
        }
    }
    
    Object.values(colors).forEach((e,i)=>{
        if(e > max){
            max = e;
            maxIndex = i;
        }
    })

    let finalColor = Object.keys(colors)[maxIndex].split(",");
    let colorString = `rgba(${finalColor[0]},${finalColor[1]},${finalColor[2]},${finalColor[3]})`;
    
    return colorString;
}

async function main(){
    let color = await getMostFrequentColor("https://s2.coinmarketcap.com/static/img/coins/200x200/4943.png");
    console.log(color);
}    

main();