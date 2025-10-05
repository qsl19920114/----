import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import PrefacePage from '../views/PrefacePage.vue';
import CatalogPage from '../views/CatalogPage.vue';
import HistoryPage from '../views/HistoryPage.vue';
import ProcessPage from '../views/ProcessPage.vue';
import ZhiPiDetailPage from '../views/ZhiPiDetailPage.vue';
import GuoGaoDetailPage from '../views/GuoGaoDetailPage.vue';
import DiaoKeDetailPage from '../views/DiaoKeDetailPage.vue';
import FuCaiDetailPage from '../views/FuCaiDetailPage.vue';
import YunTangDetailPage from '../views/YunTangDetailPage.vue';
import ZhuiJieDetailPage from '../views/ZhuiJieDetailPage.vue';
import ZhiPiProcessPage1 from '../views/ZhiPiProcessPage1.vue';
import ZhiPiProcessPage2 from '../views/ZhiPiProcessPage2.vue';
import DrawProcess from '../views/DrawProcess/index.vue';
import DrawProcessLoading from '../views/DrawProcess/LoadingPage.vue';
import DrawProcessGallery from '../views/DrawProcess/GalleryPage.vue';
import OverProcess from '../views/OverProcess/index.vue';
import OverProcessPaperLaying from '../views/OverProcess/PaperLayingPage.vue';
import OverProcessSlider from '../views/OverProcess/ProgressSliderPage.vue';
import OverProcessComplete from '../views/OverProcess/CompletePage.vue';
import CraveStart from '../views/CraveProcess/CraveStartPage.vue';
import CraveCards from '../views/CraveProcess/CraveCardsPage.vue';
import CraveProcess from '../views/CraveProcess/CraveProcessPage.vue';
import CraveLoading from '../views/CraveProcess/Craveloading.vue';
import CraveComplete from '../views/CraveProcess/CraveCompletePage.vue';
import ColorStart from '../views/ColorProcess/ColorStartPage.vue';
import ColorPaint from '../views/ColorProcess/ColorPaintPage.vue';
import ColorStep2 from '../views/ColorProcess/ColorStep2Page.vue';
import ColorStep3 from '../views/ColorProcess/ColorStep3Page.vue';
import ColorStep4 from '../views/ColorProcess/ColorStep4Page.vue';
import ColorStep5 from '../views/ColorProcess/ColorStep5Page.vue';
import ColorComplete from '../views/ColorProcess/ColorCompletePage.vue';
import DragAssemble from '../views/Drag/DragAssemblePage.vue';
import DragComplete from '../views/Drag/DragCompletePage.vue';
import ZhuiJie from '../views/ZhuiJie/ZhuiJiePage.vue';
import ShowProcess from '../views/ShowProcess/ShowProcessPage.vue';
import MusicPage from '../views/MusicPage.vue';
import UserHomePage from '../views/Users/UserHomePage.vue';
import UserGeneratePage from '../views/Users/UserGeneratePage.vue';
import UserAssemblePage from '../views/Users/UserAssemblePage.vue';
import UserCompletePage from '../views/Users/UserCompletePage.vue';
import UserVideoGeneratePage from '../views/Users/UserVideoGeneratePage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: {
      title: '智绘皮影 - 首页'
    }
  },
  {
    path: '/preface',
    name: 'Preface',
    component: PrefacePage,
    meta: {
      title: '智绘皮影 - 序页'
    }
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: CatalogPage,
    meta: {
      title: '智绘皮影 - 目录'
    }
  },
  {
    path: '/history',
    name: 'History',
    component: HistoryPage,
    meta: {
      title: '智绘皮影 - 历史渊源'
    }
  },
  {
    path: '/process',
    name: 'Process',
    component: ProcessPage,
    meta: {
      title: '智绘皮影 - 制作流程'
    }
  },
  {
    path: '/zhipi-detail',
    name: 'ZhiPiDetail',
    component: ZhiPiDetailPage,
    meta: {
      title: '智绘皮影 - 制皮科普'
    }
  },
  {
    path: '/guogao-detail',
    name: 'GuoGaoDetail',
    component: GuoGaoDetailPage,
    meta: {
      title: '智绘皮影 - 过稿科普'
    }
  },
  {
    path: '/diaoke-detail',
    name: 'DiaoKeDetail',
    component: DiaoKeDetailPage,
    meta: {
      title: '智绘皮影 - 雕刻科普'
    }
  },
  {
    path: '/fucai-detail',
    name: 'FuCaiDetail',
    component: FuCaiDetailPage,
    meta: {
      title: '智绘皮影 - 敷彩科普'
    }
  },
  {
    path: '/yuntang-detail',
    name: 'YunTangDetail',
    component: YunTangDetailPage,
    meta: {
      title: '智绘皮影 - 熨烫科普'
    }
  },
  {
    path: '/zhuijie-detail',
    name: 'ZhuiJieDetail',
    component: ZhuiJieDetailPage,
    meta: {
      title: '智绘皮影 - 缀结科普'
    }
  },
  {
    path: '/zhipi-process-page1',
    name: 'ZhiPiProcessPage1',
    component: ZhiPiProcessPage1,
    meta: {
      title: '智绘皮影 - 制皮交互'
    }
  },
  {
    path: '/zhipi-process-page2',
    name: 'ZhiPiProcessPage2',
    component: ZhiPiProcessPage2,
    meta: {
      title: '智绘皮影 - 制皮完成'
    }
  },
  {
    path: '/draw-process',
    name: 'DrawProcess',
    component: DrawProcess,
    meta: {
      title: '智绘皮影 - 绘制图案'
    }
  },
  {
    path: '/draw-process-loading',
    name: 'DrawProcessLoading',
    component: DrawProcessLoading,
    meta: {
      title: '智绘皮影 - 加载中'
    }
  },
  {
    path: '/draw-process-gallery',
    name: 'DrawProcessGallery',
    component: DrawProcessGallery,
    meta: {
      title: '智绘皮影 - 画稿选择'
    }
  },
  {
    path: '/over-process',
    name: 'OverProcess',
    component: OverProcess,
    meta: {
      title: '智绘皮影 - 过稿步骤1'
    }
  },
  {
    path: '/over-process-step2',
    name: 'OverProcessStep2',
    component: OverProcessPaperLaying,
    meta: {
      title: '智绘皮影 - 过稿步骤2'
    }
  },
  {
    path: '/over-process-step3',
    name: 'OverProcessStep3',
    component: OverProcessSlider,
    meta: {
      title: '智绘皮影 - 过稿步骤3'
    }
  },
  {
    path: '/over-process-complete',
    name: 'OverProcessComplete',
    component: OverProcessComplete,
    meta: {
      title: '智绘皮影 - 过稿完成'
    }
  },
  {
    path: '/crave-start',
    name: 'CraveStart',
    component: CraveStart,
    meta: {
      title: '智绘皮影 - 雕刻工艺'
    }
  },
  {
    path: '/crave-cards',
    name: 'CraveCards',
    component: CraveCards,
    meta: {
      title: '智绘皮影 - 人物分解'
    }
  },
  {
    path: '/crave-process',
    name: 'CraveProcess',
    component: CraveProcess,
    meta: {
      title: '智绘皮影 - 雕刻过程'
    }
  },
  {
    path: '/crave-loading',
    name: 'CraveLoading',
    component: CraveLoading,
    meta: {
      title: '智绘皮影 - 雕刻加载中',
      nextRoute: '/crave-complete' // 跳转到雕刻完成页面
    }
  },
  {
    path: '/crave-complete',
    name: 'CraveComplete',
    component: CraveComplete,
    meta: {
      title: '智绘皮影 - 雕刻完成'
    }
  },
  {
    path: '/color-start',
    name: 'ColorStart',
    component: ColorStart,
    meta: {
      title: '智绘皮影 - 敷彩工艺'
    }
  },
  {
    path: '/color-paint',
    name: 'ColorPaint',
    component: ColorPaint,
    meta: {
      title: '智绘皮影 - 颜料详情'
    }
  },
  {
    path: '/color-step2',
    name: 'ColorStep2',
    component: ColorStep2,
    meta: {
      title: '智绘皮影 - 敷彩第二步'
    }
  },
  {
    path: '/color-step3',
    name: 'ColorStep3',
    component: ColorStep3,
    meta: {
      title: '智绘皮影 - 敷彩第三步'
    }
  },
  {
    path: '/color-step4',
    name: 'ColorStep4',
    component: ColorStep4,
    meta: {
      title: '智绘皮影 - 敷彩第四步'
    }
  },
  {
    path: '/color-step5',
    name: 'ColorStep5',
    component: ColorStep5,
    meta: {
      title: '智绘皮影 - 敷彩第五步'
    }
  },
  {
    path: '/color-complete',
    name: 'ColorComplete',
    component: ColorComplete,
    meta: {
      title: '智绘皮影 - 敷彩完成'
    }
  },
  {
    path: '/drag-assemble',
    name: 'DragAssemble',
    component: DragAssemble,
    meta: {
      title: '智绘皮影 - 拖拽组装'
    }
  },
  {
    path: '/drag-complete',
    name: 'DragComplete',
    component: DragComplete,
    meta: {
      title: '智绘皮影 - 组装完成'
    }
  },
  {
    path: '/zhuijie',
    name: 'ZhuiJie',
    component: ZhuiJie,
    meta: {
      title: '智绘皮影 - 缀结'
    }
  },
  {
    path: '/show-process',
    name: 'ShowProcess',
    component: ShowProcess,
    meta: {
      title: '智绘皮影 - 表演'
    }
  },
  {
    path: '/music',
    name: 'MusicPage',
    component: MusicPage,
    meta: {
      title: '智绘皮影 - 配乐'
    }
  },
  {
    path: '/user-home',
    name: 'UserHome',
    component: UserHomePage,
    meta: {
      title: '智绘皮影 - 用户创作'
    }
  },
  {
    path: '/user-generate',
    name: 'UserGenerate',
    component: UserGeneratePage,
    meta: {
      title: '智绘皮影 - 生成结果'
    }
  },
  {
    path: '/user-assemble',
    name: 'UserAssemble',
    component: UserAssemblePage,
    meta: {
      title: '智绘皮影 - 组装人物'
    }
  },
  {
    path: '/user-complete',
    name: 'UserComplete',
    component: UserCompletePage,
    meta: {
      title: '智绘皮影 - 完成创作'
    }
  },
  {
    path: '/user-video',
    name: 'UserVideoGenerate',
    component: UserVideoGeneratePage,
    meta: {
      title: '智绘皮影 - 生成表演视频'
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// 路由守卫 - 更新页面标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;

