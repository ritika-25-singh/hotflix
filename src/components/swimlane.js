import { Lightning } from "@lightningjs/sdk";
import Poster from './poster'

export default class Swimlane extends Lightning.Component {
    static _template() {
        return {
            Items:{
                y:200
            }
        }
    }
    _init() {
        this._index = 0
    }
    set items(items) {
        this.patch({
            Items:{
                children: items.map((item, index)=>{
                    return {type: Poster, x:index*180, item:item}
                })
            }
        });
    }
    get items(){
        return this.tag("Items").children;
    }
    
    _setIndex(index=this._index){
        this._index = index;
        this.patch({
            Items:{
                smooth:{x: !index?0:(index*-180)}
            }
        });
    }

    _getFocused(){
        return  this.items[this._index];;
    }
   
    _handleLeft(){
        if(this._index > 0){
            this._setIndex(this._index-1);
        }
    }

    _handleRight(){
        if(this._index < this.items.length - 1){
            this._setIndex(this._index+1);
        } else if (this._index === this.items.length - 1){
            this._index = -1;
        }
    }

}