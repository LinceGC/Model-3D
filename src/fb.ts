export class FirebaseInstance {
    private static instance: FirebaseInstance;

    db: any = null;
    auth: any = null;

    static GetInstance(): FirebaseInstance {
        if (!FirebaseInstance.instance) {
            FirebaseInstance.instance = new FirebaseInstance();
        }
        return FirebaseInstance.instance;
    }

    countUp(a?: any, b?: any): Promise<void> {
        return Promise.resolve();
    }
}

export default FirebaseInstance;