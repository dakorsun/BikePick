module.exports = {
    apps: [
        {
            name: 'website',
            script: './build/server.js',
            exec_mode: 'cluster',
            instances: 2,
            merge_logs: true,
            log_type: 'json',
            env: {},
        },
    ],
};
