<template>
    <div>
        <MainNav />
        <slot />
    </div>
</template>

<script>
export default {
    data: () => ({
        callAdjustLayout: () => ({}),
        currentLayout: 'desktop',
        nextLayout: 'desktop'
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
        $route(to, from) {
            this.adjustLayoutWithDelay();
        }
    },
    methods: {
        adjustLayout() {
            let block1, block2, block3, block4, block5, block6, block7, block8, block9;
            this.currentLayout = 'desktop';
            this.nextLayout = 'desktop';

            if (window.innerWidth <= 1199) {
                // Mobile layout
                this.nextLayout = "mobile";
                block1 = document.querySelector("div[data-mobile-seq-no='1']");
                block2 = document.querySelector("div[data-mobile-seq-no='2']");
                block3 = document.querySelector("div[data-mobile-seq-no='3']");
                block4 = document.querySelector("div[data-mobile-seq-no='4']");
                block5 = document.querySelector("div[data-mobile-seq-no='5']");
                block6 = document.querySelector("div[data-mobile-seq-no='6']");
                block7 = document.querySelector("div[data-mobile-seq-no='7']");
                block8 = document.querySelector("div[data-mobile-seq-no='8']");
                block9 = document.querySelector("div[data-mobile-seq-no='9']");
            } else {
                // Desktop layout
                this.nextLayout = "desktop";
                block1 = document.querySelector("div[data-desktop-seq-no='1']");
                block2 = document.querySelector("div[data-desktop-seq-no='2']");
                block3 = document.querySelector("div[data-desktop-seq-no='3']");
                block4 = document.querySelector("div[data-desktop-seq-no='4']");
                block5 = document.querySelector("div[data-desktop-seq-no='5']");
                block6 = document.querySelector("div[data-desktop-seq-no='6']");
                block7 = document.querySelector("div[data-desktop-seq-no='7']");
                block8 = document.querySelector("div[data-desktop-seq-no='8']");
                block9 = document.querySelector("div[data-desktop-seq-no='9']");
            }

            if (this.nextLayout !== this.currentLayout) {
                // Reorder blocks based on their seq no
                block2.parentNode.insertBefore(block2, block1.nextSibling);
                block3.parentNode.insertBefore(block3, block2.nextSibling);
                block4.parentNode.insertBefore(block4, block3.nextSibling);
                block5.parentNode.insertBefore(block5, block4.nextSibling);
                block6.parentNode.insertBefore(block6, block5.nextSibling);
                block7.parentNode.insertBefore(block7, block6.nextSibling);
                block8.parentNode.insertBefore(block8, block7.nextSibling);
                block9.parentNode.insertBefore(block9, block8.nextSibling);
                this.currentLayout = this.nextLayout;
            }
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