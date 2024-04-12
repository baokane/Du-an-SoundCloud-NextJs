'use client'
import dayjs from "dayjs"

const Dayjs = () => {
    const isTimeAfter = dayjs("2025-01-01").isAfter("2024-01-01")
    console.log('isTimeAfter:', isTimeAfter)
    // setTimeout(() =>
    //     console.log('isTimeAfter -sau 5s:', isTimeAfter)
    //     , 6000)

    return (
        <div>Dayjs {isTimeAfter}</div>
    )
}

export default Dayjs