export class SystemConfig {
    static appName: string = 'Configuração de Sistema';
    static version: string = '2.1.0';
    static environment: string = 'produção';

    static setEnvironment (env: string):void {
        this.environment = env; 
    }

    //metodo nativo do JS - getInfo()
    static getInfo(): {appName: string, version: string, environment:string} {
        return {
            appName: this.appName,
            version: this.version,
            environment: this.environment
        }
    }
} 