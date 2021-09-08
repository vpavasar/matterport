import {Component, createRef} from "react";

const key = 'ds5i2m1kmb8qa95wrscd8n5pd';

declare global {
    interface Window {
        MP_SDK: any;
    }
}

export class SceneBox extends Component {
    showcaseRef = createRef<HTMLIFrameElement>();

    onLoadHandler = async () => {
        let sdk;
        const showcase = this.showcaseRef.current;

        try {
            sdk = await showcase!.contentWindow!.MP_SDK.connect(showcase, key, '3.6');
        }
        catch(e) {
            console.error(e);
            return;
        }

        console.log('%c  Hello Bundle SDK! ', 'background: #333333; color: #00dd00');
        console.log('SDK', sdk);

        const lights = await sdk.Scene.createNode();
        lights.addComponent('mp.lights');
        lights.start();

        const modelNode = await sdk.Scene.createNode();
        // Store the fbx component since we will need to adjust it in the next step.
        // const fbxComponent = modelNode.addComponent('mp.fbxLoader', {
        const fbxComponent = modelNode.addComponent('mp.objLoader', {
            // url: '/models_fbx/round_table_oak_(coronarender).FBX',
            // url: '/models_obj/2436.obj',
            url: '/models_obj/2549/2549.obj',
            materialUrl: '/models_obj/2549/2549.mtl',
            visible: true
        });
        console.log('Model', fbxComponent);

        // fbxComponent.inputs.localScale = {
        //   x: 0.002,
        //   y: 0.002,
        //   z: 0.002
        // };
        fbxComponent.inputs.localScale = {
            x: 0.01,
            y: 0.01,
            z: 0.01
        };

        modelNode.obj3D.position.set(0,-1,0); // drop ~3 feet

        modelNode.start();

        // const tick = function() {
        //   requestAnimationFrame(tick);
        //   modelNode.obj3D.rotation.y += 0.02;
        // }
        // tick();

        const node = await sdk.Scene.createNode();
        const myControl = node.addComponent('mp.transformControls');
        node.start();
        myControl.inputs.visible = true;
        myControl.inputs.selection = modelNode;
        myControl.inputs.mode = 'translate';
    }

    render() {
        return (
            <div className='frame-wrapper'>
                <iframe id="showcase"
                        src={`./bundle/showcase.html?m=22Ub5eknCVx&play=1&qs=1&log=0&applicationKey=${key}`}
                        width="100%"
                        height="100%"
                        frameBorder='0'
                        allow="xr-spatial-tracking"
                        allowFullScreen
                        title='scene'
                        onLoad={this.onLoadHandler}
                        ref={this.showcaseRef}
                />
            </div>
        )
    }
}