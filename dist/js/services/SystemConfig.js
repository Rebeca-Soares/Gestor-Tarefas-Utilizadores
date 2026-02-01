export class SystemConfig {
    static appName = 'Configuração de Sistema';
    static version = '2.1.0';
    static enviroment = 'ambiente';
    static setEnvironment(env) {
        SystemConfig.enviroment = env;
    }
    //metodo nativo do JS - getInfo()
    static getInfo() {
        return {
            appName: SystemConfig.appName,
            version: SystemConfig.version,
            enviroment: SystemConfig.enviroment
        };
    }
}
