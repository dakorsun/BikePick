import chalk from 'chalk';
import { watch } from 'chokidar';

/**
 * Enable server and client hot-reloading
 * NB: !!! IT DOES NOT RELOAD SEQUELIZE MODELS BECAUSE IT REQUIRES REBUILDING DATABASE TABLES !!!
 */
export default (compiler) => {
    const watcher = watch(['./server/', './client/']);

    watcher.on('change', () => {

        Object.keys(require.cache).forEach((id) => {
            if (/\/server\//.test(id)) {
                delete require.cache[id];
            }
        });

        console.log(chalk.green('Cleared /server/ module cache from server'));
    });

    compiler.plugin('done', () => {

        Object.keys(require.cache).forEach((id) => {
            if (/\/client\//.test(id)) {
                delete require.cache[id];
            }
        });

        console.log(chalk.green('Cleared /client/ module cache from server'));
    });
};
