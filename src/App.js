import './App.scss';
import photos from './data';
import GridItem from './components/GridItem';
import { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import "locomotive-scroll/src/locomotive-scroll.scss";
import imagesLoaded from 'imagesloaded';

const clamp = ( value,min,max)=> 
value <= min ? min : value >= max ? max : value;



const preloadImages = (selector)=>{
  return new Promise((resolve)=> { 
    imagesLoaded(
      document.querySelectorAll(selector),
      {background:true},
      resolve
    )
  })
}


function App() {
  const ref = useRef(null);
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  const middleColumnRef = useRef(null);

  const scroll = useRef({
    cache:0,
    current:0

  })


  useEffect(()=>{
    const scrollElement = new LocomotiveScroll ({
      el:ref.current,
      smooth:true,
      smartphone:{ 
        smooth:true,
      },
      getDirection : true,
      getSpeed: true,
    });
    scrollElement.on("scroll",(obj)=> {
      scroll.current.current = obj.scroll.y;
      const distance = scroll.current.current - scroll.current.cache;
      scroll.current.cache = scroll.current.current;

      leftColumnRef.current.style.transform = `skewY(${clamp(distance,-10,10)}deg)`
      middleColumnRef.current.style.transform = `skewY(${clamp(-distance,-10,10)}deg)`
      rightColumnRef.current.style.transform = `skewY(${clamp(distance,-10,10)}deg)`
      
    })
    Promise.all([preloadImages(".grid-item-media")]).then(()=>{
      scrollElement.update();
    });

  },[]);

  const leftChunk = [...photos].splice(0,5);
  const middleChunk = [...photos].splice(5,5);
  const rightChunk = [...photos].splice(10,5);


  return (
    <div data-scroll-container ref={ref} className="main-container" id="main-container">
      <div className='grid-wrap'>
        <div ref={leftColumnRef} className='left-column'>
          {leftChunk.map(({url,description},index) => (
            <GridItem key={url} url={url} description={description} />
          ))}
        </div>
        <div data-scroll data-scroll-speed="-20" className='middle-column'>
          <div  ref={middleColumnRef}  >
          {middleChunk.map(({url,description},index) => (
            <GridItem key={url} url={url} description={description} />
            ))}
            </div>
        </div>
        <div ref={rightColumnRef} className='right-column'>
          {rightChunk.map(({url,description},index) => (
            <GridItem key={url} url={url} description={description} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
