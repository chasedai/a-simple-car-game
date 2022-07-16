class Car{

    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.controls= new Controls();


        
        this.speed=0;
        this.acceleration=0.002;

        this.maxSpeed=10;

        this.angle=0;
        
        this.#addKeyboardListeners();
    }

    // update(){
    //     this.#move();
    // }

    update(roadBorders){
        if(!this.damaged){
            this.#move();
            this.polygon=this.#createPolygon();
            this.damaged=this.#assessDamage(roadBorders);
        }
    }

    #assessDamage(roadBorders){
        for(let i=0;i<roadBorders.length;i++){
            if(polysIntersect(this.polygon,roadBorders[i])){
                return true;
            }
        }
        return false;
    }

    #createPolygon(){
        const points=[];
        const rad=Math.hypot(this.width,this.height)/2;
        const alpha=Math.atan2(this.width,this.height);
        points.push({
            x:this.x-Math.sin(this.angle-alpha)*rad,
            y:this.y-Math.cos(this.angle-alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(this.angle+alpha)*rad,
            y:this.y-Math.cos(this.angle+alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(Math.PI+this.angle-alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle-alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(Math.PI+this.angle+alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle+alpha)*rad
        });
        return points;
    }

    #move(){
        if(this.controls.forward){
            this.speed+=this.acceleration;
            // this.y-=2;
        }

        if(this.speed>this.maxSpeed){
            this.speed=this.maxSpeed;
        }

        if(this.speed!=0){
            const flip=this.speed>0?1:-1;
            if(this.controls.left){
                this.angle+=0.03*flip;
                // this.x-=2;
            }
            if(this.controls.right){
                this.angle-=0.03*flip;
                // this.x+=2;
            }
        }

        this.x-=Math.sin(this.angle)*this.speed*0.5;
        this.y-=Math.cos(this.angle)*this.speed*0.5;

        // this.y-=this.speed;
    }

    draw(ctx){
        // ctx.save();
        if(this.damaged){
            ctx.fillStyle="gray";
        }else{
            ctx.fillStyle="black";
        }
        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x,this.polygon[0].y);
        for(let i=1;i<this.polygon.length;i++){
            ctx.lineTo(this.polygon[i].x,this.polygon[i].y);
        }
        ctx.fill();
        // ctx.restore();
    }


    #addKeyboardListeners(){
        document.onkeydown=(event)=>{
            switch(event.key){
                case "ArrowLeft":
                    this.controls.left = true;
                    break;
                case "ArrowRight":
                    this.controls.right = true;
                    break;
                case "ArrowUp":
                    console.log('up!!');
                    this.acceleration+=0.01;
                    break;
            }
        }
        document.onkeyup=(event)=>{
            switch(event.key){
                case "ArrowLeft":
                    this.controls.left = false;
                    break;
                case "ArrowRight":
                    this.controls.right = false;
                    break;
            }
        }
    }

}