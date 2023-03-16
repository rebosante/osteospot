<template>
   <header>
        <nav class="tm-navigation">
            <ul class="menu cf">
                <li><NuxtLink to="/">{{ $t('menu.home') }}</NuxtLink></li>
                <li><NuxtLink to="treatments">{{ $t('menu.treatments') }}</NuxtLink></li>
                <li>
                    <p>{{ $t('osteopathy') }}</p>
                    <ul class="submenu">
                        <li><NuxtLink to="pediatric-osteopathy">{{ $t('menu.pediatric') }}</NuxtLink></li>
                        <li><NuxtLink to="geriatric-osteopathy">{{ $t('menu.geriatric') }}</NuxtLink></li>
                    </ul>
                </li>
                <li><NuxtLink to="massage">{{ $t('menu.massages') }}</NuxtLink></li>
                <li><NuxtLink to="annachiara">{{ $t('menu.annachiara') }}</NuxtLink></li>
                <li><a href="#contact">{{ $t('menu.contact') }}</a></li>
                <li>
                    <form>
                        <label for="locale-select">{{ $t('language') }}: </label>
                        <select id="locale-select" v-model="$i18n.locale">
                        <option value="es">es</option>
                        <option value="en">en</option>
                        </select>
                    </form>
                </li>
            </ul>
        </nav> 
    </header>
</template>
<script setup>
import { useMq } from "vue3-mq";
import { watch } from 'vue';
import { useRoute } from 'vue-router';
const mq = useMq();
const route = useRoute();

function jump(){
    var url = location.href;               //Save down the URL without hash.
    location.href = "#intro-mobile";                 //Go to the target element.
    history.replaceState(null,null,url);   //Don't like hashes. Changing it back.
}

watch(() => route.name, () => {
      if (mq.mdMinus) {
        jump();
      }
    });
</script>