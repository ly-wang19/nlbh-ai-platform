import { Object3D, Scene, Camera } from 'three';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    model3DUrl: string;
    thumbnailUrl: string;
    dimensions: {
        width: number;
        height: number;
        depth: number;
    };
}

export interface ARSceneState {
    isInitialized: boolean;
    isARSupported: boolean;
    currentProduct?: Product;
    scene?: Scene;
    camera?: Camera;
    placedObjects: Object3D[];
}

export interface ARInteractionEvents {
    onProductSelect: (product: Product) => void;
    onProductPlace: (position: { x: number; y: number; z: number }) => void;
    onProductRemove: (productId: string) => void;
    onSceneReset: () => void;
}

export interface ARViewportSize {
    width: number;
    height: number;
}

export type ARSessionStatus = 'initializing' | 'ready' | 'running' | 'error' | 'not-supported';

// 用户画像接口
export interface UserProfile {
    id: string;
    name: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    preferences: string[];
    shoppingHistory: {
        productId: string;
        purchaseDate: string;
        amount: number;
    }[];
    lastVisit?: Date;
    vipLevel?: number;
}

// AR导购场景内容类型
export type SceneContentType = 'story' | 'product' | 'interaction';

// AR导购场景内容接口
export interface SceneContent {
    type: SceneContentType;
    title: string;
    description: string;
    media?: string[];  // 媒体资源URL列表
    duration?: number; // 内容展示时长（秒）
    interactionType?: 'click' | 'gesture' | 'voice';
    productInfo?: {
        productId: string;
        price: number;
        discount?: number;
        availability: boolean;
    };
}

// AR导购场景位置接口
export interface SceneLocation {
    x: number;
    y: number;
    floor: number;
    orientation?: number; // 方向角度（度）
    zone?: string; // 商场区域标识
}

// AR导购场景接口
export interface GuideScene {
    id: string;
    location: SceneLocation;
    content: SceneContent;
    prerequisites?: string[]; // 前置场景ID列表
    nextScenes?: string[]; // 后续场景ID列表
    triggerDistance: number; // 触发距离（米）
    isCompleted?: boolean;
}

// AR导购剧本目标受众接口
export interface TargetAudience {
    ageRange: [number, number]; // [最小年龄, 最大年龄]
    gender?: ('male' | 'female' | 'other')[];
    interests: string[];
    vipLevelRequired?: number;
}

// AR导购剧本接口
export interface ARGuideScript {
    id: string;
    name: string;
    description: string;
    version: string;
    targetAudience: TargetAudience;
    scenes: GuideScene[];
    startTime?: Date;
    endTime?: Date;
    isActive: boolean;
    metadata?: {
        creator: string;
        createTime: Date;
        lastModified: Date;
        tags: string[];
    };
}

// AR导购统计数据接口
export interface GuideAnalytics {
    scriptId: string;
    userId: string;
    startTime: Date;
    endTime?: Date;
    completedScenes: string[];
    interactionData: {
        sceneId: string;
        timeSpent: number;
        interactionCount: number;
    }[];
    conversionResult?: {
        purchased: boolean;
        productIds: string[];
        totalAmount: number;
    };
}

// AR导购系统配置接口
export interface GuideSystemConfig {
    defaultLanguage: string;
    supportedLanguages: string[];
    maxConcurrentUsers: number;
    updateInterval: number; // 毫秒
    debugMode: boolean;
    analyticsEnabled: boolean;
    cacheSettings: {
        maxCacheSize: number;
        cacheExpiration: number;
    };
} 