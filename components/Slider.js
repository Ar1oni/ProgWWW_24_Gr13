
export default function Slider(settings){
    let slides = settings.slides 
    let active_slide = settings.active_slide
    let delay = settings.delay  
    let container = settings.container

    setInterval(() => {
        if(active_slide +4> (slides.length - 1)) active_slide = 0;
        container.innerHTML =
         `
         <img class ="sliderImg" src="${slides[active_slide]}" alt="Slide" />
         <img class ="sliderImg" src="${slides[active_slide+1]}" alt="Slide" />
         <img class ="sliderImg" src="${slides[active_slide+2]}" alt="Slide" />
         <img class ="sliderImg" src="${slides[active_slide+3]}" alt="Slide" />
         <img class ="sliderImg" src="${slides[active_slide+4]}" alt="Slide" />
         `
        active_slide++;
    }, delay*1000)
}
