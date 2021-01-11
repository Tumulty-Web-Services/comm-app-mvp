//create a critical red error in the console
export function CriticalError(text) {
    console.log('%c'+text,  'margin-top: 10px; margin-bottom: 10px; border-radius: 2px; font-size: 12px; padding: 10px; background: red; color: white')
}