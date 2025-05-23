<script setup lang="ts">
</script>
<template>
    <div class="stars-container absolute inset-0 overflow-hidden">
        <div v-for="i in 50" :key="i" class="star" :style="{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`
        }">
        </div>
    </div>
</template>