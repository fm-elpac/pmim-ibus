// css
import "@mdi/font/css/materialdesignicons.css";

import { defineCustomElement } from "vue";
import im0 from "./im0/im0.ce.vue";
import im1 from "./im1/im1.ce.vue";
import im2 from "./im2/im2.ce.vue";
import conf from "./conf/conf.ce.vue";

const CeIm0 = defineCustomElement(im0);
const CeIm1 = defineCustomElement(im1);
const CeIm2 = defineCustomElement(im2);
const CeConf = defineCustomElement(conf);

customElements.define("pmim-uis-nc-im0", CeIm0);
customElements.define("pmim-uis-nc-im1", CeIm1);
customElements.define("pmim-uis-nc-im2", CeIm2);
customElements.define("pmim-uis-nc-conf", CeConf);
