import { useState } from "react";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../select";

export function DatePicker({ className, onChange, defaultDate, defaultTime }) {
    const [date, setDate] = useState(defaultDate ? defaultDate : null);
    const [time, setTime] = useState(defaultTime ? defaultTime : "");
    const [availableTimes, setAvailableTimes] = useState(["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"])

    const parseTime = (timeStr) => {
        const [time, modifier] = timeStr.split(" ");
        let [hours, minutes] = time.split(":").map(Number);

        if (modifier === "PM" && hours < 12) hours += 12;
        if (modifier === "AM" && hours === 12) hours = 0;

        return { hours, minutes };
    };

    const handleTimeChange = (newTime) => {
        setTime(newTime);

        if (date) {
            const { hours, minutes } = parseTime(newTime);
            const updatedDate = new Date(date);
            updatedDate.setHours(hours);
            updatedDate.setMinutes(minutes);
            setDate(updatedDate);
            onChange?.(updatedDate);
        }
    };

    const onSelect = (newDate) => {
        if (!newDate) return;

        if (time) {
            const { hours, minutes } = parseTime(time);
            newDate.setHours(hours);
            newDate.setMinutes(minutes);
        } else {
            newDate.setHours(0);
            newDate.setMinutes(0);
        }

        setDate(newDate);
        onChange?.(newDate);
    };

    const displayDate = date
        ? date.getHours() === 0 
            ? date.toLocaleString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }) 
            : date.toLocaleString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            }) 
        : "Choose a date";

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "w-[220px] justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                        className
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {displayDate}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2" align="start">
                <div className="border mb-2 rounded-sm">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={onSelect}
                        initialFocus
                    />
                </div>

                <Select onValueChange={handleTimeChange} value={time}>
                    <SelectTrigger className="w-full !rounded-sm">
                        <SelectValue placeholder="Choose a time" />
                    </SelectTrigger>
                    <SelectContent>
                        {availableTimes.map((hora) => (
                            <SelectItem key={hora} value={hora}>
                                {hora}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </PopoverContent>
        </Popover>
    );
}