import { Lightning,Utils } from "@lightningjs/sdk";

export default class Poster extends Lightning.Component {
    static _template() {
        return {
            rect: true, color: 0xffffffff, w: 170, h: 200, scale:1,
            transitions:{
                scale:{
                    duration:0.3, delay:0.05
                }
            }
        }
    }

    set item(v){
        this._item = v;
        this.patch({
            src:Utils.asset(this.item.img) 
        });
    }

    get item(){
        return this._item;
    }

    _focus(){
        this.setSmooth("scale",1.2); //,  zIndex: 15
        this.setSmooth("zIndex",15);
    }

    _unfocus(){
        this.setSmooth("scale",1);
        this.setSmooth("zIndex",1);
    }

   _handleEnter() {
       const params = {
           Image: this.item.img,
           Name: this.item.Name
       }
    //    Router.navigate('detailsPage', params);
   }
   pageTransition() {
    return 'crossFade'
  }
}