
const canvas=document.querySelector("#canvas")
const context=canvas.getContext("2d")
const frames={
    currentIndex:0,
    maxIndex:1345,
}
let imageLoaded=0;
const images=[];

function preloadImages(){
    for (var i=1;i<=frames.maxIndex;i++){
        const imageUrl= `./images/frame_${i.toString().padStart(4,"0")}.png`
       const img=new Image();
       img.src=imageUrl
       img.onload=()=>{
        imageLoaded++;
        if(imageLoaded===frames.maxIndex){
            loadImage(frames.currentIndex);
            startAnimation()
        }

       }
      images.push(img)

    }

}
function loadImage(index){
    if (index>=0 && index<=frames.maxIndex){
        const img= images[index];
        canvas.width=window.innerWidth;
        canvas.height=window.innerHeight;
        const scaleX=canvas.width/img.width;
        const scaleY=canvas.height/img.height;
        const scale=Math.max(scaleX,scaleY);
        const newWidth=img.width*scale
        const newHeight=img.height*scale
        const offsetX=(canvas.width-newWidth)/2
        const offsetY=(canvas.height-newHeight)/2
        context.clearRect(0,0,canvas.width,canvas.height)
        context.imageSmoothingEnabled=true;
        context.imageSmoothingQuality="high"
        context.drawImage(img,offsetX,offsetY,newWidth,newHeight);
        frames.currentIndex-index



    }
}
function startAnimation(){
    var tl=gsap.timeline({
        scrollTrigger:{
            trigger:".parent",
            start:"top top",
            end:"bottom bottom",
            scrub:2,
        }
    });
    function updateFrame(index){
        return {
            currentIndex:index,
            ease:"linear",
            onUpdate:function(){
                loadImage(Math.floor(frames.currentIndex))
            }
        }
    }

    
    tl
    .to(frames,updateFrame(100),"a")
    .to(".animate1",{opacity:0,ease:"linear"},"a")


    .to(frames,updateFrame(200),"b")
    .to(".animate2",{opacity:1,ease:"linear"},"b")
        

}
window.addEventListener("resize",function(){
    loadImage(Math.floor(frames.currentIndex))
})

preloadImages()
