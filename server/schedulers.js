import Schedule from 'node-schedule';

/**
 * Here we can declare all the scheduled tasks
 */
export default () => {

    const sampleJob = Schedule.scheduleJob('*/1 * * * *', async () => {
        try {
            // do smt
        } catch (e) {
            console.error(e);
        }
    });

    return {
        sampleJob,
    };

};
