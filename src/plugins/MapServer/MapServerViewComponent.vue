/*****************************************************************************
 * Open MCT, Copyright (c) 2014-2020, United States Government
 * as represented by the Administrator of the National Aeronautics and Space
 * Administration. All rights reserved.
 *
 * Open MCT is licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * Open MCT includes source code licensed under additional open source
 * licenses. See the Open Source Licenses file (LICENSES.md) included with
 * this source code distribution or the Licensing information page available
 * at runtime from the About dialog for additional information.
 *****************************************************************************/

<template>
<div class="l-iframe abs">
    <iframe
        :src="domainObject.url"
        :name="domainObject.id"
    ></iframe>
</div>
</template>

<script>
export default {
    inject: ['openmct'],
    props: {
        domainObject: {
            type: Object,
            required: true
        }
    },
    destroyed() {
        window.removeEventListener('message', this.handleMessage);
    },
    mounted() {
        let mmgis = window.frames[this.domainObject.id];
        console.log(mmgis);

        window.addEventListener('message', this.handleMessage);
    },
    methods: {
        handleMessage(event) {
            console.log(event);

            const { origin } = event;

            if (origin !== this.domainObject.url) {
                console.warn(`Message received from unknown origin: ${origin}`);

                return;
            }

            // something
        },
        postMessage(message) {
            const target = window.frames[this.domainObject.id];

            target.postMessage(message, this.domainObject.url);
        }
    }
};
</script>
