import { useState } from "react"
import { format, addDays } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { type DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Props = {
    value: DateRange | undefined
    onChange: (value: DateRange | undefined) => void
}

export const DateRangePicker = ({value, onChange}: Props) => {
//   const [date, setDate] = useState<DateRange | undefined>({
//     from: new Date(),
//     to: addDays(new Date(), 7),
    //   })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <CalendarIcon />

          {value?.from && value?.to
            ? `${format(value.from, "LLL dd , yyyy")} - ${format(value.to, "LLL dd, yyyy")}`
            : "Choisir une période"}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 w-auto" align="start">
        <Calendar
          mode="range"
          selected={value}
          onSelect={onChange}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
}