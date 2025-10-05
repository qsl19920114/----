/**
 * Mock数据
 * 用于在没有后端API时进行开发和测试
 */

// 模拟延迟
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 模拟上传图片
export async function mockUploadImage(file) {
  console.log('🎭 Mock: 模拟上传图片...');
  
  // 模拟上传延迟（1-2秒）
  await delay(1000 + Math.random() * 1000);
  
  // 返回模拟数据
  return {
    imageId: 'mock-image-' + Date.now(),
    originalUrl: URL.createObjectURL(file),
    uploadTime: new Date().toISOString(),
  };
}

// 模拟生成样式
export async function mockGenerateStyles(params) {
  console.log('🎭 Mock: 模拟生成样式...', params);
  
  // 模拟处理延迟（0.5秒）
  await delay(500);
  
  // 返回模拟任务ID
  return {
    taskId: 'mock-task-' + Date.now(),
    estimatedTime: 10, // 预计10秒完成
  };
}

// 模拟进度（用于轮询）
let mockProgress = 0;
let mockCallCount = 0;

// 模拟查询生成状态
export async function mockGetImageStatus(taskId) {
  console.log('🎭 Mock: 查询生成状态...', taskId);
  
  // 模拟网络延迟（0.5秒）
  await delay(500);
  
  mockCallCount++;
  
  // 每次调用增加进度
  mockProgress += 15;
  
  // 模拟失败（可选，用于测试错误处理）
  // if (mockCallCount === 3) {
  //   mockProgress = 0;
  //   mockCallCount = 0;
  //   return {
  //     status: 'failed',
  //     progress: 0,
  //     error: '模拟生成失败，请重试',
  //   };
  // }
  
  // 如果进度达到100%，返回完成状态
  if (mockProgress >= 100) {
    // 重置进度和计数
    mockProgress = 0;
    mockCallCount = 0;
    
    // 返回完成状态，包含分解后的8个组件
    return {
      status: 'completed',
      progress: 100,
      message: '生成完成',
      // 只返回一个样式的完整人物预览图
      previewImage: '/assets/music/assets/438439b6-f6b6-48b7-85e3-a43a9834cb61.png',
      // 8个组件的数据
      components: [
        {
          id: 'comp-head',
          name: '头部',
          imageUrl: '/assets/CraveProcess/assets/2d078b73-4eb2-4792-b426-ac9a532d78f9.png',
          correctPosition: { x: 196, y: 50 },
          currentPosition: { x: 50, y: 650 }, // 初始位置在左下角
          rotation: 0,
          zIndex: 8,
          size: { width: 80, height: 100 },
          isPlaced: false
        },
        {
          id: 'comp-torso',
          name: '躯干',
          imageUrl: '/assets/CraveProcess/assets/躯干.png',
          correctPosition: { x: 180, y: 180 },
          currentPosition: { x: 150, y: 650 },
          rotation: 0,
          zIndex: 5,
          size: { width: 100, height: 140 },
          isPlaced: false
        },
        {
          id: 'comp-pelvis',
          name: '盆骨',
          imageUrl: '/assets/CraveProcess/assets/盆骨.png',
          correctPosition: { x: 180, y: 320 },
          currentPosition: { x: 250, y: 650 },
          rotation: 0,
          zIndex: 4,
          size: { width: 90, height: 80 },
          isPlaced: false
        },
        {
          id: 'comp-left-arm',
          name: '左臂',
          imageUrl: '/assets/CraveProcess/assets/左臂.png',
          correctPosition: { x: 120, y: 200 },
          currentPosition: { x: 50, y: 750 },
          rotation: -15,
          zIndex: 3,
          size: { width: 40, height: 80 },
          isPlaced: false
        },
        {
          id: 'comp-left-hand',
          name: '左手',
          imageUrl: '/assets/CraveProcess/assets/左手.png',
          correctPosition: { x: 100, y: 280 },
          currentPosition: { x: 150, y: 750 },
          rotation: -20,
          zIndex: 2,
          size: { width: 50, height: 70 },
          isPlaced: false
        },
        {
          id: 'comp-right-arm',
          name: '右臂',
          imageUrl: '/assets/CraveProcess/assets/右臂.png',
          correctPosition: { x: 260, y: 200 },
          currentPosition: { x: 250, y: 750 },
          rotation: 15,
          zIndex: 3,
          size: { width: 40, height: 80 },
          isPlaced: false
        },
        {
          id: 'comp-right-hand',
          name: '右手',
          imageUrl: '/assets/CraveProcess/assets/右手.png',
          correctPosition: { x: 280, y: 280 },
          currentPosition: { x: 50, y: 850 },
          rotation: 20,
          zIndex: 2,
          size: { width: 50, height: 70 },
          isPlaced: false
        },
        {
          id: 'comp-legs',
          name: '腿部',
          imageUrl: '/assets/CraveProcess/assets/左.png',
          correctPosition: { x: 180, y: 400 },
          currentPosition: { x: 150, y: 850 },
          rotation: 0,
          zIndex: 1,
          size: { width: 100, height: 150 },
          isPlaced: false
        }
      ],
    };
  }
  
  // 返回处理中状态
  return {
    status: 'processing',
    progress: mockProgress,
    message: getProgressMessage(mockProgress),
  };
}

// 根据进度返回不同的提示信息
function getProgressMessage(progress) {
  if (progress < 20) {
    return '正在分析图片...';
  } else if (progress < 40) {
    return 'AI正在理解图片内容...';
  } else if (progress < 60) {
    return '正在生成皮影人物...';
  } else if (progress < 80) {
    return '正在分解人物组件...';
  } else {
    return '正在处理最后细节...';
  }
}

// 重置Mock状态（用于测试）
export function resetMockState() {
  mockProgress = 0;
  mockCallCount = 0;
  console.log('🎭 Mock: 状态已重置');
}

// 导出所有Mock函数
export default {
  mockUploadImage,
  mockGenerateStyles,
  mockGetImageStatus,
  resetMockState,
};

