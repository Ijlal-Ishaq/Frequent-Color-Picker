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
            temp = temp.r+","+temp.g+","+temp.b+","+temp.a;
            
            if(colors[temp] == undefined){
                colors[temp] = 0;
            }else{
                colors[temp]++;
            }
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
    let color = await getMostFrequentColor("https://s2.coinmarketcap.com/static/img/coins/200x200/825.png");
    console.log(color);
}    

main();