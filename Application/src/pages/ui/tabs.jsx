import React, { createContext, useContext, useState } from 'react';

const TabsContext = createContext({});

export function Tabs({ defaultValue, children, className }) {
    const [activeTab, setActiveTab] = useState(defaultValue);
    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className={className}>{children}</div>
        </TabsContext.Provider>
    );
}

export function TabsList({ className, children }) {
    return (
        <div className={`inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground bg-gray-100 ${className}`}>
            {children}
        </div>
    );
}

export function TabsTrigger({ value, className, children }) {
    const { activeTab, setActiveTab } = useContext(TabsContext);
    const isActive = activeTab === value;
    return (
        <button
            className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${isActive ? 'bg-white text-foreground shadow text-gray-900' : 'text-gray-500 hover:text-gray-900'} ${className}`}
            onClick={() => setActiveTab(value)}
        >
            {children}
        </button>
    );
}

export function TabsContent({ value, className, children }) {
    const { activeTab } = useContext(TabsContext);
    if (activeTab !== value) return null;
    return (
        <div className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}>
            {children}
        </div>
    );
}
