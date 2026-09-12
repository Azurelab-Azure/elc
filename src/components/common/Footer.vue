<template>
  <footer class="bg-surface-900 text-surface-300 mt-auto">
    <div class="container py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- 项目信息 -->
        <div>
          <h3 class="text-white font-bold text-lg mb-4">电路仿真实验室</h3>
          <p class="text-sm text-surface-400 mb-4">
            免费开源的电路仿真与教学平台
          </p>
          <div class="flex gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              class="text-surface-400 hover:text-white transition-colors"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- 快速链接 -->
        <div>
          <h4 class="text-white font-semibold mb-4">快速链接</h4>
          <ul class="space-y-2 text-sm">
            <li>
              <router-link to="/circuits" class="text-surface-400 hover:text-white transition-colors">
                电路图库
              </router-link>
            </li>
            <li>
              <router-link to="/submission" class="text-surface-400 hover:text-white transition-colors">
                投稿指南
              </router-link>
            </li>
            <li>
              <router-link to="/docs" class="text-surface-400 hover:text-white transition-colors">
                文档中心
              </router-link>
            </li>
            <li>
              <router-link to="/about" class="text-surface-400 hover:text-white transition-colors">
                关于我们
              </router-link>
            </li>
          </ul>
        </div>

        <!-- 贡献 -->
        <div>
          <h4 class="text-white font-semibold mb-4">贡献</h4>
          <ul class="space-y-2 text-sm">
            <li>
              <a href="#" class="text-surface-400 hover:text-white transition-colors">
                GitHub PR
              </a>
            </li>
            <li>
              <a href="#" class="text-surface-400 hover:text-white transition-colors">
                邮件投稿
              </a>
            </li>
            <li>
              <a href="#" class="text-surface-400 hover:text-white transition-colors">
                Bug反馈
              </a>
            </li>
            <li>
              <a href="#" class="text-surface-400 hover:text-white transition-colors">
                功能建议
              </a>
            </li>
          </ul>
        </div>

        <!-- 协议 -->
        <div>
          <h4 class="text-white font-semibold mb-4">开源协议</h4>
          <p class="text-sm text-surface-400 mb-4">
            采用 MIT 开源许可证
          </p>
          <p class="text-xs text-surface-500">
            © 2026 电路仿真实验室 <br>
            由 AI 社团与社区共同维护
          </p>
        </div>
      </div>

      <div class="border-t border-surface-800 mt-8 pt-8 text-center text-sm text-surface-500">
        <p>本项目的所有内容仅供参考和学习使用。项目团队不承担任何直接或间接损失责任。</p>
      </div>
    </div>
  </footer>
</template>