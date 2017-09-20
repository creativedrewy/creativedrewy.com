
var env = require('node-env-file');

/**
 * Encapsulates storing/getting environment variables
 */
export class EnvironmentVarsService {
    constructor() {
        env('.auth');
    }

    /**
     * Get a particular env var value based on source key
     */
    getEnvVar(key: string): any {
        return process.env[key];
    }
}