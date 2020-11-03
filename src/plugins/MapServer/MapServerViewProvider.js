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

import WebPage from '../WebPage/WebPage.vue';
import Vue from 'vue';

export default class MapServerViewProvider {
    constructor(openmct) {
        this.openmct = openmct;

        this.key = 'map';
        this.name = 'Map';
        this.cssClass = 'icon-layers';
    }

    canView(domainObject) {
        return domainObject.type === 'map';
    }

    view(domainObject, objectPath) {
        let component;

        const view = {
            show: function (element) {
                component = new Vue({
                    el: element,
                    components: {
                        MapServerComponent: WebPage
                    },
                    data() {
                        return {
                            view
                        };
                    },
                    provide: {
                        openmct: this.openmct,
                        objectPath
                    },
                    template: `
                        <map-server-component
                            ref="mapServerComponent"
                            :view="view"
                        />
                    `
                });
            },
            getViewContext() {
                if (component) {
                    let context = component.$refs.mapServerComponent.getViewContext();

                    return context;
                } else {
                    console.log('what should happen?');
                }
            },
            destroy: function (element) {
                component.$destroy();
                component = undefined;
            }
        };

        return view;
    }

    canEdit(domainObject) {
        return domainObject.type === 'map';
    }
}
