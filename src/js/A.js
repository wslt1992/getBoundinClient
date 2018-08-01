export class A {
    constructor(element) {
        this.element = element;
        //0到4一共5个状态
        this.flag = [0, 0, 0, 0, 0];
    }


    
    setElement(element) {
        this.element = element;
    }

    /**
     * 
     * @param {*} box 
     */
    perform() {
        let zhuangtai = this.judgeStateByMeasuredRange(this.element);
        let boxClassList = this.element.classList;
        switch (zhuangtai) {
            case 1:
                
                    boxClassList.remove('fadeInLeft');
                    boxClassList.add('fadeOutRight');
                    // this.myEndFunction2(false);
              
                break;
            case 2:
                
                    boxClassList.add('fadeInLeft');
                    boxClassList.remove('fadeOutRight');
                    // this.myEndFunction2(true);
                    break;
                
            case 3:
                
                    boxClassList.remove('fadeInLeft');
                    boxClassList.add('fadeOutRight');
                    // this.myEndFunction2(false);
                    break;
                
        }
    }
/**
 * 通过测量box元素(Element)与视口viewport的距离，判断box与视口viewport的状态
 * @param {*} box 
 */
    judgeStateByMeasuredRange(box) {
        //窗口高度
        let windowHeight = window.innerHeight;
        //box的高度
        let boxHeight = this.element.offsetHeight;
        //box的top,bottom等离viewport的距离
        let boundRect = box.getBoundingClientRect();

        let top = boundRect.top;
        let bottom = boundRect.bottom;
        //1.在viewport上面
        // console.log(boundRect);
        if (bottom < 0) {
            if (this.panduanFlag(0)) {
                console.log('box在窗口上方');
                return 0;
            }
        }
        //2.在viewport一半，下半进入
        else if (top < 0 && top > (0 - boxHeight)) {
            if (this.panduanFlag(1)) {
                console.log('在viewport一半，下半进入');
                return 1;
            }
        }

        //3.在viewPort中，全在
        else if (top < windowHeight - boxHeight && top > 0) {
            if (this.panduanFlag(2)) {
                console.log('在viewPort中，全在');
                return 2;
            }
        }
        //4.在viewport一半，上半进入
        else if (top < windowHeight && top > windowHeight - boxHeight) {
            if (this.panduanFlag(3)) {
                console.log('在viewport一半，上半进入');
                return 3;
            }
        }
        //5.在viewport下面
        else if (top > windowHeight) {
            if (this.panduanFlag(4)) {
                console.log('在viewport下面');
                return 4;
            }
        }

        //返回-1，表示元素在窗口状态没变
        return -1;
    }

    panduanFlag(num) {
        if (!this.flag[num]) {
            this.clearFlag();
            this.flag[num] = 1;
            return true;
        } else {
            return false;
        }
    }

    clearFlag() {
        this.flag = [0, 0, 0, 0, 0];
    }

}


export class A_init {
    constructor(animate) {
        let animateElements = document.getElementsByClassName(animate);
        this.arr = [];
        this.add(animateElements);
    }
    
    add(animateElements){
        Array.from(animateElements).forEach(element => {
            let a = new A(element);
            this.arr.push(a);
        });
    }
    perform(){
        this.arr.forEach(element => {
            element.perform();
        });
    }
}
