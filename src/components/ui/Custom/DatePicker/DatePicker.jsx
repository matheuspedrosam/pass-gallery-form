import { useState, useEffect } from "react"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker({ className, value, onChange }) {
    const [date, setDate] = useState(value ? new Date(value) : null)

    useEffect(() => {
        if (value) {
        setDate(new Date(value))
        }
    }, [value])

    function onSelect(newDate) {
        setDate(newDate)
        onChange?.(newDate)
    }

    return (
        <Popover>
        <PopoverTrigger asChild>
            <Button
            variant="outline"
            className={cn(
                "w-[200px] justify-start text-left font-normal",
                !date && "text-muted-foreground",
                className
            )}
            >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? (
                date.toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                })
            ) : (
                <span>Choose a date</span>
            )}
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
            <Calendar
            mode="single"
            selected={date}
            onSelect={onSelect}
            initialFocus
            />
        </PopoverContent>
        </Popover>
    )
}
