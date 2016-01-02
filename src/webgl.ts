require("./styles/base.scss")
import THREE = require('three');

var canvas = document.getElementById("gl-main-canvas");
var container = document.getElementById("gl-main-canvas-container");

class App {
  
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.Camera;
  private cube: THREE.Mesh;
  
  constructor(private container: HTMLElement,
              private canvas: HTMLCanvasElement) {
     this.initGL();
  }
  
  private initGL() {
    this.scene = new THREE.Scene();
    this.canvas.height = Math.round(Math.min(this.container.clientHeight, 400));
    this.canvas.width = this.container.clientWidth;
    
    
    this.camera = new THREE.PerspectiveCamera(75, this.canvas.width / this.canvas.height, 0.1, 1000);
    
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setSize(this.canvas.width, this.canvas.height);
    this.renderer.setClearColor(0xffffff, 1);
    
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0xc0efff });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
    this.camera.position.z = 5;
    this.render();
  }
  
  private render() {
    requestAnimationFrame(this.render.bind(this));
    this.cube.rotation.x += 0.01;
		this.cube.rotation.y += 0.01;
	  this.renderer.render(this.scene, this.camera);
  }
}

new App(<HTMLElement>container, <HTMLCanvasElement>canvas);