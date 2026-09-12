<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <div class="absolute inset-0">
      <div class="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-100 opacity-50 blur-3xl"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-100 opacity-50 blur-3xl"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div class="space-y-8">
          <div class="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            电路仿真实验室
          </div>

          <h1 class="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
            探索电路世界
            <span class="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              从仿真开始
            </span>
          </h1>

          <p class="text-lg text-gray-600 leading-relaxed max-w-lg">
            三相电、PLC、示波器、在线绘制，一站式电路仿真平台。让复杂的电路变得直观易懂。
          </p>

          <div class="flex flex-wrap gap-4">
            <button
              class="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center"
              @click="$router.push('/simulator')"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              开始仿真
            </button>

            <button
              class="px-6 py-3 bg-white text-gray-700 rounded-xl font-medium border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors flex items-center"
              @click="$router.push('/editor')"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
              </svg>
              在线绘制
            </button>
          </div>
        </div>

        <div class="relative hidden lg:block">
          <div class="relative rounded-2xl bg-white shadow-xl p-6">
            <div class="space-y-4">
              <div class="rounded-xl bg-gray-900 p-4">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex space-x-1.5">
                    <div class="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div class="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                    <div class="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                  <span class="text-xs text-gray-400 font-mono">Oscilloscope</span>
                </div>
                <div class="h-32 bg-gray-800 rounded-lg relative overflow-hidden">
                  <svg class="absolute inset-0 w-full h-full" viewBox="0 0 400 128" preserveAspectRatio="none">
                    <path d="M0,64 Q50,10 100,64 T200,64 T300,64 T400,64" fill="none" stroke="#4ade80" stroke-width="2"/>
                    <path d="M0,64 Q50,120 100,64 T200,64 T300,64 T400,64" fill="none" stroke="#60a5fa" stroke-width="2" opacity="0.7"/>
                  </svg>
                </div>
              </div>

              <div class="grid grid-cols-3 gap-3">
                <div class="p-3 bg-gray-50 rounded-xl">
                  <div class="text-2xl font-bold text-gray-900">380V</div>
                  <div class="text-xs text-gray-500">额定电压</div>
                </div>
                <div class="p-3 bg-gray-50 rounded-xl">
                  <div class="text-2xl font-bold text-blue-600">50Hz</div>
                  <div class="text-xs text-gray-500">频率</div>
                </div>
                <div class="p-3 bg-gray-50 rounded-xl">
                  <div class="text-2xl font-bold text-purple-600">99.9%</div>
                  <div class="text-xs text-gray-500">精度</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>