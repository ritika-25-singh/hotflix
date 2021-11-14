import { Lightning, Utils, Router } from "@lightningjs/sdk";

export default class LandingPage extends Lightning.Component {
    static _template() {
        return {
            Background: {
                w: 1920, h: 1080, color: 0xfffbb03b,
                src: Utils.asset('images/background.png')
            },
            Header: {
                Logo: { x: 50, y: 30, src: Utils.asset('images/logo.png'), w: 50, h: 50 },
                Desc: { x: 100, y: 20, text: { text: 'Hotflix', fontFace: 'Bold', fontSize: 52, wordWrap: true, wordWrapWidth: 450, lineHeight: 30 } },
            },
            List: { mount: 1, x: 530, y: 30, type: ExampleList },
            Metadata: {
                x: 50, y: 60, type: ImageList 
            }
        }
    }

    _init() {
        this.imgList = ['images/Hero.png', 'images/After.png', 'images/Hero.png', 'images/After.png', 'images/Hero.png', 'images/After.png', 'images/Hero.png', 'images/After.png']
        this.tag('List').items = ['Movie', 'Shows', 'Live', 'Replay'].map((i) => ({ label: i }));
        this.tag('Metadata').items = this.imgList.map((i) => ({ img: i, Name: (i.split("/")[1]) }));
        this._setState('List');
        this.index = 0
    }
    setNewImage(){
        this.imgList = ['images/Friends.png', 'images/Never.png', 'images/Friends.png', 'images/Never.png', 'images/Hero.png', 'images/Friends.png', 'images/Never.png']
        this.tag('Metadata').items = this.imgList.map((i) => ({ img: i, Name: (i.split("/")[1]) }));
        
        // this._init();
    }

    static _states() {
        return [
            class List extends this {
                _getFocused() {
                    return this.tag('List')
                }
                _handleDown() {
                    this._setState('Metadata');
                }
                _handleRight() {
                    this.tag('List').focusChange();
                    this.setNewImage();
                }
            },
            class Metadata extends this {
                _getFocused() {
                    return this.tag('Metadata')
                }
                _handleUp() {
                    this._setState('List');
                }
            }
        ]
    }
}

class ExampleList extends lng.Component {
    static _template() {
        return {}
    }
    _init() {
        this.index = 0
    }
    set items(items) {
        this.children = items.map((item, index) => {
            return {
                ref: 'ListItem-' + index, //optional, for debug purposes
                type: ExampleListItem,
                x: index * 170, //item width + 20px margin
                item //passing the item as an attribute
            }
        })
    }
    _getFocused() {
        return this.children[this.index]
    }
    _handleLeft() {
        if (this.index > 0) {
            this.index--
        }
    }

    focusChange() {
        // we don't know exactly how many items the list can have
        // so we test it based on this component's child list
        if (this.index < this.children.length - 1) {
            this.index++
        }
    }
}

class ExampleListItem extends lng.Component {
    static _template() {
        return {
            Label: {
                x: 25, y: 30, mount: .5, w: 150,
            }
        }
    }
    _init() {
        this.patch({ Label: { text: { text: this.item.label } } })
    }

    _focus() {
        this.tag('Label').color = 0xffdb7093
        this.patch({ smooth: { alpha: 1, scale: 1.2 }, });

    }

    _unfocus() {
        this.tag('Label').color = 0xffffffff;
        this.patch({ smooth: { alpha: 0.8, scale: 1 } })
    }
    _handleEnter() {
        Router.navigate('tvShows');
    }
}

class ImageList extends lng.Component {
    static _template() {
        return {}
    }
    _init() {
        this.index = 0
    }
    set items(items) {
        this.children = items.map((item, index) => {
            return {
                ref: 'ImageItem-' + index, //optional, for debug purposes
                type: ImageListItem,
                x: index * 170, //item width + 20px margin
                item //passing the item as an attribute
            }
        })
    }
    _getFocused() {
        return this.children[this.index]
    }
    _handleLeft() {
        if (this.index > 0) {
            this.index--
        }
    }

    _handleRight() {
        // we don't know exactly how many items the list can have
        // so we test it based on this component's child list
        if (this.index < this.children.length - 1) {
            this.index++
        }
    }
}

class ImageListItem extends lng.Component {
    static _template() {
        return {
            Images: {
                x: 25, y: 130, w: 150, h: 200,
            }
        }
    }
    _init() {
        this.patch({ Images: { src: Utils.asset(this.item.img) }})
    }

    _focus() {
    this.patch({ smooth: { alpha: 1, scale: 1.2 }, 
        RoundRectangle: {x: 25, y: 130, texture: lng.Tools.getRoundRect(151, 201, 4, 3, 0xffdb7093, false, 0xffdb7093)}
    });
    }

    _unfocus() {
        this.patch({ smooth: { alpha: 0.8, scale: 1 }, RoundRectangle: undefined  })
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