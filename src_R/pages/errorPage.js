import {Lightning, Router, Utils} from "@lightningjs/sdk";

export default class errorPage extends Lightning.Component{
    static _template(){
        return {
            rect: true, w: 1920, h: 1080,
            color: 0xFF402662,
            Header:{
                mount: 0.5, x: 960, y: 540,
                text:{
                    text:'Page not found', fontFace: "Bold", fontSize: 28
                }
            },
            Arrows: {
                Up: {
                    flex: {direction: "column"},
                    Arrow: {
                        flexItem: {marginTop: 50, marginBottom: 20},
                        mountX: .5, x: 960,
                        // src: Utils.asset("images/logo.png")
                        text: {text:'>'}
                    },
                    Label: {
                        mountX: .5, x: 960,
                        text: {text: "Home Page", fontFace: "Regular", textAlign: "center", wordWrapWidth: 300, lineHeight: 48}
                    }
                },
                Right: {
                    flex: {},
                    mountX: 1, x: 1920, mountY: 0.5, y: 540,
                    Label: {
                        mountY: 0.5, y: 24,
                        text: {text: "Account Page", fontFace: "Regular", textAlign: "right", wordWrapWidth: 300, lineHeight: 48}
                    },
                    Arrow: {
                        flexItem: {marginRight: 50, marginLeft: 20},
                        rotation: Math.PI * 0.5,
                        // src: Utils.asset("images/logo.png")
                        text: {text:'<'}
                    }
                },
                Enter: {
                    mountX: 0.5, x: 960, y: 980,
                    text: {text: "press [Back] to go to the previous page", fontFace: "Regular"}
                }
            }
        }
    }

    _handleUp(){
        Router.navigate(`home`);
    }

    _handleRight(){
        Router.navigate(`account`);
    }
    _handleBack(){
        Router.back(-1);
    }

    pageTransition(){
        return "right";
    }
}
// const app = new App({stage: {w: 1220, h: 1080, useImageWorker: false}});
// document.body.appendChild(app.stage.getCanvas());