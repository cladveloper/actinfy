<script setup lang="ts">
const links = [
  {name: 'Ejemplos', to: '/examples'},
  {name: 'Descargas', to: '/downloads'},
  {name: 'Ver código de fuente', to: 'https://github.com/cladveloper/actinfy', icon: 'solar:arrow-right-up-linear'},
]
</script>

<template>
    <header class="bg-white/80 backdrop-blur z-50 border-b border-black h-14 fixed top-0 w-full flex items-center">
      <h1 class="bg-black text-white h-full pl-6 pr-9 flex items-center relative">
        <span class="text-lg font-black">¡Actinfy</span>
        <NuxtLink class="absolute inset-0 w-full h-full z-10" to="/"/>
      </h1>

      <nav class="ml-auto px-6">
        <ul class="flex items-center space-x-6">
          <li v-for="link in links">
            <NuxtLink :to="link.to" class="text-sm">{{ link.name }}
              <Icon :name="link.icon" v-if="link.icon"/>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </header>
</template>