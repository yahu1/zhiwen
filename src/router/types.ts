// src/router/types.ts
import { ReactNode } from 'react';

export interface Route {
    path: string;
    name: string;
    access?: string,
    icon?: ReactNode;
    component?: React.ComponentType<any>;
    routes?: Route[];
}
