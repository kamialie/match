import { BehaviorSubject } from 'rxjs';

const initialState = {
    like: 0,
    match: 0,
    unlike: 0,
    visit: 0,
    message: 0,
    messages: {},
};

export class NotificationService {
    constructor() {
        this.notificationSubject = new BehaviorSubject(initialState);
    }

    get notificationValue() {
        return this.notificationSubject.getValue();
    }

    get notification() {
        return this.notificationSubject.asObservable();
    }

    getNotifications() {
        const notifications = {
            ...this.notificationValue,
            like: 5,
            match: 2,
            unlike: 3,
            visit: 10,
            message: 6,
        };

        this.notificationSubject.next(notifications);
    }

    getMessagesNotifications() {
        const notifications = {
            ...this.notificationValue,
            messages: {},
        };

        this.notificationSubject.next(notifications);
    }

    updateNotifications(type, senderId = 0) {
        try {
            const res = {}; //await chatService.updateNotifications(type, senderId);
            const notifications = {
                ...this.notificationValue,
                like: 10,
                match: 5,
                unlike: 3,
                visit: 5,
                message: 10,
            };
            if (res.error) {
                // dispatch({ type: AUTH_FAIL });
            } else {
                this.notificationSubject.next(notifications);
            }
        } catch (err) {}
    }
}
