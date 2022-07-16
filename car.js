class Car{

    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.heigh=height;


        this.speed=0;
        this.acceleration=0.002;

        this.maxSpeed=10;

        this.angle=0;

        this.controls= new Controls();
        this.#addKeyboardListeners();
    }

    update(){
        this.#move();
    }


    #addKeyboardListeners(){
        document.onkeydown=(event)=>{
            switch(event.key){
                case "ArrowUp":
                    this.acceleration+=0.01;
                    break;
            }
        }
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

        ctx.translate(this.x,this.y);
        ctx.rotate(-this.angle);

        ctx.beginPath();
        ctx.rect(
            -this.width/2,
            -this.heigh/2,
            this.width,
            this.heigh
        );
        ctx.fill();
        // ctx.restore();
    }

}