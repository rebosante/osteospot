<template>
    <div class="tm-text-right">
        <NuxtLink class="tm-btn tm-btn-small tm-btn-primary tm-mt" :to="to">{{ $t('read_more') }}</NuxtLink>
    </div>
</template>

<script>
export default {
    props: {
        to: {
            type: String,
            default: 'treatments'
        }
    }
}
</script>