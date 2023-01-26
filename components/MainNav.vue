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
                <li><NuxtLink to="contact">{{ $t('menu.contact') }}</NuxtLink></li>
                <li>
                    <form>
                        <label for="locale-select">{{ $t('language') }}: </label>
                        <select id="locale-select" v-model="$i18n.locale">
                        <option value="es">es</option>
                        <option value="en">en</option>
                        <option value="it">it</option>
                        </select>
                    </form>
                </li>
            </ul>
        </nav> 
    </header>
</template>