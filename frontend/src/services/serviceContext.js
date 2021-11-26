import { createContext } from 'react';
import { FilterService } from './filter.service';
import { NotificationService } from './notification.service';
import { MatchService } from './match.service';

const filterService = new FilterService();
const notificationService = new NotificationService();
const matchService = new MatchService();

export const ServiceContext = createContext({});

export const contextDefaultValue = {
    filterService,
    notificationService,
    matchService,
};
