import * as THREE from 'three';
import { ARGuideScript, UserProfile } from './types';

export class ARGuideService {
  private scripts: Map<string, ARGuideScript>;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;

  constructor() {
    this.scripts = new Map();
    this.initializeAR();
  }

  private initializeAR() {
    // 初始化THREE.js场景
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    
    // 设置基本参数
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    
    // 添加环境光和平行光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    this.scene.add(ambientLight);
    this.scene.add(directionalLight);
  }

  public async startGuide(
    scriptId: string,
    userProfile: UserProfile,
    startLocation: { x: number; y: number; floor: number }
  ): Promise<void> {
    const script = this.scripts.get(scriptId);
    if (!script) throw new Error('导购剧本不存在');

    // 检查用户适配性
    if (!this.checkUserCompatibility(script, userProfile)) {
      throw new Error('该剧本不适合当前用户');
    }

    // 初始化导购场景
    await this.setupGuideScene(script, startLocation);

    // 开始导购体验
    this.startExperience(script);
  }

  private checkUserCompatibility(script: ARGuideScript, user: UserProfile): boolean {
    const { ageRange, interests } = script.targetAudience;
    
    // 检查年龄范围
    if (user.age < ageRange[0] || user.age > ageRange[1]) return false;
    
    // 检查兴趣匹配度
    const matchingInterests = interests.filter(interest => 
      user.preferences.includes(interest)
    );
    
    return matchingInterests.length > 0;
  }

  private async setupGuideScene(
    script: ARGuideScript,
    startLocation: { x: number; y: number; floor: number }
  ): Promise<void> {
    // 清理现有场景
    this.clearScene();

    // 加载3D模型和资源
    await this.loadSceneAssets(script);

    // 设置初始位置
    this.positionCamera(startLocation);

    // 创建交互点
    this.createInteractionPoints(script.scenes);
  }

  private clearScene(): void {
    while(this.scene.children.length > 0) { 
      this.scene.remove(this.scene.children[0]); 
    }
  }

  private async loadSceneAssets(script: ARGuideScript): Promise<void> {
    // 加载3D模型、贴图等资源
    const loadPromises = script.scenes.map(scene => {
      if (scene.content.media) {
        return Promise.all(scene.content.media.map(this.loadMedia));
      }
      return Promise.resolve();
    });

    await Promise.all(loadPromises);
  }

  private async loadMedia(url: string): Promise<THREE.Texture | THREE.Object3D> {
    // 根据媒体类型加载不同资源
    if (url.endsWith('.jpg') || url.endsWith('.png')) {
      const textureLoader = new THREE.TextureLoader();
      return new Promise((resolve, reject) => {
        textureLoader.load(url, resolve, undefined, reject);
      });
    }
    // 可以添加其他类型的资源加载
    return Promise.resolve(new THREE.Object3D());
  }

  private positionCamera(location: { x: number; y: number; floor: number }): void {
    this.camera.position.set(location.x, location.y + 1.6, location.floor * 3);
    this.camera.lookAt(new THREE.Vector3(location.x, location.y, location.floor * 3));
  }

  private createInteractionPoints(scenes: ARGuideScript['scenes']): void {
    scenes.forEach(scene => {
      // 创建交互点几何体
      const geometry = new THREE.SphereGeometry(0.2, 32, 32);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const point = new THREE.Mesh(geometry, material);
      
      // 设置位置
      point.position.set(scene.location.x, scene.location.y, scene.location.floor * 3);
      
      // 添加到场景
      this.scene.add(point);
      
      // 添加交互事件
      this.addInteractionEvents(point, scene);
    });
  }

  private addInteractionEvents(point: THREE.Mesh, scene: ARGuideScript['scenes'][0]): void {
    // 添加鼠标悬停效果
    point.userData.hover = () => {
      (point.material as THREE.MeshBasicMaterial).color.setHex(0xff0000);
    };
    
    // 添加点击事件
    point.userData.click = () => {
      this.triggerSceneContent(scene);
    };
  }

  private triggerSceneContent(scene: ARGuideScript['scenes'][0]): void {
    switch (scene.content.type) {
      case 'story':
        this.playStoryContent(scene.content);
        break;
      case 'product':
        this.showProductInfo(scene.content);
        break;
      case 'interaction':
        this.startInteraction(scene.content);
        break;
    }
  }

  private playStoryContent(content: { title: string; description: string }): void {
    // 实现故事内容展示逻辑
    console.log('播放故事:', content.title);
  }

  private showProductInfo(content: { title: string; description: string }): void {
    // 实现商品信息展示逻辑
    console.log('展示商品:', content.title);
  }

  private startInteraction(content: { title: string; description: string }): void {
    // 实现交互内容逻辑
    console.log('开始交互:', content.title);
  }

  private startExperience(script: ARGuideScript): void {
    // 开始渲染循环
    const animate = () => {
      requestAnimationFrame(animate);
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }

  public registerScript(script: ARGuideScript): void {
    this.scripts.set(script.id, script);
  }

  public updateUserLocation(location: { x: number; y: number; floor: number }): void {
    this.positionCamera(location);
  }

  public resize(width: number, height: number): void {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  public dispose(): void {
    this.renderer.dispose();
    // 清理其他资源
  }
} 