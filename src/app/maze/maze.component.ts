import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.scss']
})
export class MazeComponent implements OnInit {
  width:number=50;
  column:number=10;
  colArray=[];
  row:number=11;
  rowArray=[]
  mazeTop:number=0;
  mazeLeft:number=0;
  
  shift=10;
  extra=40;
  sweets=[]

  mazeSweetRel=[]
  r:number;
  l:number;
  show:boolean=false;
  step:number=0;
  constructor() { 
   
    // console.log(this.sweets)
    this.row=parseInt(prompt("Please number of row",'5'));
    this.column=parseInt(prompt("Please number of column",'5'));
    this.r=Math.round(this.column/2);
    this.l=Math.round(this.row/2);
    this.colArray=Array(this.column).fill(0).map((x,i)=>i);
    this.rowArray=Array(this.row).fill(0).map((x,i)=>i);
    console.log(this.colArray,"col")
    console.log(this.rowArray,"row")
    this.mazeSweetRel=Array(this.row*this.column+1).fill(0).map((x,i)=>i);
    console.log(this.mazeSweetRel)
    this.sweets=this.getRandom(this.mazeSweetRel,this.row+1)
    const index=this.sweets.indexOf(this.r*this.l)
    if(index>0){
      this.sweets.splice(index, 1)
    }else{
      this.sweets.splice(0, 1)
    }


  
    
   this.mazeSweetRel=this.mazeSweetRel.map(ele=>{
     let a={
       val:ele,
       status:false
     }
    //  console.log(ele,this.sweets.indexOf(ele))
     
     return a;
   })
   console.log( this.mazeSweetRel)

   console.log(this.sweets)
   for(let i in this.sweets){
    //  console.log(this.sweets[i],this.mazeSweetRel[this.sweets[i]])
      this.mazeSweetRel[this.sweets[i]]['status']=true;
   }


  //  console.log(this.mazeSweetRel)
    
    this.width=this.width*this.column;
    this.mazeLeft=this.r*50-this.extra;
    
    this.mazeTop=this.l*50-this.extra;
    
  }

  ngOnInit() {
    
    setTimeout(()=>{
      this.show=true
    },3000)
  }


  checkMovement(evt){
    

    if(evt.key=="ArrowUp" && this.mazeTop>this.shift && this.sweets.length>0){
      this.mazeTop=this.mazeTop-50
      this.l=this.l-1;
      this.step=this.step+1;
    }

    else if(evt.key=="ArrowDown" && this.mazeTop<this.row*50-this.extra  && this.sweets.length>0){
      this.mazeTop=this.mazeTop+50
      this.l=this.l+1;
      this.step=this.step+1;
    }
    else if(evt.key=="ArrowLeft" && this.mazeLeft>this.shift  && this.sweets.length>0){
      this.mazeLeft=this.mazeLeft-50
      this.r=this.r-1;
      this.step=this.step+1;
    }

    else if(evt.key=="ArrowRight" && this.mazeLeft<this.column*50-this.extra  && this.sweets.length>0){
      this.mazeLeft=this.mazeLeft+50
      this.r=this.r+1;
      this.step=this.step+1;
    }

    this.mazeSweetRel[this.colArray.length*(this.l-1)+this.r-1]['status']=false;
    
    const index=this.sweets.indexOf(this.colArray.length*(this.l-1)+this.r-1)
    if(index>=0){
      this.sweets.splice(index,1)
    }
    if(this.sweets.length==0){
      alert("Game Over! total Step taken:"+this.step)
    }
    

  }

  getRandom(arr, n) {
    let result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    
    while (n--) {
        let x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

}
