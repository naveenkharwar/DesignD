let rid = null;
const spring = 0.09;
const friction = 0.8;
let divs = Array.from(document.querySelectorAll(".innerdiv"));

class Chart {
  constructor(path,text,target) {
    this.path = path;
    this.text = text;
    this.text.textContent = target+"%";
    this.R = 10;
    this.start = .01;
    this.divisions = 100;
    this.vel = 0;    
    this.stylePath(target)    
  }
  
  stylePath(target) {
    let d = `M${this.R},0  A${this.R},${this.R} 0 1,1 ${this.R},-.01z`;
    this.path.setAttributeNS(null,"d",d);
    this.pathLength = this.path.getTotalLength();
    this.unit = this.pathLength / this.divisions;
    this.strokeLength = this.start*this.unit;
    this.target = target*this.unit;
    this.path.style.strokeDasharray = `${this.strokeLength},${this.pathLength -
      this.strokeLength}`;
    }
  
    updateStrokeLength() {
    this.dist = this.target - this.strokeLength;
    this.acc = this.dist * spring;
    this.vel += this.acc;
    this.vel *= friction;
    this.strokeLength += this.vel;
    this.path.style.strokeDasharray = `${this.strokeLength},${this.pathLength -
      this.strokeLength}`;
  }  
}

let charts = [];

charts.push(new Chart(aPath,aText,19));
charts.push(new Chart(bPath,bText,62));
charts.push(new Chart(gPath,gText,32));


function Frame() {
  rid = window.requestAnimationFrame(Frame);
  charts.map((c) => c.updateStrokeLength() )
}
Frame();

divs.map((div) =>{
  div.addEventListener("input", function(){  
charts.map((c) => {
 if(isNaN(parseInt(c.text.textContent))){c.text.textContent = 0+"%";}
  if(parseInt(c.text.textContent) > 100) {c.text.textContent = 100+"%";}
  if(rid){window.cancelAnimationFrame(rid)}
  c.target = (parseInt(c.text.textContent) || 0 ) * c.unit;
  if(!c.text.textContent.match("%"))
    {c.text.textContent += "%";}
  Frame();  
});  
});
});