export class SystemConfig {
    static appName = 'Configuração de Sistema';
    static version = '2.1.0';
    static environment = 'produção';
    static setEnvironment(env) {
        this.environment = env;
    }
    //metodo nativo do JS - getInfo()
    static getInfo() {
        return {
            appName: this.appName,
            version: this.version,
            environment: this.environment
        };
    }
}
