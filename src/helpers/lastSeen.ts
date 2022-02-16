export const lastSeen = (lastSeenDate: string) => {

    const helper = (lastSeenDate: string) => {
        const difference = new Date().getTime() - new Date(lastSeenDate).getTime()
        const hours = Math.floor(difference / 3600000)
        const days = Math.floor(hours / 24)
        const years = Math.floor(days / 365)
        if (years) return {years}
        if (days) return {days}
        return {hours}
    }
    const [unit, value] = Object.entries(helper(lastSeenDate))[0]
    if (!value) {
        return `user online`
    }
    return `last seen ${value} ${value === 1 ? unit.slice(0, -1) : unit} ago`
}