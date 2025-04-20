import { PageContainer } from '@/components/PageContainer/PageContainer'
import { useTheme } from '@/components/theme-provider'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import ChangeThemeBtn from '@/components/ChangeThemeBtn/ChangeThemeBtn'
import RightsReservedMessage from '@/components/RightsReservedMessage/RightsReservedMessage'
import { useState } from 'react'
import Loader from '@/components/Loader/Loader'

export default function FormPage() {
    return (
        <PageContainer>
            <ChangeThemeBtn />

            <FormContainer>
                <FormTitle />
                <NewClientForm />
            </FormContainer>

            <RightsReservedMessage />
        </PageContainer>
    )
}

function FormContainer({ children }) {
    const { theme } = useTheme();

    return (
        <div className={`${theme === "light" ? "bg-white" : "bg-neutral-900"} rounded-sm shadow-md p-5 h-fit border`}>
            {children}
        </div>
    )
}

function FormTitle() {
    return (
        <div className='flex gap-2 items-center mb-5'>
            <img width={50} src='/pass-brand.jpg' className='rounded-sm' />
            <h2 className='font-semibold'>Wellcome to Pass Gallery 🎉</h2>
        </div>
    )
}

// NewClientForm -> FormComponent (The main form)
const phoneRegex = /^(\+1\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/

const FormSchema = z.object({
    name: z.string().min(2, {
        message: "name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Needs to be a valid e-mail.",
    }),
    phone: z.string().regex(phoneRegex, {
        message: "Enter a valid US phone number.",
    }),
})

function NewClientForm() {
    const [loading, setLoading] = useState(false)

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    })

    const { reset } = form;

    function onSubmit(data) {
        if (loading) return;

        let name1 = name;
        setLoading(true);
        try{
            console.log({
                name,
                email,
                phone
            })

            reset({
                name: "",
                email: "",
                phone: "",
            })
        } catch(e){

        } finally {
            setLoading(false);
        }

        toast.success(`Welcome ${name1}!`, {
            description: "Check your E-mail inbox.",
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="name" {...field} />
                            </FormControl>
                            {!form.formState.errors.name && (
                                <FormDescription>
                                    Tell us your name.
                                </FormDescription>
                            )}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="example@gmail.com" {...field} />
                            </FormControl>
                            {!form.formState.errors.email && (
                                <FormDescription>
                                    An email for we send instructions.
                                </FormDescription>
                            )}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="123-456-7890"
                                    {...field}
                                    onChange={(e) => {
                                        let input = e.target.value;

                                        const numbers = input.replace(/\D/g, '');

                                        const clean = numbers.startsWith('1') ? numbers.slice(1) : numbers;

                                        const limited = clean.slice(0, 10);

                                        let formatted = '';
                                        if (limited.length > 0) formatted += limited.slice(0, 3);
                                        if (limited.length >= 4) formatted += '-' + limited.slice(3, 6);
                                        if (limited.length >= 7) formatted += '-' + limited.slice(6);

                                        field.onChange(`+1 ${formatted}`);
                                    }}
                                />
                            </FormControl>
                            {!form.formState.errors.phone && (
                                <FormDescription>
                                    Your phone number.
                                </FormDescription>
                            )}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end">
                    <Button type="submit" className="min-w-[75px]" disabled={loading}>
                        {loading ? <Loader size={18} /> : "Submit"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}