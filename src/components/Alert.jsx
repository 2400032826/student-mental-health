import React, { createContext, useContext, useState, useCallback } from 'react'


const AlertContext = createContext()


export function AlertProvider({ children }) {
const [alerts, setAlerts] = useState([])


const showAlert = useCallback((message, type = 'success') => {
const id = Date.now()
setAlerts(a => [{ id, message, type }, ...a])
setTimeout(() => setAlerts(a => a.filter(x => x.id !== id)), 5000)
}, [])


return (
<AlertContext.Provider value={{ showAlert }}>
{children}
<div id="alert-container" style={{ position: 'fixed', top: 20, right: 20, zIndex: 1000, width: 320 }}>
{alerts.map(a => (
<div key={a.id} className={`custom-alert custom-alert-${a.type}`} style={{ marginBottom: 10 }}>
<strong>{a.type.toUpperCase()}:</strong> {a.message}
</div>
))}
</div>
</AlertContext.Provider>
)
}


export function useAlert() {
const ctx = useContext(AlertContext)
if (!ctx) throw new Error('useAlert must be used within AlertProvider')
return ctx
}