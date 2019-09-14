import * as Superfine from 'superfine';
import { Controller } from './controller';

function start(state = {}) {
    const controller = new Controller(state);
    const view = App(controller.dispatch);
    const update = () => {
        Superfine.patch(document.body, view(controller.getState()));
    };
    controller.addListener(update);
    update();
}