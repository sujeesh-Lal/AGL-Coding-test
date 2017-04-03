import { App } from './app';
import * as config from '../config/config.json';

const conf = config as any;
const application = new App(`${conf.baseUrl}${conf.api.people}`);

application.startUp()
    .then((html: string) => {
        const targetNode = document.getElementById('app-container');
        targetNode.innerHTML = html;
    });