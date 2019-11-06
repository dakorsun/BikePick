import React from "react";
import * as THREE from 'three'
import DragControls from 'drag-controls'

DragControls.install({THREE});


class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.scene = new THREE.Scene();
        this.scene.background = "#fff";

        this.canvas = React.createRef();

        this.click = this.click.bind(this);
        this.dragEventListener = this.dragEventListener.bind(this);
    }

    dragEventListener(event) {
        this.renderer.render(this.scene, this.camera)

    }

    async componentDidMount() {
        const aspectRatio = 1.5;
        const viewSize = 1440;

        // await this.props.loadFrame();
        const frameTex = await new Promise((res, rej) => {
            new THREE.TextureLoader().load('/assets/images/df4-blank.png', function (texture) {
                res(texture);
            });
        });

        const stemTex = await new Promise((res, rej) => {
            new THREE.TextureLoader().load('/assets/images/3t-stealth-100mm-6deg.png', function (texture) {
                console.log('loaded tex: ', texture);
                res(texture);
            });
        });

        console.log('frame tex: ', frameTex);
        console.log('stem tex: ', stemTex);

        const canvas = this.canvas.current;
        this.renderer = new THREE.WebGLRenderer({canvas});
        this.renderer.setClearColor('#e5ba63');


        this.renderer.setSize(viewSize, viewSize / aspectRatio);
        this.camera = new THREE.OrthographicCamera(
            -viewSize / 2, viewSize / 2,
            viewSize / aspectRatio / 2, -viewSize / aspectRatio / 2,
            0, 1000);

        this.camera.position.z = 100;

        console.log('camera: ', this.camera);


        const squareGeo = new THREE.PlaneGeometry(100, 100);
        const material = new THREE.MeshBasicMaterial({color: '#fff'});
        const square = new THREE.Mesh(squareGeo, material);

        square.position.set(0, 0, 2);
        this.scene.add(square);

        const frameSpriteMaterial = new THREE.SpriteMaterial({map: frameTex});
        const frameSprite = new THREE.Sprite(frameSpriteMaterial);
        frameSprite.scale.set(viewSize, viewSize / aspectRatio, 1);
        frameSprite.position.set(0, 0, 3);
        this.scene.add(frameSprite);


        const stemSpriteMaterial = new THREE.SpriteMaterial({map: stemTex, rotation: 15.5 * Math.PI / 180});
        const stemWidth = stemSpriteMaterial.map.image.naturalWidth;
        console.log('stemWidth: ', stemWidth);
        const stemHeight = stemSpriteMaterial.map.image.naturalHeight;
        console.log('stemHeight: ', stemHeight);
        const stemSprite = new THREE.Sprite(stemSpriteMaterial);
        stemSprite.scale.set(292 * .384, 125 * .384, 1);
        stemSprite.center.set(0.164214286, 0.346666667);
        const stemPosition = {x: .675, y: .70265};
        stemSprite.position.set((viewSize * stemPosition.x) - (viewSize / 2), (viewSize / aspectRatio * stemPosition.y) - (viewSize / aspectRatio / 2), 4);
        this.scene.add(stemSprite);



        const gridH = new THREE.GridHelper(2000, 200);
        gridH.rotateOnAxis({x: 1, y: 0, z: 0}, 90 * Math.PI / 180);
        gridH.position.set(0, 0, 0);
        this.scene.add(gridH);


        console.log('this.scene: ', this.scene);
        this.renderer.render(this.scene, this.camera);
        console.log('renderer: ', this.renderer);

        const controls = new DragControls([square, stemSprite], this.camera, this.renderer.domElement);


        this.renderer.domElement.addEventListener("mousemove", this.dragEventListener);

        let startColor;
        controls.addEventListener('dragstart', function (event) {

            startColor = event.object.material.color.getHex();
            event.object.material.color.setHex(0x000000);
            console.log(event.object)

        });

        controls.addEventListener('dragend', function (event) {

            event.object.material.color.setHex(startColor);

        });
    }

    click() {

    }

    render() {

        return (
            <div className={'screen'}>
                <canvas id={'main-canvas'} ref={this.canvas}></canvas>
            </div>
        )
    }
}

export default Canvas