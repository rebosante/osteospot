<template>
    <div>
        <MainNav />
        <slot />
    </div>
</template>

<script>
export default {
    data: () => ({
        callAdjustLayout: null,
        currentLayout: null
    }),
    mounted() {
        if (this.detectIE()) {
            alert('Please use the latest version of Chrome or Firefox for best browsing experience.');
        }
        this.adjustLayout();
        window.addEventListener('resize', this.adjustLayoutWithDelay);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.adjustLayoutWithDelay);
    },
    watch: {
        $route() {
            // New page has its own blocks; force a reorder pass.
            this.currentLayout = null;
            this.adjustLayoutWithDelay();
        }
    },
    methods: {
        adjustLayout() {
            const nextLayout = window.innerWidth <= 1199 ? 'mobile' : 'desktop';

            // Mobile keyboards fire resize (height changes). Reordering DOM then
            // steals focus and dismisses the keyboard — only reorder on real layout switches.
            if (nextLayout === this.currentLayout) {
                return;
            }

            const seqAttr = nextLayout === 'mobile' ? 'data-mobile-seq-no' : 'data-desktop-seq-no';
            const block1 = document.querySelector(`div[${seqAttr}='1']`);
            const block2 = document.querySelector(`div[${seqAttr}='2']`);
            const block3 = document.querySelector(`div[${seqAttr}='3']`);
            const block4 = document.querySelector(`div[${seqAttr}='4']`);
            const block5 = document.querySelector(`div[${seqAttr}='5']`);
            const block6 = document.querySelector(`div[${seqAttr}='6']`);
            const block7 = document.querySelector(`div[${seqAttr}='7']`);
            const block8 = document.querySelector(`div[${seqAttr}='8']`);
            const block9 = document.querySelector(`div[${seqAttr}='9']`);

            if (!block1?.parentNode || !block2 || !block3 || !block4 || !block5 || !block6 || !block7 || !block8 || !block9) {
                return;
            }

            // Reorder blocks based on their seq no
            block1.parentNode.insertBefore(block2, block1.nextSibling);
            block1.parentNode.insertBefore(block3, block2.nextSibling);
            block1.parentNode.insertBefore(block4, block3.nextSibling);
            block1.parentNode.insertBefore(block5, block4.nextSibling);
            block1.parentNode.insertBefore(block6, block5.nextSibling);
            block1.parentNode.insertBefore(block7, block6.nextSibling);
            block1.parentNode.insertBefore(block8, block7.nextSibling);
            block1.parentNode.insertBefore(block9, block8.nextSibling);
            this.currentLayout = nextLayout;
        },
        adjustLayoutWithDelay() {
            clearTimeout(this.callAdjustLayout);
            this.callAdjustLayout = setTimeout(this.adjustLayout, 350);
        },
        detectIE() {
            var ua = window.navigator.userAgent;

            var msie = ua.indexOf('MSIE ');
            if (msie > 0) {
                // IE 10 or older => return version number
                return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
            }

            var trident = ua.indexOf('Trident/');
            if (trident > 0) {
                // IE 11 => return version number
                var rv = ua.indexOf('rv:');
                return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
            }

            var edge = ua.indexOf('Edge/');
            if (edge > 0) {
                // Edge (IE 12+) => return version number
                return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
            }
            // other browser
            return false;
        }

    }
}
</script>