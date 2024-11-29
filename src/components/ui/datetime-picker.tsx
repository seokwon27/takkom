import { Button, buttonVariants } from "@/components/ui/button";
import type { CalendarProps } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { type Locale, enUS } from "date-fns/locale";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { useImperativeHandle, useRef } from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DayPicker } from "react-day-picker";

// utils start
function genMonths(locale: Pick<Locale, "options" | "localize" | "formatLong">) {
  return Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: format(new Date(2021, i), "MMMM", { locale })
  }));
}

function genYears(yearRange = 50) {
  const today = new Date();
  return Array.from({ length: yearRange * 2 + 1 }, (_, i) => ({
    value: today.getFullYear() - yearRange + i,
    label: (today.getFullYear() - yearRange + i).toString()
  }));
}

// utils end

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  yearRange = 50,
  ...props
}: CalendarProps & { yearRange?: number }) {
  const MONTHS = React.useMemo(() => {
    let locale: Pick<Locale, "options" | "localize" | "formatLong"> = enUS;
    const { options, localize, formatLong } = props.locale || {};
    if (options && localize && formatLong) {
      locale = {
        options,
        localize,
        formatLong
      };
    }
    return genMonths(locale);
  }, []);

  const YEARS = React.useMemo(() => genYears(yearRange), []);

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4  sm:space-y-0 justify-center",
        month: "flex flex-col items-center space-y-4",
        month_caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center ",
        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute left-5 top-5"
        ),
        button_next: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute right-5 top-5"
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: cn("flex", props.showWeekNumber && "justify-end"),
        weekday: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        week: "flex w-full mt-2",
        day: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 rounded-1",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-l-md rounded-r-md"
        ),
        range_end: "day-range-end",
        selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-l-md rounded-r-md",
        today: "bg-accent text-accent-foreground",
        outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        disabled: "text-muted-foreground opacity-50",
        range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        hidden: "invisible",
        ...classNames
      }}
      components={{
        Chevron: ({ ...props }) =>
          props.orientation === "left" ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />,
        MonthCaption: ({ calendarMonth }) => {
          return (
            <div className="inline-flex gap-2">
              <Select
                defaultValue={calendarMonth.date.getMonth().toString()}
                onValueChange={(value) => {
                  const newDate = new Date(calendarMonth.date);
                  newDate.setMonth(Number.parseInt(value, 10));
                  props.onMonthChange?.(newDate);
                }}
              >
                <SelectTrigger className="w-fit gap-1 border-none p-0 focus:bg-accent focus:text-accent-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MONTHS.map((month) => (
                    <SelectItem key={month.value} value={month.value.toString()}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                defaultValue={calendarMonth.date.getFullYear().toString()}
                onValueChange={(value) => {
                  const newDate = new Date(calendarMonth.date);
                  newDate.setFullYear(Number.parseInt(value, 10));
                  props.onMonthChange?.(newDate);
                }}
              >
                <SelectTrigger className="w-fit gap-1 border-none p-0 focus:bg-accent focus:text-accent-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {YEARS.map((year) => (
                    <SelectItem key={year.value} value={year.value.toString()}>
                      {year.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          );
        }
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

type DateTimePickerProps = {
  value?: Date;
  onChange?: (date: string) => void;
  // onChange?: (date: Date | undefined) => void;
  disabled?: boolean;
  /** showing `AM/PM` or not. */
  // hourCycle?: 12 | 24;
  placeholder?: string;
  /**
   * The year range will be: `This year + yearRange` and `this year - yearRange`.
   * Default is 50.
   * For example:
   * This year is 2024, The year dropdown will be 1974 to 2024 which is generated by `2024 - 50 = 1974` and `2024 + 50 = 2074`.
   * */
  yearRange?: number;
  className?: string;
} & Pick<CalendarProps, "locale" | "weekStartsOn" | "showWeekNumber" | "showOutsideDays">;

type DateTimePickerRef = {
  value?: Date;
} & Omit<HTMLButtonElement, "value">;

const DateTimePicker = React.forwardRef<Partial<DateTimePickerRef>, DateTimePickerProps>(
  (
    {
      locale = enUS,
      value,
      onChange,
      yearRange = 50,
      disabled = false,
      placeholder = "생년월일을 선택해주세요.",
      className,
      ...props
    },
    ref
  ) => {
    const [month, setMonth] = React.useState<Date>(value ?? new Date());
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = React.useState(false);
    /**
     * carry over the current time when a user clicks a new day
     * instead of resetting to 00:00
     */

    const handleSelect = (newDay: Date | undefined) => {
      if (!newDay) return;
      // Date를 "yyyy-MM-dd" 형식으로 변환하여 onChange에 전달
      const formattedDate = format(newDay, "yyyy-MM-dd");
      onChange?.(formattedDate); // 포맷된 날짜를 전달

      setMonth(newDay);

      setIsOpen(false);
    };

    useImperativeHandle(
      ref,
      () => ({
        ...buttonRef.current,
        value
      }),
      [value]
    );

    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild disabled={disabled}>
          <Button
            variant="outline"
            className={cn("w-full justify-start text-left font-normal", !value && "text-muted-foreground", className)}
            ref={buttonRef}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? (
              format(new Date(value), "yyyy-MM-dd") // Date 포맷
            ) : (
              <span className="text-gray-800">{placeholder}</span>
            )}

            {/* {value ? format(value, "yyyy-MM-dd") : <span>{placeholder}</span>} */}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value}
            month={month}
            onSelect={(d) => handleSelect(d)}
            onMonthChange={handleSelect}
            yearRange={yearRange}
            locale={locale}
            {...props}
          />
        </PopoverContent>
      </Popover>
    );
  }
);

DateTimePicker.displayName = "DateTimePicker";

export { DateTimePicker };
export type { DateTimePickerProps, DateTimePickerRef };
