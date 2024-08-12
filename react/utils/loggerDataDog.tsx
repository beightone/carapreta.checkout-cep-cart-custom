export class Logger {
    private sendLog(logBody: any) {
        fetch('https://beightone.myvtex.com/_v0.0/api/send-log ', {
            method: 'POST',
            body: JSON.stringify({ ...this.coreLog(), ...logBody }),
        })
    }

    private coreLog() {
        //@ts-ignore
        const { NODE_ENV } = window.vtex.renderRuntime.query.origin
        // const { NODE_ENV, VTEX_APP_ID, VTEX_APP_VERSION } = process.env

        const logBody = {
            traceId: '',
            source: 'vtex',
            env: NODE_ENV,
            version: '0.5.7' ?? '',
            index: 'integration',
            hostname: window.location.hostname,
            service: 'carapreta.checkout-customizations',
            operationId: 'string',
            account: 'string',
            message: 'NO_MESSAGE',
            content: 'NO_CONTENT',
            status: 'info',
        }

        console.info('INITIAL_LOG', logBody)

        return logBody
    }

    public info(title: string, content: any, traceId?: string) {
        this.sendLog({ message: title, content, status: 'info', traceId })
    }

    public warn(title: string, content: any, traceId?: string) {
        this.sendLog({ message: title, content, status: 'warn', traceId })
    }

    public error(title: string, content: any, traceId?: string) {
        this.sendLog({ message: title, content, status: 'error', traceId })
    }
}