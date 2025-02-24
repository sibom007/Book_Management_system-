import React from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/Header';

const ContactUs = () => {
    return (
        <div>
            <Header name='Contact us' />
            <div className="w-full max-w-2xl mx-auto p-10 bg-Sprimary mt-10 rounded-lg">
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Input
                                type="text"
                                placeholder="Full Name"
                                className='bg-transparent border-white focus:border-white'

                            />
                        </div>
                        <div>
                            <Input
                                type="email"
                                placeholder="Email Address"
                                className='bg-transparent border-white focus:border-white'

                            />
                        </div>
                    </div>

                    <div>

                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Subject" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Choose Subject</SelectLabel>
                                    <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                                    <SelectItem value="Support">Support</SelectItem>
                                    <SelectItem value="Feedback">Feedback</SelectItem>

                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Textarea placeholder="Type your message here." />
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="button"
                            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                        >
                            Back to Home
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-Ssecondary/80 text-white rounded-lg hover:bg-Ssecondary duration-150"
                        >
                            Submit Now
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default ContactUs;